import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  buttonColorTokens,
  menuAlignTokens,
  spaceTokens,
  textColorTokens,
  textInputSizeTokens,
  zOrderTokens,
} from '../../utils/test/storiesOptions'
import { Button } from '../../Button'
import { Flex } from '../../Flex'
import { Icon } from '../../Icon'
import { MenuDivider } from '../MenuDivider'
import { MenuItem } from '../../MenuItem'
import { Typography } from '../../Typography'
import { View } from '../../View'
import { exampleArgs } from '../../utils/test/renderExample'
import { menuCatalog } from './Menu.catalog'
import { Menu, type MenuProps, type MenuStep } from './Menu'

const meta: Meta<typeof Menu> = {
  title: 'Theme/Menu/Menu',
  component: Menu,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        'align',
        'defaultOpen',
        'marginThreshold',
        'elevation',
        'layer',
        'emptyLabel',
        'color',
        'textColor',
        'size',
        'dense',
        'aria-label',
      ],
    },
  },
  args: {
    ...exampleArgs(menuCatalog.example),
    align: 'start',
    defaultOpen: false,
    marginThreshold: 2,
    elevation: 8,
    layer: 'modal',
    color: 'primary',
    size: 'md',
  },
  argTypes: {
    align: {
      control: { type: 'select' },
      options: menuAlignTokens,
      description: 'Which edge of the trigger the list lines up with.',
      table: { category: 'Layout', defaultValue: { summary: 'start' } },
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Uncontrolled initial open state.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    marginThreshold: {
      control: { type: 'select' },
      options: spaceTokens,
      description: "The least room between the list and the window's edge - a `theme.space` key.",
      table: { category: 'Layout', defaultValue: { summary: '2' } },
    },
    elevation: {
      control: { type: 'range', min: 0, max: 24, step: 1 },
      description: 'Shadow depth of the surface - resolves against `theme.shadows`.',
      table: { category: 'Visual', defaultValue: { summary: '8' } },
    },
    layer: {
      control: { type: 'select' },
      options: zOrderTokens,
      description: 'Stacking layer from `theme.zOrder`.',
      table: { category: 'Behavior', defaultValue: { summary: 'modal' } },
    },
    emptyLabel: {
      control: 'text',
      description: 'Shown as one disabled row when the menu has no rows.',
      table: { category: 'Content' },
    },
    color: {
      control: { type: 'select' },
      options: buttonColorTokens,
      description: 'Accent color for every row - resolves to `theme.palette`.',
      table: { category: 'Visual' },
    },
    textColor: {
      control: { type: 'select' },
      options: textColorTokens,
      description: "Every row's text color - resolves against `theme.text`.",
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
    'aria-label': {
      control: 'text',
      description: 'Names the list. Without it the trigger names it.',
      table: { category: 'Content' },
    },
  },
}

export default meta
type Story = StoryObj<typeof Menu>

const branchRows = (
  <>
    <MenuItem value="new">New branch...</MenuItem>
    <MenuItem value="checkout" disabled note="Coming later">
      Checkout tag or revision...
    </MenuItem>
    <MenuDivider />
    <MenuItem value="rename">Rename...</MenuItem>
    <MenuItem value="delete">Delete</MenuItem>
  </>
)

export const Default: Story = {
  render: (args) => <Menu {...args} trigger={<Button variant="outlined">main</Button>} />,
}

function Branches(args: Readonly<Partial<MenuProps>>) {
  const [branch, setBranch] = useState('main')
  return (
    <Menu
      {...args}
      trigger={<Button variant="outlined">{branch}</Button>}
      onSelect={(value) => setBranch(String(value))}
    >
      {['main', 'feat/menu', 'fix/tabs'].map((name) => (
        <MenuItem key={name} value={name} role="menuitemradio" selected={branch === name}>
          {name}
        </MenuItem>
      ))}
    </Menu>
  )
}

export const CurrentChoice: Story = {
  render: (args) => <Branches {...args} />,
}

export const Aligned: Story = {
  render: (args) => (
    <Flex justifyContent="space-between" width="100%">
      <Menu {...args} align="start" trigger={<Button variant="outlined">Start</Button>}>
        {branchRows}
      </Menu>
      <Menu {...args} align="end" trigger={<Button variant="outlined">End</Button>}>
        {branchRows}
      </Menu>
    </Flex>
  ),
}

export const IconsAndShortcuts: Story = {
  render: (args) => (
    <Menu {...args} trigger={<Button variant="text">File</Button>}>
      <MenuItem startIcon={<Icon name="folder" size="sm" color="inherit" />} shortcut="Control+O">
        Open...
      </MenuItem>
      <MenuItem startIcon={<Icon name="refresh" size="sm" color="inherit" />} shortcut="F5">
        Reload
      </MenuItem>
      <MenuDivider />
      <MenuItem shortcut="Control+W">Close</MenuItem>
    </Menu>
  ),
}

export const Empty: Story = {
  args: { emptyLabel: 'Coming soon' },
  render: (args) => (
    <Menu {...args} trigger={<Button variant="outlined">Remote branches</Button>} />
  ),
}

const barMenus = ['File', 'Edit', 'View']

function MenuBar(args: Readonly<Partial<MenuProps>>) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const step = (index: number) => (direction: MenuStep) =>
    setOpenIndex((index + direction + barMenus.length) % barMenus.length)
  return (
    <Flex role="menubar" aria-label="Main" gap={1}>
      {barMenus.map((name, index) => (
        <Menu
          {...args}
          key={name}
          isOpen={openIndex === index}
          onOpen={() => setOpenIndex(index)}
          onClose={() => setOpenIndex(null)}
          onStep={step(index)}
          trigger={<Button variant="text">{name}</Button>}
        >
          <MenuItem>{name} one</MenuItem>
          <MenuItem>{name} two</MenuItem>
        </Menu>
      ))}
    </Flex>
  )
}

