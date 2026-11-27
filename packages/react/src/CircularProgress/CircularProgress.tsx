import { type HTMLAttributes } from 'react'
import type { SpaceProps, LayoutProps, PaddingProps } from '@soroush.tech/styled-system'
import { styled, keyframes } from '../style/styled'
import { mergeOverrides, type SlotProps, type StyleOverride } from '../style/overrides'
import type { CircularProgressSlot } from './CircularProgress.types'
import { type Theme } from '../theme/themes'
import { createShouldForwardProp, props } from '@soroush.tech/styled-system/should-forward-prop'
import { space, layout } from '@soroush.tech/styled-system'
import type { ButtonColor } from '../Button'
import { clamp } from '../utils'
import { themeDefault } from '@gild-ui/core/theme'

export type CircularProgressVariant = 'indeterminate' | 'determinate'
export type CircularProgressColor = ButtonColor | 'inherit'
export type CircularProgressEasing = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out'

// HTMLAttributes<HTMLSpanElement> avoids the SVG height/display type conflicts
// that arise when LayoutProps is combined with SVGAttributes.
export interface CircularProgressProps
  extends
    Omit<HTMLAttributes<HTMLSpanElement>, 'style'>,
    Omit<SpaceProps<Theme>, keyof PaddingProps>,
    LayoutProps<Theme> {
  /** Visual variant - looping animation or value-driven arc. Default: `'indeterminate'`. */
  variant?: CircularProgressVariant
  /** Stroke color - resolves to `theme.palette[color].main`; `'inherit'` uses `currentColor`. Default: 'primary', overridable via `theme.defaults.color`. */
  color?: CircularProgressColor
  /** Width and height. Number → px; string → raw CSS unit (e.g. `'3rem'`). Default: `40`. */
  size?: number | string
  /** SVG stroke width in viewBox user units. Default: `3.6`. */
  thickness?: number
  /** Progress value for the `'determinate'` variant. Clamped between `min` and `max`. */
  value?: number
  /** Minimum value for `'determinate'`. Default: `0`. */
  min?: number
  /** Maximum value for `'determinate'`. Default: `100`. */
  max?: number
  /** Disables the stroke shrink/expand animation (`'indeterminate'` only). */
  disableShrink?: boolean
  /** Applies the rotation animation to a `'determinate'` arc - arc length reflects `value` while the spinner still rotates. */
  spinning?: boolean
  /** Timing function for the rotation animation. Default: `'linear'`. */
  easing?: CircularProgressEasing
  /** Renders a faint full-ring track behind the progress arc. Default: `false`. */
  showTrack?: boolean
  /** Overrides the CSS of the root: an entry of `StyleSheet.create`, or a list of them. It wins over `slotProps.root.style`. */
  style?: StyleOverride
  /** Overrides for the slots a theme can style: `style`, `className`, `data-*` and `aria-*`. */
  slotProps?: SlotProps<CircularProgressSlot>
}

const shouldForwardProp = createShouldForwardProp([
  ...props,
  'color',
  'size',
  'thickness',
  'variant',
  'disableShrink',
  'value',
  'min',
  'max',
  'spinning',
  'easing',
  'showTrack',
])

const VIEWBOX = 44
const SIZE_DEFAULT = 40
const THICKNESS_DEFAULT = 3.6

const rotate = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

const dash = keyframes({
  '0%': { strokeDasharray: '1px, 200px', strokeDashoffset: '0px' },
  '50%': { strokeDasharray: '100px, 200px', strokeDashoffset: '-15px' },
  '100%': { strokeDasharray: '100px, 200px', strokeDashoffset: '-125px' },
})

// ─── Internal sub-components ──────────────────────────────────────────────────

const CircularProgressTrack = styled('circle', {
  name: 'CircularProgress',
  slot: 'track',
  label: 'CircularProgressTrack',
})({
  fill: 'none',
  stroke: 'currentColor',
  opacity: 0.2,
})

interface CircleStyle extends Pick<CircularProgressProps, 'variant' | 'disableShrink' | 'easing'> {
  circumference: number
  /** Where the arc ends, in pixels. */
  dashOffset: number
}

