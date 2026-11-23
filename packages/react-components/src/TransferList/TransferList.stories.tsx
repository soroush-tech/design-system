import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Flex } from '../Flex'
import { FormControl } from '../FormControl'
import { FormHelperText } from '../FormHelperText'
import { FormLabel } from '../FormLabel'
import { Typography } from '../Typography'
import { View } from '../View'
import { ThemeProvider } from '../theme'
import { baseTheme, createTheme } from '../theme/themes'
import { m, p } from '../utils/test/storiesArgs'
import { buttonColorTokens, textInputSizeTokens } from '../utils/test/storiesOptions'
import { exampleArgs } from '../utils/test/renderExample'
import { transferListCatalog } from './TransferList.catalog'
import { TransferList, type TransferListProps, type TransferListValue } from './TransferList'

const meta: Meta<typeof TransferList> = {
  title: 'Theme/TransferList',
  component: TransferList,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        'defaultValue',
        'leftLabel',
        'rightLabel',
        'shouldShowMoveAll',
        'hasSelectAll',
        'size',
        'color',
        'error',
        'disabled',
        'p',
        'm',
      ],
    },
  },
  args: exampleArgs(transferListCatalog.example),
  decorators: [
    (Story) => (
      <View width="36rem" maxWidth="100%">
        <Story />
      </View>
    ),
  ],
  argTypes: {
    defaultValue: {
      control: 'object',
      description:
        'The values on the right at first, when uncontrolled. Changing it starts the story over.',
      table: { category: 'Content', defaultValue: { summary: '[]' } },
    },
    leftLabel: {
      control: 'text',
      description: "The left list's title, which names it - no built-in English.",
      table: { category: 'Content' },
    },
    rightLabel: {
      control: 'text',
      description: "The right list's title, which names it - no built-in English.",
      table: { category: 'Content' },
    },
    shouldShowMoveAll: {
      control: 'boolean',
      description: 'Adds the buttons that move every enabled item at once.',
      table: { category: 'Visual', defaultValue: { summary: 'false' } },
    },
    hasSelectAll: {
      control: 'boolean',
      description:
        "A checkbox in each list's header - all, some or none - and the count beside it.",
      table: { category: 'Visual', defaultValue: { summary: 'false' } },
    },
    size: {
      control: { type: 'select' },
      options: textInputSizeTokens,
      description: "The checkboxes' and buttons' size - resolves against `theme.sizes`.",
      table: { category: 'Layout', defaultValue: { summary: 'md' } },
    },
    color: {
      control: { type: 'select' },
      options: buttonColorTokens,
      description: "The checkboxes' and buttons' color - resolves to `theme.palette`.",
      table: { category: 'Visual' },
    },
    error: {
      control: 'boolean',
      description: 'The lists take the error color.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Dimmed, every checkbox and button off.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    p,
    m,
  },
}

export default meta
type Story = StoryObj<typeof TransferList>

// The default value is only the start: changing the control starts the lists over.
export const Default: Story = {
  render: (args) => <TransferList key={JSON.stringify(args.defaultValue)} {...args} />,
}

export const MoveAll: Story = {
  args: { shouldShowMoveAll: true },
  render: (args) => (
    <TransferList
      key={JSON.stringify(args.defaultValue)}
      moveAllRightLabel="Move all right"
      moveAllLeftLabel="Move all left"
      {...args}
    />
  ),
}

export const SelectAll: Story = {
  args: { hasSelectAll: true },
  render: (args) => <TransferList key={JSON.stringify(args.defaultValue)} {...args} />,
}

function Controlled(args: Readonly<TransferListProps>) {
  const [value, setValue] = useState<TransferListValue[]>(['cherry'])
  return (
    <Flex gap={1}>
      <TransferList {...args} value={value} onChange={setValue} />
      <Typography variant="caption">On the right: {value.join(', ') || 'none'}</Typography>
    </Flex>
  )
}

export const ControlledValue: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => <Controlled {...args} />,
}

// A disabled item stays where it is: it can't be checked, and move-all leaves it.
export const DisabledItem: Story = {
  args: { shouldShowMoveAll: true, hasSelectAll: true },
  parameters: { controls: { include: [] } },
  render: (args) => (
    <TransferList
      {...args}
      moveAllRightLabel="Move all right"
      moveAllLeftLabel="Move all left"
      items={[
        { value: 'locked', label: 'Locked', disabled: true },
        { value: 'free', label: 'Free' },
        { value: 'other', label: 'Other' },
      ]}
    />
  ),
}

export const Sizes: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Flex gap={3}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <TransferList key={size} {...args} size={size} />
      ))}
    </Flex>
  ),
}

export const States: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Flex gap={3}>
      <TransferList {...args} error />
      <TransferList {...args} disabled />
    </Flex>
  ),
}

// A FormControl: its label names the group, its helper text describes it.
export const InFormControl: Story = {
  parameters: { controls: { include: ['size', 'color', 'error', 'disabled'] } },
  render: ({ error, disabled, size, color, items, ...args }) => (
    <FormControl error={error} disabled={disabled} size={size} color={color}>
      <FormLabel>Fruit</FormLabel>
      <TransferList
        items={items}
        leftLabel={args.leftLabel}
        rightLabel={args.rightLabel}
        moveRightLabel={args.moveRightLabel}
        moveLeftLabel={args.moveLeftLabel}
      />
      <FormHelperText>{error ? 'Choose at least one.' : 'Choose any.'}</FormHelperText>
    </FormControl>
  ),
}

// Right to left the lists swap sides and the chevrons turn around.
export const RightToLeft: Story = {
  render: (args) => (
    <View dir="rtl">
      <TransferList {...args} />
    </View>
  ),
}

const customized = createTheme(baseTheme, {
  components: {
    TransferList: {
      defaultProps: {
        shouldShowMoveAll: true,
        hasSelectAll: true,
        moveAllRightLabel: 'Move all right',
        moveAllLeftLabel: 'Move all left',
        color: 'secondary',
      },
      styleOverrides: { items: { height: '8rem' } },
    },
  },
})

// Through the theme: every list's buttons, header and color, and any part's style.
export const Customized: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <ThemeProvider theme={customized}>
      <TransferList
        items={args.items}
        leftLabel={args.leftLabel}
        rightLabel={args.rightLabel}
        moveRightLabel={args.moveRightLabel}
        moveLeftLabel={args.moveLeftLabel}
      />
    </ThemeProvider>
  ),
}
