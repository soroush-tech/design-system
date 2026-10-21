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
import {
  buttonColorTokens,
  ratingPrecisionTokens,
  textInputSizeTokens,
} from '../utils/test/storiesOptions'
import { exampleArgs } from '../utils/test/renderExample'
import { ratingCatalog } from './Rating.catalog'
import { Rating, type RatingProps } from './Rating'

const meta: Meta<typeof Rating> = {
  title: 'Theme/Rating',
  component: Rating,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        'defaultValue',
        'max',
        'precision',
        'highlightSelectedOnly',
        'emptyLabelText',
        'readOnly',
        'disabled',
        'required',
        'error',
        'size',
        'color',
        'name',
        'aria-label',
        'p',
        'm',
      ],
    },
  },
  args: exampleArgs(ratingCatalog.example),
  argTypes: {
    defaultValue: {
      control: { type: 'number', min: 0, step: 0.5 },
      description: 'The rating at first, when uncontrolled - changing it starts the story over.',
      table: { category: 'Content', defaultValue: { summary: 'null' } },
    },
    max: {
      control: { type: 'number', min: 1, max: 12 },
      description: 'How many items.',
      table: { category: 'Layout', defaultValue: { summary: '5' } },
    },
    precision: {
      control: { type: 'select' },
      options: ratingPrecisionTokens,
      description: 'The least step - 0.5 for halves. The rating is rounded to it.',
      table: { category: 'Behavior', defaultValue: { summary: '1' } },
    },
    highlightSelectedOnly: {
      control: 'boolean',
      description: 'Only the chosen item is filled, not every one up to it.',
      table: { category: 'Visual', defaultValue: { summary: 'false' } },
    },
    emptyLabelText: {
      control: 'text',
      description: 'Names the "no rating" radio, which clears the rating from the keys.',
      table: { category: 'Content' },
    },
    readOnly: {
      control: 'boolean',
      description: 'A display: role="img", not focusable, taking no pointer.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Draws the radios off: nothing is submitted, the pointer does nothing.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    required: {
      control: 'boolean',
      description: 'Marks the radios required, and the group aria-required.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    error: {
      control: 'boolean',
      description: 'The empty items take the error color, and the group is aria-invalid.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    size: {
      control: { type: 'select' },
      options: textInputSizeTokens,
      description: "The icons' size - resolves against `theme.icon`.",
      table: { category: 'Layout', defaultValue: { summary: 'md' } },
    },
    color: {
      control: { type: 'select' },
      options: buttonColorTokens,
      description: "The filled items' color - resolves to `theme.palette`.",
      table: { category: 'Visual', defaultValue: { summary: 'warning' } },
    },
    name: {
      control: 'text',
      description: "The radios' name - what a form submits the rating as.",
      table: { category: 'Behavior', defaultValue: { summary: 'generated' } },
    },
    'aria-label': {
      control: 'text',
      description: 'Names the group - or its FormLabel does, in a FormControl.',
      table: { category: 'Content' },
    },
    p,
    m,
  },
}

export default meta
type Story = StoryObj<typeof Rating>

// The default value is only the start: changing the control starts the rating over.
export const Default: Story = {
  render: (args) => <Rating key={String(args.defaultValue)} {...args} />,
}

export const Halves: Story = {
  args: { precision: 0.5, defaultValue: 2.5 },
  render: (args) => <Rating key={String(args.defaultValue)} {...args} />,
}

function Controlled(args: Readonly<RatingProps>) {
  const [value, setValue] = useState<number | null>(2)
  return (
    <Flex gap={1}>
      <Rating {...args} value={value} onChange={(_event, next) => setValue(next)} />
      <Typography variant="caption">Rating: {value ?? 'none'}</Typography>
    </Flex>
  )
}

export const ControlledValue: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => <Controlled {...args} />,
}

// The hover is told as it moves: the label under the pointer, ahead of the choice.
const labels: Record<number, string> = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
}

function WithHoverLabel(args: Readonly<RatingProps>) {
  const [value, setValue] = useState<number | null>(2)
  const [hover, setHover] = useState(-1)
  return (
    <Flex gap={1} alignItems="center">
      <Rating
        {...args}
        precision={0.5}
        value={value}
        onChange={(_event, next) => setValue(next)}
        onChangeActive={(_event, next) => setHover(next)}
        getLabelText={(item) => labels[item]}
      />
      <Typography variant="caption">{labels[hover === -1 ? (value ?? 0) : hover]}</Typography>
    </Flex>
  )
}

export const HoverFeedback: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => <WithHoverLabel {...args} />,
}

export const ReadOnly: Story = {
  args: { readOnly: true, defaultValue: 3.5, precision: 0.5, 'aria-label': 'Average, 3.5 of 5' },
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 2 },
}

export const HighlightSelectedOnly: Story = {
  args: { highlightSelectedOnly: true, defaultValue: 3 },
}

// The rating takes the icons it is given - any node, at the rating's size.
export const CustomIcons: Story = {
  args: {
    defaultValue: 3,
    icon: <span aria-hidden>♥</span>,
    emptyIcon: <span aria-hidden>♡</span>,
    color: 'error',
  },
}

export const Sizes: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Flex gap={1}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Rating key={size} {...args} size={size} aria-label={`Rating, ${size}`} />
      ))}
    </Flex>
  ),
}

export const Colors: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Flex gap={1}>
      {(['warning', 'primary', 'success', 'error'] as const).map((color) => (
        <Rating key={color} {...args} color={color} aria-label={`Rating, ${color}`} />
      ))}
    </Flex>
  ),
}

// A FormControl names it, describes it and gives it its state - its own props still win.
export const InFormControl: Story = {
  parameters: { controls: { include: ['size', 'color', 'error', 'disabled', 'required'] } },
  render: ({ error, disabled, required, size, color }) => (
    <FormControl error={error} disabled={disabled} required={required} size={size} color={color}>
      <FormLabel>Quality</FormLabel>
      <Rating emptyLabelText="No rating" />
      <FormHelperText>{error ? 'Choose a rating.' : 'How was it?'}</FormHelperText>
    </FormControl>
  ),
}

export const RequiredAndInError: Story = {
  parameters: { controls: { include: [] } },
  render: () => (
    <FormControl error required>
      <FormLabel>Quality</FormLabel>
      <Rating />
      <FormHelperText>Choose a rating.</FormHelperText>
    </FormControl>
  ),
}

// Right to left the first item is at the right, and the pointer reads from there.
export const RightToLeft: Story = {
  args: { defaultValue: 2 },
  render: (args) => (
    <View dir="rtl">
      <Rating {...args} />
    </View>
  ),
}

const customized = createTheme(baseTheme, {
  components: {
    Rating: {
      defaultProps: { max: 7, color: 'success', size: 'lg' },
      styleOverrides: { icon: { opacity: 0.9 } },
    },
  },
})

// Through the theme: every rating's length, color and size, and any part's style.
export const Customized: Story = {
  parameters: { controls: { include: [] } },
  render: () => (
    <ThemeProvider theme={customized}>
      <Rating aria-label="Rating" defaultValue={4} />
    </ThemeProvider>
  ),
}
