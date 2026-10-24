import type { ReactNode } from 'react'
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

/** A control's field: its name above, the control under it - the same for every kind. */
function Field({ control, children }: Readonly<{ control: ControlModel; children: ReactNode }>) {
  return (
    <Flex flexDirection="column" gap={1} minWidth={0}>
      <Typography variant="caption" color="secondary" title={control.description} m={0}>
        {control.name}
      </Typography>
      {children}
    </Flex>
  )
}

/** One arg's interactive control, picked Storybook-style from its argTypes entry. */
export function ArgControl({ control, value, disabled, onChange }: Readonly<ArgControlProps>) {
  const { kind, name, defaultValue, options, min, max, step } = control
  if (kind === 'boolean') {
    return (
      <Field control={control}>
        <Switch
          checked={Boolean(value)}
          disabled={disabled}
          size="sm"
          color="primary"
          aria-label={name}
          onChange={(event) => onChange(name, event.target.checked)}
        />
      </Field>
    )
  }
  if (kind === 'select') {
    return (
      <Field control={control}>
        <NativeSelect
          options={options!.map((option) => ({ label: String(option), value: option }))}
          value={(value as ControlOption | undefined) ?? ''}
          // While unset, the component falls back to its documented default.
          placeholder={defaultValue ?? 'unset'}
          disabled={disabled}
          selectProps={{ 'aria-label': name }}
          onChange={(next) => onChange(name, next)}
        />
      </Field>
    )
  }
  if (kind === 'inline-radio') {
    return (
      <Field control={control}>
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
      </Field>
    )
  }
  if (kind === 'range') {
    return (
      <Field control={control}>
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
      </Field>
    )
  }
  // Text and number controls carry a primitive, so the cast keeps this off Object's
  // default stringification.
  const textValue = value === undefined ? '' : String(value as string | number)
  return (
    <Field control={control}>
      <TextInput
        fullWidth
        type={kind === 'number' ? 'number' : 'text'}
        value={textValue}
        placeholder={defaultValue}
        disabled={disabled}
        inputProps={{ 'aria-label': name, min, max, step }}
        onChange={(event) =>
          onChange(name, kind === 'number' ? numberValue(event.target.value) : event.target.value)
        }
      />
    </Field>
  )
}
