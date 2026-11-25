import { kebabCase } from './kebabCase'
import { sections, type DocsSection } from './sections'

export type DocsPackage = 'react' | 'markdown' | 'styled-system'

export interface ComponentNavItem {
  /** Workspace package the component belongs to. */
  pkg: DocsPackage
  /** PascalCase display name, matching the component's folder in its package. */
  name: string
  /** The name in kebab case: what a README or an AI client looks a component up by - never a URL. */
  slug: string
  /** README path suffix inside packages/<pkg>/src/ - used to find the raw source. */
  readmePath: string
  /** For a member of a family (`MenuList` of `Menu`), the family: its subpath and its page. */
  family?: string
}

export interface ComponentCategory {
  label: string
  items: ComponentNavItem[]
}

/** `nested` marks container folders whose README sits one level down (Table/Table/README.md). */
const component = (name: string, nested = false, pkg: DocsPackage = 'react'): ComponentNavItem => ({
  pkg,
  name,
  slug: kebabCase(name),
  readmePath: nested ? `${name}/${name}/README.md` : `${name}/README.md`,
})

const markdownComponent = (name: string): ComponentNavItem => component(name, false, 'markdown')

/**
 * The component taxonomy of the design-system README's inventory, driving the docs
 * sidebar, the components index grid, and the MCP server's component tools.
 * `registry.test.ts` guards it against the actual README files on disk.
 */
export const componentCategories: ComponentCategory[] = [
  {
    label: 'Layout & surfaces',
    items: [
      component('ScrollArea'),
      component('View'),
      component('Flex'),
      component('Grid'),
      component('Paper'),
      component('Card'),
      component('Quote'),
      component('AppBar'),
      component('Drawer'),
      component('Sidebar', true),
    ],
  },
  {
    label: 'Content & data display',
    items: [
      component('Typography'),
      component('Link'),
      component('Icon'),
      component('Image'),
      component('Avatar'),
      component('Table', true),
      component('Accordion', true),
    ],
  },
  {
    label: 'Inputs & forms',
    items: [
      component('Autocomplete'),
      component('Fab'),
      component('Button'),
      component('ButtonGroup'),
      component('ToggleButton', true),
      component('TextInput'),
      component('Checkbox'),
      component('Radio'),
      component('Rating'),
      component('NumberInput'),
      component('RangeInput'),
      component('TransferList'),
      component('Switch'),
      component('NativeSelect'),
      component('Select'),
      component('MenuItem'),
      component('Form'),
      component('FormControl'),
      component('FormLabel'),
      component('FormHelperText'),
      component('Pagination'),
    ],
  },
  {
    label: 'Navigation & menus',
    items: [
      component('Breadcrumbs'),
      component('Menu', true),
      component('NavTree', true),
      component('Tabs', true),
    ],
  },
  {
    label: 'Feedback',
    items: [
      component('FabMenu', true),
      component('Snackbar'),
      component('Alert', true),
      component('Badge'),
      component('Chip'),
      component('CircularProgress'),
      component('LinearProgress'),
      component('Skeleton'),
      component('Backdrop'),
    ],
  },
  {
    label: 'Transitions',
    items: [
      component('Collapse'),
      component('Fade'),
      component('Grow'),
      component('Slide'),
      component('Zoom'),
    ],
  },
  {
    label: 'Overlay & behavior',
    items: [
      component('Tooltip'),
      component('Portal'),
      component('FocusTrap'),
      component('Modal'),
      component('Popover'),
      component('Pressable'),
    ],
  },
]

export const allComponents: ComponentNavItem[] = componentCategories.flatMap(
  (category) => category.items
)

// Each family's members, their READMEs beside the primary's (`Menu/MenuList/README.md`).
// A member has no page of its own - an API page each, its demos on the family's page - and
// stays out of the categories, so the sidebar's groups and the catalog list families.
const FAMILY_MEMBERS: Record<string, string[]> = {
  NavTree: ['NavGroup', 'NavLink'],
  FabMenu: ['FabMenuItem'],
  Alert: ['AlertTitle'],
  Accordion: ['AccordionActions', 'AccordionDetails', 'AccordionGroup', 'AccordionSummary'],
  Menu: ['ContextMenu', 'MenuDivider', 'MenuItems', 'MenuList'],
  Pagination: ['PaginationItem'],
  Sidebar: ['SidebarItem'],
  Table: [
    'TableBody',
    'TableCell',
    'TableContainer',
    'TableControl',
    'TableFooter',
    'TableHead',
    'TablePagination',
    'TablePaginationActions',
    'TableRow',
    'TableSortLabel',
  ],
  Tabs: ['Tab', 'TabContext', 'TabList', 'TabPanel', 'TabScrollButton'],
  ToggleButton: ['ToggleButtonGroup'],
}

