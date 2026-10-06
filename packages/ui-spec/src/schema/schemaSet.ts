import Ajv2020, { type ErrorObject, type ValidateFunction } from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'
import agentToRenderer from '../../vendor/a2ui/v1_0/json/agent_to_renderer.json'
import catalogDefinition from '../../vendor/a2ui/v1_0/json/catalog_definition.json'
import commonTypes from '../../vendor/a2ui/v1_0/json/common_types.json'
import rendererToAgent from '../../vendor/a2ui/v1_0/json/renderer_to_agent.json'
import type { JsonObject } from '../types'

/** Where every A2UI v1.0 schema lives; a catalog must sit here for its relative `$ref`s to resolve. */
export const A2UI_BASE = 'https://a2ui.org/specification/v1_0/'

/** One thing wrong with a value: where, as a JSON Pointer into the value, and what. */
export interface SchemaIssue {
  path: string
  message: string
}

/** The A2UI schemas plus the catalogs registered beside them, ready to check values against. */
export interface SchemaSet {
  /** Registers a schema under its own `$id`. */
  add: (schema: JsonObject) => void
  /**
   * What `data` gets wrong against a schema, most specific issue per property. The schema is
   * named by its absolute URI (a pointer fragment is allowed) or given inline.
   */
  check: (schema: string | JsonObject, data: unknown) => SchemaIssue[]
}

/**
 * The same catalog under an A2UI address. The envelope and common types reach the active catalog
 * as `catalog.json`, and a catalog reaches the common types as `common_types.json`, both relative,
 * so a catalog is validated under an alias in the A2UI folder rather than under its own `$id`.
 * This is what the specification's own test runner does.
 */
export const aliasCatalog = (catalog: JsonObject, name = 'catalog.json'): JsonObject => ({
  ...catalog,
  $id: `${A2UI_BASE}${name}`,
})

/** The property an issue is about: `required` and the closed-object keywords name it in `params`. */
const locateIssue = ({ instancePath, params }: ErrorObject): string => {
  const property: unknown =
    params.missingProperty ?? params.unevaluatedProperty ?? params.additionalProperty
  return property === undefined ? instancePath : `${instancePath}/${String(property)}`
}

const describeIssue = ({ message, params }: ErrorObject): string =>
  Array.isArray(params.allowedValues)
    ? `${message}: ${params.allowedValues.join(', ')}`
    : `${message}`

/**
 * One issue per top-level property, the deepest one found. A value that fails a union reports
 * every branch it failed plus the union itself, all at the same path; the first of those is the
 * literal branch, which is the one a reader can act on.
 */
const summarize = (errors: ErrorObject[]): SchemaIssue[] => {
  const deepest = new Map<string, SchemaIssue>()
  for (const error of errors) {
    const path = locateIssue(error)
    const property = path.split('/')[1] ?? ''
    const held = deepest.get(property)
    if (held === undefined || path.length > held.path.length) {
      deepest.set(property, { path, message: describeIssue(error) })
    }
  }
  return [...deepest.values()]
}

/**
 * The A2UI v1.0 schemas with `catalog` standing as the active catalog.
 *
 * The engine is ajv, chosen by measurement: it agrees with all 156 of the specification's own
 * test cases (`schemaSet.test.ts` runs them). Nothing outside this file names it.
 */
export const createSchemaSet = (catalog: JsonObject): SchemaSet => {
  const ajv = new Ajv2020({ strict: false, allErrors: true })
  addFormats(ajv)
  for (const schema of [commonTypes, agentToRenderer, rendererToAgent, catalogDefinition]) {
    ajv.addSchema(schema)
  }
  ajv.addSchema(catalog)
  const compiled = new Map<string, ValidateFunction>()
  const getValidator = (schema: string | JsonObject): ValidateFunction => {
    const key = typeof schema === 'string' ? schema : JSON.stringify(schema)
    let validate = compiled.get(key)
    if (validate === undefined) {
      validate = ajv.compile(typeof schema === 'string' ? { $ref: schema } : schema)
      compiled.set(key, validate)
    }
    return validate
  }
  return {
    add: (schema) => {
      ajv.addSchema(schema)
    },
    check: (schema, data) => {
      const validate = getValidator(schema)
      return validate(data) ? [] : summarize(validate.errors as ErrorObject[])
    },
  }
}
