import { augmentDataModel, type Behavior } from '../behavior/dataModel'
import type { Catalog } from '../catalog/catalogRules'
import type { Finding } from '../findings'
import { A2UI_BASE } from '../schema/schemaSet'
import { getOwn, isObject, type JsonObject } from '../types'
import {
  checkValue,
  describeCatalog,
  type Environment,
  registerCatalogs,
  resolvePath,
  ROOT_SCOPE,
  type Scope,
  type Walk,
} from './expressions'
import { readSurfaces, type Surface } from './surfaceState'

export interface SurfaceOptions {
  /** Every catalog the messages may name. They are taken as valid: see `validateCatalog`. */
  catalogs: Catalog[]
  /**
   * The behavior document the surface is paired with. Its resources, params and derived values
   * are data the surface may bind to before any of it has arrived.
   */
  behavior?: Behavior
}

/** A surface as the checks left it, for a behavior document to be checked against. */
export interface Inspected {
  surfaceId: string
  catalogId?: string
  /** The names of the events its actions dispatch. */
  events: Set<string>
  /** What `createSurface.metadata.extensions` carried. */
  extensions: JsonObject
  env: Environment
}

interface Parent {
  type: string
  definition: JsonObject
}

/** The canonical container a surface's `root` mounts in. Catalogs name it in `allowedParents`. */
const SURFACE: Parent = { type: 'Surface', definition: {} }

/** The six messages an agent sends. The envelope defines each as `<Kind>Message`. */
const MESSAGE_KINDS = [
  'createSurface',
  'updateComponents',
  'updateDataModel',
  'deleteSurface',
  'callRendererFunction',
  'agentFunctionResponse',
]

const ENVELOPE = `${A2UI_BASE}agent_to_renderer.json#/$defs/`

const COMPONENT_COMMON = { $ref: `${A2UI_BASE}common_types.json#/$defs/ComponentCommon` }
const ACTION_SLOT = { $ref: 'common_types.json#/$defs/Action' }

const isAllowed = (list: unknown, type: string): boolean =>
  !Array.isArray(list) || list.includes(type)

const inspectSurface = (
  surface: Surface,
  catalogs: ReturnType<typeof registerCatalogs>,
  report: (finding: Finding) => void,
  behavior: Behavior | undefined
): Inspected => {
  const { components, surfaceId, catalogId, extensions } = surface
  const dataModel =
    behavior === undefined ? surface.dataModel : augmentDataModel(surface.dataModel, behavior)
  const env: Environment = { ...catalogs, defaultCatalogId: catalogId, dataModel, report }
  const events = new Set<string>()

  // Each component against the catalog it resolves to. Only one that passes is read further:
  // the walk below trusts the shapes its schema guarantees.
  const definitions = new Map<string, JsonObject>()
  for (const [id, { component, path }] of components) {
    const ownCatalogId = component.catalogId ?? catalogId
    const registered = catalogs.byId.get(ownCatalogId as string)
    if (registered === undefined) {
      report({
        code: 'unknown-catalog',
        path,
        componentId: id,
        message: `${describeCatalog(ownCatalogId)} to resolve "${component.component}" in.`,
      })
      continue
    }
    const definition = getOwn(registered.catalog.components, component.component) as
      | JsonObject
      | undefined
    if (definition === undefined) {
      report({
        code: 'unknown-component',
        path,
        componentId: id,
        message: `The catalog "${ownCatalogId}" has no component "${component.component}".`,
      })
      continue
    }
    const issues = catalogs.schemas.check(
      {
        allOf: [
          COMPONENT_COMMON,
          { $ref: `${registered.alias}#/components/${component.component}` },
        ],
        unevaluatedProperties: false,
      },
      component
    )
    for (const issue of issues) {
      report({
        code: 'component-schema',
        path: `${path}${issue.path}`,
        componentId: id,
        message: `"${component.component}" ${issue.message}.`,
      })
    }
    if (issues.length === 0) definitions.set(id, definition)
  }

  const reached = new Set<string>()
  // Set when a reached component could not be read. What it holds is then unknown, so the
  // components it would have led to are not reported as orphans on top of its own finding.
  let isBlind = false
  const visit = (id: string, scope: Scope, parent: Parent, from: string, trail: string[]) => {
    const placed = components.get(id)
    if (placed === undefined) {
      report({ code: 'unknown-child', path: from, message: `No component has the id "${id}".` })
      return
    }
    if (trail.includes(id)) {
      report({
        code: 'cycle',
        path: from,
        componentId: id,
        message: `"${id}" contains itself: ${[...trail, id].join(' > ')}.`,
      })
      return
    }
    if (reached.has(id)) return
    reached.add(id)
    const definition = definitions.get(id)
    if (definition === undefined) {
      isBlind = true
      return
    }
    const { component, path } = placed
    if (!isAllowed(definition.allowedParents, parent.type)) {
      report({
        code: 'unallowed-parent',
        path,
        componentId: id,
        message: `"${component.component}" cannot sit inside "${parent.type}".`,
      })
    }
    if (!isAllowed(parent.definition.allowedChildren, component.component)) {
      report({
        code: 'unallowed-child',
        path,
        componentId: id,
        message: `"${parent.type}" cannot hold "${component.component}".`,
      })
    }
    const self: Parent = { type: component.component, definition }
    const below = [...trail, id]
    const walk: Walk = {
      scope,
      componentId: id,
      onSlot: (kind, value, pointer) => {
        if (kind === 'Child' || kind === 'ComponentId') {
          visit(value as string, scope, self, pointer, below)
          return true
        }
        if (kind === 'ChildList' && Array.isArray(value)) {
          value.forEach((child, index) => visit(child, scope, self, `${pointer}/${index}`, below))
          return true
        }
        if (kind === 'ChildList') {
          // A template: one component rendered per item of the list at `path`, with relative
          // paths starting at the item. The first item stands for all of them.
          const { componentId, path: listPath } = value as { componentId: string; path: string }
          checkValue(env, walk, { '@path': listPath }, {}, `${pointer}/path`)
          const itemScope = { base: [...resolvePath(listPath, scope), '0'], isTemplate: true }
          visit(componentId, itemScope, self, `${pointer}/componentId`, below)
          return true
        }
        if (kind === 'Action') {
          const action = value as { event?: JsonObject; functionCall?: JsonObject }
          if (action.functionCall === undefined) {
            const event = action.event as JsonObject
            events.add(event.name as string)
            checkValue(env, walk, event, {}, `${pointer}/event`)
          } else {
            checkValue(env, walk, action.functionCall, ACTION_SLOT, `${pointer}/functionCall`)
          }
          return true
        }
        return false
      },
    }
    checkValue(env, walk, component, definition, path)
  }

  const root = components.get('root')
  if (root === undefined) {
    report({
      code: 'missing-root',
      path: '',
      message: `The surface "${surfaceId}" has no component with the id "root".`,
    })
  } else {
    visit('root', ROOT_SCOPE, SURFACE, root.path, [])
    for (const [id, { path }] of components) {
      if (!isBlind && !reached.has(id)) {
        report({
          code: 'orphan',
          path,
          componentId: id,
          message: `Nothing reachable from "root" refers to "${id}".`,
        })
      }
    }
  }
  return { surfaceId, catalogId, events, extensions, env }
}