/** Every family member, in its family's order. */
export const memberComponents: ComponentNavItem[] = Object.entries(FAMILY_MEMBERS).flatMap(
  ([family, names]) =>
    names.map((name) => ({
      pkg: 'react' as const,
      name,
      slug: kebabCase(name),
      readmePath: `${family}/${name}/README.md`,
      family,
    }))
)

/** A family's members; none for a component that isn't one. */
export const membersOf = (item: ComponentNavItem): ComponentNavItem[] =>
  memberComponents.filter((member) => member.family === item.name)

/**
 * Where a page of the site is: its section's route, then the page's path in the section
 * (`/` for the section's own page). Paths end in a slash, as the prerendered `index.html` files do.
 */
export const sitePath = (pkg: DocsSection, path: string): string => `/${sections[pkg].route}${path}`

/**
 * Where a component's page is in its section. The route is the import path: `/Button/` for
 * `@soroush.design/react/Button`, and a member of a family under the entry it is imported from,
 * `/Table/TableCell/`.
 */
export const componentPagePath = (item: ComponentNavItem): string =>
  item.family ? `/${item.family}/${item.name}/` : `/${item.name}/`

/** The page of a component's props, tokens and defaults; a member has no tabs, its page is that. */
export const componentSpecsPath = (item: ComponentNavItem): string =>
  item.pkg === 'react' && !item.family ? `/${item.name}/specs/` : componentPagePath(item)

/** The page of a component's accessibility notes, for the ones that have them. */
export const componentAccessibilityPath = (item: ComponentNavItem): string =>
  `/${item.name}/accessibility/`

/**
 * Where a link to a component's README lands. A `#section` is in its reference - everything
 * from its props on - which a design-system component's specs page shows; markdown components
 * have no specs page, their whole README is on theirs.
 */
export const componentLinkPath = (item: ComponentNavItem, section = ''): string =>
  `${section ? componentSpecsPath(item) : componentPagePath(item)}${section}`

/** The subpath a component is imported from - a member's is its family's. */
export const importSubpathOf = (item: ComponentNavItem): string => item.family ?? item.name

/** The React package: what an app imports every component of the design system from. */
export const IMPORT_PACKAGE = '@soroush.design/react'

/** The markdown package, which a markdown component is imported from. */
export const MARKDOWN_PACKAGE = '@soroush.design/react-markdown'

/** The package an app imports a component from: its own, so the line on a page is the real one. */
export const importPackageOf = (item: ComponentNavItem): string =>
  item.pkg === 'markdown' ? MARKDOWN_PACKAGE : IMPORT_PACKAGE

/** The markdown package's component library - flat, no categories. */
export const markdownComponents: ComponentNavItem[] = [
  markdownComponent('Preview'),
  markdownComponent('Editor'),
  markdownComponent('LiveEdit'),
  markdownComponent('Control'),
  markdownComponent('Toolbar'),
  markdownComponent('CodeBlock'),
  markdownComponent('Mermaid'),
]

/** Every documented component, family members included, across packages. Slugs are globally unique. */
export const allDocComponents: ComponentNavItem[] = [
  ...allComponents.flatMap((item) => [item, ...membersOf(item)]),
  ...markdownComponents,
]

export const componentBySlug = new Map(allDocComponents.map((item) => [item.slug, item]))

export const componentByName = new Map(allDocComponents.map((item) => [item.name, item]))

/** The category label a component sits under; markdown components are uncategorized. */
export const categoryOf = (item: ComponentNavItem): string | undefined =>
  componentCategories.find((category) =>
    category.items.some((entry) => entry === item || entry.name === item.family)
  )?.label

