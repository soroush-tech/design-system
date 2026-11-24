import type {
  CatalogEntry as CoreCatalogEntry,
  CatalogOption as CoreCatalogOption,
  DesignSystemCatalog as CoreDesignSystemCatalog,
} from '@soroush.design/core/catalog'
import type { Theme } from '@soroush.design/react-theme/theme'

export type {
  CatalogContent,
  CatalogTwoWay,
  CatalogVariant,
  ExampleNode,
  JsonValue,
} from '@soroush.design/core/catalog'

/** A theme scale a prop's values come from - `theme.palette`'s keys for `color`. */
export type ThemeScale = keyof Theme

/** A prop a picker offers, and where its values come from. */
export type CatalogOption = Omit<CoreCatalogOption, 'scale'> & {
  /** The theme scale whose keys are the values, so an app's own theme widens them. */
  scale?: ThemeScale
}

/** One component, as a tool needs it: the platform-neutral entry, and where this library serves it from. */
export type CatalogEntry = Omit<CoreCatalogEntry, 'subpath' | 'options'> & {
  /** Where it is imported from: `'@soroush.design/react-components/Select'`. */
  module: string
  options: Record<string, CatalogOption>
}

/** Every component of the design system, as a tool needs it. */
export interface DesignSystemCatalog extends Omit<CoreDesignSystemCatalog, 'components'> {
  components: Record<string, CatalogEntry>
}
