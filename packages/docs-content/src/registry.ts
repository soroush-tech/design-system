import { kebabCase } from './kebabCase'

export type DocsPackage = 'design-system' | 'markdown' | 'styled-system'

export interface ComponentNavItem {
  /** Workspace package the component belongs to. */
  pkg: DocsPackage
  /** PascalCase display name, matching the component's folder in its package. */
  name: string
  /** URL segment under /<pkg>/components/. */
  slug: string
  /** README path suffix inside packages/<pkg>/src/ - used to find the raw source. */
  readmePath: string
}

export interface ComponentCategory {
  label: string
  items: ComponentNavItem[]
}

/** `nested` marks container folders whose README sits one level down (Table/Table/README.md). */
const component = (
  name: string,
  nested = false,
  pkg: DocsPackage = 'design-system'
): ComponentNavItem => ({
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
    ],
  },
  {
    label: 'Inputs & forms',
    items: [
      component('Button'),
      component('ButtonGroup'),
      component('ToggleButton', true),
      component('TextInput'),
      component('Checkbox'),
      component('Radio'),
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
    label: 'Feedback',
    items: [
      component('CircularProgress'),
      component('LinearProgress'),
      component('Skeleton'),
      component('Backdrop'),
    ],
  },
  {
    label: 'Overlay & behavior',
    items: [
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

/** Every component with a docs page, across packages. Slugs are globally unique. */
export const allDocComponents: ComponentNavItem[] = [...allComponents, ...markdownComponents]

export const componentBySlug = new Map(allDocComponents.map((item) => [item.slug, item]))

/** The category label a component sits under; markdown components are uncategorized. */
export const categoryOf = (item: ComponentNavItem): string | undefined =>
  componentCategories.find((category) => category.items.includes(item))?.label

/** The styled-system package's docs files, as (label, file-path-under-docs/) pairs. */
export const styledSystemDocs: Array<{ label: string; file: string }> = [
  { label: 'Getting started', file: 'getting-started.md' },
  { label: 'How it works', file: 'how-it-works.md' },
  { label: 'Responsive styles', file: 'responsive-styles.md' },
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
