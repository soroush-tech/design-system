import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Flex } from '../../Flex'
import { Icon } from '../../Icon'
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
