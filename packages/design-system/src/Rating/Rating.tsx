import {
  useContext,
  useId,
  useRef,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
  type SyntheticEvent,
} from 'react'
import type { SpaceProps } from '@soroush.tech/styled-system'
import { createShouldForwardProp, get, props, space, styled, type Theme } from '../index'
import { useDefaultProps } from '../theme'
import { useFormControl } from '../FormControl'
import { FormControlContext } from '../FormControl/FormControlContext'
import { Icon } from '../Icon'
import { useRating } from './hooks/useRating'
import { roundToPrecision } from './utils/precision'

export interface RatingProps extends SpaceProps<Theme> {
  /** The rating - `null` for none. Controlled with `onChange`. */
  value?: number | null
  /** The rating at first, when uncontrolled. */
  defaultValue?: number | null
  /** Fired when the rating changes - `null` when it is cleared. */
  onChange?: (event: SyntheticEvent<HTMLInputElement>, value: number | null) => void
  /** Fired as the hovered value changes - `-1` when the pointer leaves. */
  onChangeActive?: (event: MouseEvent<HTMLElement>, value: number) => void
  /** How many items. Default: `5`. */
  max?: number
  /** The least step - `0.5` for halves. Default: `1`. */
  precision?: number
  /** Only the chosen item is filled, not every one up to it. Default: `false`. */
  highlightSelectedOnly?: boolean
  /** The filled item. Default: the `star` icon. */
  icon?: ReactNode
  /** The empty item. Default: the `star_border` icon. */
  emptyIcon?: ReactNode
  /** The accessible name of an item (and of a read-only rating). Default: its number. */
  getLabelText?: (value: number) => string
  /** Names the "no rating" radio, which clears the rating from the keys - none is drawn without it. */
  emptyLabelText?: string
  /** A display: `role="img"` named by `getLabelText`, not focusable. Default: `false`. */
  readOnly?: boolean
  /** Resolves against `theme.sizes`. Default: its `FormControl`'s, else `'md'`. */
  size?: keyof Theme['sizes']
  /** The filled items' color - resolves to `theme.palette`. Default: its `FormControl`'s, else `'warning'`. */
  color?: keyof Theme['palette']
  disabled?: boolean
  required?: boolean
  /** The empty items take the error color. */
  error?: boolean
  /** Prefixes the radios' names, and submits the rating in a form. Default: generated. */
  name?: string
  /** On the rating's group, which a `FormLabel` names it by. Default: its `FormControl`'s. */
  id?: string
  className?: string
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  'data-testid'?: string
}

const visuallyHidden = {
  position: 'absolute' as const,
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  border: 0,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap' as const,
}

interface RatingRootStyle extends SpaceProps<Theme> {
  size: keyof Theme['sizes']
  color: keyof Theme['palette']
  isDisabled: boolean
  isReadOnly: boolean
  isInField: boolean
}

const RatingRoot = styled('span', {
  name: 'Rating',
  label: 'Rating',
  shouldForwardProp: createShouldForwardProp([
    ...props,
    'size',
    'color',
    'isDisabled',
    'isReadOnly',
    'isInField',
  ]),
  systemProps: [space],
})<RatingRootStyle>(({ theme, size, isDisabled, isReadOnly, isInField }) => ({
  // In a field it is a block, under its label; otherwise it sits in a line, among text or icons.
  display: isInField ? 'flex' : 'inline-flex',
  position: 'relative',
  width: 'min-content',
  fontSize: theme.icon[size],
  lineHeight: 1,
  cursor: isReadOnly ? 'default' : 'pointer',
  ...(isDisabled && { opacity: 0.5, cursor: 'not-allowed' }),
  // A display and a disabled rating take no pointer, so the hover never moves.
  ...((isDisabled || isReadOnly) && { pointerEvents: 'none' as const }),
}))

const focusRing = (theme: Theme, color: keyof Theme['palette']) => {
  const main = get(theme, `palette.${color}.main`)
  return {
    outline: `${theme.borderWidths.base} solid ${main}`,
    outlineOffset: theme.borderWidths.thin,
  }
}

const RatingItem = styled('label', {
  name: 'Rating',
  slot: 'item',
  label: 'RatingItem',
  shouldForwardProp: createShouldForwardProp(['color']),
})<{ color: keyof Theme['palette'] }>(({ theme, color }) => ({
  display: 'block',
  position: 'relative',
  cursor: 'inherit',
  '&:has(input:focus-visible)': focusRing(theme, color),
}))

