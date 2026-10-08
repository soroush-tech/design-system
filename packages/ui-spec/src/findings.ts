/**
 * Every way a catalog, a surface or a behavior document can be wrong. The set is closed on
 * purpose: a repair loop keys on the code, so a new kind of mistake is a new member here rather
 * than a new wording of an old one.
 */
export type FindingCode =
  // A catalog.
  | 'catalog-schema'
  | 'catalog-id'
  | 'catalog-version'
  | 'catalog-name'
  | 'catalog-reserved-prop'
  | 'catalog-discriminator'
  | 'catalog-ref'
  | 'catalog-open-object'
  | 'catalog-theme'
  // A surface.
  | 'envelope'
  | 'unknown-catalog'
  | 'unknown-component'
  | 'component-schema'
  | 'duplicate-id'
  | 'missing-root'
  | 'unknown-child'
  | 'orphan'
  | 'cycle'
  | 'unallowed-parent'
  | 'unallowed-child'
  | 'unknown-function'
  | 'function-args'
  | 'return-type'
  | 'unresolved-path'
  | 'index-outside-template'
  // A behavior document.
  | 'behavior-schema'
  | 'behavior-surface'
  | 'reserved-path'
  | 'unknown-resource'
  | 'unknown-event'
  | 'requires-functions'

/** One thing wrong, as data. Validators return these and never throw. */
export interface Finding {
  code: FindingCode
  message: string
  /** A JSON Pointer into the document that was validated. */
  path: string
  /** The component the finding is about, when it is about one. */
  componentId?: string
}
