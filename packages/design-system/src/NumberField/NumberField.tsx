import { useContext, useRef, type MouseEvent, type PointerEvent } from 'react'
import type { LayoutProps, SpaceProps } from '@soroush.tech/styled-system'
import { createShouldForwardProp, get, props, space, styled, system, type Theme } from '../index'
import { useDefaultProps, useTheme } from '../theme'
import { useFormControl } from '../FormControl'
import { FormControlContext } from '../FormControl/FormControlContext'
import { Icon, type IconName } from '../Icon'
import { themeDefault } from '../theme/utils/themeDefault'
import { inputVariantStyles } from '../utils/inputVariantStyles'
import { useHoldRepeat } from './hooks/useHoldRepeat'
import { useNumberField } from './hooks/useNumberField'
import { useWheelStep } from './hooks/useWheelStep'

export type NumberFieldVariant = 'default' | 'outlined' | 'text' | 'underline'
export type NumberFieldSpinButtons = 'stacked' | 'sides' | 'none'

export interface NumberFieldProps
  extends SpaceProps<Theme>, Pick<LayoutProps<Theme>, 'width' | 'minWidth' | 'maxWidth'> {
  /** The number - `null` for none. Controlled with `onChange`. */
  value?: number | null
  /** The number at first, when uncontrolled. */
  defaultValue?: number | null
  /** Fired as the number changes - as it is typed, stepped or cleared. */
  onChange?: (value: number | null) => void
  /** Fired when the number is settled: on blur, Enter, a step or Home/End. */
  onChangeCommitted?: (value: number | null) => void
  /** The least number - what is typed or stepped is clamped to it. */
  min?: number
  /** The greatest number. */
  max?: number
  /** What the arrow keys and the buttons step by. Default: `1`. */
  step?: number
  /** The step with Alt held. Default: `0.1`. */
  smallStep?: number
  /** The step with Shift held. Default: `10`. */
  largeStep?: number
  /** How the number is shown - `Intl.NumberFormat` options. Default: every digit, ungrouped. */
  format?: Intl.NumberFormatOptions
  /** How the number is written and read. Default: the document's. */
  locale?: string
  /** A step lands on the grid of `step`, counted from `min` (or 0). Default: `false`. */
  shouldSnapOnStep?: boolean
  /** The mouse wheel steps the number while the field is focused. Default: `false`. */
  shouldScrubOnWheel?: boolean
  /** Where the step buttons are: stacked at the end, either side of the field, or none. Default: `'stacked'`. */
  spinButtons?: NumberFieldSpinButtons
  /** Names the increase button - no built-in text; a theme gives it through `defaultProps`. */
  incrementLabel?: string
  /** Names the decrease button. */
  decrementLabel?: string
  /** The frame: a box, an outline, an underline or none. Default: `theme.defaults.inputVariant`. */
  variant?: NumberFieldVariant
  /** Resolves against `theme.sizes`. Default: its `FormControl`'s, else `'md'`. */
  size?: keyof Theme['sizes']
  /** The focus border color - resolves to `theme.palette`. Default: `'primary'`. */
  color?: keyof Theme['palette']
  /** The number's color - resolves against `theme.text`. Default: `'primary'`. */
  textColor?: keyof Theme['text']
  error?: boolean
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  fullWidth?: boolean
  /** What a form submits the number as. */
  name?: string
  /** On the field, which a `FormLabel` targets. Default: its `FormControl`'s. */
  id?: string
  placeholder?: string
  autoFocus?: boolean
  className?: string
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  'data-testid'?: string
}

// ─── Frame ────────────────────────────────────────────────────────────────────

interface RootStyle
  extends SpaceProps<Theme>, Pick<LayoutProps<Theme>, 'width' | 'minWidth' | 'maxWidth'> {
  color: keyof Theme['palette']
  textColor: keyof Theme['text']
  variant: NumberFieldVariant
  isError: boolean
  isDisabled: boolean
  isFullWidth: boolean
  isInField: boolean
}

