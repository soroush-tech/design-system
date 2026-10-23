import type { Meta, StoryObj } from '@storybook/react-vite'
import { Flex } from '../Flex'
import { Icon } from '../Icon'
import { Menu } from '../Menu'
import { MenuItem } from '../MenuItem'
import { View } from '../View'
import { exampleArgs } from '../utils/test/renderExample'
import { buttonColorTokens, textInputSizeTokens } from '../utils/test/storiesOptions'
import { fabCatalog, fabVariantValues } from './Fab.catalog'
import { Fab } from './Fab'

const meta: Meta<typeof Fab> = {
  title: 'Theme/Fab',
  component: Fab,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { include: ['variant', 'color', 'size', 'disabled', 'aria-label'] },
  },
  args: exampleArgs(fabCatalog.example),
  argTypes: {
    variant: {
      control: { type: 'inline-radio' },
      options: fabVariantValues,
      description: 'A circle, or a pill with a label.',
      table: { category: 'Visual', defaultValue: { summary: 'circular' } },
    },
    color: {
      control: { type: 'select' },
      options: buttonColorTokens,
      description: 'Resolves to `theme.palette`.',
      table: { category: 'Visual', defaultValue: { summary: 'primary' } },
    },
    size: {
      control: { type: 'select' },
      options: textInputSizeTokens,
      description: "Its height - and a circle's width - are those of an avatar of it.",
      table: { category: 'Layout', defaultValue: { summary: 'md' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Off.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    'aria-label': {
      control: 'text',
      description: 'Names a fab with no text - a circular one.',
      table: { category: 'Content' },
    },
  },
}

export default meta
type Story = StoryObj<typeof Fab>

const add = <Icon name="add" size="1.25em" color="inherit" />

export const Default: Story = {
  render: (args) => <Fab {...args}>{add}</Fab>,
}

export const Extended: Story = {
  args: { variant: 'extended', 'aria-label': undefined },
  render: (args) => (
    <Fab {...args} startIcon={add}>
      Create
    </Fab>
  ),
}

export const Sizes: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Flex flexDirection="row" gap={2} alignItems="center">
      {textInputSizeTokens.map((size) => (
        <Fab key={size} {...args} size={size} aria-label={`Add, ${size}`}>
          {add}
        </Fab>
      ))}
    </Flex>
  ),
}

export const Colors: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Flex flexDirection="row" gap={2} alignItems="center">
      {buttonColorTokens.map((color) => (
        <Fab key={color} {...args} color={color} aria-label={`Add, ${color}`}>
          {add}
        </Fab>
      ))}
    </Flex>
  ),
}

// A fab is the trigger of a `Menu`: it names the menu, opens it on Enter, Space and a click, and the
// list lines up with its end edge, flipping above it where the window has no room below.
export const WithAMenu: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Flex
      flexDirection="row"
      justifyContent="flex-end"
      alignItems="flex-start"
      width="20rem"
      minHeight="16rem"
    >
      <Menu
        align="end"
        aria-label="Create"
        trigger={
          <Fab {...args} aria-label="Create">
            {add}
          </Fab>
        }
      >
        <MenuItem value="document">New document</MenuItem>
        <MenuItem value="folder">New folder</MenuItem>
        <MenuItem value="upload">Upload a file</MenuItem>
      </Menu>
    </Flex>
  ),
}

export const ExtendedWithAMenu: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Flex
      flexDirection="row"
      justifyContent="flex-end"
      alignItems="flex-start"
      width="20rem"
      minHeight="16rem"
    >
      <Menu
        align="end"
        trigger={
          <Fab {...args} aria-label={undefined} variant="extended" startIcon={add}>
            Create
          </Fab>
        }
      >
        <MenuItem value="document">New document</MenuItem>
        <MenuItem value="folder">New folder</MenuItem>
        <MenuItem value="upload">Upload a file</MenuItem>
      </Menu>
    </Flex>
  ),
}

// The label stays on one line and is cut where the container ends.
export const ExtendedLongLabel: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <View width="12rem">
      <Fab {...args} variant="extended" startIcon={<Icon name="add" color="inherit" />}>
        A label that is far too long for its container
      </Fab>
    </View>
  ),
}

// Margin and padding are theme space keys.
export const Spacing: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Fab {...args} variant="extended" m={3} px={5} startIcon={<Icon name="add" color="inherit" />}>
      Create
    </Fab>
  ),
}

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => <Fab {...args}>{add}</Fab>,
}
