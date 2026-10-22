import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from '../Avatar'
import { Flex } from '../Flex'
import { Icon } from '../Icon'
import { m } from '../utils/test/storiesArgs'
import { exampleArgs } from '../utils/test/renderExample'
import { buttonColorTokens, textInputSizeTokens } from '../utils/test/storiesOptions'
import { chipCatalog, chipVariantValues } from './Chip.catalog'
import { Chip } from './Chip'

const meta: Meta<typeof Chip> = {
  title: 'Theme/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { include: ['label', 'variant', 'color', 'size', 'disabled', 'deleteLabel', 'm'] },
  },
  args: exampleArgs(chipCatalog.example),
  argTypes: {
    label: {
      control: 'text',
      description: 'What the chip says.',
      table: { category: 'Content' },
    },
    variant: {
      control: { type: 'inline-radio' },
      options: chipVariantValues,
      description: "Filled, or only outlined - as a Button's.",
      table: { category: 'Visual', defaultValue: { summary: 'contained' } },
    },
    color: {
      control: { type: 'select' },
      options: buttonColorTokens,
      description: 'Resolves to `theme.palette`.',
      table: { category: 'Visual', defaultValue: { summary: 'default' } },
    },
    size: {
      control: { type: 'select' },
      options: textInputSizeTokens,
      description: 'Resolves against `theme.sizes`.',
      table: { category: 'Layout', defaultValue: { summary: 'md' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Stays as it is, off.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    deleteLabel: {
      control: 'text',
      description: 'Names the delete control - no built-in English.',
      table: { category: 'Content' },
    },
    m,
  },
}

export default meta
type Story = StoryObj<typeof Chip>

export const Default: Story = {}

export const Variants: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Flex flexDirection="row" gap={2} alignItems="center">
      {chipVariantValues.map((variant) => (
        <Chip key={variant} {...args} variant={variant} label={variant} />
      ))}
    </Flex>
  ),
}

export const Colors: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Flex gap={2}>
      {(['contained', 'outlined'] as const).map((variant) => (
        <Flex key={variant} flexDirection="row" gap={1} alignItems="center">
          {buttonColorTokens.map((color) => (
            <Chip key={color} {...args} variant={variant} color={color} label={color} />
          ))}
        </Flex>
      ))}
    </Flex>
  ),
}

export const Sizes: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Flex flexDirection="row" gap={2} alignItems="center">
      {textInputSizeTokens.map((size) => (
        <Chip key={size} {...args} size={size} label={size} />
      ))}
    </Flex>
  ),
}

export const WithIconAndAvatar: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Flex flexDirection="row" gap={2} alignItems="center">
      <Chip {...args} label="Starred" icon={<Icon name="star" size="1em" color="inherit" />} />
      <Chip {...args} label="Masoud" avatar={<Avatar size="sm">M</Avatar>} variant="outlined" />
    </Flex>
  ),
}

export const Clickable: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => {
    function Counter() {
      const [count, setCount] = useState(0)
      return <Chip {...args} label={`Clicked ${count}`} onClick={() => setCount((n) => n + 1)} />
    }
    return <Counter />
  },
}

// Deleting: through the control, or Backspace and Delete on the focused chip.
export const Deletable: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => {
    function Tags() {
      const [tags, setTags] = useState(['Design', 'Code', 'Ship'])
      return (
        <Flex flexDirection="row" gap={1}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              {...args}
              label={tag}
              deleteLabel={`Remove ${tag}`}
              onDelete={() => setTags((current) => current.filter((entry) => entry !== tag))}
            />
          ))}
        </Flex>
      )
    }
    return <Tags />
  },
}

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => <Chip {...args} onClick={() => {}} onDelete={() => {}} deleteLabel="Remove" />,
}

export const LongLabel: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Flex width="10rem">
      <Chip {...args} label="A label much longer than the room it has" />
    </Flex>
  ),
}
