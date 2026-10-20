import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  asTokens,
  buttonColorTokens,
  menuItemRoleTokens,
  textColorTokens,
  textInputSizeTokens,
} from '../utils/test/storiesOptions'
import { Icon, type IconName } from '../Icon'
import { icons } from '../Icon/icons'
import { MenuList } from '../Menu'
import { Paper } from '../Paper'
import { exampleArgs } from '../utils/test/renderExample'
import { MenuItem } from './MenuItem'
import { menuItemCatalog } from './MenuItem.catalog'

// A menu row's controls pick by name: an icon, and a submenu of rows, an empty one, or none.
const iconMapping = {
  none: undefined,
  ...Object.fromEntries(
    (Object.keys(icons) as IconName[]).map((name) => [
      name,
      <Icon key={name} name={name} size="sm" color="inherit" />,
    ])
  ),
}
const submenuMapping = {
  none: undefined,
  rows: [
    <MenuItem key="main" role="menuitemradio" selected>
      main
    </MenuItem>,
    <MenuItem key="feat" role="menuitemradio">
      feat/menu
    </MenuItem>,
  ],
  empty: [],
}

const meta: Meta<typeof MenuItem> = {
  title: 'Theme/MenuItem',
  component: MenuItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        'value',
        'children',
        'disabled',
        'selected',
        'highlighted',
        'multiple',
        'color',
        'textColor',
        'size',
        'dense',
        'disableGutters',
        'divider',
        'autoFocus',
        'as',
      ],
    },
  },
  args: {
    ...exampleArgs(menuItemCatalog.example),
    color: 'primary',
    size: 'md',
  },
  argTypes: {
    value: {
      control: 'text',
      description: "The value this option represents - reported to Select's onChange.",
      table: { category: 'Content' },
    },
    children: {
      control: 'text',
      description: 'The option label.',
      table: { category: 'Content' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the option.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    selected: {
      control: 'boolean',
      description: 'Marks the option as selected. Injected by Select.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    highlighted: {
      control: 'boolean',
      description: 'Marks the option as keyboard-highlighted. Injected by Select.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    multiple: {
      control: 'boolean',
      description: 'Reserves a leading checkmark slot. Injected by Select.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    color: {
      control: { type: 'select' },
      options: buttonColorTokens,
      description: 'Accent color - resolves to `theme.palette[color]`.',
      table: { category: 'Visual', defaultValue: { summary: 'primary' } },
    },
    textColor: {
      control: { type: 'select' },
      options: textColorTokens,
      description: 'Base text color of the row - resolves against `theme.text`.',
      table: { category: 'Visual', defaultValue: { summary: 'primary' } },
    },
    size: {
      control: { type: 'select' },
      options: textInputSizeTokens,
      description: 'Density - resolves against `theme.sizes`.',
      table: { category: 'Layout', defaultValue: { summary: 'md' } },
    },
    dense: {
      control: 'boolean',
      description: 'Compact vertical padding, independent of `size`.',
      table: { category: 'Layout', defaultValue: { summary: 'false' } },
    },
    disableGutters: {
      control: 'boolean',
      description: 'Remove the left and right padding.',
      table: { category: 'Layout', defaultValue: { summary: 'false' } },
    },
    divider: {
      control: 'boolean',
      description: 'Add a 1px bottom border to separate the row.',
      table: { category: 'Visual', defaultValue: { summary: 'false' } },
    },
    autoFocus: {
      control: 'boolean',
      description: 'Focus the row on first mount (and when it flips false → true).',
      table: { category: 'Focus', defaultValue: { summary: 'false' } },
    },
    role: {
      control: { type: 'select' },
      options: menuItemRoleTokens,
      description: 'In a menu: a command, one of a set (radio), or on and off (checkbox).',
      table: { category: 'Behavior', defaultValue: { summary: 'menuitem' } },
    },
    startIcon: {
      control: { type: 'select' },
      options: Object.keys(iconMapping),
      mapping: iconMapping,
      description: "In a menu: the row's leading icon - a checked row shows its tick there.",
      table: { category: 'Content' },
    },
    shortcut: {
      control: 'text',
      description: "In a menu: the keys that run it, at the row's end - also `aria-keyshortcuts`.",
      table: { category: 'Content' },
    },
    note: {
      control: 'text',
      description: 'In a menu: why a disabled row is off - its tooltip and description.',
      table: { category: 'Content' },
    },
    submenu: {
      control: { type: 'select' },
      options: Object.keys(submenuMapping),
      mapping: submenuMapping,
      description: 'In a menu: rows that open beside this one; none or an empty list.',
      table: { category: 'Content' },
    },
    emptyLabel: {
      control: 'text',
      description: 'In a menu: the one disabled row an empty submenu shows.',
      table: { category: 'Content' },
    },
    as: {
      control: { type: 'select' },
      options: asTokens,
      description: 'The element used for the root node.',
      table: { category: 'Layout', defaultValue: { summary: 'li' } },
    },
  },
  decorators: [
    // A Select's rows sit in a listbox; a menu row's story brings its own MenuList.
    (Story, { parameters }) => (
      <Paper elevation={8} p={0} borderRadius="sm" style={{ width: 220 }}>
        {parameters.isInMenu ? (
          <Story />
        ) : (
          <ul style={{ margin: 0, padding: '0.25rem 0', listStyle: 'none' }}>
            <Story />
          </ul>
        )}
      </Paper>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof MenuItem>

export const Default: Story = {}

// In a MenuList the row is a menu row: a command with an icon, its keys, a note when it is
// off, a submenu - its role from the list, not a Select's option.
export const MenuRow: Story = {
  parameters: {
    isInMenu: true,
    controls: {
      include: [
        'children',
        'role',
        'selected',
        'disabled',
        'startIcon',
        'shortcut',
        'note',
        'submenu',
        'emptyLabel',
        'color',
        'textColor',
        'size',
        'dense',
      ],
    },
  },
  args: {
    value: undefined,
    children: 'Rename...',
    role: 'menuitem',
    startIcon: 'edit_note',
    shortcut: 'F2',
  },
  render: (args) => (
    <MenuList aria-label="File">
      <MenuItem>New file...</MenuItem>
      <MenuItem {...args} />
      <MenuItem disabled note="Nothing to undo">
        Undo
      </MenuItem>
    </MenuList>
  ),
}

export const Selected: Story = {
  args: { selected: true },
}

export const States: Story = {
  render: () => (
    <>
      <MenuItem value="a">Default</MenuItem>
      <MenuItem value="b" highlighted>
        Highlighted
      </MenuItem>
      <MenuItem value="c" selected>
        Selected
      </MenuItem>
      <MenuItem value="d" disabled>
        Disabled
      </MenuItem>
    </>
  ),
}

export const MultipleWithCheckmark: Story = {
  render: () => (
    <>
      <MenuItem value="a" multiple selected>
        Selected
      </MenuItem>
      <MenuItem value="b" multiple>
        Unselected
      </MenuItem>
    </>
  ),
}

export const DividersAndDense: Story = {
  render: () => (
    <>
      <MenuItem value="a" divider>
        Profile
      </MenuItem>
      <MenuItem value="b" divider>
        Settings
      </MenuItem>
      <MenuItem value="c" dense>
        Compact row
      </MenuItem>
      <MenuItem value="d" dense>
        Another compact row
      </MenuItem>
    </>
  ),
}
