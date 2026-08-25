import {
  allComponents,
  componentCategories,
  markdownComponents,
  styledSystemDocSlug,
  styledSystemDocs,
  styledSystemGuides,
  type ComponentNavItem,
  type DocsPackage,
} from '@soroush.tech/docs-content'
import { sectionPath } from 'src/common/sectionPath'

// The component taxonomy and the styled-system doc lists live in
// @soroush.tech/docs-content, shared with the MCP server so both describe the same
// library. Re-exported here because the app imports them through this module, and
// guarded against the files on disk by that package's own tests. What stays below is
// app-specific: turning the registry into sidebar groups and hrefs.
export * from '@soroush.tech/docs-content'

export interface NavItem {
  label: string
  href: string
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

export interface SectionNav {
  /** The package this section documents. */
  pkg: DocsPackage
  /** Accessible label of the section's nav landmark. */
  label: string
  groups: NavGroup[]
}

const componentHref = (item: ComponentNavItem): string =>
  sectionPath(item.pkg, `/components/${item.slug}/`)

/** The design-system section's sidebar: groups in reading order. */
export const designSystemNav: NavGroup[] = [
  {
    label: 'Getting started',
    items: [
      { label: 'Overview', href: sectionPath('design-system', '/') },
      {
        label: 'Installation',
        href: sectionPath('design-system', '/getting-started/installation/'),
      },
      { label: 'Usage', href: sectionPath('design-system', '/getting-started/usage/') },
    ],
  },
  ...componentCategories.map((category) => ({
    label: category.label,
    items: category.items.map((item) => ({ label: item.name, href: componentHref(item) })),
  })),
  {
    label: 'Component API',
    items: allComponents.map((item) => ({
      label: `${item.name} API`,
      href: sectionPath('design-system', `/api/${item.slug}/`),
    })),
  },
  {
    label: 'Customization',
    items: [
      { label: 'Theming', href: sectionPath('design-system', '/customization/theming/') },
      { label: 'How to customize', href: sectionPath('design-system', '/customization/how-to/') },
    ],
  },
]

export const markdownNav: NavGroup[] = [
  {
    label: 'Getting started',
    items: [{ label: 'Overview', href: sectionPath('markdown', '/') }],
  },
  {
    label: 'Components',
    items: markdownComponents.map((item) => ({ label: item.name, href: componentHref(item) })),
  },
]

export const styledSystemNav: NavGroup[] = [
  {
    label: 'Getting started',
    items: [{ label: 'Overview', href: sectionPath('styled-system', '/') }],
  },
  {
    label: 'Docs',
    items: styledSystemDocs.map(({ label, file }) => ({
      label,
      href: sectionPath('styled-system', `/docs/${styledSystemDocSlug(file)}/`),
    })),
  },
  {
    label: 'Guides',
    items: styledSystemGuides.map(({ label, file }) => ({
      label,
      href: sectionPath('styled-system', `/docs/${styledSystemDocSlug(file)}/`),
    })),
  },
]

const SECTIONS: SectionNav[] = [
  { pkg: 'design-system', label: 'Design system documentation', groups: designSystemNav },
  { pkg: 'markdown', label: 'Markdown documentation', groups: markdownNav },
  { pkg: 'styled-system', label: 'Styled-system documentation', groups: styledSystemNav },
]

/**
 * The section a pathname belongs to. Versioned snapshots serve a single section from
 * the domain root, so an unmatched path falls back to the build's own section (set at
 * build time via DOCS_SECTION) - and to design-system on the live site.
 */
export const sectionFor = (pathname: string): SectionNav => {
  const match = SECTIONS.find(
    (section) => pathname === `/${section.pkg}` || pathname.startsWith(`/${section.pkg}/`)
  )
  if (match) return match
  const buildSection = import.meta.env.PUBLIC_ENV__DOCS_SECTION
  return SECTIONS.find((section) => section.pkg === buildSection) ?? SECTIONS[0]
}
