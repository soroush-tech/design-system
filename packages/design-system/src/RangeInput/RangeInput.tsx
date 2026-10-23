import { Fragment, useId, useRef, type CSSProperties, type ReactNode } from 'react'
import type { LayoutProps, SpaceProps } from '@soroush.tech/styled-system'
import { createShouldForwardProp, get, props, space, styled, system, type Theme } from '../index'
import { useDefaultProps } from '../theme'
import { useFormControl } from '../FormControl'
import { useRangeInput, type RangeInputValue } from './hooks/useRangeInput'
import { getMarks, valueToPercent, type Mark, type Orientation } from './utils/range'

export type { Mark as RangeInputMark } from './utils/range'
export type RangeInputTrack = 'normal' | false | 'inverted'
export type RangeInputValueLabel = 'auto' | 'on' | 'off'

export interface RangeInputProps
  extends
    SpaceProps<Theme>,
    Pick<
      LayoutProps<Theme>,
      'width' | 'height' | 'minWidth' | 'maxWidth' | 'minHeight' | 'maxHeight'
    > {
  /** The value - a number for one thumb, an array for one per entry. Controlled with `onChange`. */
  value?: number | readonly number[]
  /** The value at first, when uncontrolled. Default: `min`. */
  defaultValue?: number | readonly number[]
  /** Fired as the value changes. `event.target` is `{ value, name }`, as a form library reads it. */
  onChange?: (event: Event, value: RangeInputValue, activeThumb: number) => void
  /** Fired when a change is done: on release, and after every key. */
  onChangeCommitted?: (event: Event | React.SyntheticEvent, value: RangeInputValue) => void
  /** Default: `0`. */
  min?: number
  /** Default: `100`. */
  max?: number
  /** The step - `null` limits the value to `marks`. Default: `1`. */
  step?: number | null
  /** The step of PageUp, PageDown and Shift with an arrow. Default: `10`. */
  shiftStep?: number
  /** `true` marks every step; or the marks, each with the label it shows under it. Default: `false`. */
  marks?: boolean | readonly Mark[]
  orientation?: Orientation
  /** The line between the thumbs - `'inverted'` fills the rest, `false` draws none. Default: `'normal'`. */
  track?: RangeInputTrack
  /** The value as it is shown and announced - not what is stored. Default: itself. */
  scale?: (value: number) => number
  /** When a thumb shows its value: always, while hovered or focused, or never. Default: `'off'`. */
  valueLabel?: RangeInputValueLabel
  /** What the label says. Default: the scaled value. */
  formatValueLabel?: (value: number, index: number) => ReactNode
  /** Names each thumb - no built-in text. A range needs one; a single thumb may take `aria-label`. */
  getAriaLabel?: (index: number) => string
  /** The value's text for each thumb, where the number alone isn't clear. */
  getAriaValueText?: (value: number, index: number) => string
  /** A thumb passes its neighbour, taking its place. Without it a thumb stops at its neighbour. Default: `true`. */
  shouldSwapThumbs?: boolean
  /** Resolves against `theme.sizes`. Default: its `FormControl`'s, else `'md'`. */
  size?: keyof Theme['sizes']
  /** The track's and thumbs' color - resolves to `theme.palette`. Default: its `FormControl`'s, else `'primary'`. */
  color?: keyof Theme['palette']
  disabled?: boolean
  /** The track and thumbs take the error color. */
  error?: boolean
  /** What a form submits each thumb's value as. */
  name?: string
  /** On the first thumb's input, which a `FormLabel` targets. Default: its `FormControl`'s. */
  id?: string
  className?: string
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  'data-testid'?: string
}

// ─── Geometry ─────────────────────────────────────────────────────────────────

// How thick the rail is, by size - in `theme.space` steps.
const RAIL: Record<string, 0.25 | 0.5 | 0.75> = { sm: 0.25, md: 0.5, lg: 0.75 }

interface AxisStyle {
  size: keyof Theme['sizes']
  orientation: Orientation
}

const railThickness = (theme: Theme, size: string) => theme.space[RAIL[size] ?? 0.5]

