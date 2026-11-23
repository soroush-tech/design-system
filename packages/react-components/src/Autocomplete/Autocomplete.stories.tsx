import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormControl } from '../FormControl'
import { FormLabel } from '../FormLabel'
import { FormHelperText } from '../FormHelperText'
import { View } from '../View'
import { exampleArgs } from '../utils/test/renderExample'
import { autocompleteCatalog, autocompleteVariantValues } from './Autocomplete.catalog'
import { Autocomplete } from './Autocomplete'

const CITIES = ['Berlin', 'Lisbon', 'Oslo', 'Rome', 'Vienna', 'Zurich']
const COUNTRIES = [
  { label: 'Austria', continent: 'Europe' },
  { label: 'Germany', continent: 'Europe' },
  { label: 'Japan', continent: 'Asia' },
  { label: 'Korea', continent: 'Asia' },
]

type Country = (typeof COUNTRIES)[number]

const meta: Meta<typeof Autocomplete> = {
  title: 'Theme/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        'variant',
        'size',
        'color',
        'multiple',
        'shouldAllowFreeText',
        'isLoading',
        'error',
        'disabled',
        'required',
        'fullWidth',
        'placeholder',
        'layer',
      ],
    },
  },
  args: exampleArgs(autocompleteCatalog.example),
  decorators: [
    (Story) => (
      <View padding={8} minHeight="20rem">
        <Story />
      </View>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: autocompleteVariantValues,
      description: 'Frame of the field.',
      table: { category: 'Visual', defaultValue: { summary: "'default'" } },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Resolves against `theme.sizes`.',
      table: { category: 'Visual', defaultValue: { summary: "'md'" } },
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Focus color from `theme.palette`.',
      table: { category: 'Visual', defaultValue: { summary: "'primary'" } },
    },
    multiple: {
      control: 'boolean',
      description: 'Chooses several, each shown as a chip.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    shouldAllowFreeText: {
      control: 'boolean',
      description: 'Takes a typed text that is no option as the value.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows the loading text while nothing is listed.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    error: { control: 'boolean', table: { category: 'State' } },
    disabled: { control: 'boolean', table: { category: 'State' } },
    required: { control: 'boolean', table: { category: 'State' } },
    fullWidth: { control: 'boolean', table: { category: 'Layout' } },
    placeholder: { control: 'text', table: { category: 'Content' } },
    layer: {
      control: { type: 'select' },
      options: ['appBar', 'drawer', 'modal', 'snackbar', 'tooltip'],
      description: 'Stacking layer of the list from `theme.zOrder`.',
      table: { category: 'Layout', defaultValue: { summary: "'modal'" } },
    },
  },
}

export default meta
type Story = StoryObj<typeof Autocomplete>

export const Default: Story = {
  render: (args) => <Autocomplete {...args} options={CITIES} clearLabel="Clear" />,
}

export const Multiple: Story = {
  args: { multiple: true },
  render: (args) => (
    <Autocomplete
      {...args}
      options={CITIES}
      defaultValue={['Oslo', 'Rome']}
      getRemoveLabel={(label) => `Remove ${label}`}
    />
  ),
}

export const FreeText: Story = {
  args: { shouldAllowFreeText: true },
  render: (args) => <Autocomplete {...args} options={CITIES} />,
}

export const Grouped: Story = {
  render: (args) => (
    <Autocomplete<Country>
      {...(args as object)}
      options={COUNTRIES}
      groupBy={(country) => country.continent}
      getOptionLabel={(country) => country.label}
    />
  ),
}

export const Loading: Story = {
  args: { isLoading: true },
  render: (args) => <Autocomplete {...args} options={[]} loadingText="Loading..." />,
}

function ControlledDemo(props: object) {
  const [value, setValue] = useState<string | null>('Lisbon')
  return (
    <Autocomplete<string>
      {...props}
      options={CITIES}
      value={value}
      onChange={(_, next) => setValue(next)}
    />
  )
}

export const Controlled: Story = {
  render: (args) => <ControlledDemo {...args} />,
}

export const InAFormControl: Story = {
  render: (args) => (
    <FormControl>
      <FormLabel>City</FormLabel>
      <Autocomplete {...args} aria-label={undefined} options={CITIES} />
      <FormHelperText>Where you live.</FormHelperText>
    </FormControl>
  ),
}
