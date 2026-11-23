import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Flex } from '../../Flex'
import { Icon } from '../../Icon'
import { View } from '../../View'
import { exampleArgs } from '../../utils/test/renderExample'
import { buttonColorTokens, textInputSizeTokens } from '../../utils/test/storiesOptions'
import { FabMenuItem } from '../FabMenuItem'
import { fabMenuAlignValues, fabMenuCatalog, fabMenuDirectionValues } from './FabMenu.catalog'
import { FabMenu, type FabMenuProps } from './FabMenu'

const meta: Meta<typeof FabMenu> = {
  title: 'Theme/FabMenu',
  component: FabMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { include: ['direction', 'align', 'color', 'size', 'isOpen', 'label'] },
  },
  args: { ...exampleArgs(fabMenuCatalog.example), children: undefined },
  argTypes: {
    direction: {
      control: { type: 'inline-radio' },
      options: fabMenuDirectionValues,
      description: 'Which way the actions go from the trigger.',
      table: { category: 'Layout', defaultValue: { summary: 'up' } },
    },
    align: {
      control: { type: 'inline-radio' },
      options: fabMenuAlignValues,
      description: 'The edge of the trigger the actions line up with.',
      table: { category: 'Layout', defaultValue: { summary: 'end' } },
    },
    color: {
      control: { type: 'select' },
      options: buttonColorTokens,
      description: "The trigger's color, from `theme.palette`.",
      table: { category: 'Visual', defaultValue: { summary: 'primary' } },
    },
    size: {
      control: { type: 'select' },
      options: textInputSizeTokens,
      description: "The trigger's size, and the items'.",
      table: { category: 'Visual', defaultValue: { summary: 'md' } },
    },
    isOpen: {
      control: 'boolean',
      description: 'Whether the actions are shown. Unset, it opens and closes itself.',
      table: { category: 'State' },
    },
    label: {
      control: 'text',
      description: 'Makes the trigger an extended fab with this label.',
      table: { category: 'Content' },
    },
  },
}

export default meta
type Story = StoryObj<typeof FabMenu>

const add = <Icon name="add" color="inherit" />
const actions = (
  <>
    <FabMenuItem icon={add}>New document</FabMenuItem>
    <FabMenuItem icon={add}>New folder</FabMenuItem>
    <FabMenuItem icon={add}>Upload a file</FabMenuItem>
  </>
)

// Room above the trigger, as a corner of a page has: the actions stack upward.
const Corner = ({ children }: { children: React.ReactNode }) => (
  <Flex
    flexDirection="row"
    justifyContent="flex-end"
    alignItems="flex-end"
    width="22rem"
    minHeight="16rem"
  >
    {children}
  </Flex>
)

export const Default: Story = {
  render: (args) => (
    <Corner>
      <FabMenu {...args}>{actions}</FabMenu>
    </Corner>
  ),
}

export const Extended: Story = {
  args: { label: 'Create', 'aria-label': undefined },
  render: (args) => (
    <Corner>
      <FabMenu {...args}>{actions}</FabMenu>
    </Corner>
  ),
}

export const Down: Story = {
  args: { direction: 'down', align: 'start' },
  render: (args) => (
    <Flex flexDirection="row" alignItems="flex-start" width="22rem" minHeight="16rem">
      <FabMenu {...args}>{actions}</FabMenu>
    </Flex>
  ),
}

export const Open: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Corner>
      <FabMenu {...args} defaultOpen>
        {actions}
      </FabMenu>
    </Corner>
  ),
}

export const Colors: Story = {
  args: { defaultOpen: true },
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Corner>
      <FabMenu {...args}>
        <FabMenuItem icon={add}>Secondary</FabMenuItem>
        <FabMenuItem icon={add} color="success">
          Success
        </FabMenuItem>
        <FabMenuItem icon={add} color="error">
          Error
        </FabMenuItem>
        <FabMenuItem icon={add} disabled>
          Off
        </FabMenuItem>
      </FabMenu>
    </Corner>
  ),
}

// One menu in each corner of the screen, each opening toward the middle of it - the way a floating
// action button sits on a page. Fixed to the window: open the story on its own to see it.
const corners = [
  { name: 'top left', place: { top: 2, left: 2 }, column: 'down', row: 'right', align: 'start' },
  { name: 'top right', place: { top: 2, right: 2 }, column: 'down', row: 'left', align: 'end' },
  {
    name: 'bottom left',
    place: { bottom: 2, left: 2 },
    column: 'up',
    row: 'right',
    align: 'start',
  },
  { name: 'bottom right', place: { bottom: 2, right: 2 }, column: 'up', row: 'left', align: 'end' },
] as const

function CornersDemo({ axis, ...args }: Readonly<FabMenuProps & { axis: 'column' | 'row' }>) {
  return (
    <>
      {corners.map((corner) => (
        <View key={corner.name} position="fixed" {...corner.place}>
          <FabMenu
            {...args}
            aria-label={`Create, ${corner.name}`}
            direction={corner[axis]}
            align={corner.align}
          >
            {actions}
          </FabMenu>
        </View>
      ))}
    </>
  )
}

// Vertical: each corner opens a column, down from the top corners and up from the bottom ones.
export const Corners: Story = {
  parameters: {
    layout: 'fullscreen',
    controls: { include: ['color', 'size'] },
    docs: { story: { inline: false, iframeHeight: 520 } },
  },
  render: (args) => <CornersDemo {...args} axis="column" />,
}

// Horizontal: each corner opens a row toward the middle of the screen.
export const CornersSideways: Story = {
  parameters: {
    layout: 'fullscreen',
    controls: { include: ['color', 'size'] },
    docs: { story: { inline: false, iframeHeight: 520 } },
  },
  render: (args) => <CornersDemo {...args} axis="row" />,
}

// A row beside the trigger, to its start or its end.
export const Sideways: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Flex flexDirection="column" gap={6} alignItems="center" width="32rem">
      <Flex flexDirection="row" justifyContent="flex-end" width="100%">
        <FabMenu {...args} direction="left" defaultOpen>
          {actions}
        </FabMenu>
      </Flex>
      <Flex flexDirection="row" justifyContent="flex-start" width="100%">
        <FabMenu {...args} direction="right" defaultOpen>
          {actions}
        </FabMenu>
      </Flex>
    </Flex>
  ),
}

function ControlledDemo(props: Readonly<FabMenuProps>) {
  const [isOpen, setIsOpen] = useState(false)
  const [chosen, setChosen] = useState('Nothing yet')
  return (
    <Flex flexDirection="column" gap={2} alignItems="flex-end" width="22rem">
      <span>{chosen}</span>
      <FabMenu
        {...props}
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      >
        <FabMenuItem icon={add} onClick={() => setChosen('Document')}>
          New document
        </FabMenuItem>
        <FabMenuItem icon={add} onClick={() => setChosen('Folder')}>
          New folder
        </FabMenuItem>
      </FabMenu>
    </Flex>
  )
}

export const Controlled: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => <ControlledDemo {...args} />,
}