const widthStyles = system({ width: true, minWidth: true, maxWidth: true })

// Plain functions, not system(): a transformer returning nested CSS breaks stylis on the server.
const frameStyle = ({
  theme,
  color,
  textColor,
  isError,
  isDisabled,
  isFullWidth,
  isInField,
}: RootStyle & { theme: Theme }) => {
  const main = get(theme, `palette.${color}.main`)
  const border = isError ? get(theme, 'palette.error.main') : get(theme, `palette.${color}.light`)
  const focusBorder = isError ? get(theme, 'palette.error.main') : main
  return {
    // In a field it is a block under its label, as wide as it is; out of one it sits in a line.
    display: isFullWidth || isInField ? 'flex' : 'inline-flex',
    ...(isFullWidth && { width: '100%' }),
    ...(isInField && !isFullWidth && { width: 'fit-content' }),
    alignItems: 'stretch',
    transition: 'border-color 0.15s ease',
    backgroundColor: get(theme, `background.${themeDefault(theme, 'inputBg', 'terminal')}`),
    color: get(theme, `text.${textColor}`),
    fontFamily: get(theme, 'fonts.body'),
    lineHeight: get(theme, 'lineHeights.base'),
    borderColor: border,
    '&:focus-within': { borderColor: focusBorder },
    // Keyboard-only ring on the frame - the input keeps `outline: none`.
    '&:has(input:focus-visible)': { outline: `2px solid ${main}`, outlineOffset: '2px' },
    ...(isDisabled && { opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' as const }),
  }
}

const NumberFieldRoot = styled('div', {
  name: 'NumberField',
  label: 'NumberField',
  shouldForwardProp: createShouldForwardProp([
    ...props,
    'color',
    'textColor',
    'variant',
    'isError',
    'isDisabled',
    'isFullWidth',
    'isInField',
  ]),
  systemProps: [space, widthStyles],
})<RootStyle>(inputVariantStyles, frameStyle)

const NumberFieldInput = styled('input', {
  name: 'NumberField',
  slot: 'input',
  label: 'NumberFieldInput',
  shouldForwardProp: createShouldForwardProp(['sizeToken', 'isCentered']),
})<{ sizeToken: keyof Theme['sizes']; isCentered: boolean }>(({ theme, sizeToken, isCentered }) => {
  const s = theme.sizes[sizeToken]
  return {
    flex: 1,
    minWidth: 0,
    width: '100%',
    border: 'none',
    outline: 'none',
    background: 'transparent',
    color: 'inherit',
    fontFamily: 'inherit',
    lineHeight: 'inherit',
    textAlign: isCentered ? 'center' : 'start',
    paddingTop: theme.space[s.paddingTop],
    paddingBottom: theme.space[s.paddingBottom],
    paddingLeft: theme.space[s.paddingLeft],
    paddingRight: theme.space[s.paddingRight],
    fontSize: theme.fontSizes[s.fontSize],
    '&::placeholder': { color: 'inherit', opacity: 0.5 },
    '&:disabled': { cursor: 'not-allowed' },
  }
})

// ─── Step buttons ─────────────────────────────────────────────────────────────

const NumberFieldSpinButtons = styled('span', {
  name: 'NumberField',
  slot: 'spinButtons',
  label: 'NumberFieldSpinButtons',
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderInlineStart: `${theme.borderWidths.thin} solid`,
  borderColor: 'inherit',
}))

interface SpinStyle {
  color: keyof Theme['palette']
  isSide: boolean
}

const spinStyle = ({ theme, color, isSide }: SpinStyle & { theme: Theme }) => {
  const main = get(theme, `palette.${color}.main`)
  return {
    appearance: 'none' as const,
    display: 'grid',
    placeItems: 'center',
    flex: isSide ? '0 0 auto' : 1,
    minWidth: isSide ? theme.space[5] : theme.icon.lg,
    padding: 0,
    border: 'none',
    background: 'transparent',
    color: 'inherit',
    cursor: 'pointer',
    '&:hover:not(:disabled)': { backgroundColor: `${main}1F` },
    '&:disabled': { opacity: 0.4, cursor: 'default' },
  }
}

const spinProps = createShouldForwardProp(['color', 'isSide'])

// A side button is divided from the field by a line on its inner edge.
const sideDivider = (edge: 'borderInlineStart' | 'borderInlineEnd') => {
  return ({ theme, isSide }: SpinStyle & { theme: Theme }) =>
    isSide ? { [edge]: `${theme.borderWidths.thin} solid`, borderColor: 'inherit' } : {}
}

const NumberFieldIncrement = styled('button', {
  name: 'NumberField',
  slot: 'increment',
  label: 'NumberFieldIncrement',
  shouldForwardProp: spinProps,
})<SpinStyle>(spinStyle, sideDivider('borderInlineStart'))

const NumberFieldDecrement = styled('button', {
  name: 'NumberField',
  slot: 'decrement',
  label: 'NumberFieldDecrement',
  shouldForwardProp: spinProps,
})<SpinStyle>(spinStyle, sideDivider('borderInlineEnd'))

interface SpinButtonProps {
  direction: 1 | -1
  label?: string
  isSide: boolean
  isDisabled: boolean
  color: keyof Theme['palette']
  onStep: (direction: 1 | -1) => void
}

// The glyph: a plus and a minus beside the field, an up and a down chevron stacked at its end.
const getSpinIcon = (direction: 1 | -1, isSide: boolean): IconName => {
  if (isSide) return direction === 1 ? 'add' : 'remove'
  return direction === 1 ? 'expand_less' : 'expand_more'
}

// Out of the tab order - the arrow keys already step - and held, it repeats.
function SpinButton({
  direction,
  label,
  isSide,
  isDisabled,
  color,
  onStep,
}: Readonly<SpinButtonProps>) {
  const hold = useHoldRepeat(() => onStep(direction))
  const Button = direction === 1 ? NumberFieldIncrement : NumberFieldDecrement
  return (
    <Button
      type="button"
      tabIndex={-1}
      aria-label={label}
      disabled={isDisabled}
      color={color}
      isSide={isSide}
      // The field keeps the focus; a press steps at once and, held, again.
      onMouseDown={(event: MouseEvent) => event.preventDefault()}
      onPointerDown={(event: PointerEvent) => event.button === 0 && hold.start()}
      onPointerUp={hold.stop}
      onPointerLeave={hold.stop}
      onPointerCancel={hold.stop}
      // A click with no press before it is a key's or assistive technology's.
      onClick={(event: MouseEvent) => event.detail === 0 && onStep(direction)}
    >
      <Icon name={getSpinIcon(direction, isSide)} size="sm" color="inherit" />
    </Button>
  )
}

/**
 * @description A field for a number: a text input - so what is typed is the user's until it is
 * settled - that reads and writes the number in its locale, clamps it to `min`/`max`, and steps
 * by the arrow keys, Home/End, the wheel and buttons that repeat while held. A
 * `role="spinbutton"`, so the number and its range are announced; a hidden input carries the raw
 * number to a form. In a `FormControl` it takes the field's size, color, error, disabled and
 * required state, and its `FormLabel` targets the field.
 */
export function NumberField({
  value,
  defaultValue,
  onChange,
  onChangeCommitted,
  min,
  max,
  step: stepProp,
  smallStep: smallStepProp,
  largeStep: largeStepProp,
  format,
  locale,
  shouldSnapOnStep: shouldSnapProp,
  shouldScrubOnWheel: shouldScrubProp,
  spinButtons: spinButtonsProp,
  incrementLabel: incrementLabelProp,
  decrementLabel: decrementLabelProp,
  variant: variantProp,
  size: sizeProp,
  color: colorProp,
  textColor: textColorProp,
  error: errorProp,
  disabled: disabledProp,
  readOnly = false,
  required: requiredProp,
  fullWidth: fullWidthProp,
  name,
  id: idProp,
  placeholder,
  autoFocus,
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'data-testid': dataTestid,
  ...rest
}: Readonly<NumberFieldProps>) {
  const theme = useTheme()
  const dp = useDefaultProps('NumberField')
  const isInField = useContext(FormControlContext) !== null
  const fc = useFormControl({
    id: idProp,
    error: errorProp,
    disabled: disabledProp,
    required: requiredProp,
    size: sizeProp ?? dp.size,
    fullWidth: fullWidthProp,
    color: colorProp ?? dp.color,
    textColor: textColorProp,
  })
  const color = fc.color ?? themeDefault(theme, 'color', 'primary')
  const textColor = fc.textColor ?? themeDefault(theme, 'accentTextColor', 'primary')
  const variant = variantProp ?? dp.variant ?? themeDefault(theme, 'inputVariant', 'default')
  const spinButtons = spinButtonsProp ?? dp.spinButtons ?? 'stacked'
  const step = stepProp ?? dp.step ?? 1
  const isFrozen = fc.disabled || readOnly

  const field = useNumberField({
    value,
    defaultValue,
    onChange,
    onChangeCommitted,
    min,
    max,
    step,
    smallStep: smallStepProp ?? dp.smallStep ?? 0.1,
    largeStep: largeStepProp ?? dp.largeStep ?? 10,
    format,
    locale,
    shouldSnapOnStep: shouldSnapProp ?? dp.shouldSnapOnStep ?? false,
    isFrozen,
  })
  const inputRef = useRef<HTMLInputElement>(null)
  useWheelStep(inputRef, shouldScrubProp ?? dp.shouldScrubOnWheel ?? false, field.stepBy)

  const isSide = spinButtons === 'sides'
  const buttonProps = { isSide, color, onStep: field.stepBy }
  const decrement = (
    <SpinButton
      direction={-1}
      label={decrementLabelProp ?? dp.decrementLabel}
      isDisabled={!field.canDecrement}
      {...buttonProps}
    />
  )
  const increment = (
    <SpinButton
      direction={1}
      label={incrementLabelProp ?? dp.incrementLabel}
      isDisabled={!field.canIncrement}
      {...buttonProps}
    />
  )
  // Whole numbers from 0 up need no decimal point or minus on a touch keyboard.
  const inputMode = (min ?? -1) >= 0 && Number.isInteger(step) ? 'numeric' : 'decimal'

  return (
    <NumberFieldRoot
      color={color}
      textColor={textColor}
      variant={variant}
      isError={fc.error}
      isDisabled={fc.disabled}
      isFullWidth={fc.fullWidth}
      isInField={isInField}
      className={className}
      data-testid={dataTestid}
      {...rest}
    >
      {isSide && decrement}
      <NumberFieldInput
        ref={inputRef}
        type="text"
        role="spinbutton"
        inputMode={inputMode}
        autoComplete="off"
        id={fc.id}
        value={field.text}
        placeholder={placeholder}
        autoFocus={autoFocus}
        disabled={fc.disabled}
        readOnly={readOnly}
        required={fc.required}
        sizeToken={fc.size}
        isCentered={isSide}
        aria-valuenow={field.value ?? undefined}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby ?? fc['aria-describedby']}
        aria-invalid={fc.error || undefined}
        onChange={field.handleChange}
        onBlur={field.handleBlur}
        onKeyDown={field.handleKeyDown}
      />
      {name !== undefined && (
        <input type="hidden" name={name} value={field.value ?? ''} disabled={fc.disabled} />
      )}
      {spinButtons === 'stacked' && (
        <NumberFieldSpinButtons>
          {increment}
          {decrement}
        </NumberFieldSpinButtons>
      )}
      {isSide && increment}
    </NumberFieldRoot>
  )
}
