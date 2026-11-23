import type {
  CatalogContent,
  CatalogOption,
  CatalogTwoWay,
  CatalogVariant,
  ExampleNode,
  JsonValue,
} from './types'

/** A component's catalog entry as its file writes it - what the catalog adds (its name, subpath and category) left out. */
export interface CatalogEntrySource {
  summary: string
  isPlaceable: boolean
  example: ExampleNode
  variants: CatalogVariant[]
  options: Record<string, CatalogOption>
  content: Record<string, CatalogContent>
  twoWay?: CatalogTwoWay
  domEvents?: string[]
  preview?: { width?: number; height?: number }
}

/** Checks an entry against the shape of an entry and keeps its own, narrower type. */
export const defineCatalogEntry = <const E extends CatalogEntrySource>(entry: E): E => entry

/** A nested node, for brevity: `node('MenuItem', { value: 'web' }, ['Web'])`. */
export const node = (
  component: string,
  props: Record<string, JsonValue> = {},
  children: (ExampleNode | string)[] = []
): ExampleNode => ({ component, props, children })
