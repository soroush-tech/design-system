import { getOwn, isObject, type JsonObject } from '../types'

const COMMON_TYPES = 'common_types.json#/$defs/'

/** The A2UI common type a schema points at, when it points at one. */
export const getCommonType = (schema: JsonObject): string | undefined =>
  typeof schema.$ref === 'string' && schema.$ref.startsWith(COMMON_TYPES)
    ? schema.$ref.slice(COMMON_TYPES.length)
    : undefined

/** What a function must return to fill each dynamic type. `DynamicValue` takes anything. */
const DYNAMIC_RETURNS: Record<string, string> = {
  DynamicString: 'string',
  DynamicNumber: 'number',
  DynamicBoolean: 'boolean',
  DynamicStringList: 'array',
}

/** JSON Schema type names as function return types; `integer` is a number to a function. */
const SCHEMA_RETURNS: Record<string, string> = {
  string: 'string',
  number: 'number',
  integer: 'number',
  boolean: 'boolean',
  array: 'array',
  object: 'object',
}

/** The branches of a union that say nothing about the literal: the two ways to be dynamic. */
const DYNAMIC_BRANCHES = new Set(['DataBinding', 'FunctionCall'])

const getValueType = (value: unknown): string => (Array.isArray(value) ? 'array' : typeof value)

/**
 * The return types a function may have to fill the slot `schema` describes, or `undefined` when
 * the slot takes anything.
 *
 * A generated prop is a union of its literal form, a binding and a call, so the literal branch is
 * what says which type the slot wants.
 */
export const getAcceptedReturns = (schema: JsonObject): Set<string> | undefined => {
  const common = getCommonType(schema)
  if (common !== undefined) {
    const filledBy = getOwn(DYNAMIC_RETURNS, common)
    return filledBy === undefined ? undefined : new Set([filledBy as string])
  }
  const union = schema.anyOf ?? schema.oneOf
  if (Array.isArray(union)) {
    const literal = union
      .filter(isObject)
      .filter((branch) => !DYNAMIC_BRANCHES.has(getCommonType(branch) as string))
      .map(getAcceptedReturns)
    if (literal.length === 0 || literal.includes(undefined)) return undefined
    return new Set(literal.flatMap((accepted) => [...(accepted as Set<string>)]))
  }
  if (Array.isArray(schema.enum)) return new Set(schema.enum.map(getValueType))
  if ('const' in schema) return new Set([getValueType(schema.const)])
  if (schema.type === undefined) return undefined
  const types = [schema.type].flat() as string[]
  const returns = types.map((type) => getOwn(SCHEMA_RETURNS, type) as string | undefined)
  return new Set(returns.filter((type) => type !== undefined))
}

/** Whether a function returning `returnType` may stand in a slot that takes `accepted`. */
export const fitsSlot = (returnType: unknown, accepted: Set<string> | undefined): boolean =>
  returnType !== 'void' &&
  (accepted === undefined || returnType === 'any' || accepted.has(returnType as string))
