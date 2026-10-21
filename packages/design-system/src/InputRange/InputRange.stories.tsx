import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Flex } from '../Flex'
import { FormControl } from '../FormControl'
import { FormHelperText } from '../FormHelperText'
import { FormLabel } from '../FormLabel'
import { NumberField } from '../NumberField'
import { Typography } from '../Typography'
import { View } from '../View'
import { ThemeProvider } from '../theme'
import { baseTheme, createTheme } from '../theme/themes'
import { height, m, maxWidth, minWidth, p, width } from '../utils/test/storiesArgs'
import {
  buttonColorTokens,
  inputRangeOrientationTokens,
  inputRangeTrackTokens,
  inputRangeValueLabelTokens,
  textInputSizeTokens,
} from '../utils/test/storiesOptions'
import { exampleArgs } from '../utils/test/renderExample'
import { inputRangeCatalog } from './InputRange.catalog'
import { InputRange, type InputRangeProps } from './InputRange'

const meta: Meta<typeof InputRange> = {
  title: 'Theme/InputRange',
  component: InputRange,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        'defaultValue',
        'min',
        'max',
        'step',
        'shiftStep',
        'marks',
        'orientation',
        'track',
        'valueLabel',
        'shouldSwapThumbs',
        'size',
        'color',
        'error',
        'disabled',
        'name',
        'aria-label',
        'p',
        'm',
        'width',
        'height',
        'minWidth',
        'maxWidth',
      ],
    },
  },
  args: exampleArgs(inputRangeCatalog.example),
  decorators: [
    (Story) => (
      <View width="24rem" maxWidth="100%">
        <Story />
      </View>
    ),
  ],
  argTypes: {
    defaultValue: {
      control: 'object',
      description:
        'The value at first, when uncontrolled - a number, or an array for a range. Changing it starts the story over.',
      table: { category: 'Content', defaultValue: { summary: 'min' } },
    },
    min: {
      control: 'number',
      description: 'The least value.',
      table: { category: 'Behavior', defaultValue: { summary: '0' } },
    },
    max: {
      control: 'number',
      description: 'The greatest value.',
      table: { category: 'Behavior', defaultValue: { summary: '100' } },
    },
    step: {
      control: 'number',
      description: 'The step - empty limits the value to `marks`.',
      table: { category: 'Behavior', defaultValue: { summary: '1' } },
    },
    shiftStep: {
      control: 'number',
      description: 'The step of PageUp, PageDown and Shift with an arrow.',
      table: { category: 'Behavior', defaultValue: { summary: '10' } },
    },
    marks: {
      control: 'boolean',
      description: 'Marks every step. Marks with labels are given as an array - see CustomMarks.',
      table: { category: 'Visual', defaultValue: { summary: 'false' } },
    },
    orientation: {
      control: { type: 'inline-radio' },
      options: inputRangeOrientationTokens,
      description: 'Horizontal, or standing up.',
      table: { category: 'Layout', defaultValue: { summary: 'horizontal' } },
    },
    track: {
      control: { type: 'select' },
      options: [...inputRangeTrackTokens, false],
      description: "The line between the thumbs - 'inverted' fills the rest, false draws none.",
      table: { category: 'Visual', defaultValue: { summary: 'normal' } },
    },
    valueLabel: {
      control: { type: 'inline-radio' },
      options: inputRangeValueLabelTokens,
      description: 'When a thumb shows its value: never, while hovered or focused, or always.',
      table: { category: 'Visual', defaultValue: { summary: 'off' } },
    },
    shouldSwapThumbs: {
      control: 'boolean',
      description: 'A thumb passes its neighbour. Without it, it stops there.',
      table: { category: 'Behavior', defaultValue: { summary: 'true' } },
    },
    size: {
      control: { type: 'select' },
      options: textInputSizeTokens,
      description: "The thumb's size and the rail's thickness - resolves against `theme.icon`.",
      table: { category: 'Layout', defaultValue: { summary: 'md' } },
    },
    color: {
      control: { type: 'select' },
      options: buttonColorTokens,
      description: "The track's and the thumbs' color - resolves to `theme.palette`.",
      table: { category: 'Visual', defaultValue: { summary: 'primary' } },
    },
    error: {
      control: 'boolean',
      description: 'The track and thumbs take the error color.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Dimmed, the inputs off and the pointer doing nothing.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    name: {
      control: 'text',
      description: 'What a form submits each thumb as.',
      table: { category: 'Behavior' },
    },
    'aria-label': {
      control: 'text',
      description: 'Names the thumb - or its FormLabel does, in a FormControl.',
      table: { category: 'Content' },
    },
    p,
    m,
    width,
    height,
    minWidth,
    maxWidth,
  },
}

export default meta
type Story = StoryObj<typeof InputRange>

// The default value is only the start: changing the control starts the slider over.
export const Default: Story = {
  render: (args) => <InputRange key={JSON.stringify(args.defaultValue)} {...args} />,
}

const priceLabel = (index: number) => (index === 0 ? 'Least price' : 'Greatest price')

export const Range: Story = {
  args: { defaultValue: [20, 70], 'aria-label': undefined, valueLabel: 'auto' },
  render: (args) => (
    <InputRange key={JSON.stringify(args.defaultValue)} getAriaLabel={priceLabel} {...args} />
  ),
}

function Controlled(args: Readonly<InputRangeProps>) {
  const [value, setValue] = useState<number | number[]>(30)
  return (
    <Flex gap={1}>
      <InputRange {...args} value={value} onChange={(_event, next) => setValue(next)} />
      <Typography variant="caption">Value: {String(value)}</Typography>
    </Flex>
  )
}

export const ControlledValue: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => <Controlled {...args} />,
}

