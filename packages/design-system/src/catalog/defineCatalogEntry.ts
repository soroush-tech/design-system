import type { CatalogContent, CatalogOption, CatalogTwoWay, ExampleNode, JsonValue } from './types'

/** A component's props as JSON: each prop at the types of its own that JSON can hold. */
type JsonProps<P> = { [K in keyof P]?: Extract<P[K], JsonValue> }

/** A node of a component whose props are `P`: its props are checked against them. */
export interface ExampleNodeOf<P> {
  component: string
  props: JsonProps<P>
  children: (ExampleNode | string)[]
}

/**
 * A component's catalog entry as its folder writes it - what the catalog adds (its name,
 * module and category) left out. Props are checked against the component's own: an option,
 * a content prop or an example prop it doesn't have fails to compile.
 */
export interface CatalogEntrySource<P> {
  summary: string
  isPlaceable: boolean
  example: ExampleNodeOf<P>
  variants: { name: string; label: string; example: ExampleNodeOf<P> }[]
  options: { [K in keyof P]?: CatalogOption }
  content: { [K in keyof P]?: CatalogContent }
  twoWay?: CatalogTwoWay & { prop: keyof P & string; event: keyof P & string }
  domEvents?: (keyof P & string)[]
  preview?: { width?: number; height?: number }
}

/**
 * Types a component's catalog entry against its props: `defineCatalogEntry<ButtonProps>()({
 * ... })`. Curried, so the props are named and the entry is still inferred.
 */
export const defineCatalogEntry =
  <P>() =>
  <E extends CatalogEntrySource<P>>(entry: E): E =>
    entry

/** A nested node, for brevity: `node('MenuItem', { value: 'web' }, ['Web'])`. */
export const node = (
  component: string,
  props: Record<string, JsonValue> = {},
  children: (ExampleNode | string)[] = []
): ExampleNode => ({ component, props, children })
