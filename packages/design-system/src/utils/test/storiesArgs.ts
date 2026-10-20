import {
  backgroundTokens,
  borderColorTokens,
  borderRadiiTokens,
  borderStyleTokens,
  borderWidthTokens,
  buttonColorTokens,
  cursorTokens,
  displayTokens,
  positionTokens,
  spaceTokens,
  tableSizeTokens,
  tabsOrientationTokens,
  tabsOverflowBehaviorTokens,
  tabsScrollButtonsTokens,
  tabsVariantTokens,
  textColorTokens,
  textInputSizeTokens,
} from './storiesOptions'

// ─── Visual ──────────────────────────────────────────────────────────────────
export const bg = {
  control: { type: 'select' },
  options: backgroundTokens,
  description: 'Background color - resolves from `theme.background`.',
  table: { category: 'Visual' },
} as const
export const opacity = {
  control: { type: 'range', min: 0, max: 1, step: 0.05 },
  description: 'CSS opacity (0-1).',
  table: { category: 'Visual' },
} as const

// ─── Spacing ─────────────────────────────────────────────────────────────────
export const p = {
  control: { type: 'select' },
  options: spaceTokens,
  description: 'Padding - resolves from `theme.space`.',
  table: { category: 'Spacing', type: { summary: 'space' }, defaultValue: { summary: '0' } },
} as const
export const m = {
  control: { type: 'select' },
  options: spaceTokens,
  description: 'Margin - resolves from `theme.space`.',
  table: { category: 'Spacing', type: { summary: 'space' }, defaultValue: { summary: '0' } },
} as const
export const mb = {
  control: { type: 'select' },
  options: spaceTokens,
  description: 'Margin bottom - resolves from `theme.space`.',
  table: { category: 'Spacing', type: { summary: 'space' }, defaultValue: { summary: '0' } },
} as const
export const gap = {
  control: { type: 'select' },
  options: spaceTokens,
  description: 'Gap between items - resolves from `theme.space`.',
  table: { category: 'Spacing', type: { summary: 'GapToken' }, defaultValue: { summary: '0' } },
} as const

// ─── Layout ─────────────────────────────────────────────────────────────────
export const width = {
  control: 'text',
  description: 'CSS width - any valid value.',
  table: { category: 'Layout', type: { summary: 'string | number' } },
} as const
export const height = {
  control: 'text',
  description: 'CSS height - any valid value.',
  table: { category: 'Layout', type: { summary: 'string | number' } },
} as const
export const minWidth = {
  control: 'text',
  description: 'CSS min-width.',
  table: { category: 'Layout', type: { summary: 'string | number' } },
} as const
export const minHeight = {
  control: 'text',
  description: 'CSS min-height.',
  table: { category: 'Layout', type: { summary: 'string | number' } },
} as const
export const maxWidth = {
  control: 'text',
  description: 'CSS max-width.',
  table: { category: 'Layout', type: { summary: 'string | number' } },
} as const
export const maxHeight = {
  control: 'text',
  description: 'CSS max-height.',
  table: { category: 'Layout', type: { summary: 'string | number' } },
} as const
export const display = {
  control: { type: 'select' },
  options: displayTokens,
  description: 'CSS display property.',
  table: { category: 'Layout', type: { summary: 'string' } },
} as const
export const position = {
  control: { type: 'select' },
  options: positionTokens,
  description: 'CSS position property.',
  table: { category: 'Layout', type: { summary: 'string' } },
} as const
export const cursor = {
  control: { type: 'select' },
  options: cursorTokens,
  description: 'CSS cursor - controls the mouse pointer style.',
  table: { category: 'Visual', type: { summary: 'CSSProperties["cursor"]' } },
} as const
export const aspectRatio = {
  control: 'text',
  description: 'CSS aspect-ratio for fixed-ratio surfaces (e.g. "16/9", "1").',
  table: { category: 'Layout', type: { summary: 'CSSProperties["aspectRatio"]' } },
} as const
export const order = {
  control: 'number',
  description: 'CSS order for flex/grid item placement. Accepts responsive arrays.',
  table: { category: 'Layout', type: { summary: 'CSSProperties["order"]' } },
} as const

// ─── Border ─────────────────────────────────────────────────────────────────
export const border = {
  control: 'text',
  description:
    'CSS border shorthand (e.g. `"1px solid"`). Width and style are raw CSS - use `borderRadius` for theme tokens.',
  table: { category: 'Visual', type: { summary: 'string' } },
} as const
export const borderWidth = {
  control: { type: 'select' },
  options: borderWidthTokens,
  description:
    'Border width - resolves from `theme.borderWidths`: none (0) · thin (1px) · base (2px) · thick (4px).',
  table: { category: 'Visual', type: { summary: 'none | thin | base | thick' } },
} as const
export const borderStyle = {
  control: { type: 'select' },
  options: borderStyleTokens,
  description: 'CSS border-style.',
  table: { category: 'Visual', type: { summary: 'string' } },
} as const
export const borderColor = {
  control: { type: 'select' },
  options: borderColorTokens,
  description: 'Border color - resolves from `theme.border`.',
  table: { category: 'Visual' },
} as const
export const borderRadius = {
  control: { type: 'select' },
  options: borderRadiiTokens,
  description: 'Border radius - resolves from `theme.radii`: sm (4px) · md (8px) · lg (16px).',
  table: { category: 'Visual', type: { summary: 'sm | md | lg' } },
} as const

