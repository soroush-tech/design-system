import { type Catalog, getProperties } from '../catalog/catalogRules'
import type { Finding } from '../findings'
import type { SchemaSet } from '../schema/schemaSet'
import { getAt } from '../surface/pointer'
import { getOwn, isObject, type JsonObject, setOwn } from '../types'

/**
 * The key a catalog component says where its token props come from, in the slot A2UI gives a
 * component definition for static metadata (`metadata.extensions`).
 */
export const THEME_EXTENSION = 'tech_soroush_theme'

/**
 * What an app's theme allows: the keys of each token scale, and the variants of each component
 * that takes them from the theme. Values are given in the form the prop takes, so a space scale
 * keeps its numbers.
 */
export interface Theme {
  scales: Record<string, unknown[]>
  variants: Record<string, unknown[]>
}

/** Where one prop's values come from: a token scale, or a component's variants. */
interface Source {
  scale?: string
  variants?: string
}

const EXTENSION_SCHEMA = {
  type: 'object',
  properties: {
    props: {
      type: 'object',
      additionalProperties: {
        type: 'object',
        properties: { scale: { type: 'string' }, variants: { type: 'string' } },
        minProperties: 1,
        maxProperties: 1,
        additionalProperties: false,
      },
    },
  },
  required: ['props'],
  additionalProperties: false,
}

const getExtension = (definition: JsonObject): unknown =>
  getAt(definition, ['metadata', 'extensions', THEME_EXTENSION])

const getSources = (definition: JsonObject): Record<string, Source> => {
  const props = getAt(getExtension(definition), ['props'])
  return isObject(props) ? (props as Record<string, Source>) : {}
}

/**
 * The enumeration a prop keeps its token values in: the first one in its schema. A generated
 * prop writes its tokens as an `enum` of their own, and any other literal it takes, such as
 * `inherit` or a pixel pattern, as a separate branch beside it.
 */
const findEnum = (node: unknown): unknown[] | undefined => {
  if (Array.isArray(node)) return node.map(findEnum).find((found) => found !== undefined)
  if (!isObject(node)) return undefined
  return Array.isArray(node.enum) ? node.enum : findEnum(Object.values(node))
}

/** The same schema with every copy of the `from` enumeration holding `to` instead. */
const replaceEnum = (node: unknown, from: string, to: unknown[]): unknown => {
  if (Array.isArray(node)) return node.map((item) => replaceEnum(item, from, to))
  if (!isObject(node)) return node
  if (JSON.stringify(node.enum) === from) return { ...node, enum: to }
  return Object.fromEntries(
    Object.entries(node).map(([key, value]) => [key, replaceEnum(value, from, to)])
  )
}

/**
 * What is wrong with the theme sources a catalog declares: the extension's own shape, and a
 * source naming a prop that has no enumeration to open.
 */
export const checkTheme = (catalog: Catalog, schemas: SchemaSet): Finding[] => {
  const findings: Finding[] = []
  for (const [name, definition] of Object.entries(catalog.components ?? {})) {
    const extension = getExtension(definition)
    if (extension === undefined) continue
    const at = `/components/${name}/metadata/extensions/${THEME_EXTENSION}`
    const issues = schemas.check(EXTENSION_SCHEMA, extension)
    for (const issue of issues) {
      findings.push({ code: 'catalog-theme', path: `${at}${issue.path}`, message: issue.message })
    }
    if (issues.length > 0) continue
    for (const prop of Object.keys(getSources(definition))) {
      if (findEnum(getOwn(getProperties(definition), prop)) === undefined) {
        findings.push({
          code: 'catalog-theme',
          path: `${at}/props/${prop}`,
          message: `"${name}" has no prop "${prop}" with an enumeration for the theme to fill.`,
        })
      }
    }
  }
  return findings
}

const applyThemeTo = (definition: JsonObject, theme: Theme): JsonObject => {
  const sources = Object.entries(getSources(definition))
  if (sources.length === 0) return definition
  const properties = { ...getProperties(definition) }
  for (const [prop, { scale, variants }] of sources) {
    const values =
      scale === undefined ? getOwn(theme.variants, variants as string) : getOwn(theme.scales, scale)
    const schema = getOwn(properties, prop)
    const tokens = findEnum(schema)
    if (Array.isArray(values) && tokens !== undefined) {
      setOwn(properties, prop, replaceEnum(schema, JSON.stringify(tokens), values))
    }
  }
  return { ...definition, properties }
}

/**
 * The catalog as one app's theme allows it: every prop that declares a theme source takes that
 * source's keys in place of the ones it was generated with.
 *
 * An app widens the design system's token scales, and Button's variants, through its theme. A
 * catalog frozen at the base values would refuse valid UI for that app, so a catalog is
 * specialized per theme with this.
 *
 * A source the theme says nothing about keeps its values, and the catalog given is not changed.
 */
export const applyTheme = (catalog: Catalog, theme: Theme): Catalog => ({
  ...catalog,
  components: Object.fromEntries(
    Object.entries(catalog.components ?? {}).map(([name, definition]) => [
      name,
      applyThemeTo(definition, theme),
    ])
  ),
})