// The "no rating" radio has no item of its own: its ring is drawn round the whole rating.
const RatingEmptyLabel = styled('label', {
  name: 'Rating',
  slot: 'emptyLabel',
  label: 'RatingEmptyLabel',
  shouldForwardProp: createShouldForwardProp(['color']),
})<{ color: keyof Theme['palette'] }>(({ theme, color }) => ({
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  '&:has(input:focus-visible)': focusRing(theme, color),
}))

const RatingInput = styled('input', {
  name: 'Rating',
  slot: 'input',
  label: 'RatingInput',
})(visuallyHidden)

const RatingText = styled('span', {
  name: 'Rating',
  slot: 'text',
  label: 'RatingText',
})(visuallyHidden)

interface RatingIconStyle {
  color: keyof Theme['palette']
  isFilled: boolean
  isActive: boolean
  isError: boolean
}

// A filled item is in the rating's color; an empty one is quiet, or in the error color.
const getIconColor = (theme: Theme, { color, isFilled, isError }: RatingIconStyle) => {
  if (isFilled) return get(theme, `palette.${color}.main`)
  if (isError) return get(theme, 'palette.error.main')
  return get(theme, 'text.disabled')
}

const activeTransform = (isActive: boolean) => (isActive ? 'scale(1.2)' : 'none')

const RatingIcon = styled('span', {
  name: 'Rating',
  slot: 'icon',
  label: 'RatingIcon',
  shouldForwardProp: createShouldForwardProp(['color', 'isFilled', 'isActive', 'isError']),
})<RatingIconStyle>(({ theme, ...style }) => ({
  display: 'flex',
  flexShrink: 0,
  // As wide as its icon, whatever its label's room: a half-step's label clips it, not squeezes it.
  width: 'max-content',
  // The pointer is the rating's, not the icon's: it keeps hovering as it crosses an item.
  pointerEvents: 'none',
  color: getIconColor(theme, style),
  transition: 'transform 0.2s',
  transform: activeTransform(style.isActive),
  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
}))

// A fractional item: one icon's room shared by the steps in it, each labelling its own part.
const RatingDecimal = styled('span', {
  name: 'Rating',
  slot: 'decimal',
  label: 'RatingDecimal',
  shouldForwardProp: createShouldForwardProp(['isActive']),
})<{ isActive: boolean }>(({ isActive }) => ({
  position: 'relative',
  display: 'flex',
  transition: 'transform 0.2s',
  transform: activeTransform(isActive),
  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
}))

type RatingState = ReturnType<typeof useRating>

interface ItemProps {
  itemValue: number
  isFilled: boolean
  isActive: boolean
  isChecked: boolean
  isInteractive: boolean
  label: string
  labelStyle?: CSSProperties
  icon: ReactNode
  emptyIcon: ReactNode
  name: string
  required: boolean
  disabled: boolean
  color: keyof Theme['palette']
  isError: boolean
  state: Pick<RatingState, 'handleChange' | 'handleClear' | 'handleFocus' | 'handleBlur'>
}

function Item({
  itemValue,
  isFilled,
  isActive,
  isChecked,
  isInteractive,
  label,
  labelStyle,
  icon,
  emptyIcon,
  name,
  required,
  disabled,
  color,
  isError,
  state,
}: Readonly<ItemProps>) {
  const glyph = (
    <RatingIcon color={color} isFilled={isFilled} isActive={isActive} isError={isError}>
      {isFilled ? icon : emptyIcon}
    </RatingIcon>
  )
  if (!isInteractive) {
    return (
      <RatingItem as="span" color={color} style={labelStyle}>
        {glyph}
      </RatingItem>
    )
  }
  return (
    <RatingItem color={color} style={labelStyle}>
      {glyph}
      <RatingText>{label}</RatingText>
      <RatingInput
        type="radio"
        name={name}
        value={itemValue}
        checked={isChecked}
        required={required}
        disabled={disabled}
        onChange={state.handleChange}
        onClick={state.handleClear}
        onFocus={state.handleFocus}
        onBlur={state.handleBlur}
      />
    </RatingItem>
  )
}

/**
 * @description A rating: a row of icons the user sets - or, `readOnly`, shows. A group of visually
 * hidden native radio inputs, so keys (Tab to the rating, the arrows to change it), assistive
 * technology and forms work as the platform's; hovering previews the value, and pressing the
 * chosen item clears it. In a `FormControl` it takes the field's size, color, error and
 * disabled state, and its `FormLabel` names it.
 */