interface RootStyle
  extends
    SpaceProps<Theme>,
    Pick<
      LayoutProps<Theme>,
      'width' | 'height' | 'minWidth' | 'maxWidth' | 'minHeight' | 'maxHeight'
    >,
    AxisStyle {
  isDisabled: boolean
}

const layoutStyles = system({
  width: true,
  height: true,
  minWidth: true,
  maxWidth: true,
  minHeight: true,
  maxHeight: true,
})

const RangeInputRoot = styled('span', {
  name: 'RangeInput',
  label: 'RangeInput',
  shouldForwardProp: createShouldForwardProp([...props, 'size', 'orientation', 'isDisabled']),
  systemProps: [space, layoutStyles],
})<RootStyle>(({ theme, size, orientation, isDisabled }) => {
  const thumb = theme.icon[size]
  const isVertical = orientation === 'vertical'
  return {
    position: 'relative',
    display: 'block',
    boxSizing: 'border-box',
    // Along a column, such as a FormControl's, a horizontal slider takes the whole width.
    ...(!isVertical && { alignSelf: 'stretch' }),
    // The thumbs hang half their width over the ends; this room keeps them inside the layout.
    ...(isVertical
      ? { width: thumb, height: '12rem', marginBlock: `calc(${thumb} / 2)` }
      : { height: thumb, marginInline: `calc(${thumb} / 2)` }),
    // The pointer is the slider's: a touch drags a thumb, not the page.
    touchAction: 'none',
    userSelect: 'none',
    cursor: 'pointer',
    ...(isDisabled && { opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' as const }),
  }
})

interface RailStyle extends AxisStyle {
  color: keyof Theme['palette']
  isInverted: boolean
}

const RangeInputRail = styled('span', {
  name: 'RangeInput',
  slot: 'rail',
  label: 'RangeInputRail',
  shouldForwardProp: createShouldForwardProp(['size', 'orientation', 'color', 'isInverted']),
})<RailStyle>(({ theme, size, orientation, color, isInverted }) => {
  const thickness = railThickness(theme, size)
  // Inverted, the rail is the line and the track the gap between the thumbs.
  const fill = isInverted ? get(theme, `palette.${color}.main`) : get(theme, 'border.light')
  return {
    position: 'absolute',
    borderRadius: theme.radii.sm,
    backgroundColor: fill,
    ...(orientation === 'vertical'
      ? {
          top: 0,
          bottom: 0,
          insetInlineStart: '50%',
          width: thickness,
          marginInlineStart: `calc(${thickness} / -2)`,
        }
      : {
          insetInlineStart: 0,
          insetInlineEnd: 0,
          top: '50%',
          height: thickness,
          marginTop: `calc(${thickness} / -2)`,
        }),
  }
})

interface TrackStyle extends AxisStyle {
  color: keyof Theme['palette']
  isInverted: boolean
  isDragging: boolean
}

const RangeInputTrack = styled('span', {
  name: 'RangeInput',
  slot: 'track',
  label: 'RangeInputTrack',
  shouldForwardProp: createShouldForwardProp([
    'size',
    'orientation',
    'color',
    'isInverted',
    'isDragging',
  ]),
})<TrackStyle>(({ theme, size, orientation, color, isInverted, isDragging }) => {
  const thickness = railThickness(theme, size)
  const fill = isInverted ? get(theme, 'border.light') : get(theme, `palette.${color}.main`)
  return {
    position: 'absolute',
    borderRadius: theme.radii.sm,
    backgroundColor: fill,
    // Following a drag, the line moves with the pointer, not after it.
    transition: isDragging ? 'none' : 'inset 0.1s ease, width 0.1s ease, height 0.1s ease',
    '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
    ...(orientation === 'vertical'
      ? { insetInlineStart: '50%', width: thickness, marginInlineStart: `calc(${thickness} / -2)` }
      : { top: '50%', height: thickness, marginTop: `calc(${thickness} / -2)` }),
  }
})

// ─── Marks ────────────────────────────────────────────────────────────────────

interface MarkStyle extends AxisStyle {
  color: keyof Theme['palette']
  isActive: boolean
}

const RangeInputMark = styled('span', {
  name: 'RangeInput',
  slot: 'mark',
  label: 'RangeInputMark',
  shouldForwardProp: createShouldForwardProp(['size', 'orientation', 'color', 'isActive']),
})<MarkStyle>(({ theme, size, orientation, color, isActive }) => {
  const thickness = railThickness(theme, size)
  return {
    position: 'absolute',
    pointerEvents: 'none',
    opacity: isActive ? 0.5 : 1,
    backgroundColor: isActive
      ? get(theme, `palette.${color}.contrastText`)
      : get(theme, 'text.disabled'),
    ...(orientation === 'vertical'
      ? {
          insetInlineStart: '50%',
          width: thickness,
          height: 2,
          marginInlineStart: `calc(${thickness} / -2)`,
          marginBottom: -1,
        }
      : {
          top: '50%',
          width: 2,
          height: thickness,
          marginTop: `calc(${thickness} / -2)`,
          marginInlineStart: -1,
        }),
  }
})

const RangeInputMarkLabel = styled('span', {
  name: 'RangeInput',
  slot: 'markLabel',
  label: 'RangeInputMarkLabel',
  shouldForwardProp: createShouldForwardProp(['size', 'orientation']),
})<AxisStyle>(({ theme, size, orientation }) => {
  const thumb = theme.icon[size]
  return {
    position: 'absolute',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
    fontSize: theme.fontSizes[0],
    color: get(theme, 'text.secondary'),
    ...(orientation === 'vertical'
      ? { insetInlineStart: `calc(50% + ${thumb})`, transform: 'translateY(50%)' }
      : {
          top: `calc(50% + ${thumb})`,
          transform: 'translateX(-50%)',
          // Its edge is the start edge: right to left, the centering goes the other way.
          '[dir="rtl"] &': { transform: 'translateX(50%)' },
        }),
  }
})

// ─── Thumb ────────────────────────────────────────────────────────────────────

interface ThumbStyle extends AxisStyle {
  color: keyof Theme['palette']
  isActive: boolean
  isPassive: boolean
}

const RangeInputThumb = styled('span', {
  name: 'RangeInput',
  slot: 'thumb',
  label: 'RangeInputThumb',
  shouldForwardProp: createShouldForwardProp([
    'size',
    'orientation',
    'color',
    'isActive',
    'isPassive',
  ]),
})<ThumbStyle>(({ theme, size, orientation, color, isActive, isPassive }) => {
  const thumb = theme.icon[size]
  const main = get(theme, `palette.${color}.main`)
  return {
    position: 'absolute',
    boxSizing: 'border-box',
    width: thumb,
    height: thumb,
    borderRadius: '50%',
    backgroundColor: main,
    // While another thumb is pressed this one is out of the way - and shows no label on hover.
    ...(isPassive && { pointerEvents: 'none' }),
    boxShadow: isActive ? `0 0 0 ${theme.space[1]} ${main}33` : 'none',
    transition: 'box-shadow 0.15s ease',
    '&:hover': { boxShadow: `0 0 0 ${theme.space[1]} ${main}29` },
    '&:has(input:focus-visible)': {
      outline: `${theme.borderWidths.base} solid ${main}`,
      outlineOffset: theme.space[0.5],
    },
    '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
    ...(orientation === 'vertical'
      ? {
          insetInlineStart: '50%',
          marginInlineStart: `calc(${thumb} / -2)`,
          marginBottom: `calc(${thumb} / -2)`,
        }
      : { top: '50%', marginTop: `calc(${thumb} / -2)`, marginInlineStart: `calc(${thumb} / -2)` }),
  }
})

const RangeInputInput = styled('input', {
  name: 'RangeInput',
  slot: 'input',
  label: 'RangeInputInput',
  shouldForwardProp: createShouldForwardProp(['orientation']),
})<{ orientation: Orientation }>(({ orientation }) => ({
  // Over the thumb, so a screen reader's focus box is the thumb's - drawn by it, not by the input.
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  margin: 0,
  padding: 0,
  opacity: 0,
  pointerEvents: 'none',
  ...(orientation === 'vertical' && { writingMode: 'vertical-lr' as const }),
}))

const RangeInputValueLabel = styled('span', {
  name: 'RangeInput',
  slot: 'valueLabel',
  label: 'RangeInputValueLabel',
  shouldForwardProp: createShouldForwardProp(['color', 'orientation', 'isOpen']),
})<{ color: keyof Theme['palette']; orientation: Orientation; isOpen: boolean }>(
  ({ theme, color, orientation, isOpen }) => ({
    position: 'absolute',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
    padding: `${theme.space[0.25]} ${theme.space[1]}`,
    borderRadius: theme.radii.sm,
    fontSize: theme.fontSizes[0],
    lineHeight: 1.4,
    color: get(theme, `palette.${color}.contrastText`),
    backgroundColor: get(theme, `palette.${color}.main`),
    visibility: isOpen ? 'visible' : 'hidden',
    ...(orientation === 'vertical'
      ? {
          insetInlineStart: '100%',
          top: '50%',
          marginInlineStart: theme.space[1],
          transform: 'translateY(-50%)',
        }
      : {
          bottom: '100%',
          insetInlineStart: '50%',
          marginBottom: theme.space[1],
          transform: 'translateX(-50%)',
          '[dir="rtl"] &': { transform: 'translateX(50%)' },
        }),
  })
)

// The thumbs and marks sit along the rail by percent - from the start edge, or the bottom.
const place = (orientation: Orientation, percent: number): CSSProperties =>
  orientation === 'vertical' ? { bottom: `${percent}%` } : { insetInlineStart: `${percent}%` }

/**
 * @description A slider: one value on a range, or two or more thumbs for a range of values.
 * Each thumb is a visually hidden native `<input type="range">`, so the keys (the arrows, Page,
 * Home and End), assistive technology and forms work as the platform's; the pointer drags a thumb,
 * touch included. Marks, a value label, a vertical layout and a track drawn or not or inverted.
 * In a `FormControl` it takes the field's size, color, error, and disabled state, and its
 * `FormLabel` targets the first thumb.
 */
export function RangeInput({
  value,
  defaultValue,
  onChange,
  onChangeCommitted,
  min = 0,
  max = 100,
  step: stepProp,
  shiftStep: shiftStepProp,
  marks: marksProp,
  orientation: orientationProp,
  track: trackProp,
  scale = (entry: number) => entry,
  valueLabel: valueLabelProp,
  formatValueLabel,
  getAriaLabel,
  getAriaValueText,
  shouldSwapThumbs: shouldSwapProp,
  size: sizeProp,
  color: colorProp,
  disabled: disabledProp,
  error: errorProp,
  name,
  id: idProp,
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  'data-testid': dataTestid,
  ...rest
}: Readonly<RangeInputProps>) {
  const dp = useDefaultProps('RangeInput')
  const fc = useFormControl({
    id: idProp,
    error: errorProp,
    disabled: disabledProp,
    size: sizeProp ?? dp.size,
    color: colorProp ?? dp.color,
  })
  const color = fc.error ? 'error' : (fc.color ?? 'primary')
  const step = stepProp === undefined ? (dp.step ?? 1) : stepProp
  const orientation = orientationProp ?? dp.orientation ?? 'horizontal'
  const track = trackProp ?? dp.track ?? 'normal'
  const valueLabel = valueLabelProp ?? dp.valueLabel ?? 'off'
  const marks = getMarks(marksProp ?? false, step, min, max)

  const rootRef = useRef<HTMLSpanElement>(null)
  const baseId = useId()
  const range = useRangeInput({
    value,
    defaultValue,
    min,
    max,
    step,
    shiftStep: shiftStepProp ?? dp.shiftStep ?? 10,
    marks,
    orientation,
    shouldSwapThumbs: shouldSwapProp ?? dp.shouldSwapThumbs ?? true,
    isDisabled: fc.disabled,
    name,
    rootRef,
    onChange,
    onChangeCommitted,
  })

  const { values } = range
  // A thumb has no identity but its place among the thumbs: its key is its place under this slider's id.
  const thumbKeys = values.map((_, position) => `${baseId}-${position}`)
  const trackStart = valueToPercent(range.isRange ? values[0] : min, min, max)
  const trackEnd = valueToPercent(values.at(-1)!, min, max)
  const isInverted = track === 'inverted'
  const axis = { size: fc.size, orientation }
  const isDragging = range.active !== -1

  // A mark is lit while the track - or, inverted, its gap - covers it.
  const isMarkActive = (mark: number) => {
    if (track === false) return false
    const covered = mark >= values[0] && mark <= values.at(-1)!
    return range.isRange || isInverted ? covered !== isInverted : mark <= values[0]
  }

  const trackStyle: CSSProperties =
    orientation === 'vertical'
      ? { bottom: `${trackStart}%`, height: `${trackEnd - trackStart}%` }
      : { insetInlineStart: `${trackStart}%`, width: `${trackEnd - trackStart}%` }

  return (
    <RangeInputRoot
      ref={rootRef}
      isDisabled={fc.disabled}
      className={className}
      data-testid={dataTestid}
      {...axis}
      {...range.rootProps}
      {...rest}
    >
      <RangeInputRail color={color} isInverted={isInverted} {...axis} />
      {track !== false && (
        <RangeInputTrack
          color={color}
          isInverted={isInverted}
          isDragging={isDragging}
          style={trackStyle}
          {...axis}
        />
      )}
      {marks
        .filter((mark) => mark.value >= min && mark.value <= max)
        .map((mark) => (
          <Fragment key={mark.value}>
            <RangeInputMark
              data-mark={mark.value}
              color={color}
              isActive={isMarkActive(mark.value)}
              style={place(orientation, valueToPercent(mark.value, min, max))}
              {...axis}
            />
            {mark.label != null && (
              <RangeInputMarkLabel
                aria-hidden
                style={place(orientation, valueToPercent(mark.value, min, max))}
                {...axis}
              >
                {mark.label}
              </RangeInputMarkLabel>
            )}
          </Fragment>
        ))}
      {values.map((thumbValue, index) => {
        const isShown =
          valueLabel === 'on' ||
          (valueLabel === 'auto' && [range.active, range.hovered, range.focused].includes(index))
        const zIndex = range.lastUsed === index ? 1 : undefined
        const input = range.getInputProps(index)
        return (
          <RangeInputThumb
            key={thumbKeys[index]}
            data-index={index}
            color={color}
            isActive={range.active === index}
            isPassive={range.active !== -1 && range.active !== index}
            style={{ ...place(orientation, valueToPercent(thumbValue, min, max)), zIndex }}
            {...axis}
            {...range.getThumbProps(index)}
          >
            {valueLabel !== 'off' && (
              <RangeInputValueLabel
                aria-hidden
                color={color}
                orientation={orientation}
                isOpen={isShown}
              >
                {formatValueLabel ? formatValueLabel(scale(thumbValue), index) : scale(thumbValue)}
              </RangeInputValueLabel>
            )}
            <RangeInputInput
              type="range"
              orientation={orientation}
              data-index={index}
              id={index === 0 ? fc.id : undefined}
              name={name}
              min={min}
              max={max}
              step={step ?? 'any'}
              value={thumbValue}
              disabled={fc.disabled}
              aria-label={getAriaLabel?.(index) ?? ariaLabel}
              aria-labelledby={ariaLabelledby ?? fc.labelId}
              aria-describedby={ariaDescribedby ?? fc['aria-describedby']}
              aria-invalid={fc.error || undefined}
              aria-orientation={orientation}
              aria-valuemin={scale(min)}
              aria-valuemax={scale(max)}
              aria-valuenow={scale(thumbValue)}
              aria-valuetext={getAriaValueText?.(scale(thumbValue), index)}
              {...input}
            />
          </RangeInputThumb>
        )
      })}
    </RangeInputRoot>
  )
}
