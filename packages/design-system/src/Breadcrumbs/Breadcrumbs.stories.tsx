import type { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button'
import { Flex } from '../Flex'
import { Icon, type IconName } from '../Icon'
import { Link } from '../Link'
import { Menu } from '../Menu'
import { MenuItem } from '../MenuItem'
import { Typography } from '../Typography'
import { View } from '../View'
import { ThemeProvider } from '../theme'
import { baseTheme, createTheme } from '../theme/themes'
import { p } from '../utils/test/storiesArgs'
import {
  breadcrumbsSeparatorTokens,
  textColorTokens,
  typographyVariantTokens,
} from '../utils/test/storiesOptions'
import { exampleArgs } from '../utils/test/renderExample'
import { breadcrumbsCatalog } from './Breadcrumbs.catalog'
import { Breadcrumbs, type BreadcrumbsProps } from './Breadcrumbs'

// The separator control picks a character, or the chevron icon.
const chevron = <Icon name="chevron_right" size="sm" color="inherit" />
const separatorMapping = {
  ...Object.fromEntries(breadcrumbsSeparatorTokens.map((token) => [token, token])),
  chevron,
}

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Theme/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        'separator',
        'maxItems',
        'itemsBeforeCollapse',
        'itemsAfterCollapse',
        'expandLabel',
        'color',
        'typography',
        'aria-label',
        'as',
        'p',
      ],
    },
  },
  args: exampleArgs(breadcrumbsCatalog.example),
  argTypes: {
    separator: {
      control: { type: 'select' },
      options: Object.keys(separatorMapping),
      mapping: separatorMapping,
      description: 'Between two crumbs - a character, or an icon (which mirrors right to left).',
      table: { category: 'Content', defaultValue: { summary: '/' } },
    },
    maxItems: {
      control: { type: 'number', min: 1 },
      description:
        'Past this many crumbs the trail collapses to its first and last, a button between them.',
      table: { category: 'Behavior', defaultValue: { summary: '8' } },
    },
    itemsBeforeCollapse: {
      control: { type: 'number', min: 0 },
      description: 'Crumbs shown before the button when collapsed.',
      table: { category: 'Behavior', defaultValue: { summary: '1' } },
    },
    itemsAfterCollapse: {
      control: { type: 'number', min: 0 },
      description: 'Crumbs shown after the button when collapsed.',
      table: { category: 'Behavior', defaultValue: { summary: '1' } },
    },
    expandLabel: {
      control: 'text',
      description: 'Names the button that shows the whole trail - no built-in text.',
      table: { category: 'Content' },
    },
    color: {
      control: { type: 'select' },
      options: textColorTokens,
      description: "The trail's and its separators' color - resolves against `theme.text`.",
      table: { category: 'Visual', defaultValue: { summary: 'secondary' } },
    },
    typography: {
      control: { type: 'select' },
      options: typographyVariantTokens,
      description: "The trail's type - resolves against `theme.typography`.",
      table: { category: 'Visual', defaultValue: { summary: 'body1' } },
    },
    'aria-label': {
      control: 'text',
      description: 'Names the navigation landmark - always give one.',
      table: { category: 'Content' },
    },
    as: {
      control: { type: 'select' },
      options: ['nav', 'div'],
      description: 'The root element.',
      table: { category: 'Layout', defaultValue: { summary: 'nav' } },
    },
    p,
  },
}

export default meta
type Story = StoryObj<typeof Breadcrumbs>

const ancestor = (label: ReactNode) => (
  <Link href="#" underline="hover" color="inherit">
    {label}
  </Link>
)
const current = (label: ReactNode) => (
  <Typography color="primary" aria-current="page">
    {label}
  </Typography>
)
const shop = ['Home', 'Catalog', 'Accessories', 'New collection']

export const Default: Story = {}

// The current page as a link too - still reachable, marked as the page you're on.
export const CurrentPageLink: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      {ancestor('Home')}
      {ancestor('Catalog')}
      <Link href="#" underline="hover" color="primary" aria-current="page">
        Accessories
      </Link>
    </Breadcrumbs>
  ),
}

export const CustomSeparators: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Flex gap={2}>
      {(['›', '-', chevron] as const).map((separator, index) => (
        <Breadcrumbs key={index} {...args} separator={separator}>
          {ancestor('Home')}
          {ancestor('Catalog')}
          {current('Accessories')}
        </Breadcrumbs>
      ))}
    </Flex>
  ),
}

// A span: the current page's crumb is a paragraph, which can't hold a div.
const withIcon = (name: IconName, label: string) => (
  <Flex as="span" flexDirection="row" alignItems="center" gap={0.5}>
    <Icon name={name} size="sm" color="inherit" />
    {label}
  </Flex>
)

export const WithIcons: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      {ancestor(withIcon('folder', 'Projects'))}
      {ancestor(withIcon('code', 'design-system'))}
      {current(withIcon('grid_view', 'Breadcrumbs'))}
    </Breadcrumbs>
  ),
}

// Past maxItems, a button stands for the crumbs between; pressing it shows them all.
export const Collapsed: Story = {
  args: { maxItems: 2 },
  render: (args) => (
    <Breadcrumbs {...args}>
      {shop.map((label) => (
        <Link key={label} href="#" underline="hover" color="inherit">
          {label}
        </Link>
      ))}
      {current('Belts')}
    </Breadcrumbs>
  ),
}

// Instead of showing them in the trail, the crumbs between open in a menu - its trigger named,
// so it isn't announced as a bare button.
export const CondensedWithMenu: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      {ancestor('Home')}
      <Menu
        aria-label="Hidden crumbs"
        trigger={
          <Button variant="text" size="sm" aria-label="Show the hidden crumbs">
            <Icon name="more_horiz" size="sm" color="inherit" />
          </Button>
        }
      >
        {['Catalog', 'Accessories', 'New collection'].map((label) => (
          <MenuItem key={label}>{label}</MenuItem>
        ))}
      </Menu>
      {current('Belts')}
    </Breadcrumbs>
  ),
}

const customized = createTheme(baseTheme, {
  components: {
    Breadcrumbs: {
      defaultProps: { separator: '›', color: 'primary' },
      styleOverrides: {
        separator: ({ theme }) => ({ marginInline: theme.space[2] }),
        item: { fontWeight: 600 },
      },
    },
  },
})

// Through the theme: every trail's separator, color and spacing.
export const Customized: Story = {
  parameters: { controls: { include: [] } },
  render: (args: BreadcrumbsProps) => (
    <ThemeProvider theme={customized}>
      <Breadcrumbs aria-label={args['aria-label']}>
        {ancestor('Home')}
        {ancestor('Catalog')}
        {current('Accessories')}
      </Breadcrumbs>
    </ThemeProvider>
  ),
}

// Right to left the trail reads the other way, and an icon separator points that way too.
export const RightToLeft: Story = {
  args: { separator: chevron },
  render: (args) => (
    <View dir="rtl">
      <Breadcrumbs {...args}>
        {ancestor('خانه')}
        {ancestor('فروشگاه')}
        {current('لوازم جانبی')}
      </Breadcrumbs>
    </View>
  ),
}