export function Rating({
  value,
  defaultValue,
  onChange,
  onChangeActive,
  max: maxProp,
  precision: precisionProp,
  highlightSelectedOnly: highlightSelectedOnlyProp,
  icon: iconProp,
  emptyIcon: emptyIconProp,
  getLabelText = String,
  emptyLabelText,
  readOnly = false,
  size: sizeProp,
  color: colorProp,
  disabled: disabledProp,
  required: requiredProp,
  error: errorProp,
  name: nameProp,
  id: idProp,
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'data-testid': dataTestid,
  ...spaceProps
}: Readonly<RatingProps>) {
  const dp = useDefaultProps('Rating')
  const isInField = useContext(FormControlContext) !== null
  const fc = useFormControl({
    id: idProp,
    error: errorProp,
    disabled: disabledProp,
    required: requiredProp,
    size: sizeProp ?? dp.size,
    color: colorProp ?? dp.color,
  })
  const color = fc.color ?? 'warning'
  const max = maxProp ?? dp.max ?? 5
  const precision = precisionProp ?? dp.precision ?? 1
  const highlightSelectedOnly = highlightSelectedOnlyProp ?? dp.highlightSelectedOnly ?? false
  const icon = iconProp ?? <Icon name="star" size="1em" color="inherit" />
  const emptyIcon = emptyIconProp ?? <Icon name="star_border" size="1em" color="inherit" />
  const generatedName = useId()
  const name = nameProp ?? generatedName
  // A display draws no radios; a disabled rating draws them off, so a form skips them.
  const isInput = !readOnly

  const rootRef = useRef<HTMLSpanElement>(null)
  const state = useRating({
    value,
    defaultValue,
    precision,
    max,
    rootRef,
    onChange,
    onChangeActive,
  })
  const shown = state.displayValue ?? 0

  const renderItem = (itemValue: number, labelStyle?: CSSProperties, isActive = false) => (
    <Item
      key={itemValue}
      itemValue={itemValue}
      isFilled={highlightSelectedOnly ? itemValue === shown : itemValue <= shown}
      isActive={isActive}
      isChecked={itemValue === state.rounded}
      isInteractive={isInput}
      label={getLabelText(itemValue)}
      labelStyle={labelStyle}
      icon={icon}
      emptyIcon={emptyIcon}
      name={name}
      required={fc.required}
      disabled={fc.disabled}
      color={color}
      isError={fc.error}
      state={state}
    />
  )

  const items = Array.from({ length: max }, (_, index) => {
    const itemValue = index + 1
    const isActive = state.isActive && itemValue === Math.ceil(shown)
    if (precision >= 1) return renderItem(itemValue, undefined, isActive)
    // Below 1, an item holds the steps in it: each label spans just its own part of the icon.
    const steps = Math.round(1 / precision)
    return (
      <RatingDecimal key={itemValue} isActive={isActive}>
        {Array.from({ length: steps }, (__, step) => {
          const stepValue = roundToPrecision(itemValue - 1 + (step + 1) * precision, precision)!
          const isLast = step === steps - 1
          const width = stepValue === state.displayValue ? `${(step + 1) * precision * 100}%` : '0%'
          const labelStyle: CSSProperties | undefined = isLast
            ? undefined
            : { width, overflow: 'hidden', position: 'absolute' }
          return renderItem(stepValue, labelStyle)
        })}
      </RatingDecimal>
    )
  })

  // A display is one image, named by its rating.
  const displayLabel = isInput ? undefined : getLabelText(state.rounded ?? 0)
  const groupProps = isInput
    ? {
        role: 'radiogroup',
        'aria-labelledby': ariaLabelledby ?? fc.labelId,
        'aria-describedby': ariaDescribedby ?? fc['aria-describedby'],
        'aria-required': fc.required || undefined,
        'aria-invalid': fc.error || undefined,
        onMouseMove: state.handleMouseMove,
        onMouseLeave: state.handleMouseLeave,
      }
    : { role: 'img', 'aria-labelledby': ariaLabelledby }

  return (
    <RatingRoot
      ref={rootRef}
      id={fc.id}
      size={fc.size}
      color={color}
      isDisabled={fc.disabled}
      isReadOnly={readOnly}
      isInField={isInField}
      className={className}
      data-testid={dataTestid}
      aria-label={ariaLabel ?? displayLabel}
      {...groupProps}
      {...spaceProps}
    >
      {items}
      {isInput && !fc.disabled && emptyLabelText !== undefined && (
        <RatingEmptyLabel color={color}>
          <RatingInput
            type="radio"
            name={name}
            value=""
            checked={state.rounded === null}
            onChange={state.handleChange}
          />
          <RatingText>{emptyLabelText}</RatingText>
        </RatingEmptyLabel>
      )}
    </RatingRoot>
  )
}
