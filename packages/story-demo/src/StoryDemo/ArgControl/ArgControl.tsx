import { Flex } from '@soroush.tech/design-system/Flex'
import { NativeSelect } from '@soroush.tech/design-system/NativeSelect'
import { Switch } from '@soroush.tech/design-system/Switch'
import { TextInput } from '@soroush.tech/design-system/TextInput'
import { ToggleButton } from '@soroush.tech/design-system/ToggleButton'
import { Typography } from '@soroush.tech/design-system/Typography'
import type { ControlModel, ControlOption } from '../../utils/controlsFor'

export interface ArgControlProps {
  control: ControlModel
  value: unknown
  disabled?: boolean
  onChange: (name: string, value: unknown) => void
}

const numberValue = (text: string): number | undefined => (text === '' ? undefined : Number(text))

/** One arg's interactive control, picked Storybook-style from its argTypes entry. */
export function ArgControl({ control, value, disabled, onChange }: Readonly<ArgControlProps>) {
  const { kind, name, description, defaultValue, options, min, max, step } = control
  if (kind === 'boolean') {
    return (
      <Switch
        checked={Boolean(value)}
        disabled={disabled}
        size="sm"
        color="primary"
        onChange={(event) => onChange(name, event.target.checked)}
      >
        {name}
      </Switch>
    )
  }
  const label = (
    <Typography variant="caption" color="secondary" title={description} m={0}>
      {name}
    </Typography>
  )
  if (kind === 'select') {
    return (
      <Flex flexDirection="column" gap={1}>
        {label}
        <NativeSelect
          options={options!.map((option) => ({ label: String(option), value: option }))}
          value={(value as ControlOption | undefined) ?? ''}
          // While unset, the component falls back to its documented default.
          placeholder={defaultValue ?? 'unset'}
          disabled={disabled}
          selectProps={{ 'aria-label': name }}
          onChange={(next) => onChange(name, next)}
        />
      </Flex>
    )
  }
  if (kind === 'inline-radio') {
    return (
      <Flex flexDirection="column" gap={1}>
        {label}
        <Flex flexDirection="row" gap={1} flexWrap="wrap" role="radiogroup" aria-label={name}>
          {options!.map((option) => (
            <ToggleButton
              key={option}
              value={option}
              size="sm"
              disabled={disabled}
              isSelected={value === option}
              onChange={() => onChange(name, option)}
            >
              {String(option)}
            </ToggleButton>
          ))}
        </Flex>
      </Flex>
    )
  }
  if (kind === 'range') {
    return (
      <Flex flexDirection="column" gap={1}>
        {label}
        <input
          type="range"
          aria-label={name}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          value={typeof value === 'number' ? value : (min ?? 0)}
          onChange={(event) => onChange(name, Number(event.target.value))}
        />
      </Flex>
    )
  }
  // Text and number controls carry a primitive, so the cast keeps this off Object's
  // default stringification.
  const textValue = value === undefined ? '' : String(value as string | number)
  return (
    <Flex flexDirection="column" gap={1}>
      {label}
      <TextInput
        type={kind === 'number' ? 'number' : 'text'}
        value={textValue}
        placeholder={defaultValue}
        disabled={disabled}
        inputProps={{ 'aria-label': name, min, max, step }}
        onChange={(event) =>
          onChange(name, kind === 'number' ? numberValue(event.target.value) : event.target.value)
        }
      />
    </Flex>
  )
}
