import type { Meta, StoryObj } from '@storybook/react-vite'
import { Paper } from '../Paper'
import { exampleArgs } from '../utils/test/renderExample'
import { transitionEasingTokens } from '../utils/test/storiesOptions'
import {
  TransitionToggle,
  transitionArgTypes,
  transitionControls,
} from '../utils/test/storiesTransition'
import { growCatalog } from './Grow.catalog'
import { Grow } from './Grow'

const meta: Meta<typeof Grow> = {
  title: 'Theme/Grow',
  component: Grow,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { include: [...transitionControls] },
  },
  args: exampleArgs(growCatalog.example),
  argTypes: {
    ...transitionArgTypes,
    easing: {
      control: { type: 'select' },
      options: transitionEasingTokens,
      description: 'Which easing of `theme.transitions.easing` it moves by.',
      table: { category: 'Behavior', defaultValue: { summary: 'standard' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof Grow>

const surface = (
  <Paper p={3} width="12rem">
    Grow
  </Paper>
)

export const Default: Story = {
  render: (args) => <Grow {...args}>{surface}</Grow>,
}

// Moved by hand, from out to in and back.
export const Toggled: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <TransitionToggle>
      {(isShown) => (
        <Grow {...args} isShown={isShown}>
          {surface}
        </Grow>
      )}
    </TransitionToggle>
  ),
}

// Out of the tree until first shown, and again once out.
export const Unmounted: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <TransitionToggle>
      {(isShown) => (
        <Grow {...args} isShown={isShown} shouldMountOnEnter shouldUnmountOnExit>
          {surface}
        </Grow>
      )}
    </TransitionToggle>
  ),
}
