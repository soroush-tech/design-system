import {
  allDocComponents,
  componentCategories,
  markdownComponents,
  styledSystemDocSlug,
  styledSystemDocs,
  styledSystemGuides,
  type ComponentNavItem,
  type DocsPackage,
} from '@soroush.tech/docs-content'
import { PACKAGES } from 'src/common/packages'
import { sectionPath } from 'src/common/sectionPath'

// The component taxonomy and the styled-system doc lists live in
// @soroush.tech/docs-content, shared with the MCP server so both describe the same
// library. Re-exported here because the app imports them through this module, and
// guarded against the files on disk by that package's own tests. What stays below is
// app-specific: turning the registry into the rail, the sidebar groups and the hrefs.
export * from '@soroush.tech/docs-content'

/**
 * A part of the site that documents a package: the three with versioned snapshots, and the two
 * that live on the live site only.
 */
export type DocsSection = DocsPackage | 'mcp' | 'ui-spec'

/** Whether a section has released snapshots to choose from. */
export const isVersioned = (pkg: DocsSection): pkg is DocsPackage =>
  pkg !== 'mcp' && pkg !== 'ui-spec'

export interface NavItem {
  label: string
  href: string
  /** A short note beside the label - a version. */
  note?: string
  /** The page is not part of the docs: it opens in a tab of its own. */
  isExternal?: boolean
}

export interface NavGroup {
  label: string
  /** A group of many pages folds under its label, open while it holds the current page. */
  isCollapsible?: boolean
  items: NavItem[]
}

/** The glyphs of the navigation rail - drawn in `NavRail`. */
export type RailIcon = 'home' | 'dots' | 'add_circle' | 'package' | 'palette' | 'article' | 'book'

/** One item of the navigation rail: a part of the docs, with the sidebar it opens. */
export interface RailItem {
  id: string
  label: string
  icon: RailIcon
  href: string
  /** Path prefixes whose pages belong to this item - for the pages no sidebar entry lists. */
  matches: string[]
  /** The sidebar of the item; none for the home page. */
  groups: NavGroup[]
}

export interface SectionNav {
  /** The package this section documents. */
  pkg: DocsSection
  /** Accessible label of the section's nav landmark. */
  label: string
  /** The rail: home first, then the parts of the section. */
  rail: RailItem[]
  /** Every sidebar group of the section, for what lists them all. */
  groups: NavGroup[]
}

const componentHref = (item: ComponentNavItem): string =>
  sectionPath(item.pkg, `/components/${item.slug}/`)

const HOME: RailItem = {
  id: 'home',
  label: 'Home',
  icon: 'home',
  href: '/',
  matches: [],
  groups: [],
}

/**
 * The packages, listed in the sidebar: each opens its docs. The same part is in the rail of every
 * section.
 */
const PACKAGES_ITEM: RailItem = {
  id: 'packages',
  label: 'Packages',
  icon: 'package',
  href: '/packages/',
  matches: [],
  groups: [
    {
      label: 'Packages',
      items: [
        { label: 'All packages', href: '/packages/' },
        ...PACKAGES.map((entry) => ({
          label: entry.name,
          href: sectionPath(entry.docs, '/'),
          note: `v${entry.version}`,
        })),
      ],
    },
  ],
}

/** The design-system section's rail: what each part of the docs opens in the sidebar. */
const designSystemRail: RailItem[] = [
  HOME,
  PACKAGES_ITEM,
  {
    id: 'get-started',
    label: 'Get started',
    icon: 'dots',
    href: sectionPath('design-system', '/'),
    matches: [
      sectionPath('design-system', '/getting-started/'),
      sectionPath('design-system', '/releases/'),
    ],
    groups: [
      {
        label: 'Get started',
        items: [
          { label: 'Overview', href: sectionPath('design-system', '/') },
          {
            label: 'Installation',
            href: sectionPath('design-system', '/getting-started/installation/'),
          },
          { label: 'Usage', href: sectionPath('design-system', '/getting-started/usage/') },
          { label: 'Releases', href: sectionPath('design-system', '/releases/') },
        ],
      },
    ],
  },
  {
    id: 'components',
    label: 'Components',
    icon: 'add_circle',
    href: sectionPath('design-system', '/components/'),
    // A component's specs live under /api/ - they are still the component's.
    matches: [sectionPath('design-system', '/components/'), sectionPath('design-system', '/api/')],
    groups: [
      {
        label: 'Components',
        items: [{ label: 'All components', href: sectionPath('design-system', '/components/') }],
      },
      ...componentCategories.map((category) => ({
        label: category.label,
        isCollapsible: true,
        items: category.items.map((item) => ({ label: item.name, href: componentHref(item) })),
      })),
    ],
  },
  {
    id: 'styles',
    label: 'Styles',
    icon: 'palette',
    href: sectionPath('design-system', '/customization/theming/'),
    matches: [sectionPath('design-system', '/customization/')],
    groups: [
      {
        label: 'Styles',
        items: [
          { label: 'Theming', href: sectionPath('design-system', '/customization/theming/') },
          {
            label: 'How to customize',
            href: sectionPath('design-system', '/customization/how-to/'),
          },
        ],
      },
    ],
  },
]

