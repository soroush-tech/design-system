import type { Catalog } from '../catalog/catalogRules'
import type { Finding } from '../findings'
import { createSchemaSet } from '../schema/schemaSet'
import { STUB_CATALOG } from '../schema/stubCatalog'
import { checkValue, type Environment, ROOT_SCOPE, type Scope } from '../surface/expressions'
import { parsePointer } from '../surface/pointer'
import { inspectSurfaces } from '../surface/validateSurface'
import { isObject, type JsonObject } from '../types'
import schema from './behavior.schema.json'
import type { Behavior } from './dataModel'

/**
 * The JSON Schema of a behavior document, version 0.1. Typed as plain JSON so the declarations
 * this package ships do not depend on a declaration for the JSON file.
 */
export const behaviorSchema: JsonObject = schema

/** The key a surface carries its behavior link under, in `createSurface.metadata.extensions`. */
export const BEHAVIOR_EXTENSION = 'tech_soroush_behavior'

const schemas = createSchemaSet(STUB_CATALOG)
schemas.add(schema)

export interface BehaviorOptions {
  /** The messages that describe the surface this document drives. */
  messages: unknown[]
  /** Every catalog the document or the messages may name. */
  catalogs: Catalog[]
}

/** `/resources` and `/page/params` are written by the runtime alone. */
const isReserved = (pointer: string): boolean => {
  const [first, second] = parsePointer(pointer)
  return first === 'resources' || (first === 'page' && second === 'params')
}

/**
 * Everything wrong with a behavior document, given the surface it drives.
 *
 * The schema first. Then that it is paired with the surface it names; that every expression in
 * it calls functions that exist, with arguments they take, and binds paths that lead somewhere;
 * that it writes nowhere the runtime owns; that its triggers name resources it declares and
 * events the surface dispatches; and that `requires.functions` is exactly what it calls.
 *
 * Findings about the surface itself are `validateSurface`'s to report, with this document passed
 * as its `behavior` option. They are not repeated here.
 */
export const validateBehavior = (behavior: unknown, options: BehaviorOptions): Finding[] => {
  const issues = schemas.check(schema.$id, behavior)
  if (issues.length > 0) {
    return issues.map((issue) => ({ code: 'behavior-schema', ...issue }))
  }
  const document = behavior as Behavior
  const { surfaces } = inspectSurfaces(options.messages, { ...options, behavior: document })
  const surface = surfaces.find(({ surfaceId }) => surfaceId === document.surfaceId)
  if (surface === undefined) {
    return [
      {
        code: 'behavior-surface',
        path: '/surfaceId',
        message: `The messages describe no surface "${document.surfaceId}".`,
      },
    ]
  }

  const findings: Finding[] = []
  const report = (finding: Finding) => {
    findings.push(finding)
  }
  if (surface.catalogId !== document.catalogId) {
    report({
      code: 'behavior-surface',
      path: '/catalogId',
      message: `The surface's default catalog is "${surface.catalogId}", not "${document.catalogId}".`,
    })
  }
  const link = surface.extensions[BEHAVIOR_EXTENSION]
  if (isObject(link) && link.behaviorVersion !== document.behaviorVersion) {
    report({
      code: 'behavior-surface',
      path: '/behaviorVersion',
      message: `The surface asks for behavior version "${link.behaviorVersion}".`,
    })
  }

  const called = new Set<string>()
  const env: Environment = {
    ...surface.env,
    defaultCatalogId: document.catalogId,
    report,
    onCall: (name, call) => {
      if (typeof call.catalogId !== 'string') called.add(name)
    },
  }
  const check = (value: unknown, pointer: string, scope: Scope = ROOT_SCOPE) =>
    checkValue(env, { scope, onSlot: () => false }, value, {}, pointer)
  const checkWritable = (pointer: string, path: string) => {
    if (isReserved(pointer)) {
      report({
        code: 'reserved-path',
        path,
        message: `"${pointer}" belongs to the runtime; a document cannot write there.`,
      })
    }
  }

  const { resources = {}, derived = [], triggers = [], head, requires = {} } = document
  check(resources, '/resources')
  check(head, '/head')
  for (const [name, { into, onError }] of Object.entries(resources)) {
    checkWritable(into, `/resources/${name}/into`)
    if (onError !== undefined) checkWritable(onError, `/resources/${name}/onError`)
  }
  derived.forEach(({ forEach, into, value }, index) => {
    if (forEach === undefined) {
      check(value, `/derived/${index}/value`)
      checkWritable(into, `/derived/${index}/into`)
    } else {
      // Like a list template: relative paths start at an item, and the first stands for all.
      const item = { base: [...parsePointer(forEach), '0'], isTemplate: true }
      check(value, `/derived/${index}/value`, item)
    }
  })
  triggers.forEach(({ on, run }, index) => {
    if (on.event !== undefined && !surface.events.has(on.event)) {
      report({
        code: 'unknown-event',
        path: `/triggers/${index}/on/event`,
        message: `No component of the surface dispatches an event named "${on.event}".`,
      })
    }
    if (on.change !== undefined) check({ '@path': on.change }, `/triggers/${index}/on/change`)
    run.forEach((name, position) => {
      if (!Object.hasOwn(resources, name)) {
        report({
          code: 'unknown-resource',
          path: `/triggers/${index}/run/${position}`,
          message: `The document declares no resource "${name}".`,
        })
      }
    })
  })

  const required = new Set(requires.functions ?? [])
  for (const name of called) {
    if (!required.has(name)) {
      report({
        code: 'requires-functions',
        path: '/requires/functions',
        message: `"${name}" is called but not listed in \`requires.functions\`.`,
      })
    }
  }
  for (const name of required) {
    if (!called.has(name)) {
      report({
        code: 'requires-functions',
        path: '/requires/functions',
        message: `"${name}" is listed in \`requires.functions\` but never called.`,
      })
    }
  }
  return findings
}
