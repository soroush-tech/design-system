import type { KeyboardEvent, MouseEvent, ReactNode, SyntheticEvent } from 'react'
import type { SpaceProps } from '@soroush.tech/styled-system'
import { createShouldForwardProp, get, props, space, styled, type Theme } from '../index'
import { useDefaultProps } from '../theme'
import { Icon } from '../Icon'
import { themeDefault } from '../theme/utils/themeDefault'
import { getShapeRadius, type Shape } from '../utils/getShapeRadius'
import { alpha } from '../utils'

export type ChipVariant = 'contained' | 'outlined' | 'text'
export type ChipColor = keyof Theme['palette']
export type ChipSize = keyof Theme['sizes']

export type ChipShape = Shape

export interface ChipProps extends SpaceProps<Theme> {
  /** What the chip says. */
  label?: ReactNode
  /** Filled, outlined, or only its text - as `Button`'s. Default: `'contained'`. */
  variant?: ChipVariant
  /** Resolves to `theme.palette`. Default: `'default'`. */
  color?: ChipColor
  /** Resolves against `theme.sizes`. Default: `'md'`. */
  size?: ChipSize
  /**
   * Corner shape: `'square'` is 0, `'pill'` a full round, `'rounded'` the radius of `borderRadius`.
   * Default: `'pill'`.
   */
  shape?: ChipShape
  /** The radius of a `'rounded'` chip, resolves against `theme.radii`. Default: `theme.defaults.borderRadius`, else `'md'`. Other shapes ignore it. */
  borderRadius?: keyof Theme['radii']
  /** An icon before the label. An `avatar` takes its place. */
  icon?: ReactNode
  /** An avatar before the label. */
  avatar?: ReactNode
  /** Makes the chip a button. */
  onClick?: (event: MouseEvent<HTMLElement>) => void
  /** Shows a delete control, and deletes on Backspace and Delete too. */
  onDelete?: (event: SyntheticEvent) => void
  /** Names the delete control - no built-in English. */
  deleteLabel?: string
  /** Stays as it is, off. Default: `false`. */
  disabled?: boolean
  className?: string
  'data-testid'?: string
}

interface RootStyle extends SpaceProps<Theme> {
  variant: ChipVariant
  color: ChipColor
  size: ChipSize
  shape: ChipShape
  borderRadius?: keyof Theme['radii']
  isDisabled: boolean
}

// The line of an outlined chip. A text chip keeps the box with a line it does not draw, so the two are one size.
const getLine = (theme: Theme, variant: ChipVariant, color: ChipColor) => {
  if (variant === 'text') return 'transparent'
  return color === 'default' ? get(theme, 'border.default') : get(theme, `palette.${color}.main`)
}

const accent = (theme: Theme, color: ChipColor) =>
  color === 'default' ? get(theme, 'text.initial') : get(theme, `palette.${color}.main`)

// A pill takes the height as its ends' radius, whatever the label.
const getRadius = (theme: Theme, shape: ChipShape, borderRadius?: keyof Theme['radii']) =>
  getShapeRadius(shape, theme.radii[borderRadius ?? themeDefault(theme, 'borderRadius', 'md')])

const ChipRoot = styled('div', {
  name: 'Chip',
  label: 'Chip',
  shouldForwardProp: createShouldForwardProp([
    ...props,
    'variant',
    'color',
    'size',
    'shape',
    'borderRadius',
    'isDisabled',
  ]),
  systemProps: [space],
})<RootStyle>(({ theme, variant, color, size, shape, borderRadius, isDisabled }) => {
  const { paddingTop, paddingBottom, paddingLeft, paddingRight, fontSize } = theme.sizes[size]
  const isContained = variant === 'contained'
  const palette = get(theme, `palette.${color}`)
  return {
    display: 'inline-flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    maxWidth: '100%',
    borderRadius: getRadius(theme, shape, borderRadius),
    fontSize: theme.fontSizes[fontSize],
    lineHeight: get(theme, 'lineHeights.base'),
    fontFamily: get(theme, 'fonts.body'),
    paddingTop: theme.space[paddingTop],
    paddingBottom: theme.space[paddingBottom],
    paddingLeft: theme.space[paddingLeft],
    paddingRight: theme.space[paddingRight],
    gap: theme.space[1],
    ...(isContained
      ? { backgroundColor: palette.main, color: palette.contrastText, border: 'none' }
      : {
          backgroundColor: 'transparent',
          color: accent(theme, color),
          border: `${theme.borderWidths.thin} solid ${getLine(theme, variant, color)}`,
        }),
    ...(isDisabled && { opacity: 0.5, pointerEvents: 'none' as const }),
  }
})

