import type { Meta, StoryObj } from '@storybook/react-vite'
import { Paper } from '../Paper'
import { Typography } from '../Typography'
import { exampleArgs } from '../utils/test/renderExample'
import { collapseOrientationTokens, transitionEasingTokens } from '../utils/test/storiesOptions'
import {
  TransitionToggle,
  transitionArgTypes,
  transitionControls,
} from '../utils/test/storiesTransition'
import { collapseCatalog } from './Collapse.catalog'
import { Collapse } from './Collapse'

const meta: Meta<typeof Collapse> = {
  title: 'Theme/Collapse',
  component: Collapse,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { include: [...transitionControls, 'orientation', 'collapsedSize'] },
  },
  args: exampleArgs(collapseCatalog.example),
  argTypes: {
    ...transitionArgTypes,
    easing: {
      control: { type: 'select' },
      options: transitionEasingTokens,
      description: 'Which easing of `theme.transitions.easing` it moves by.',
      table: { category: 'Behavior', defaultValue: { summary: 'standard' } },
    },
    orientation: {
      control: { type: 'inline-radio' },
      options: collapseOrientationTokens,
      description: 'Which way it opens - by its height, or its width.',
      table: { category: 'Layout', defaultValue: { summary: 'vertical' } },
    },
    collapsedSize: {
      control: 'text',
      description: 'The height - or width - it keeps when closed. A number is pixels.',
      table: { category: 'Layout', defaultValue: { summary: '0' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof Collapse>

const content = (
  <Paper p={3} width="16rem">
    <Typography variant="body2">
      Content that opens and closes. Its height is measured as it moves, and left to it once it is
      open, so content that grows keeps showing.
    </Typography>
  </Paper>
)

export const Default: Story = {
  render: (args) => <Collapse {...args}>{content}</Collapse>,
}

// Moved by hand, from closed to open and back.
export const Toggled: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <TransitionToggle>
      {(isShown) => (
        <Collapse {...args} isShown={isShown}>
          {content}
        </Collapse>
      )}
    </TransitionToggle>
  ),
}

// Closed, it keeps some of its height.
export const CollapsedSize: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <TransitionToggle>
      {(isShown) => (
        <Collapse {...args} isShown={isShown} collapsedSize={40}>
          {content}
        </Collapse>
      )}
    </TransitionToggle>
  ),
}

export const Horizontal: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <TransitionToggle>
      {(isShown) => (
        <Collapse {...args} isShown={isShown} orientation="horizontal">
          {content}
        </Collapse>
      )}
    </TransitionToggle>
  ),
}

// Out of the tree until first opened, and again once closed.
export const Unmounted: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <TransitionToggle>
      {(isShown) => (
        <Collapse {...args} isShown={isShown} shouldMountOnEnter shouldUnmountOnExit>
          {content}
        </Collapse>
      )}
    </TransitionToggle>
  ),
}
