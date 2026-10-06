import { getOwn, isObject, type JsonObject, setOwn } from '../types'

/** The segments of a JSON Pointer; `/` and the empty pointer both name the root. */
export const parsePointer = (pointer: string): string[] =>
  pointer
    .split('/')
    .slice(1)
    .filter((segment, index, all) => segment !== '' || index < all.length - 1)
    .map((segment) => segment.replaceAll('~1', '/').replaceAll('~0', '~'))

const isContainer = (value: unknown): value is JsonObject => isObject(value) || Array.isArray(value)

/** The value at `segments`, or `undefined` when the way there does not exist. */
export const getAt = (root: unknown, segments: string[]): unknown =>
  segments.reduce<unknown>(
    (current, segment) => (isContainer(current) ? getOwn(current, segment) : undefined),
    root
  )

/**
 * Where a path leads in the data a surface starts with.
 *
 * `unknowable` is the honest third answer. A data model is partly a promise: a list is empty
 * until a resource fills it, and a `null` stands for a value that arrives later. Nothing can be
 * said about what lies below either, so only a key that is plainly absent is `missing`.
 */
export type Lookup = 'found' | 'missing' | 'unknowable'

export const lookUp = (root: unknown, segments: string[]): Lookup => {
  let current = root
  for (const segment of segments) {
    if (current === null) return 'unknowable'
    if (Array.isArray(current)) {
      if (!/^\d+$/.test(segment)) return 'missing'
      if (Number(segment) >= current.length) return 'unknowable'
      current = current[Number(segment)]
    } else if (isObject(current) && Object.hasOwn(current, segment)) {
      current = current[segment]
    } else {
      return 'missing'
    }
  }
  return 'found'
}

/**
 * The container that holds the last segment, and that segment, with the objects on the way
 * created. A caller writes or deletes the key itself, with `setOwn`: `updateDataModel` removes on
 * `null`, while a placeholder for data yet to arrive is a `null` that stays.
 *
 * Only own keys are followed and created, so a path through `__proto__` builds an ordinary key
 * of that name and never arrives at `Object.prototype`.
 */
export const getHolder = (root: JsonObject, segments: string[]): [JsonObject, string] => {
  let current = root
  for (const segment of segments.slice(0, -1)) {
    if (!isContainer(getOwn(current, segment))) setOwn(current, segment, {})
    current = getOwn(current, segment) as JsonObject
  }
  return [current, segments.at(-1) as string]
}
