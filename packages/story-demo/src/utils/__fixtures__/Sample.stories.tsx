import type { Meta, StoryObj } from '@storybook/react-vite'
import { sampleSizeTokens } from './storiesOptions'
import { Stack } from './Stack'
import { Sample } from './Sample'

const meta: Meta<typeof Sample> = {
  title: 'Fixtures/Sample',
  component: Sample,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: ['children', 'size', 'disabled'],
    },
  },
  args: {
    children: 'Sample',
    'aria-label': 'A sample',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Label text.',
      table: { category: 'Content' },
    },
    size: {
      control: { type: 'select' },
      options: sampleSizeTokens,
      description: "It's the density token.",
      table: { category: 'Layout', defaultValue: { summary: 'md' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the sample.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof Sample>

// Shared children - kept top-level so stories stay terse.
const items = [<Stack key="one">One</Stack>, <Stack key="two">Two</Stack>]

const noun = 'group'

const label = `sample ${noun}`

export const Default: Story = {
  args: {
    size: 'md',
    children: 'Sample',
  },
}

export const Grouped: Story = {
  render: (args) => <Sample {...args}>{items}</Sample>,
}

export const Sizes: Story = {
  name: 'All sizes',
  render: () => (
    <Stack aria-label={label}>
      {(['sm', 'md'] as const).map((size) => (
        <Sample key={size} size={size}>
          Don't stop, {size}
        </Sample>
      ))}
    </Stack>
  ),
}

export const Destructured: Story = {
  render: ({ disabled }) => <Sample disabled={disabled}>Pattern</Sample>,
}

export const Block: Story = {
  parameters: { controls: { include: [] } },
  render: () => {
    const heading = 'block'
    return <Sample>{heading}</Sample>
  },
}

export const Decorated: Story = {
  decorators: [(StoryComponent) => <Stack>{<StoryComponent />}</Stack>],
  render: () => <Sample>Decorated</Sample>,
}