export const Marks: Story = {
  args: { defaultValue: 30, step: 10, marks: true, min: 10, max: 110 },
  render: (args) => <InputRange key={JSON.stringify(args.defaultValue)} {...args} />,
}

const labelled = [
  { value: 0, label: '0°C' },
  { value: 20, label: '20°C' },
  { value: 37, label: '37°C' },
  { value: 100, label: '100°C' },
]

export const CustomMarks: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => <InputRange {...args} defaultValue={20} step={10} marks={labelled} />,
}

// With no step the value is one of the marks: the keys go from mark to mark.
export const RestrictedToMarks: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => <InputRange {...args} defaultValue={20} step={null} marks={labelled} />,
}

export const ValueLabelAlwaysShown: Story = {
  args: { valueLabel: 'on', defaultValue: 40 },
  render: (args) => (
    <View paddingTop={4}>
      <InputRange key={JSON.stringify(args.defaultValue)} {...args} />
    </View>
  ),
}

export const Vertical: Story = {
  args: { orientation: 'vertical', defaultValue: 40, marks: true, step: 20 },
  decorators: [(Story) => <Story />],
  render: (args) => <InputRange key={JSON.stringify(args.defaultValue)} {...args} />,
}

export const WithoutTrack: Story = {
  args: { track: false, defaultValue: [20, 37, 50] },
  render: (args) => <InputRange {...args} getAriaLabel={(index) => `Thumb ${index + 1}`} />,
}

export const InvertedTrack: Story = {
  args: { track: 'inverted', defaultValue: [30, 60], 'aria-label': undefined },
  render: (args) => <InputRange {...args} getAriaLabel={priceLabel} />,
}

// Thumbs that stop at each other keep a distance of their own - here, never closer than 10.
function MinimumDistance(args: Readonly<InputRangeProps>) {
  const [value, setValue] = useState<number[]>([20, 50])
  return (
    <InputRange
      {...args}
      value={value}
      shouldSwapThumbs={false}
      getAriaLabel={priceLabel}
      onChange={(_event, next, activeThumb) => {
        const [least, greatest] = next as number[]
        if (greatest - least < 10) {
          setValue(activeThumb === 0 ? [greatest - 10, greatest] : [least, least + 10])
        } else {
          setValue(next as number[])
        }
      }}
    />
  )
}

export const MinimumDistanceBetweenThumbs: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => <MinimumDistance {...args} />,
}

// The scaled value is shown and announced; the stored one is what moves: here, 2 to the power.
export const NonLinearScale: Story = {
  args: { valueLabel: 'auto', min: 0, max: 10, defaultValue: 4, step: 1 },
  render: (args) => (
    <View paddingTop={4}>
      <InputRange
        key={JSON.stringify(args.defaultValue)}
        {...args}
        scale={(value) => 2 ** value}
        getAriaValueText={(value) => `${value} bytes`}
      />
    </View>
  ),
}

// A slider and a number field on one value: the field is typed, the slider is dragged.
function WithNumberField(args: Readonly<InputRangeProps>) {
  const [value, setValue] = useState<number | null>(30)
  return (
    <Flex gap={2} alignItems="center">
      <View width="14rem">
        <InputRange
          {...args}
          value={value ?? 0}
          onChange={(_event, next) => setValue(next as number)}
        />
      </View>
      <NumberField
        aria-label="Volume value"
        variant="outlined"
        min={0}
        max={100}
        value={value}
        onChange={setValue}
        spinButtons="none"
        width="5rem"
      />
    </Flex>
  )
}

export const WithAnInputField: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => <WithNumberField {...args} />,
}

export const Sizes: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Flex gap={2}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <InputRange key={size} {...args} size={size} aria-label={`Value, ${size}`} />
      ))}
    </Flex>
  ),
}

export const Colors: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Flex gap={2}>
      {(['primary', 'secondary', 'success', 'error'] as const).map((color) => (
        <InputRange key={color} {...args} color={color} aria-label={`Value, ${color}`} />
      ))}
    </Flex>
  ),
}

export const States: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Flex gap={2}>
      <InputRange {...args} error aria-label="Value, in error" />
      <InputRange {...args} disabled aria-label="Value, disabled" />
    </Flex>
  ),
}

// A FormControl: its label targets the first thumb, its helper text describes it.
export const InFormControl: Story = {
  parameters: { controls: { include: ['size', 'color', 'error', 'disabled'] } },
  render: ({ error, disabled, size, color }) => (
    <FormControl error={error} disabled={disabled} size={size} color={color}>
      <FormLabel>Volume</FormLabel>
      <InputRange defaultValue={30} valueLabel="auto" />
      <FormHelperText>{error ? 'Too loud.' : 'Loud or quiet.'}</FormHelperText>
    </FormControl>
  ),
}

// Right to left the slider starts at the right: the arrows and the pointer read from there.
export const RightToLeft: Story = {
  args: { defaultValue: 30, valueLabel: 'auto' },
  render: (args) => (
    <View dir="rtl" paddingTop={4}>
      <InputRange {...args} />
    </View>
  ),
}

const customized = createTheme(baseTheme, {
  components: {
    InputRange: {
      defaultProps: { color: 'success', size: 'lg', valueLabel: 'auto', step: 5 },
      styleOverrides: { rail: { opacity: 0.6 } },
    },
  },
})

// Through the theme: every slider's color, size, step and label, and any part's style.
export const Customized: Story = {
  parameters: { controls: { include: [] } },
  render: () => (
    <ThemeProvider theme={customized}>
      <View paddingTop={4}>
        <InputRange aria-label="Value" defaultValue={40} />
      </View>
    </ThemeProvider>
  ),
}
