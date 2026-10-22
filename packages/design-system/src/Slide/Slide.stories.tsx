import type { Meta, StoryObj } from '@storybook/react-vite'
import { Flex } from '../Flex'
import { Paper } from '../Paper'
import { exampleArgs } from '../utils/test/renderExample'
import { transitionEasingTokens, slideDirectionTokens } from '../utils/test/storiesOptions'
import {
  TransitionToggle,
  transitionArgTypes,
  transitionControls,
} from '../utils/test/storiesTransition'
import { slideCatalog } from './Slide.catalog'
import { Slide } from './Slide'

const meta: Meta<typeof Slide> = {
  title: 'Theme/Slide',
  component: Slide,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { include: [...transitionControls, 'direction'] },
  },
  args: exampleArgs(slideCatalog.example),
  argTypes: {
    ...transitionArgTypes,
    easing: {
      control: { type: 'select' },
      options: transitionEasingTokens,
      description: 'Which easing of `theme.transitions.easing` it moves by.',
      table: { category: 'Behavior', defaultValue: { summary: 'standard' } },
    },
    direction: {
      control: { type: 'inline-radio' },
      options: slideDirectionTokens,
      description: 'The edge it slides in from. Mirrored in right-to-left pages.',
      table: { category: 'Layout', defaultValue: { summary: 'down' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof Slide>

const surface = (
  <Paper p={3} width="12rem">
    Slide
  </Paper>
)

export const Default: Story = {
  render: (args) => <Slide {...args}>{surface}</Slide>,
}

// Moved by hand, from out to in and back.
export const Toggled: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <TransitionToggle>
      {(isShown) => (
        <Slide {...args} isShown={isShown}>
          {surface}
        </Slide>
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
        <Slide {...args} isShown={isShown} shouldMountOnEnter shouldUnmountOnExit>
          {surface}
        </Slide>
      )}
    </TransitionToggle>
  ),
}

// Each edge it can come from.
export const Directions: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Flex gap={2}>
      {slideDirectionTokens.map((direction) => (
        <TransitionToggle key={direction}>
          {(isShown) => (
            <Slide {...args} direction={direction} isShown={isShown}>
              <Paper p={2}>{direction}</Paper>
            </Slide>
          )}
        </TransitionToggle>
      ))}
    </Flex>
  ),
}