const markdownRail: RailItem[] = [
  HOME,
  PACKAGES_ITEM,
  {
    id: 'get-started',
    label: 'Get started',
    icon: 'dots',
    href: sectionPath('markdown', '/'),
    matches: [],
    groups: [
      {
        label: 'Get started',
        items: [
          { label: 'Overview', href: sectionPath('markdown', '/') },
          { label: 'Releases', href: sectionPath('markdown', '/releases/') },
        ],
      },
    ],
  },
  {
    id: 'components',
    label: 'Components',
    icon: 'add_circle',
    // There is no page of the list: the rail opens the first component, the sidebar lists the rest.
    href: componentHref(markdownComponents[0]),
    matches: [sectionPath('markdown', '/components/')],
    groups: [
      {
        label: 'Components',
        items: markdownComponents.map((item) => ({ label: item.name, href: componentHref(item) })),
      },
    ],
  },
]

const styledSystemDocHref = (file: string): string =>
  sectionPath('styled-system', `/docs/${styledSystemDocSlug(file)}/`)

const styledSystemRail: RailItem[] = [
  HOME,
  PACKAGES_ITEM,
  {
    id: 'get-started',
    label: 'Get started',
    icon: 'dots',
    href: sectionPath('styled-system', '/'),
    matches: [],
    groups: [
      {
        label: 'Get started',
        items: [
          { label: 'Overview', href: sectionPath('styled-system', '/') },
          { label: 'Releases', href: sectionPath('styled-system', '/releases/') },
        ],
      },
    ],
  },
  {
    id: 'docs',
    label: 'Docs',
    icon: 'article',
    href: styledSystemDocHref(styledSystemDocs[0].file),
    matches: [sectionPath('styled-system', '/docs/')],
    groups: [
      {
        label: 'Docs',
        items: styledSystemDocs.map(({ label, file }) => ({
          label,
          href: styledSystemDocHref(file),
        })),
      },
    ],
  },
  {
    id: 'guides',
    label: 'Guides',
    icon: 'book',
    href: styledSystemDocHref(styledSystemGuides[0].file),
    matches: [],
    groups: [
      {
        label: 'Guides',
        items: styledSystemGuides.map(({ label, file }) => ({
          label,
          href: styledSystemDocHref(file),
        })),
      },
    ],
  },
]

// A package with an overview and its releases, and nothing else yet.
const overviewRail = (pkg: 'mcp' | 'ui-spec'): RailItem[] => [
  HOME,
  PACKAGES_ITEM,
  {
    id: 'get-started',
    label: 'Get started',
    icon: 'dots',
    href: sectionPath(pkg, '/'),
    matches: [sectionPath(pkg, '/releases/')],
    groups: [
      {
        label: 'Get started',
        items: [
          { label: 'Overview', href: sectionPath(pkg, '/') },
          { label: 'Releases', href: sectionPath(pkg, '/releases/') },
        ],
      },
    ],
  },
]

const SECTIONS: SectionNav[] = (
  [
    { pkg: 'design-system', label: 'Design system documentation', rail: designSystemRail },
    { pkg: 'markdown', label: 'Markdown documentation', rail: markdownRail },
    { pkg: 'styled-system', label: 'Styled-system documentation', rail: styledSystemRail },
    { pkg: 'mcp', label: 'MCP server documentation', rail: overviewRail('mcp') },
    { pkg: 'ui-spec', label: 'UI spec documentation', rail: overviewRail('ui-spec') },
  ] satisfies Omit<SectionNav, 'groups'>[]
).map((section) => ({
  ...section,
  groups: section.rail.flatMap((item) => item.groups),
}))

/** The design-system section's sidebar groups, in reading order. */
export const designSystemNav: NavGroup[] = SECTIONS[0].groups

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

/**
 * The rail item a page belongs to: the one whose sidebar lists it, else the one whose
 * prefix covers it (the prefixes of a section do not overlap), else the section's first part
 * after home and the packages.
 */
export const railItemFor = (section: SectionNav, pathname: string): RailItem => {
  // The packages part is looked in last: it lists the other sections' overviews, which are theirs.
  const inOrder = [
    ...section.rail.filter((item) => item.id !== 'packages'),
    ...section.rail.filter((item) => item.id === 'packages'),
  ]
  const listed = inOrder.find((item) =>
    item.groups.some((group) => group.items.some((entry) => entry.href === pathname))
  )
  if (listed) return listed
  const covering = section.rail.find((item) =>
    item.matches.some((prefix) => pathname.startsWith(prefix))
  )
  return covering ?? section.rail[2]
}

/** Every page the section lists, for search: a label, the group it sits in, its href. */
export interface SearchEntry {
  label: string
  group: string
  href: string
}

/** The pages of a section that search finds - its sidebar entries, and each component's specs. */
export const searchEntriesFor = (section: SectionNav): SearchEntry[] => {
  const listed = section.groups.flatMap((group) =>
    group.items.map((item) => ({ label: item.label, group: group.label, href: item.href }))
  )
  if (section.pkg !== 'design-system') return listed
  const specs = allDocComponents
    .filter((item) => item.pkg === 'design-system')
    .map((item) => ({
      label: `${item.name} specs`,
      group: 'Specs',
      href: sectionPath('design-system', `/api/${item.slug}/`),
    }))
  return [...listed, ...specs]
}
