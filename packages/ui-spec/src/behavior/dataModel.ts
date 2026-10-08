import { getAt, getHolder, lookUp, parsePointer } from '../surface/pointer'
import { type JsonObject, setOwn } from '../types'

interface Resource {
  kind: 'query' | 'mutation'
  request: JsonObject
  into: string
  onError?: string
  select?: unknown
}

interface Derived {
  id: string
  forEach?: string
  into: string
  value: unknown
}

interface Trigger {
  on: { event?: string; change?: string }
  run: string[]
}

/** A behavior document that has passed `behavior.schema.json`. */
export interface Behavior {
  behaviorVersion: string
  surfaceId: string
  catalogId: string
  requires?: { functions?: string[] }
  params?: Record<string, { default?: unknown }>
  resources?: Record<string, Resource>
  derived?: Derived[]
  triggers?: Trigger[]
  head?: JsonObject
}

/** Marks `segments` as holding a value that arrives later, unless something is already there. */
const promiseAt = (model: JsonObject, segments: string[], value: unknown = null): void => {
  if (lookUp(model, segments) !== 'missing') return
  const [holder, key] = getHolder(model, segments)
  setOwn(holder, key, value)
}

/**
 * The data model a surface starts with, plus everything its behavior document says will be there.
 *
 * A surface binds to data before any of it exists: a resource's status, a page param, the list a
 * query fills, a field a derived value adds to each item. Checked against the bare data model,
 * every one of those bindings would read as a mistake. So each promised place is filled with a
 * `null`, which the path check reads as "a value arrives here" rather than "nothing is here".
 *
 * What a resource's response looks like inside is not declared anywhere, so nothing below an
 * `into` can be checked. That is a limit of the document, stated in the README.
 */
export const augmentDataModel = (dataModel: JsonObject, behavior: Behavior): JsonObject => {
  const model = structuredClone(dataModel)
  const { params = {}, resources = {}, derived = [] } = behavior
  for (const [name, param] of Object.entries(params)) {
    promiseAt(model, ['page', 'params', name], param.default)
  }
  for (const [name, { into, onError, select }] of Object.entries(resources)) {
    promiseAt(model, ['resources', name], { status: 'idle', error: null })
    promiseAt(model, parsePointer(into))
    if (onError !== undefined) promiseAt(model, parsePointer(onError))
    if (select !== undefined) promiseAt(model, ['_response'])
  }
  for (const { forEach, into } of derived) {
    if (forEach === undefined) {
      promiseAt(model, parsePointer(into))
      continue
    }
    const list = parsePointer(forEach)
    const items = getAt(model, list)
    if (Array.isArray(items)) {
      const field = parsePointer(`/${into}`)
      items.forEach((_item, index) => promiseAt(model, [...list, String(index), ...field]))
    }
  }
  return model
}
