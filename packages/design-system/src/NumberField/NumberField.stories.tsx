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
import { m, maxWidth, minWidth, p, width } from '../utils/test/storiesArgs'
import {
  buttonColorTokens,
  numberFieldSpinButtonsTokens,
  numberFieldVariantTokens,
  textColorTokens,
  textInputSizeTokens,
} from '../utils/test/storiesOptions'
import { exampleArgs } from '../utils/test/renderExample'
import { numberFieldCatalog } from './NumberField.catalog'
import { NumberField, type NumberFieldProps } from './NumberField'

const meta: Meta<typeof NumberField> = {
  title: 'Theme/NumberField',
  component: NumberField,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        'defaultValue',
        'min',
        'max',
        'step',
        'smallStep',
        'largeStep',
        'locale',
        'shouldSnapOnStep',
        'shouldScrubOnWheel',
        'spinButtons',
        'incrementLabel',
        'decrementLabel',
        'variant',
        'size',
        'color',
        'textColor',
        'error',
        'disabled',
        'readOnly',
        'required',
        'fullWidth',
        'placeholder',
        'name',
        'aria-label',
        'p',
        'm',
        'width',
        'minWidth',
        'maxWidth',
      ],
    },
  },
  args: exampleArgs(numberFieldCatalog.example),
  argTypes: {
    defaultValue: {
      control: 'number',
      description: 'The number at first, when uncontrolled - changing it starts the story over.',
      table: { category: 'Content', defaultValue: { summary: 'null' } },
    },
    min: {
      control: 'number',
      description: 'The least number - what is typed or stepped is clamped to it.',
      table: { category: 'Behavior' },
    },
    max: {
      control: 'number',
      description: 'The greatest number.',
      table: { category: 'Behavior' },
    },
    step: {
      control: 'number',
      description: 'What the arrow keys and the buttons step by.',
      table: { category: 'Behavior', defaultValue: { summary: '1' } },
    },
    smallStep: {
      control: 'number',
      description: 'The step with Alt held.',
      table: { category: 'Behavior', defaultValue: { summary: '0.1' } },
    },
    largeStep: {
      control: 'number',
      description: 'The step with Shift held.',
      table: { category: 'Behavior', defaultValue: { summary: '10' } },
    },
    locale: {
      control: { type: 'select' },
      options: [undefined, 'en-US', 'de-DE', 'fa-IR', 'ar-EG', 'ja-JP'],
      description: "How the number is written and read - the document's when unset.",
      table: { category: 'Content' },
    },
    shouldSnapOnStep: {
      control: 'boolean',
      description: 'A step lands on the grid of `step`, counted from `min` (or 0).',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    shouldScrubOnWheel: {
      control: 'boolean',
      description: 'The mouse wheel steps the number while the field is focused.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    spinButtons: {
      control: { type: 'select' },
      options: numberFieldSpinButtonsTokens,
      description: 'The step buttons: stacked at the end, either side of the field, or none.',
      table: { category: 'Layout', defaultValue: { summary: 'stacked' } },
    },
    incrementLabel: {
      control: 'text',
      description: 'Names the increase button - no built-in text.',
      table: { category: 'Content' },
    },
    decrementLabel: {
      control: 'text',
      description: 'Names the decrease button.',
      table: { category: 'Content' },
    },
    variant: {
      control: { type: 'select' },
      options: numberFieldVariantTokens,
      description: 'The frame - as on TextInput.',
      table: { category: 'Visual', defaultValue: { summary: 'default' } },
    },
    size: {
      control: { type: 'select' },
      options: textInputSizeTokens,
      description: 'Padding and font size - resolves against `theme.sizes`.',
      table: { category: 'Layout', defaultValue: { summary: 'md' } },
    },
    color: {
      control: { type: 'select' },
      options: buttonColorTokens,
      description: "The focus border and the buttons' hover - resolves to `theme.palette`.",
      table: { category: 'Visual', defaultValue: { summary: 'primary' } },
    },
    textColor: {
      control: { type: 'select' },
      options: textColorTokens,
      description: "The number's color - resolves against `theme.text`.",
      table: { category: 'Visual', defaultValue: { summary: 'primary' } },
    },
    error: {
      control: 'boolean',
      description: 'The error border, and the field `aria-invalid`.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Dimmed, taking no pointer or key.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    readOnly: {
      control: 'boolean',
      description: 'Takes no change: the keys, the wheel and the buttons do nothing.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    required: {
      control: 'boolean',
      description: 'Marks the field required.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Fills its container.',
      table: { category: 'Layout', defaultValue: { summary: 'false' } },
    },
    placeholder: {
      control: 'text',
      description: 'Shown while there is no number.',
      table: { category: 'Content' },
    },
    name: {
      control: 'text',
      description: 'What a form submits the raw number as.',
      table: { category: 'Behavior' },
    },
    'aria-label': {
      control: 'text',
      description: 'Names the field - or its FormLabel does, in a FormControl.',
      table: { category: 'Content' },
    },
    p,
    m,
    width,
    minWidth,
    maxWidth,
  },
}

export default meta
type Story = StoryObj<typeof NumberField>

// The default value is only the start: changing the control starts the field over.
export const Default: Story = {
  render: (args) => <NumberField key={String(args.defaultValue)} {...args} />,
}

