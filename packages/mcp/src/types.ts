// The shape of the generated content bundle. Declared locally rather than imported
// from @soroush.tech/docs-content so the published package's .d.ts stays self-contained
// (docs-content is a private workspace package and never reaches npm).

export interface ComponentRecord {
  /** PascalCase component name, as exported. */
  name: string
  /** URL segment on docs.soroush.tech. */
  slug: string
  /** Workspace package the component ships from. */
  pkg: string
  /** The npm package a consumer installs. */
  packageName: string
  /** Category in the component taxonomy; markdown components are uncategorized. */
  category?: string
  /** The exact import statement for this component. */
  importPath: string
  /** First prose sentence of the README - a one-line summary. */
  summary: string
  /** README prose before the props reference: what it is and how it composes. */
  intro: string
  /** The props reference: props, token values, defaults. */
  api: string
  /** The README's `## Examples` section. Empty when absent. */
  examples: string
  /** Canonical documentation URL. */
  url: string
}

export interface DocRecord {
  /** Stable identifier used by the `get_doc` tool. */
  id: string
  title: string
  /** One-line description for the doc index. */
  summary: string
  /** Full markdown (or source code, for the copy-verbatim references). */
  body: string
  /** Canonical documentation URL, when the doc has a page on the site. */
  url?: string
}

/** One theme scale, flattened to leaf paths so it reads as a token contract. */
export interface TokenScale {
  name: string
  /** Dotted path within the scale to its value, e.g. `primary.main`. */
  tokens: Array<{ path: string; value: string | number }>
}

export interface ContentBundle {
  /** The design-system version the bundle was generated from. */
  version: string
  components: ComponentRecord[]
  docs: DocRecord[]
  tokens: TokenScale[]
}
