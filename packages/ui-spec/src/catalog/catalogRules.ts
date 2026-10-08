import type { Finding } from '../findings'
import { isObject, type JsonObject } from '../types'

/** A catalog that has passed the A2UI meta-schema, which is what makes these shapes safe to read. */
export interface Catalog extends JsonObject {
  catalogId: string
  components?: Record<string, JsonObject>
  functions?: Record<string, JsonObject>
  $defs?: JsonObject
}

/** Unicode UAX #31, as the specification spells it for every name a catalog introduces. */
const IDENTIFIER = /^[\p{XID_Start}_]\p{XID_Continue}*$/u

/** The protocol's own property names. Their `@` is outside the identifier grammar on purpose. */
const DIRECTIVES = new Set(['@path', '@call'])

/** What the envelope adds to every component, so a component cannot declare them itself. */
const RESERVED_PROPS = ['id', 'catalogId', 'accessibility', 'metadata']

/** The only `common_types.json` schemas a catalog may point at (protocol rule 3). */
const ALLOWED_TARGETS = new Set([
  'ComponentId',
  'Child',
  'ChildList',
  'DynamicString',
  'DynamicNumber',
  'DynamicBoolean',
  'DynamicStringList',
  'DynamicValue',
  'AccessibilityAttributes',
  'CheckRule',
  'Checkable',
  'Action',
  'DataBinding',
  'FunctionCall',
])

/** Keys holding annotations or literal data, where a `$ref` is not a reference. */
const NON_SCHEMA_KEYS = new Set(['metadata', 'examples', 'const', 'default', 'enum', 'description'])

/** Keywords that say anything at all about what an object may hold. */
const OBJECT_CONSTRAINTS = [
  'properties',
  'additionalProperties',
  'patternProperties',
  'unevaluatedProperties',
  'propertyNames',
  'required',
  '$ref',
  'allOf',
  'anyOf',
  'oneOf',
]

const COMMON_TYPES = 'common_types.json#/$defs/'

type Visit = (schema: JsonObject, pointer: string) => void

/**
 * Visits every subschema of a definition, walking it the way the specification's own checker
 * does: declared properties are subschemas whatever they are named, and annotation keys are not
 * descended into.
 */
const walkSchema = (node: unknown, pointer: string, visit: Visit): void => {
  if (Array.isArray(node)) {
    node.forEach((item, index) => walkSchema(item, `${pointer}/${index}`, visit))
    return
  }
  if (!isObject(node)) return
  visit(node, pointer)
  for (const [key, value] of Object.entries(node)) {
    if (key === 'properties' && isObject(value)) {
      for (const [name, property] of Object.entries(value)) {
        walkSchema(property, `${pointer}/properties/${name}`, visit)
      }
    } else if (!NON_SCHEMA_KEYS.has(key)) {
      walkSchema(value, `${pointer}/${key}`, visit)
    }
  }
}

/** The props a schema declares directly, or none. */
export const getProperties = (schema: JsonObject): JsonObject =>
  isObject(schema.properties) ? schema.properties : {}

/**
 * Every prop a definition declares. A definition may spread them over `allOf` branches, as the
 * basic catalog's `Button` does to mix in `Checkable`, so the top-level `properties` alone is not
 * the whole list.
 *
 * The props are merged entry by entry. `Object.assign` would assign a prop named `__proto__`,
 * which replaces the merged object's prototype instead of declaring a prop.
 */
export const getDeclaredProperties = (definition: JsonObject): JsonObject => {
  const branches = Array.isArray(definition.allOf) ? definition.allOf.filter(isObject) : []
  const declared = [...branches.map(getDeclaredProperties), getProperties(definition)]
  return Object.fromEntries(declared.flatMap((properties) => Object.entries(properties)))
}

const getConst = (definition: JsonObject, property: string): unknown => {
  const declared = getDeclaredProperties(definition)[property]
  return isObject(declared) ? declared.const : undefined
}

/**
 * An object schema with nothing said about its contents. On a prop that also takes a binding it
 * lets a malformed `{"@path": 1}` through as a literal, so a component says what the object holds
 * or points at `DynamicValue`.
 */
const isOpenObject = (schema: JsonObject): boolean => {
  const types = Array.isArray(schema.type) ? schema.type : [schema.type]
  return types.includes('object') && !OBJECT_CONSTRAINTS.some((keyword) => keyword in schema)
}

const isAllowedRef = (ref: string, { components = {}, functions = {} }: Catalog): boolean => {
  if (ref.startsWith('#/components/')) {
    return Object.hasOwn(components, ref.slice('#/components/'.length))
  }
  if (ref.startsWith('#/functions/')) {
    return Object.hasOwn(functions, ref.slice('#/functions/'.length))
  }
  return ref.startsWith(COMMON_TYPES) && ALLOWED_TARGETS.has(ref.slice(COMMON_TYPES.length))
}

/**
 * The catalog rules the A2UI meta-schema cannot express, each as a finding.
 *
 * Names and `$ref` targets follow the specification's prose rules, mirrored from its own test
 * runner. The open-object rule is this package's.
 */
export const checkCatalogRules = (catalog: Catalog): Finding[] => {
  const findings: Finding[] = []
  const checkRef = (schema: JsonObject, path: string) => {
    if (typeof schema.$ref === 'string' && !isAllowedRef(schema.$ref, catalog)) {
      findings.push({
        code: 'catalog-ref',
        path,
        message: `"${schema.$ref}" is not a component or function of this catalog, nor one of the common types a catalog may reference.`,
      })
    }
  }
  const checkDefinitions = (section: 'components' | 'functions', discriminator: string) => {
    for (const [name, definition] of Object.entries(catalog[section] ?? {})) {
      const at = `/${section}/${name}`
      if (!IDENTIFIER.test(name)) {
        findings.push({
          code: 'catalog-name',
          path: at,
          message: `"${name}" is not a valid identifier.`,
        })
      }
      if (getConst(definition, discriminator) !== name) {
        findings.push({
          code: 'catalog-discriminator',
          path: `${at}/properties/${discriminator}`,
          message: `"${name}" must declare \`${discriminator}\` as the constant "${name}".`,
        })
      }
      walkSchema(definition, at, (schema, path) => {
        for (const property of Object.keys(getProperties(schema))) {
          if (!DIRECTIVES.has(property) && !IDENTIFIER.test(property)) {
            findings.push({
              code: 'catalog-name',
              path: `${path}/properties/${property}`,
              message: `"${property}" is not a valid identifier.`,
            })
          }
        }
        checkRef(schema, path)
        if (section === 'components' && isOpenObject(schema)) {
          findings.push({
            code: 'catalog-open-object',
            path,
            message:
              'An object with nothing said about its contents accepts a malformed binding as a literal. Describe its properties or reference DynamicValue.',
          })
        }
      })
    }
  }
  checkDefinitions('components', 'component')
  checkDefinitions('functions', '@call')
  for (const [name, definition] of Object.entries(catalog.components ?? {})) {
    for (const reserved of RESERVED_PROPS) {
      if (reserved in getDeclaredProperties(definition)) {
        findings.push({
          code: 'catalog-reserved-prop',
          path: `/components/${name}/properties/${reserved}`,
          message: `\`${reserved}\` belongs to the envelope; a component cannot declare it as a prop.`,
        })
      }
    }
  }
  walkSchema(catalog.$defs, '/$defs', checkRef)
  return findings
}
