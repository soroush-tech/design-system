import type { Theme } from '../theme/themes'

/** A value that survives `JSON.stringify` - all a catalog holds. */
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue }

/**
 * An element as data: a component by name, its props, and its children - more nodes, or
 * text. The same shape a tool writes into source: `{ component: 'MenuItem', props: { value:
 * 'web' }, children: ['Web'] }` is `<MenuItem value="web">Web</MenuItem>`.
 */
export interface ExampleNode {
  component: string
  props: Record<string, JsonValue>
  children: (ExampleNode | string)[]
}

/** A theme scale a prop's values come from - `theme.palette`'s keys for `color`. */
export type ThemeScale = keyof Theme

/** A prop a picker offers, and where its values come from. */
export interface CatalogOption {
  /** The theme scale whose keys are the values, so an app's own theme widens them. */
  scale?: ThemeScale
  /** A closed set of values, such as a variant's. */
  values?: readonly (string | number | boolean)[]
  /** The value the component takes when the prop is unset. */
  default?: JsonValue
}

/**
 * How a node-taking prop is written: as JSX children, as one child element, as text, or not
 * at all (a prop a tool shouldn't write).
 */
export type CatalogContent = 'children' | 'child' | 'text' | 'none'

/** A prop that both shows a value and reports changes to it - and how to read the change. */
export interface CatalogTwoWay {
  prop: string
  event: string
  read: 'target.value' | 'target.checked' | 'argument'
}

/** A named look, shown as a picture. */
export interface CatalogVariant {
  name: string
  label: string
  example: ExampleNode
}

/** One component, as a tool needs it. */
export interface CatalogEntry {
  name: string
  /** Where it is imported from: `'@soroush.tech/design-system/Select'`. */
  module: string
  /** Its category in the docs' taxonomy. */
  category: string
  summary: string
  /** Offered in a palette to place by hand. Components a palette shouldn't offer - `Portal`, `TableCell` - still have entries, for editing pages that use them. */
  isPlaceable: boolean
  /** What a freshly placed one is. */
  example: ExampleNode
  variants: CatalogVariant[]
  options: Record<string, CatalogOption>
  content: Record<string, CatalogContent>
  twoWay?: CatalogTwoWay
  /** React event handlers worth offering. */
  domEvents?: string[]
  /** The room its picture needs to look right, in pixels. */
  preview?: { width?: number; height?: number }
}

/** Every component of the design system, as a tool needs it. */
export interface DesignSystemCatalog {
  /** The docs' categories, in their order, each with its components. */
  categories: { label: string; components: string[] }[]
  /** A styled-system prop's theme scale: `p` → `space`, `borderRadius` → `radii`. */
  styleScales: Record<string, string>
  components: Record<string, CatalogEntry>
}
