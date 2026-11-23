import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { m, p, width, maxHeight } from '../../utils/test/storiesArgs'
import {
  buttonColorTokens,
  menuItemRoleTokens,
  textColorTokens,
  textInputSizeTokens,
} from '../../utils/test/storiesOptions'
import { Button } from '../../Button'
import { Icon } from '../../Icon'
import { MenuDivider } from '../MenuDivider'
import { MenuItem } from '../../MenuItem'
import { Paper } from '../../Paper'
import { Typography } from '../../Typography'
import { exampleArgs } from '../../utils/test/renderExample'
import { menuListCatalog } from './MenuList.catalog'
import { MenuList, type MenuListProps } from './MenuList'

const meta: Meta<typeof MenuList> = {
  title: 'Theme/Menu/MenuList',
  component: MenuList,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        'aria-label',
        'shouldWrap',
        'shouldAutoFocus',
        'color',
        'textColor',
        'size',
        'dense',
        'p',
        'm',
        'width',
        'maxHeight',
      ],
    },
  },
  args: {
    ...exampleArgs(menuListCatalog.example),
    shouldWrap: true,
    shouldAutoFocus: false,
    color: 'primary',
    size: 'md',
  },
  argTypes: {
    'aria-label': {
      control: 'text',
      description: 'Names the menu.',
      table: { category: 'Content' },
    },
    shouldWrap: {
      control: 'boolean',
      description: 'Carry the arrow keys past the last row to the first, and back.',
      table: { category: 'Behavior', defaultValue: { summary: 'true' } },
    },
    shouldAutoFocus: {
      control: 'boolean',
      description: 'Focus the checked row, or the first enabled one, on mount.',
      table: { category: 'Focus', defaultValue: { summary: 'false' } },
    },
    color: {
      control: { type: 'select' },
      options: buttonColorTokens,
      description: "Accent color for every row's focus shading - resolves to `theme.palette`.",
      table: { category: 'Visual' },
    },
    textColor: {
      control: { type: 'select' },
      options: textColorTokens,
      description: 'Base text color for every row - resolves against `theme.text`.',
      table: { category: 'Visual' },
    },
    size: {
      control: { type: 'select' },
      options: textInputSizeTokens,
      description: 'Density for every row - resolves against `theme.sizes`.',
      table: { category: 'Layout' },
    },
    dense: {
      control: 'boolean',
      description: 'Compact vertical padding for every row.',
      table: { category: 'Layout' },
    },
    p,
    m,
    width,
    maxHeight,
  },
  decorators: [
    (Story) => (
      <Paper elevation={8} p={0} borderRadius="sm" style={{ width: 260 }}>
        <Story />
      </Paper>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof MenuList>

export const Default: Story = {
  render: (args) => <MenuList {...args} />,
}

export const IconsAndShortcuts: Story = {
  render: (args) => (
    <MenuList {...args} aria-label="File">
      <MenuItem startIcon={<Icon name="folder" size="sm" color="inherit" />} shortcut="Control+O">
        Open...
      </MenuItem>
      <MenuItem startIcon={<Icon name="refresh" size="sm" color="inherit" />} shortcut="F5">
        Reload
      </MenuItem>
      <MenuItem shortcut="Control+W">Close</MenuItem>
      <MenuDivider />
      <MenuItem startIcon={<Icon name="terminal" size="sm" color="inherit" />}>
        Open terminal
      </MenuItem>
    </MenuList>
  ),
}

function CheckableRows(args: Story['args']) {
  const [branch, setBranch] = useState('main')
  const [isWrapped, setIsWrapped] = useState(true)
  return (
    <MenuList
      {...args}
      aria-label="View"
      onSelect={(value) => {
        if (value === 'wrap') setIsWrapped((wrap) => !wrap)
        else setBranch(String(value))
      }}
    >
      {['main', 'feat/menu', 'fix/tabs'].map((name) => (
        <MenuItem key={name} value={name} role="menuitemradio" selected={branch === name}>
          {name}
        </MenuItem>
      ))}
      <MenuDivider />
      <MenuItem value="wrap" role="menuitemcheckbox" selected={isWrapped}>
        Wrap lines
      </MenuItem>
    </MenuList>
  )
}

export const RadioAndCheckboxRows: Story = {
  render: (args) => <CheckableRows {...args} />,
}

export const TypeAhead: Story = {
  render: (args) => (
    <>
      <Typography variant="caption" px={2} pt={1}>
        Focus a row and type a label&apos;s first letters.
      </Typography>
      <MenuList {...args} aria-label="Edit" shouldAutoFocus>
        {['Undo', 'Redo', 'Cut', 'Copy', 'Paste', 'Rename', 'Run'].map((label) => (
          <MenuItem key={label}>{label}</MenuItem>
        ))}
      </MenuList>
    </>
  ),
}

export const LongList: Story = {
  args: { maxHeight: '200px' },
  render: (args) => (
    <MenuList {...args} aria-label="Remote branches" overflowY="auto">
      {Array.from({ length: 20 }, (_, index) => (
        <MenuItem key={index} value={index}>
          origin/feature-{index + 1}
        </MenuItem>
      ))}
    </MenuList>
  ),
}

// A row's own control sits beside it, the pointer's - out of the arrow keys and hidden from
// assistive technology, as a menu owns rows alone. The keys' way to close a row is Delete.
function OpenFiles(args: Readonly<Partial<MenuListProps>>) {
  const [files, setFiles] = useState(['README.md', 'Tabs.tsx', 'Menu.tsx', 'theme.ts'])
  const close = (file: string) => setFiles(files.filter((open) => open !== file))
  return (
    <MenuList
      {...args}
      aria-label="Open files"
      onKeyDown={(event) => {
        const file = (event.target as HTMLElement).dataset.value
        if (event.key === 'Delete' && file) close(file)
      }}
    >
      {files.map((file) => (
        <MenuItem
          key={file}
          value={file}
          secondaryAction={
            <Button
              variant="text"
              size="sm"
              tabIndex={-1}
              title={`Close ${file}`}
              onClick={() => close(file)}
            >
              <Icon name="close" size="sm" color="inherit" />
            </Button>
          }
        >
          {file}
        </MenuItem>
      ))}
    </MenuList>
  )
}

export const RowActions: Story = {
  render: (args) => <OpenFiles {...args} />,
}

export const RowRoles: Story = {
  parameters: { controls: { include: [] } },
  render: () => (
    <MenuList aria-label="Roles">
      {menuItemRoleTokens.map((role) => (
        <MenuItem key={role} role={role} selected>
          {role}
        </MenuItem>
      ))}
    </MenuList>
  ),
}
