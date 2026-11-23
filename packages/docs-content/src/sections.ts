import type { DocsPackage } from './registry'
import json from './sections.json'

/**
 * A part of the site that documents a package. Every section is versioned: the live docs, and
 * a frozen snapshot per release.
 */
export type DocsSection = DocsPackage | 'mcp' | 'ui-spec' | 'cli'

/**
 * What a docs section stands for. The id is the section's URL segment - the one thing that
 * never changes; the rest is looked up here, never built from the id.
 */
export interface SectionDescription {
  /** The section's URL segment on the docs site (`/<id>/`), its route folder and `DOCS_SECTION`. */
  id: DocsSection
  /** The package's folder under `packages/`. */
  dir: string
  /** The package's name on npm. */
  npm: string
}

// Typed so a section missing from the file, or a field missing from one, fails the typecheck.
const data: Record<DocsSection, Omit<SectionDescription, 'id'>> = json

/**
 * Where each section's package lives and what it is called. Its data is `sections.json`,
 * so the docs app and the MCP server look a package up in one place.
 */
export const sections = Object.fromEntries(
  Object.entries(data).map(([id, rest]) => [id, { id, ...rest }])
) as Record<DocsSection, SectionDescription>

/** Every section id, in the order the site lists them. */
export const sectionIds = Object.keys(sections) as DocsSection[]