/**
 * Checks the messages and answers what it learned about each surface, which is what a behavior
 * document is then checked against (`validateBehavior`).
 */
export const inspectSurfaces = (
  messages: unknown[],
  options: SurfaceOptions
): { findings: Finding[]; surfaces: Inspected[] } => {
  const catalogs = registerCatalogs(options.catalogs)
  const findings: Finding[] = []
  messages.forEach((message, index) => {
    const kind = MESSAGE_KINDS.find((key) => isObject(message) && key in message)
    if (kind === undefined) {
      findings.push({
        code: 'envelope',
        path: `/${index}`,
        message: `A message carries exactly one of ${MESSAGE_KINDS.join(', ')}.`,
      })
      return
    }
    // Against the one kind of message it claims to be. Against the envelope's union of all six,
    // a single mistake reads as a failure to be each of the other five as well.
    const schema = `${ENVELOPE}${kind.charAt(0).toUpperCase()}${kind.slice(1)}Message`
    for (const issue of catalogs.schemas.check(schema, message)) {
      findings.push({ code: 'envelope', path: `/${index}${issue.path}`, message: issue.message })
    }
  })
  // A message the envelope refuses is not read further: every later check trusts its shape.
  if (findings.length > 0) return { findings, surfaces: [] }
  const read = readSurfaces(messages as Parameters<typeof readSurfaces>[0])
  findings.push(...read.findings)
  const report = (finding: Finding) => {
    findings.push(finding)
  }
  const surfaces = read.surfaces.map((surface) =>
    inspectSurface(surface, catalogs, report, options.behavior)
  )
  return { findings, surfaces }
}

/**
 * Everything wrong with the surfaces a run of A2UI v1.0 messages describes, as they stand after
 * the last message.
 *
 * The envelope first; then each component against the catalog it resolves to; then the tree
 * (the root, child references, cycles, orphans, and the catalog's own rules about what may sit
 * inside what); and every binding and function call, including that a call returns what its
 * position takes.
 *
 * A path is reported only when the data model plainly has nothing there. Below an empty list or
 * a `null` nothing can be known yet, and that is not a finding.
 */
export const validateSurface = (messages: unknown[], options: SurfaceOptions): Finding[] =>
  inspectSurfaces(messages, options).findings
