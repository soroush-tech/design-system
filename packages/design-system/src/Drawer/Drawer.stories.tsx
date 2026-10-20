import { useState, type ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { anchorTokens } from '../utils/test/storiesOptions'
import { Button } from '../Button'
import { Flex } from '../Flex'
import { Typography } from '../Typography'
import { Drawer } from './Drawer'
import { DrawerToggle } from './DrawerToggle'

const meta: Meta<typeof Drawer> = {
  title: 'Theme/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      include: [
        'anchor',
        'elevation',
        'hasBackdrop',
        'transitionDuration',
        'shouldLockScroll',
        'shouldAutoFocus',
        'shouldTrapFocus',
        'shouldRestoreFocus',
      ],
    },
  },
  argTypes: {
    shouldLockScroll: {
      control: 'boolean',
      description: 'With JavaScript: lock body scroll while open.',
      table: { category: 'Behavior', defaultValue: { summary: 'true' } },
    },
    shouldAutoFocus: {
      control: 'boolean',
      description: 'With JavaScript: move focus into the drawer when it opens.',
      table: { category: 'Focus', defaultValue: { summary: 'true' } },
    },
    shouldTrapFocus: {
      control: 'boolean',
      description: 'With JavaScript: keep Tab cycling within the open drawer.',
      table: { category: 'Focus', defaultValue: { summary: 'true' } },
    },
    shouldRestoreFocus: {
      control: 'boolean',
      description: 'With JavaScript: return focus to where it was when it closes.',
      table: { category: 'Focus', defaultValue: { summary: 'true' } },
    },
    anchor: {
      control: { type: 'inline-radio' },
      options: anchorTokens,
      description: 'Edge the drawer slides in from.',
      table: { category: 'Layout', defaultValue: { summary: 'left' } },
    },
    elevation: {
      control: { type: 'range', min: 0, max: 24, step: 1 },
      description: 'Shadow depth of the panel (0-24), forwarded to Paper.',
      table: { category: 'Visual', defaultValue: { summary: '16' } },
    },
    hasBackdrop: {
      control: 'boolean',
      description: 'Render the dimmed backdrop behind the panel.',
      table: { category: 'Visual', defaultValue: { summary: 'true' } },
    },
    transitionDuration: {
      control: { type: 'number' },
      description: 'Slide duration in milliseconds.',
      table: { category: 'Visual', defaultValue: { summary: '225' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof Drawer>
type DrawerArgs = Partial<ComponentProps<typeof Drawer>>

const DrawerBody = ({ args, onClose }: { args: DrawerArgs; onClose?: () => void }) => {
  const isHorizontal = args.anchor === 'top' || args.anchor === 'bottom'
  return (
    <Flex flexDirection="column" gap={3} p={4} width={isHorizontal ? '100%' : '260px'}>
      <Typography variant="h6" m={0}>
        Drawer
      </Typography>
      <Typography variant="body2" color="secondary" m={0}>
        Slides in from the "{args.anchor}" edge. Press Escape or click outside to close.
      </Typography>
      {onClose ? (
        <Button onClick={onClose}>Close</Button>
      ) : (
        <DrawerToggle drawer={args.id ?? 'drawer'} action="hide">
          Close
        </DrawerToggle>
      )}
    </Flex>
  )
}

/** A `DrawerToggle` opens it and closes it - no state, and it works with JavaScript disabled. */
export const Default: Story = {
  args: {
    id: 'drawer',
    anchor: 'left',
    elevation: 16,
    hasBackdrop: true,
    transitionDuration: 225,
  },
  render: (args) => (
    <>
      <DrawerToggle drawer="drawer">Open drawer</DrawerToggle>
      <Drawer {...args} id="drawer">
        <DrawerBody args={args} />
      </Drawer>
    </>
  ),
}

const ControlledDemo = (args: DrawerArgs) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open drawer</Button>
      <Drawer {...args} id="controlled-drawer" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <DrawerBody args={args} onClose={() => setIsOpen(false)} />
      </Drawer>
    </>
  )
}

/** With JavaScript, `isOpen` and `onClose` control it from state. */
export const Controlled: Story = {
  args: { anchor: 'right', elevation: 16, hasBackdrop: true, transitionDuration: 225 },
  render: (args) => <ControlledDemo {...args} />,
}