export const ControlledMenuBar: Story = {
  render: (args) => (
    <>
      <Typography variant="caption" mb={1}>
        Open a menu, then step to its neighbours with Left and Right.
      </Typography>
      <MenuBar {...args} />
    </>
  ),
}

function BranchMenu(args: Readonly<Partial<MenuProps>>) {
  const [branch, setBranch] = useState('main')
  const local = ['main', 'feat/menu', 'fix/tabs']
  return (
    <Menu
      {...args}
      aria-label="Branch"
      trigger={<Button variant="outlined">{branch}</Button>}
      onSelect={(value) => {
        if (local.includes(String(value))) setBranch(String(value))
      }}
    >
      <MenuItem value="new">New branch...</MenuItem>
      <MenuItem value="checkout" disabled note="Coming later">
        Checkout tag or revision...
      </MenuItem>
      <MenuDivider />
      <MenuItem
        submenu={local.map((name) => (
          <MenuItem key={name} value={name} role="menuitemradio" selected={branch === name}>
            {name}
          </MenuItem>
        ))}
      >
        Local branches
      </MenuItem>
      <MenuItem submenu={null} emptyLabel="Coming soon">
        Remote branches
      </MenuItem>
    </Menu>
  )
}

export const Submenus: Story = {
  render: (args) => <BranchMenu {...args} />,
}

export const NestedSubmenus: Story = {
  render: (args) => (
    <Menu {...args} trigger={<Button variant="text">Insert</Button>}>
      <MenuItem
        submenu={[
          <MenuItem
            key="text"
            submenu={[
              <MenuItem key="h1">Heading</MenuItem>,
              <MenuItem key="p">Paragraph</MenuItem>,
            ]}
          >
            Text
          </MenuItem>,
          <MenuItem
            key="media"
            submenu={[<MenuItem key="img">Image</MenuItem>, <MenuItem key="vid">Video</MenuItem>]}
          >
            Media
          </MenuItem>,
        ]}
      >
        Element
      </MenuItem>
      <MenuItem>Component...</MenuItem>
    </Menu>
  ),
}

const edgeRows = (
  <>
    <MenuItem>New branch...</MenuItem>
    <MenuItem
      submenu={[
        <MenuItem key="main">main</MenuItem>,
        <MenuItem
          key="feat"
          submenu={[
            <MenuItem key="menu">feat/menu</MenuItem>,
            <MenuItem key="tabs">feat/tabs</MenuItem>,
          ]}
        >
          feat
        </MenuItem>,
      ]}
    >
      Local branches
    </MenuItem>
    <MenuItem>Rename...</MenuItem>
  </>
)

const corners = [
  { name: 'Top start', top: 0, left: 0 },
  { name: 'Top end', top: 0, right: 0 },
  { name: 'Bottom start', bottom: 0, left: 0 },
  { name: 'Bottom end', bottom: 0, right: 0 },
]

// Short labels keep every list at its 10rem least width, so the room is easy to set.
const roomForOneRows = (
  <>
    <MenuItem>New branch...</MenuItem>
    <MenuItem
      submenu={[
        <MenuItem key="main">main</MenuItem>,
        <MenuItem
          key="feat"
          submenu={[
            <MenuItem key="menu">feat/menu</MenuItem>,
            <MenuItem key="tabs">feat/tabs</MenuItem>,
          ]}
        >
          feat
        </MenuItem>,
      ]}
    >
      Branches
    </MenuItem>
    <MenuItem>Rename...</MenuItem>
  </>
)

// Both take the whole window, so they stay out of the docs pages' demo frames.
export const RoomForOneSubmenu: Story = {
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <Flex position="relative" height="100vh" alignItems="center" justifyContent="center" p={2}>
      <Typography variant="caption" textAlign="center">
        Past the menu's end edge there is room for one submenu, and no more. Open Branches, then
        feat.
      </Typography>
      {[
        { name: 'Top', top: 16 },
        { name: 'Bottom', bottom: 16 },
      ].map(({ name, ...place }) => (
        <View key={name} position="absolute" left="calc(100% - 20rem - 24px)" {...place}>
          <Menu {...args} align="start" trigger={<Button variant="outlined">{name}</Button>}>
            {roomForOneRows}
          </Menu>
        </View>
      ))}
    </Flex>
  ),
}

export const AtTheEdges: Story = {
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <Flex position="relative" height="100vh" alignItems="center" justifyContent="center" p={2}>
      <Typography variant="caption" textAlign="center">
        A menu in each corner of the window, with submenus two deep. At phone width a submenu with
        no room beside its row opens under it.
      </Typography>
      {corners.map(({ name, ...place }) => (
        <View key={name} position="absolute" p={2} {...place}>
          <Menu {...args} trigger={<Button variant="outlined">{name}</Button>}>
            {edgeRows}
          </Menu>
        </View>
      ))}
    </Flex>
  ),
}
