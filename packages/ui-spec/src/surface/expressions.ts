import commonTypes from '../../vendor/a2ui/v1_0/json/common_types.json'
import { type Catalog, getDeclaredProperties } from '../catalog/catalogRules'
import type { Finding } from '../findings'
import { A2UI_BASE, aliasCatalog, createSchemaSet, type SchemaSet } from '../schema/schemaSet'
import { STUB_CATALOG } from '../schema/stubCatalog'
import { getOwn, isObject, type JsonObject } from '../types'
import { lookUp, parsePointer } from './pointer'
import { getAcceptedReturns, getCommonType, fitsSlot } from './slots'

const COMMON = `${A2UI_BASE}common_types.json#/$defs/`

/** Where relative paths start, and whether this is inside a list template. */
export interface Scope {
  base: string[]
  isTemplate: boolean
}

export const ROOT_SCOPE: Scope = { base: [], isTemplate: false }

/** A catalog and the address it is registered under for schema checks. */
interface Registered {
  catalog: Catalog
  alias: string
}

/** The catalogs a surface may draw on, registered beside the A2UI schemas. */
export interface Catalogs {
  schemas: SchemaSet
  byId: Map<string, Registered>
}

/**
 * Registers the catalogs for validation. They are taken as valid: run `validateCatalog` first,
 * since a catalog the engine cannot compile fails here rather than as a finding.
 */
export const registerCatalogs = (catalogs: Catalog[]): Catalogs => {
  const schemas = createSchemaSet(STUB_CATALOG)
  const byId = new Map<string, Registered>()
  catalogs.forEach((catalog, index) => {
    const aliased = aliasCatalog(catalog, `catalog_${index}.json`)
    schemas.add(aliased)
    byId.set(catalog.catalogId, { catalog, alias: aliased.$id as string })
  })
  return { schemas, byId }
}

/** What an expression is checked against. */
export interface Environment extends Catalogs {
  /** The catalog a call resolves to when it names none. */
  defaultCatalogId?: string
  dataModel: unknown
  report: (finding: Finding) => void
  /** Told of every call to a catalog function, before it is resolved. */
  onCall?: (name: string, call: JsonObject) => void
}

/** Who is asking, and what they do with the parts of a value that are not expressions. */
export interface Walk {
  scope: Scope
  componentId?: string
  /**
   * Called for every value that is neither a binding nor a call, with the common type its slot
   * points at. Answering `true` takes the value over; `false` lets the walk descend into it.
   */
  onSlot: (kind: string | undefined, value: unknown, pointer: string) => boolean
}

/** The absolute segments of a path written in `scope`. Only a leading `/` makes it absolute. */
export const resolvePath = (path: string, scope: Scope): string[] =>
  path.startsWith('/') ? parsePointer(path) : [...scope.base, ...parsePointer(`/${path}`)]

/** Why a catalog could not be found: it was never named, or it was named and not supplied. */
export const describeCatalog = (catalogId: string | undefined): string =>
  catalogId === undefined
    ? 'The surface names no default catalog'
    : `The catalog "${catalogId}" was not supplied`

/** The protocol's one built-in function, defined by the common types rather than by a catalog. */
const INDEX = {
  definition: commonTypes.$defs.IndexSystemFunction as JsonObject,
  schema: { $ref: `${COMMON}IndexSystemFunction` } as JsonObject,
}

/**
 * Checks every binding and function call inside a value, and hands the rest to `walk.onSlot`.
 *
 * `slot` is the schema of the position the value fills. It says what a call there must return,
 * and it is how the walk knows which nested positions hold component ids. An empty slot is a
 * position nothing is known about: bindings and calls are still checked, return types are not.
 */
export const checkValue = (
  env: Environment,
  walk: Walk,
  value: unknown,
  slot: JsonObject,
  pointer: string
): void => {
  const { scope, componentId } = walk
  const report = (code: Finding['code'], path: string, message: string) =>
    env.report(
      componentId === undefined ? { code, path, message } : { code, path, message, componentId }
    )

  const resolveFunction = (call: JsonObject, name: string) => {
    if (name === '@index') {
      if (!scope.isTemplate) {
        report(
          'index-outside-template',
          pointer,
          '`@index` only has a value inside a list template.'
        )
      }
      return INDEX
    }
    env.onCall?.(name, call)
    const catalogId = typeof call.catalogId === 'string' ? call.catalogId : env.defaultCatalogId
    const registered = env.byId.get(catalogId as string)
    if (registered === undefined) {
      report('unknown-catalog', pointer, `${describeCatalog(catalogId)} to resolve "${name}" in.`)
      return undefined
    }
    const definition = getOwn(registered.catalog.functions, name) as JsonObject | undefined
    if (definition === undefined) {
      report('unknown-function', pointer, `The catalog "${catalogId}" has no function "${name}".`)
      return undefined
    }
    return { definition, schema: { $ref: `${registered.alias}#/functions/${name}` } }
  }

  const checkCall = (call: JsonObject, name: string, isAction: boolean) => {
    const resolved = resolveFunction(call, name)
    if (resolved === undefined) return
    const { definition, schema } = resolved
    const issues = env.schemas.check(
      { allOf: [{ $ref: `${COMMON}FunctionCommon` }, schema], unevaluatedProperties: false },
      call
    )
    for (const issue of issues) {
      report('function-args', `${pointer}${issue.path}`, `"${name}" ${issue.message}.`)
    }
    if (!isAction && !fitsSlot(definition.returnType, getAcceptedReturns(slot))) {
      report(
        'return-type',
        pointer,
        `"${name}" returns ${definition.returnType}, which this position does not take.`
      )
    }
    const args = getDeclaredProperties(definition).args
    if (issues.length === 0 && isObject(args)) {
      checkValue(env, walk, call.args, args, `${pointer}/args`)
    }
  }

  if (isObject(value) && typeof value['@path'] === 'string') {
    if (lookUp(env.dataModel, resolvePath(value['@path'], scope)) === 'missing') {
      report('unresolved-path', pointer, `Nothing in the data model is at "${value['@path']}".`)
    }
    return
  }
  if (isObject(value) && typeof value['@call'] === 'string') {
    checkCall(value, value['@call'], getCommonType(slot) === 'Action')
    return
  }
  if (walk.onSlot(getCommonType(slot), value, pointer)) return
  if (Array.isArray(value)) {
    const items = isObject(slot.items) ? slot.items : {}
    value.forEach((item, index) => checkValue(env, walk, item, items, `${pointer}/${index}`))
  } else if (isObject(value)) {
    const properties = getDeclaredProperties(slot)
    for (const [key, item] of Object.entries(value)) {
      const property = getOwn(properties, key)
      checkValue(env, walk, item, isObject(property) ? property : {}, `${pointer}/${key}`)
    }
  }
}