/** The styled-system package's docs files, as (label, file-path-under-docs/) pairs. */
export const styledSystemDocs: Array<{ label: string; file: string }> = [
  { label: 'Getting started', file: 'getting-started.md' },
  { label: 'How it works', file: 'how-it-works.md' },
  { label: 'Responsive styles', file: 'responsive-styles.md' },
  { label: 'Breakpoints', file: 'breakpoints.md' },
  { label: 'API', file: 'api.md' },
  { label: 'Variants', file: 'variants.md' },
  { label: 'Custom props', file: 'custom-props.md' },
  { label: 'css prop', file: 'css.md' },
  { label: 'Theme specification', file: 'theme-specification.md' },
  { label: 'Theming', file: 'theming.md' },
  { label: 'Table', file: 'table.md' },
  { label: 'TypeScript', file: 'typescript.md' },
  { label: 'Rationale', file: 'rationale.md' },
]

export const styledSystemGuides: Array<{ label: string; file: string }> = [
  { label: 'Guides overview', file: 'guides/index.md' },
  { label: 'Array props', file: 'guides/array-props.md' },
  { label: 'Array scales', file: 'guides/array-scales.md' },
  { label: 'Build a Box', file: 'guides/build-a-box.md' },
  { label: 'Color modes', file: 'guides/color-modes.md' },
  { label: 'Component types', file: 'guides/component-types.md' },
  { label: 'Default values', file: 'guides/default-values.md' },
  { label: 'Exceptions', file: 'guides/exceptions.md' },
  { label: 'Migrating', file: 'guides/migrating.md' },
  { label: 'Removing props from HTML', file: 'guides/removing-props-from-html.md' },
  { label: 'Scale aliases', file: 'guides/scale-aliases.md' },
  { label: 'Spacing', file: 'guides/spacing.md' },
  { label: 'Theming guide', file: 'guides/theming.md' },
  { label: 'Why powers of two', file: 'guides/why-powers-of-two.md' },
]

/** Doc-file path (under packages/styled-system/docs/) to its URL segment. */
export const styledSystemDocSlug = (file: string): string =>
  file.replace(/\.md$/, '').replace(/\/index$/, '')

/**
 * The lowercase pages of the React package, each with the file of its `docs/` that is its page:
 * `/react/engine/` documents `@soroush.design/react/engine`. `catalog`, `engine` and `testing` are
 * entry points; `style`, `theme` and `utils` are pages whose URLs are indexed, and which stay,
 * though the names they document are entry points of their own now (`stylingEntries`) or live in
 * `@soroush.design/core` (`utils`). `routes.test.ts` holds this list to the package's entry points.
 */
export const entryGuides: Record<string, string> = {
  catalog: 'catalog.md',
  engine: 'engine.md',
  style: 'style.md',
  testing: 'testing.md',
  theme: 'theming.md',
  utils: 'utils.md',
}

/**
 * The names of the styling system, each an entry point of `@soroush.design/react` (`/useTheme`,
 * `/styled`, ...), with the page that documents it: the theme's or the style's.
 */
export const stylingEntries: Record<string, 'theme' | 'style'> = {
  ThemeProvider: 'theme',
  LayoutProvider: 'theme',
  useTheme: 'theme',
  useDefaultProps: 'theme',
  useMediaQuery: 'theme',
  withTheme: 'theme',
  styled: 'style',
  css: 'style',
  keyframes: 'style',
  Global: 'style',
  useStyle: 'style',
  withStyles: 'style',
  StylesConsumer: 'style',
}

/**
 * The hooks of the hooks library (`@soroush.design/react-hooks`, `@soroush.design/react-hooks/useDebounce`),
 * documented under the platform: the page of `useDebounce` is `/react/hooks/useDebounce/`, the
 * `## useDebounce` section of the library's README. `registry.test.ts` holds the list to the
 * library's entry points and README.
 */
export const reactHooks = [
  'useControlled',
  'useCopyToClipboard',
  'useDebounce',
  'useDebouncedCallback',
  'useEventCallback',
  'useMergedRefs',
] as const

/** The React platform's guides that are not an entry point: lowercase, so no entry ever takes their path. */
export const reactGuides = ['installation', 'usage', 'customization', 'components'] as const

/**
 * Where a file of the component library's package is on the site, for a link to it from a README
 * or another doc: the README is the overview, `customization.md` its guide, and the others the
 * entry points they document. Undefined for a file that has no page.
 */
export const docPagePath = (file: string): string | undefined => {
  if (file === 'README.md') return '/'
  if (file === 'customization.md') return '/customization/'
  const entry = Object.keys(entryGuides).find((key) => entryGuides[key] === file)
  return entry && `/${entry}/`
}
