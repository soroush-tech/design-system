import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  buttonColorTokens,
  spaceTokens,
  textColorTokens,
  textInputSizeTokens,
  zOrderTokens,
} from '../../utils/test/storiesOptions'
import { Flex } from '../../Flex'
import type { MenuItemData } from '../MenuItems'
import { Typography } from '../../Typography'
import { exampleArgs } from '../../utils/test/renderExample'
import { contextMenuCatalog } from './ContextMenu.catalog'
import { ContextMenu } from './ContextMenu'

const meta: Meta<typeof ContextMenu> = {
  title: 'Theme/Menu/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
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
    ...exampleArgs(contextMenuCatalog.example),
    marginThreshold: 2,
    elevation: 8,
    layer: 'modal',
    color: 'primary',
    size: 'md',
  },
  argTypes: {
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
      description: 'Names the list.',
      table: { category: 'Content' },
    },
  },
}

export default meta
type Story = StoryObj<typeof ContextMenu>

const canvas = (
  <Flex
    tabIndex={0}
    alignItems="center"
    justifyContent="center"
    height="12rem"
    borderWidth="thin"
    borderStyle="dashed"
    borderColor="light"
    borderRadius="sm"
  >
    <Typography variant="body2">Right-click here, or focus and press Shift+F10</Typography>
  </Flex>
)

export const Default: Story = {
  render: (args) => <ContextMenu {...args} target={canvas} />,
}

const items: MenuItemData[] = [
  { value: 'rename', label: 'Rename...', shortcut: 'F2' },
  { value: 'duplicate', label: 'Duplicate', shortcut: 'Control+D' },
  { type: 'divider' },
  {
    label: 'Move to',
    submenu: [
      { value: 'page-1', label: 'Page 1' },
      { value: 'page-2', label: 'Page 2' },
    ],
  },
  { label: 'Share', submenu: [], emptyLabel: 'Coming soon' },
]

function FromData(args: Story['args']) {
  const [last, setLast] = useState<string>('nothing yet')
  return (
    <>
      <Typography variant="caption" mb={1}>
        Chosen: {last}
      </Typography>
      <ContextMenu
        {...args}
        target={canvas}
        items={items}
        onSelect={(value) => setLast(String(value))}
      />
    </>
  )
}

// No target: the app opens it at a point, from a hit test, a shortcut or a button.
function OpenedFromCodeDemo(args: Story['args']) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Flex gap={1} alignItems="center">
      <button type="button" onClick={() => setIsOpen(true)}>
        Open at 240, 160
      </button>
      <ContextMenu
        {...args}
        isOpen={isOpen}
        anchorPosition={{ top: 160, left: 240 }}
        onClose={() => setIsOpen(false)}
        onSelect={() => setIsOpen(false)}
        aria-label="Canvas"
        items={[
          { value: 'paste', label: 'Paste' },
          { value: 'select-all', label: 'Select all' },
        ]}
      />
    </Flex>
  )
}

export const OpenedFromCode: Story = {
  render: (args) => <OpenedFromCodeDemo {...args} />,
}

export const RowsFromData: Story = {
  render: (args) => <FromData {...args} />,
}
