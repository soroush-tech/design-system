import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { formSizeTokens, formColorTokens, textColorTokens } from '../utils/test/storiesOptions'
import { FormControl } from '../FormControl'
import { FormLabel } from '../FormLabel'
import { FormHelperText } from '../FormHelperText'
import { TextInput } from '../TextInput'
import { Button } from '../Button'
import { Checkbox } from '../Checkbox'
import { InputRange } from '../InputRange'
import { MenuItem } from '../MenuItem'
import { NativeSelect } from '../NativeSelect'
import { NumberField } from '../NumberField'
import { Radio } from '../Radio'
import { Rating } from '../Rating'
import { Select } from '../Select'
import { Switch } from '../Switch'
import { TransferList } from '../TransferList'
import { Flex } from '../Flex'
import { Form } from './Form'

const meta: Meta<typeof Form> = {
  title: 'Theme/Form',
  component: Form,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { include: ['size', 'color', 'textColor', 'disabled', 'fullWidth'] },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: formSizeTokens,
      description: 'Default control size for every field.',
      table: { category: 'Visual', defaultValue: { summary: 'md' } },
    },
    color: {
      control: { type: 'select' },
      options: formColorTokens,
      description: 'Default accent color for every field.',
      table: { category: 'Visual' },
    },
    textColor: {
      control: { type: 'select' },
      options: textColorTokens,
      description:
        "Default text color for every field's label/helper/input - resolves against `theme.text`.",
      table: { category: 'Visual' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables every field.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretches every field to fill its container.',
      table: { category: 'Layout', defaultValue: { summary: 'false' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof Form>

export const Default: Story = {
  args: { size: 'md', color: 'primary', fullWidth: true },
  render: (args) => (
    <Form {...args} onSubmit={(event) => event.preventDefault()}>
      <Flex flexDirection="column" gap={4} maxWidth="420px">
        <FormControl>
          <Flex flexDirection="column" gap={1} alignItems="flex-start">
            <FormLabel>Name</FormLabel>
            <TextInput variant="outlined" placeholder="John Smith" />
          </Flex>
        </FormControl>
        <FormControl>
          <Flex flexDirection="column" gap={1} alignItems="flex-start">
            <FormLabel>Email</FormLabel>
            <TextInput variant="outlined" placeholder="me@example.com" />
            <FormHelperText>We'll never share it.</FormHelperText>
          </Flex>
        </FormControl>
      </Flex>
    </Form>
  ),
}

const platformOptions = [
  { value: 'web', label: 'Web' },
  { value: 'android', label: 'Android' },
  { value: 'ios', label: 'iOS' },
]

const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
]

// A radio is controlled: the pair keeps which one is chosen.
function Plans() {
  const [plan, setPlan] = useState('a')
  return (
    <>
      {['a', 'b'].map((value) => (
        <Radio
          key={value}
          id={`every-input-radio-${value}`}
          name="every-input-radio"
          value={value}
          checked={plan === value}
          onChange={() => setPlan(value)}
        >
          Radio {value.toUpperCase()}
        </Radio>
      ))}
    </>
  )
}

// One of every input, each in the form's defaults - its size, color, disabled and width.
export const EveryInput: Story = {
  args: { size: 'md', color: 'primary', fullWidth: true },
  parameters: { controls: { include: ['size', 'color', 'textColor', 'disabled', 'fullWidth'] } },
  render: (args) => (
    <Form {...args} onSubmit={(event) => event.preventDefault()}>
      <Flex flexDirection="column" gap={4} maxWidth="520px">
        <FormControl>
          <FormLabel>Text</FormLabel>
          <TextInput variant="outlined" placeholder="John Smith" />
          <FormHelperText>A line of text.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Number</FormLabel>
          <NumberField
            variant="outlined"
            defaultValue={3}
            min={0}
            max={10}
            incrementLabel="Increase"
            decrementLabel="Decrease"
          />
          <FormHelperText>Typed or stepped, from 0 to 10.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Native select</FormLabel>
          <NativeSelect variant="outlined" options={platformOptions} placeholder="Platform" />
        </FormControl>
        <FormControl>
          <FormLabel>Select</FormLabel>
          <Select variant="outlined" placeholder="Platform">
            {platformOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Range</FormLabel>
          <InputRange defaultValue={30} valueLabel="auto" />
        </FormControl>
        <FormControl>
          <FormLabel>Rating</FormLabel>
          <Rating defaultValue={3} />
        </FormControl>
        <FormControl>
          <FormLabel>Transfer</FormLabel>
          <TransferList
            items={fruits}
            defaultValue={['cherry']}
            leftLabel="Choices"
            rightLabel="Chosen"
            moveRightLabel="Move right"
            moveLeftLabel="Move left"
          />
        </FormControl>
        <Flex flexDirection="column" gap={1}>
          <Checkbox id="every-input-checkbox">Checkbox</Checkbox>
          <Plans />
          <Switch id="every-input-switch">Switch</Switch>
        </Flex>
        <Button type="submit">Submit</Button>
      </Flex>
    </Form>
  ),
}