const ChipBody = styled('button', {
  name: 'Chip',
  slot: 'body',
  label: 'ChipBody',
  shouldForwardProp: createShouldForwardProp(['isClickable']),
})<{ isClickable: boolean }>(({ theme, isClickable }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.space[1],
  minWidth: 0,
  margin: 0,
  padding: 0,
  border: 0,
  background: 'none',
  color: 'inherit',
  font: 'inherit',
  borderRadius: 'inherit',
  '&:focus-visible': {
    outline: `${theme.borderWidths.base} solid ${get(theme, 'palette.primary.main')}`,
    outlineOffset: theme.borderWidths.thin,
  },
  ...(isClickable && { cursor: 'pointer' }),
}))

const ChipLabel = styled('span', {
  name: 'Chip',
  slot: 'label',
  label: 'ChipLabel',
})({ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' })

const ChipIconBox = styled('span', {
  name: 'Chip',
  slot: 'icon',
  label: 'ChipIcon',
})({ display: 'inline-flex', flexShrink: 0 })

const ChipAvatar = styled('span', {
  name: 'Chip',
  slot: 'avatar',
  label: 'ChipAvatar',
})({ display: 'inline-flex', flexShrink: 0, marginInlineStart: '-0.25em' })

const ChipDelete = styled('button', {
  name: 'Chip',
  slot: 'deleteIcon',
  label: 'ChipDeleteIcon',
})(({ theme }) => ({
  display: 'inline-flex',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
  margin: 0,
  padding: 0,
  border: 0,
  borderRadius: '50%',
  background: 'none',
  color: 'inherit',
  opacity: 0.7,
  cursor: 'pointer',
  '&:hover': { opacity: 1, backgroundColor: alpha(get(theme, 'text.initial'), 0.12) },
  '&:focus-visible': {
    outline: `${theme.borderWidths.base} solid ${get(theme, 'palette.primary.main')}`,
  },
}))

/**
 * @description A compact tag: a label, an icon or an avatar, and - given `onClick` - a button, and
 * - given `onDelete` - a delete control. A clickable chip is one tab stop; a deletable one deletes
 * through its control and through Backspace and Delete, so the control itself is out of the tab
 * order. Its text is the theme's `contrastText` on the color, so its contrast is the theme's.
 */
export function Chip({
  label,
  variant: variantProp,
  color: colorProp,
  size: sizeProp,
  shape: shapeProp,
  borderRadius: borderRadiusProp,
  icon,
  avatar,
  onClick,
  onDelete,
  deleteLabel: deleteLabelProp,
  disabled = false,
  className,
  'data-testid': dataTestid,
  ...spaceProps
}: Readonly<ChipProps>) {
  const dp = useDefaultProps('Chip')
  const variant = variantProp ?? dp.variant ?? 'contained'
  const color = colorProp ?? dp.color ?? 'default'
  const size = sizeProp ?? dp.size ?? 'md'
  const shape = shapeProp ?? dp.shape ?? 'pill'
  const borderRadius = borderRadiusProp ?? dp.borderRadius
  const deleteLabel = deleteLabelProp ?? dp.deleteLabel
  const isClickable = onClick !== undefined
  const isDeletable = onDelete !== undefined

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!isDeletable || (event.key !== 'Backspace' && event.key !== 'Delete')) return
    event.preventDefault()
    onDelete(event)
  }

  return (
    <ChipRoot
      variant={variant}
      color={color}
      size={size}
      shape={shape}
      borderRadius={borderRadius}
      isDisabled={disabled}
      className={className}
      data-testid={dataTestid}
      {...spaceProps}
    >
      <ChipBody
        as={isClickable ? 'button' : 'span'}
        type={isClickable ? 'button' : undefined}
        // A chip that only deletes still needs the focus, for the keys.
        tabIndex={!isClickable && isDeletable && !disabled ? 0 : undefined}
        disabled={isClickable ? disabled : undefined}
        isClickable={isClickable}
        onClick={onClick}
        onKeyDown={handleKeyDown}
      >
        {avatar ? <ChipAvatar>{avatar}</ChipAvatar> : null}
        {!avatar && icon ? <ChipIconBox>{icon}</ChipIconBox> : null}
        <ChipLabel>{label}</ChipLabel>
      </ChipBody>
      {isDeletable && (
        <ChipDelete
          type="button"
          tabIndex={-1}
          aria-label={deleteLabel}
          disabled={disabled}
          onClick={onDelete}
        >
          <Icon name="close" size="1em" color="inherit" />
        </ChipDelete>
      )}
    </ChipRoot>
  )
}