// ─── Pagination ────────────────────────────────────────────────────────────
// Shared by the Pagination + PaginationItem + TablePagination story families.
export const paginationColor = {
  control: { type: 'select' },
  options: buttonColorTokens,
  description: 'Selected-item color - resolves against `theme.palette`.',
  table: { category: 'Visual', defaultValue: { summary: 'primary' } },
} as const
export const paginationVariant = {
  control: { type: 'select' },
  options: ['text', 'outlined'],
  description: 'Item style.',
  table: { category: 'Visual', defaultValue: { summary: 'text' } },
} as const
export const paginationShape = {
  control: { type: 'select' },
  options: ['circular', 'rounded'],
  description: 'Item corner shape.',
  table: { category: 'Visual', defaultValue: { summary: 'circular' } },
} as const
export const paginationSize = {
  control: { type: 'select' },
  options: tableSizeTokens,
  description: 'Item density - resolves against `theme.sizes`.',
  table: { category: 'Layout', defaultValue: { summary: 'md' } },
} as const
export const paginationCount = {
  control: { type: 'number', min: -1 },
  description: 'Total number of rows; `-1` = unknown (server-side pagination).',
  table: { category: 'Content' },
} as const
export const shouldShowFirstButton = {
  control: 'boolean',
  description: 'Shows the first-page button.',
  table: { category: 'Behavior', defaultValue: { summary: 'false' } },
} as const
export const shouldShowLastButton = {
  control: 'boolean',
  description: 'Shows the last-page button.',
  table: { category: 'Behavior', defaultValue: { summary: 'false' } },
} as const

// ─── Tabs ──────────────────────────────────────────────────────────────────────
// Shared by the Tabs and TabList story families - a TabList takes every Tabs prop but the value.
export const tabsVariant = {
  control: { type: 'select' },
  options: tabsVariantTokens,
  description: 'The look: an indicator under the selected tab, or the selected tab boxed.',
  table: { category: 'Visual', defaultValue: { summary: 'underline' } },
} as const
export const tabsOrientation = {
  control: { type: 'select' },
  options: tabsOrientationTokens,
  description: 'Horizontal or vertical tabs.',
  table: { category: 'Layout', defaultValue: { summary: 'horizontal' } },
} as const
export const tabsColor = {
  control: { type: 'select' },
  options: buttonColorTokens,
  description: "The indicator's or outline's color - resolves to `theme.palette`.",
  table: { category: 'Visual', defaultValue: { summary: 'primary' } },
} as const
export const tabsTextColor = {
  control: { type: 'select' },
  options: textColorTokens,
  description: "The labels' color - resolves against `theme.text`.",
  table: { category: 'Visual', defaultValue: { summary: 'primary' } },
} as const
export const tabsSize = {
  control: { type: 'select' },
  options: textInputSizeTokens,
  description: 'Density - resolves against `theme.sizes`.',
  table: { category: 'Layout', defaultValue: { summary: 'md' } },
} as const
export const tabsFullWidth = {
  control: 'boolean',
  description: "The tabs share the row's width equally.",
  table: { category: 'Layout', defaultValue: { summary: 'false' } },
} as const
export const tabsIsCentered = {
  control: 'boolean',
  description: 'The tabs sit in the middle of the row.',
  table: { category: 'Layout', defaultValue: { summary: 'false' } },
} as const
export const tabsShouldSelectOnFocus = {
  control: 'boolean',
  description: 'Moving focus with the arrow keys selects as it goes.',
  table: { category: 'Behavior', defaultValue: { summary: 'false' } },
} as const
export const tabsOverflowBehavior = {
  control: { type: 'select' },
  options: tabsOverflowBehaviorTokens,
  description: "What the row does when its tabs don't fit.",
  table: { category: 'Behavior', defaultValue: { summary: 'none' } },
} as const
export const tabsOverflowLabel = {
  control: 'text',
  description: "Names the button that opens the menu of the tabs that don't fit.",
  table: { category: 'Content' },
} as const
export const tabsScrollButtons = {
  control: { type: 'select' },
  options: tabsScrollButtonsTokens,
  description: 'When a scrolling row shows its scroll buttons.',
  table: { category: 'Behavior', defaultValue: { summary: 'auto' } },
} as const
export const tabsShouldShowScrollButtonsOnMobile = {
  control: 'boolean',
  description: 'Show the scroll buttons on narrow screens too.',
  table: { category: 'Behavior', defaultValue: { summary: 'false' } },
} as const
export const tabsHasVisibleScrollbar = {
  control: 'boolean',
  description: "Show the list's scrollbar.",
  table: { category: 'Visual', defaultValue: { summary: 'false' } },
} as const
export const tabsBg = {
  control: { type: 'select' },
  options: backgroundTokens,
  description: "The tab strip's ground - resolves against `theme.background`.",
  table: { category: 'Visual' },
} as const
export const tabsSelectedBg = {
  control: { type: 'select' },
  options: backgroundTokens,
  description: "The selected tab's ground - give its TabPanel the same bg.",
  table: {
    category: 'Visual',
    defaultValue: { summary: 'paper when boxed, or enclosed without a divider' },
  },
} as const
export const tabsHasDivider = {
  control: 'boolean',
  description:
    "A line along the row's foot, under its own content too - round the selected tab in the enclosed look.",
  table: { category: 'Visual', defaultValue: { summary: 'true, false when boxed' } },
} as const
export const tabsAriaLabel = {
  control: 'text',
  description: 'Names the tablist.',
  table: { category: 'Content' },
} as const
export const tabsAs = {
  control: { type: 'select' },
  options: ['div', 'nav'],
  description: 'A tablist, or with `nav` a navigation of buttons or links marked `aria-current`.',
  table: { category: 'Behavior', defaultValue: { summary: 'div' } },
} as const
