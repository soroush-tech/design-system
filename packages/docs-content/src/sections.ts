import type { DocsPackage } from './registry'
import json from './sections.json'
import { sectionRoutes } from './sectionRoutes'

/**
 * A part of the site that documents a package. Every section is versioned: the live docs, and
 * a frozen snapshot per release.
 */
export type DocsSection = DocsPackage | 'mcp' | 'ui-spec' | 'cli'

/**
 * What a docs section stands for. The id keys the section (its `DOCS_SECTION`, its route folder,
 * its entry in `versions.json`); where it lives on the site is its `route`, and the rest is looked
 * up here, never built from the id.
 */
export interface SectionDescription {
  /** The section's key: its route folder, `DOCS_SECTION` and its entry in `versions.json`. */
  id: DocsSection
  /**
   * Where the section is on the docs site (`/<route>/`), the path an app imports it from in the
   * `soroush.design` umbrella: `react`, and `react/markdown` for the library mounted under it.
   */
  route: string
  /** The package's folder under `packages/`. */
  dir: string
  /** The package's name on npm. */
  npm: string
}

// Typed so a section missing from the file, or a field missing from one, fails the typecheck.
const data: Record<DocsSection, Omit<SectionDescription, 'id' | 'route'>> = json

/**
 * Where each section's package lives and what it is called. Its data is `sections.json` and `sectionRoutes.ts`,
 * so the docs app and the MCP server look a package up in one place.
 */
export const sections = Object.fromEntries(
  Object.entries(data).map(([id, rest]) => [
    id,
    { id, route: sectionRoutes[id as DocsSection], ...rest },
  ])
) as Record<DocsSection, SectionDescription>

/** Every section id, in the order the site lists them. */
export const sectionIds = Object.keys(sections) as DocsSection[]
