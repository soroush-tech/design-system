import type { JsonObject } from '../types'
import { CORE_COMPONENTS, CORE_FUNCTIONS } from './core'

/** What an app brings to its catalog. The core is added to it. */
export interface CatalogParts {
  /** The catalog's identity, a URI. It becomes the `$id` too, as the specification requires. */
  catalogId: string
  title: string
  description?: string
  /** Guidance for the agent that generates against this catalog, in Markdown. */
  instructions?: string
  /** One A2UI component definition per component name. */
  components: Record<string, JsonObject>
  /** Functions of the app's own, beside the core ones. */
  functions?: Record<string, JsonObject>
}

const listRefs = (section: string, names: string[]): JsonObject => ({
  oneOf: names.map((name) => ({ $ref: `#/${section}/${name}` })),
})

/** The names both sides define: the core is not open to redefinition. */
const findClashes = (own: Record<string, JsonObject>, core: Record<string, JsonObject>): string[] =>
  Object.keys(own).filter((name) => Object.hasOwn(core, name))

/**
 * A complete A2UI v1.0 catalog: the app's components and functions plus the core every catalog
 * here shares, so a surface names one catalog and needs a `catalogId` on an entry only when it
 * borrows from another.
 *
 * Throws when the app defines a name the core owns. A catalog composed here always carries the
 * standard `When`, and replacing it quietly would change what every surface means.
 */
export const composeCatalog = (parts: CatalogParts): JsonObject => {
  const { catalogId, components, functions = {}, ...meta } = parts
  const taken = [
    ...findClashes(components, CORE_COMPONENTS),
    ...findClashes(functions, CORE_FUNCTIONS),
  ]
  if (taken.length > 0) {
    throw new Error(`The core defines ${taken.join(', ')}; a catalog cannot redefine it.`)
  }
  const allComponents = { ...components, ...CORE_COMPONENTS }
  const allFunctions = { ...CORE_FUNCTIONS, ...functions }
  return {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    $id: catalogId,
    catalogId,
    protocolVersion: '1.0',
    ...meta,
    components: allComponents,
    functions: allFunctions,
    $defs: {
      anyComponent: listRefs('components', Object.keys(allComponents)),
      anyFunction: listRefs('functions', Object.keys(allFunctions)),
    },
  }
}
