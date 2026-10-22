import type { Meta, StoryObj } from '@storybook/react-vite'
import { Paper } from '../Paper'
import { exampleArgs } from '../utils/test/renderExample'
import { transitionEasingTokens } from '../utils/test/storiesOptions'
import {
  TransitionToggle,
  transitionArgTypes,
  transitionControls,
} from '../utils/test/storiesTransition'
import { fadeCatalog } from './Fade.catalog'
import { Fade } from './Fade'

const meta: Meta<typeof Fade> = {
  title: 'Theme/Fade',
  component: Fade,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { include: [...transitionControls] },
  },
  args: exampleArgs(fadeCatalog.example),
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
type Story = StoryObj<typeof Fade>

const surface = (
  <Paper p={3} width="12rem">
    Fade
  </Paper>
)

export const Default: Story = {
  render: (args) => <Fade {...args}>{surface}</Fade>,
}

// Moved by hand, from out to in and back.
export const Toggled: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <TransitionToggle>
      {(isShown) => (
        <Fade {...args} isShown={isShown}>
          {surface}
        </Fade>
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
        <Fade {...args} isShown={isShown} shouldMountOnEnter shouldUnmountOnExit>
          {surface}
        </Fade>
      )}
    </TransitionToggle>
  ),
}