const CircularProgressCircle = styled('circle', {
  name: 'CircularProgress',
  slot: 'circle',
  label: 'CircularProgressCircle',
  shouldForwardProp: (prop) =>
    !['variant', 'disableShrink', 'circumference', 'dashOffset', 'easing'].includes(prop),
})<CircleStyle>(({ variant, disableShrink, circumference, dashOffset, easing }) => ({
  fill: 'none',
  stroke: 'currentColor',
  ...(variant === 'indeterminate'
    ? {
        strokeDasharray: '80px, 200px',
        strokeDashoffset: '0px',
        ...(!disableShrink && { animation: `${dash} 1.4s ease-in-out infinite` }),
      }
    : {
        strokeDasharray: `${circumference}px`,
        strokeDashoffset: `${dashOffset}px`,
        transition: `stroke-dashoffset 0.3s ${easing}`,
      }),
}))

// ─── Styling functions ────────────────────────────────────────────────────────

const colorStyle = ({ color: colorProp, theme }: CircularProgressProps & { theme: Theme }) => {
  const color = colorProp ?? themeDefault(theme, 'color', 'primary')
  if (color === 'inherit') return {}
  return { color: theme.palette[color].main }
}

const sizeStyle = ({ size = SIZE_DEFAULT }: CircularProgressProps) => ({
  display: 'inline-flex',
  width: size,
  height: size,
  flexShrink: 0,
  verticalAlign: 'middle',
})

// Rotation applies for indeterminate, or for determinate when spinning=true.
const rotationStyle = ({
  variant = 'indeterminate',
  spinning,
  easing = 'linear',
}: CircularProgressProps) =>
  variant === 'indeterminate' || spinning ? { animation: `${rotate} 1.4s ${easing} infinite` } : {}

const safeLayout = (props: CircularProgressProps & { theme?: Theme }) =>
  layout({ ...props, size: undefined })

// ─── Styled root ──────────────────────────────────────────────────────────────

// Root is a <span> to avoid SVG attribute type conflicts with styled-system's
// LayoutProps (SVGAttributes.height is string|number; LayoutProps.height can be null).
// The <svg> inside is a plain element that fills the span via width/height="100%".
const CircularProgressRoot = styled('span', {
  name: 'CircularProgress',
  label: 'CircularProgress',
  shouldForwardProp,
  systemProps: [space, safeLayout],
})<CircularProgressProps>(colorStyle, sizeStyle, rotationStyle)

// ─── Public component ─────────────────────────────────────────────────────────

export function CircularProgress({
  variant = 'indeterminate',
  // undefined resolves to themeDefault(theme, 'color', 'primary') in the styled layer.
  color,
  size = SIZE_DEFAULT,
  thickness = THICKNESS_DEFAULT,
  value,
  min = 0,
  max = 100,
  disableShrink = false,
  spinning = false,
  easing = 'linear',
  showTrack = false,
  style,
  className,
  slotProps,
  ...rest
}: Readonly<CircularProgressProps>) {
  const r = (VIEWBOX - thickness * 2) / 2
  const circumference = 2 * Math.PI * r
  const normalizedValue = clamp(value ?? min, min, max)

  const dashOffset = circumference * (1 - normalizedValue / max)

  const ariaProps =
    variant === 'determinate'
      ? { 'aria-valuenow': value, 'aria-valuemin': min, 'aria-valuemax': max }
      : {}

  return (
    <CircularProgressRoot
      role="progressbar"
      aria-label="Loading"
      color={color}
      size={size}
      variant={variant}
      spinning={spinning}
      easing={easing}
      {...ariaProps}
      {...rest}
      {...mergeOverrides(slotProps?.root, { style, className })}
    >
      {/* Decorative: the progressbar role and its label are on the root. */}
      <svg viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`} width="100%" height="100%" aria-hidden="true">
        {showTrack && (
          <CircularProgressTrack
            cx={VIEWBOX / 2}
            cy={VIEWBOX / 2}
            r={r}
            strokeWidth={thickness}
            {...slotProps?.track}
          />
        )}
        <CircularProgressCircle
          cx={VIEWBOX / 2}
          cy={VIEWBOX / 2}
          r={r}
          strokeWidth={thickness}
          variant={variant}
          disableShrink={disableShrink}
          circumference={circumference}
          dashOffset={dashOffset}
          easing={easing}
          {...slotProps?.circle}
        />
      </svg>
    </CircularProgressRoot>
  )
}
