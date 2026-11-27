import {
  allComponents,
  allDocComponents,
  componentCategories,
  componentPagePath,
  componentSpecsPath,
  entryGuides,
  markdownComponents,
  reactHooks,
  sections,
  type ComponentNavItem,
  type DocsSection,
} from '@soroush.design/docs-content'
import { PACKAGES } from 'src/common/packages'
import { sectionPath } from 'src/common/sectionPath'

// The component taxonomy lives in
// @soroush.design/docs-content, shared with the MCP server so both describe the same
// library. Re-exported here because the app imports them through this module, and
// guarded against the files on disk by that package's own tests. What stays below is
// app-specific: turning the registry into the rail, the sidebar groups and the hrefs.
export * from '@soroush.design/docs-content'

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
  sectionPath(item.pkg, componentPagePath(item))

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

/** The React section's rail: what each part of the docs opens in the sidebar. */
const reactRail: RailItem[] = [
  HOME,
  PACKAGES_ITEM,
  {
    id: 'get-started',
    label: 'Get started',
    icon: 'dots',
    href: sectionPath('react', '/'),
    matches: [sectionPath('react', '/releases/')],
    groups: [
      {
        label: 'Get started',
        items: [
          { label: 'Overview', href: sectionPath('react', '/') },
          { label: 'Installation', href: sectionPath('react', '/installation/') },
          { label: 'Usage', href: sectionPath('react', '/usage/') },
          { label: 'Releases', href: sectionPath('react', '/releases/') },
        ],
      },
    ],
  },
  {
    id: 'components',
    label: 'Components',
    icon: 'add_circle',
    href: sectionPath('react', '/components/'),
    // A component's specs, accessibility notes and members are under its own page - still its.
    matches: allComponents.map((item) => sectionPath('react', componentPagePath(item))),
    groups: [
      {
        label: 'Components',
        items: [{ label: 'All components', href: sectionPath('react', '/components/') }],
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
    href: sectionPath('react', '/theme/'),
    matches: [],
    groups: [
      {
        label: 'Styles',
        items: [
          { label: 'Theme', href: sectionPath('react', '/theme/') },
          { label: 'How to customize', href: sectionPath('react', '/customization/') },
        ],
      },
    ],
  },
  {
    id: 'entry-points',
    label: 'Entry points',
    icon: 'article',
    href: sectionPath('react', '/style/'),
    matches: [],
    groups: [
      {
        label: 'Entry points',
        items: Object.keys(entryGuides)
          .filter((entry) => entry !== 'theme')
          .map((entry) => ({
            label: entry[0].toUpperCase() + entry.slice(1),
            href: sectionPath('react', `/${entry}/`),
          })),
      },
    ],
  },
  {
    id: 'hooks',
    label: 'Hooks',
    icon: 'book',
    href: sectionPath('react', '/hooks/'),
    matches: [],
    groups: [
      {
        label: 'Hooks',
        items: [
          { label: 'All hooks', href: sectionPath('react', '/hooks/') },
          ...reactHooks.map((hook) => ({
            label: hook,
            href: sectionPath('react', `/hooks/${hook}/`),
          })),
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
    matches: [],
    groups: [
      {
        label: 'Components',
        items: markdownComponents.map((item) => ({ label: item.name, href: componentHref(item) })),
      },
    ],
  },
]

// The package lives in its own repository: one page here, and no releases of its own.
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
        items: [{ label: 'Overview', href: sectionPath('styled-system', '/') }],
      },
    ],
  },
]

// A package with an overview and its releases, and nothing else yet.
const overviewRail = (pkg: 'mcp' | 'ui-spec' | 'cli'): RailItem[] => [
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
    { pkg: 'react', label: 'Design system documentation', rail: reactRail },
    { pkg: 'markdown', label: 'Markdown documentation', rail: markdownRail },
    { pkg: 'styled-system', label: 'Styled-system documentation', rail: styledSystemRail },
    { pkg: 'mcp', label: 'MCP server documentation', rail: overviewRail('mcp') },
    { pkg: 'ui-spec', label: 'UI spec documentation', rail: overviewRail('ui-spec') },
    { pkg: 'cli', label: 'Command line documentation', rail: overviewRail('cli') },
  ] satisfies Omit<SectionNav, 'groups'>[]
).map((section) => ({
  ...section,
  groups: section.rail.flatMap((item) => item.groups),
}))

/** The React section's sidebar groups, in reading order. */
export const reactNav: NavGroup[] = SECTIONS[0].groups

/**
 * The section a pathname belongs to: the one with the longest route that holds it, so a page of
 * `/react/markdown/` is the markdown section's, not React's. Versioned snapshots serve a single
 * section from the domain root, so an unmatched path falls back to the build's own section (set
 * at build time via DOCS_SECTION) - and to React on the live site.
 */
export const sectionFor = (pathname: string): SectionNav => {
  const match = SECTIONS.filter(({ pkg }) => {
    const route = `/${sections[pkg].route}`
    return pathname === route || pathname.startsWith(`${route}/`)
  }).sort((a, b) => sections[b.pkg].route.length - sections[a.pkg].route.length)[0]
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
  if (section.pkg !== 'react') return listed
  const specs = allDocComponents
    .filter((item) => item.pkg === 'react')
    .map((item) => ({
      label: `${item.name} specs`,
      group: 'Specs',
      href: sectionPath('react', componentSpecsPath(item)),
    }))
  return [...listed, ...specs]
}
