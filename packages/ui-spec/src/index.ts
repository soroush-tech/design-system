// The generative-UI spec: catalogs, the behavior document, and validators that answer with data.
export {
  validateBehavior,
  behaviorSchema,
  BEHAVIOR_EXTENSION,
  type BehaviorOptions,
} from './behavior/validateBehavior'
export type { Behavior } from './behavior/dataModel'
export { validateCatalog } from './catalog/validateCatalog'
export type { Catalog } from './catalog/catalogRules'
export { composeCatalog, type CatalogParts } from './core/composeCatalog'
export { CORE_COMPONENTS, CORE_FUNCTIONS } from './core/core'
export type { Finding, FindingCode } from './findings'
export { validateSurface, type SurfaceOptions } from './surface/validateSurface'
export { applyTheme, THEME_EXTENSION, type Theme } from './theme/theme'
export type { JsonObject } from './types'