export const SpinButtonsOnTheSides: Story = {
  args: { spinButtons: 'sides' },
  render: (args) => <NumberField key={String(args.defaultValue)} {...args} />,
}

export const NoSpinButtons: Story = {
  args: { spinButtons: 'none' },
  render: (args) => <NumberField key={String(args.defaultValue)} {...args} />,
}

function Controlled(args: Readonly<NumberFieldProps>) {
  const [value, setValue] = useState<number | null>(5)
  return (
    <Flex gap={2} alignItems="center">
      <NumberField {...args} value={value} onChange={setValue} />
      <Typography variant="caption">Value: {value ?? 'none'}</Typography>
    </Flex>
  )
}

export const ControlledValue: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => <Controlled {...args} />,
}

// Typed, stepped and settled: onChange as it moves, onChangeCommitted when it is settled.
function Events(args: Readonly<NumberFieldProps>) {
  const [log, setLog] = useState<{ id: number; text: string }[]>([])
  const add = (event: string, value: number | null) =>
    setLog((previous) =>
      [{ id: (previous[0]?.id ?? 0) + 1, text: `${event}: ${value ?? 'none'}` }, ...previous].slice(
        0,
        4
      )
    )
  return (
    <Flex gap={1}>
      <NumberField
        {...args}
        onChange={(value) => add('change', value)}
        onChangeCommitted={(value) => add('committed', value)}
      />
      {log.map((entry) => (
        <Typography key={entry.id} variant="caption">
          {entry.text}
        </Typography>
      ))}
    </Flex>
  )
}

export const ChangeAndCommit: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => <Events {...args} />,
}

export const Formats: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Flex gap={2}>
      <NumberField
        {...args}
        defaultValue={1234.5}
        min={undefined}
        max={undefined}
        aria-label="Plain"
      />
      <NumberField
        {...args}
        defaultValue={1234.5}
        min={undefined}
        max={undefined}
        locale="de-DE"
        format={{ useGrouping: true }}
        aria-label="German"
      />
      <NumberField
        {...args}
        defaultValue={0.25}
        min={0}
        max={1}
        step={0.05}
        format={{ style: 'percent' }}
        aria-label="Percent"
      />
      <NumberField
        {...args}
        defaultValue={19.9}
        min={0}
        max={undefined}
        locale="en-US"
        format={{ style: 'currency', currency: 'USD' }}
        aria-label="Price"
      />
      <NumberField
        {...args}
        defaultValue={12.5}
        min={undefined}
        max={undefined}
        locale="ar-EG"
        aria-label="Arabic digits"
      />
    </Flex>
  ),
}

export const SnapToStep: Story = {
  args: { step: 5, min: 0, max: 100, shouldSnapOnStep: true, defaultValue: 7 },
  render: (args) => <NumberField key={String(args.defaultValue)} {...args} />,
}

export const ScrubWithTheWheel: Story = {
  args: { shouldScrubOnWheel: true },
  render: (args) => <NumberField key={String(args.defaultValue)} {...args} />,
}

export const Variants: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Flex gap={2}>
      {numberFieldVariantTokens.map((variant) => (
        <NumberField
          key={variant}
          {...args}
          variant={variant}
          aria-label={`Quantity, ${variant}`}
        />
      ))}
    </Flex>
  ),
}

export const Sizes: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Flex gap={2}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <NumberField key={size} {...args} size={size} aria-label={`Quantity, ${size}`} />
      ))}
    </Flex>
  ),
}

export const States: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Flex gap={2}>
      <NumberField {...args} error aria-label="Quantity, in error" />
      <NumberField {...args} disabled aria-label="Quantity, disabled" />
      <NumberField {...args} readOnly aria-label="Quantity, read-only" />
    </Flex>
  ),
}

// A FormControl: its label targets the field, its helper text describes it, its state applies.
export const InFormControl: Story = {
  parameters: {
    controls: { include: ['size', 'color', 'error', 'disabled', 'required', 'fullWidth'] },
  },
  render: ({ error, disabled, required, size, color, fullWidth }) => (
    <FormControl
      error={error}
      disabled={disabled}
      required={required}
      size={size}
      color={color}
      fullWidth={fullWidth}
    >
      <FormLabel>Quantity</FormLabel>
      <NumberField
        variant="outlined"
        min={1}
        max={99}
        defaultValue={1}
        incrementLabel="Increase"
        decrementLabel="Decrease"
      />
      <FormHelperText>{error ? 'Choose between 1 and 99.' : 'Between 1 and 99.'}</FormHelperText>
    </FormControl>
  ),
}

// Right to left the field reads and its buttons sit the other way round.
export const RightToLeft: Story = {
  args: { spinButtons: 'sides' },
  render: (args) => (
    <View dir="rtl">
      <NumberField {...args} locale="ar-EG" />
    </View>
  ),
}

const customized = createTheme(baseTheme, {
  components: {
    NumberField: {
      defaultProps: {
        variant: 'outlined',
        spinButtons: 'sides',
        step: 5,
        incrementLabel: 'Augmenter',
        decrementLabel: 'Diminuer',
      },
    },
  },
})

// Through the theme: every field's frame, buttons, steps and their language.
export const Customized: Story = {
  parameters: { controls: { include: [] } },
  render: () => (
    <ThemeProvider theme={customized}>
      <NumberField aria-label="Quantité" defaultValue={10} min={0} max={100} />
    </ThemeProvider>
  ),
}
