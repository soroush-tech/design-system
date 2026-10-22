import type { Meta, StoryObj } from '@storybook/react-vite'
import { Paper } from '../Paper'
import { exampleArgs } from '../utils/test/renderExample'
import { transitionEasingTokens } from '../utils/test/storiesOptions'
import {
  TransitionToggle,
  transitionArgTypes,
  transitionControls,
} from '../utils/test/storiesTransition'
import { zoomCatalog } from './Zoom.catalog'
import { Zoom } from './Zoom'

const meta: Meta<typeof Zoom> = {
  title: 'Theme/Zoom',
  component: Zoom,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { include: [...transitionControls] },
  },
  args: exampleArgs(zoomCatalog.example),
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
type Story = StoryObj<typeof Zoom>

const surface = (
  <Paper p={3} width="12rem">
    Zoom
  </Paper>
)

export const Default: Story = {
  render: (args) => <Zoom {...args}>{surface}</Zoom>,
}

// Moved by hand, from out to in and back.
export const Toggled: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <TransitionToggle>
      {(isShown) => (
        <Zoom {...args} isShown={isShown}>
          {surface}
        </Zoom>
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
        <Zoom {...args} isShown={isShown} shouldMountOnEnter shouldUnmountOnExit>
          {surface}
        </Zoom>
      )}
    </TransitionToggle>
  ),
}
