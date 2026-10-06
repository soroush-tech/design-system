/** A JSON object whose shape is checked by a schema rather than by the type system. */
export interface JsonObject {
  [key: string]: unknown
}

/**
 * The value of a key the object itself has, or `undefined`.
 *
 * The objects read here are JSON written by an agent, where `toString`, `constructor` and
 * `__proto__` are names like any other. Indexing, or the `in` operator, answers for the prototype
 * chain as well, which turns `{"@call": "toString"}` into a function the catalog seems to have.
 * Every lookup by a name that came from a document goes through this.
 */
export const getOwn = (object: JsonObject | undefined, key: string): unknown =>
  object !== undefined && Object.hasOwn(object, key) ? object[key] : undefined

/**
 * Writes a key onto the object itself. Plain assignment to `__proto__` replaces the prototype
 * instead, and an assignment made through it reaches `Object.prototype`.
 */
export const setOwn = (object: JsonObject, key: string, value: unknown): void => {
  Object.defineProperty(object, key, {
    value,
    writable: true,
    enumerable: true,
    configurable: true,
  })
}

/** Whether a value is a plain JSON object: not `null`, not an array. */
export const isObject = (value: unknown): value is JsonObject =>
  typeof value === 'object' && value !== null && !Array.isArray(value)
