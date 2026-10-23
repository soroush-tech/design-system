import { cloneElement, isValidElement, useId, type ReactElement, type ReactNode } from 'react'
import type { SpaceProps } from '@soroush.tech/styled-system'
import { createShouldForwardProp, get, props, space, styled, type Theme } from '../index'
import { useDefaultProps } from '../theme'

export type BadgeVariant = 'standard' | 'dot'
export type BadgeOverlap = 'rectangular' | 'circular'
export type BadgeColor = keyof Theme['palette']

export interface BadgeAnchorOrigin {
  vertical: 'top' | 'bottom'
  /** `'end'` is the right side, and the left in a right-to-left page. */
  horizontal: 'start' | 'end'
}

export interface BadgeProps extends SpaceProps<Theme> {
  /** What the badge sits over. */
  children?: ReactNode
  /** The count or the text. */
  badgeContent?: ReactNode
  /** Above it, a number shows as `99+` - the number given. Default: `99`. */
  max?: number
  /** A count, or only a dot. Default: `'standard'`. */
  variant?: BadgeVariant
  /** Resolves to `theme.palette`. Default: `'error'`. */
  color?: BadgeColor
  /** Draws no badge. Default: `false`. */
  isHidden?: boolean
  /** Draws a badge for a count of zero. Default: `false`. */
  shouldShowZero?: boolean
  /** The corner it sits on - mirrored right to left. Default: `{ vertical: 'top', horizontal: 'end' }`. */
  anchorOrigin?: BadgeAnchorOrigin
  /** Sits on the corner of the box, or on the curve of a circle. Default: `'rectangular'`. */
  overlap?: BadgeOverlap
  /** What a screen reader hears of the badge, with its child - no built-in English. */
  badgeLabel?: string
  className?: string
  'data-testid'?: string
}

const DEFAULT_ANCHOR: BadgeAnchorOrigin = { vertical: 'top', horizontal: 'end' }

const BadgeRoot = styled('span', {
  name: 'Badge',
  label: 'Badge',
  shouldForwardProp: createShouldForwardProp([...props]),
  systemProps: [space],
})({ position: 'relative', display: 'inline-flex', verticalAlign: 'middle', flexShrink: 0 })

interface MarkStyle {
  variant: BadgeVariant
  color: BadgeColor
  anchorOrigin: BadgeAnchorOrigin
  overlap: BadgeOverlap
}

// Pulled halfway over the corner; a circle's corner is its curve, so it is pulled in less.
const getOffset = (overlap: BadgeOverlap) => (overlap === 'circular' ? '14%' : '0')

const BadgeMark = styled('span', {
  name: 'Badge',
  slot: 'badge',
  label: 'BadgeMark',
  shouldForwardProp: createShouldForwardProp(['variant', 'color', 'anchorOrigin', 'overlap']),
})<MarkStyle>(({ theme, variant, color, anchorOrigin, overlap }) => {
  const palette = get(theme, `palette.${color}`)
  const isDot = variant === 'dot'
  const { vertical, horizontal } = anchorOrigin
  const offset = getOffset(overlap)
  const y = vertical === 'top' ? '-50%' : '50%'
  const x = horizontal === 'end' ? '50%' : '-50%'
  return {
    position: 'absolute',
    boxSizing: 'border-box',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    fontFamily: get(theme, 'fonts.body'),
    fontSize: theme.fontSizes[0],
    fontWeight: get(theme, 'fontWeights.medium'),
    lineHeight: 1,
    whiteSpace: 'nowrap',
    backgroundColor: palette.main,
    color: palette.contrastText,
    borderRadius: '9999px',
    ...(isDot
      ? { width: 8, height: 8, minWidth: 8, padding: 0 }
      : { minWidth: 20, height: 20, padding: `0 ${theme.space[1]}` }),
    [vertical]: offset,
    insetInlineEnd: horizontal === 'end' ? offset : 'auto',
    insetInlineStart: horizontal === 'start' ? offset : 'auto',
    transform: `translate(${x}, ${y})`,
    // A transform's x is not logical: right to left, the badge is pulled over the other way.
    '[dir="rtl"] &': { transform: `translate(${horizontal === 'end' ? '-50%' : '50%'}, ${y})` },
  }
})

const VisuallyHidden = styled('span', {
  name: 'Badge',
  slot: 'label',
  label: 'BadgeLabel',
})({
  position: 'absolute',
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  border: 0,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
})

// What shows: a count past `max` as `max+`, anything else as it is.
const getShown = (content: ReactNode, max: number) =>
  typeof content === 'number' && content > max ? `${max}+` : content

const isEmpty = (content: ReactNode) => content === undefined || content === null || content === ''

/**
 * @description A count or a dot anchored over another element. The badge is decoration: it is hidden
 * from assistive technology, and `badgeLabel` is what is heard instead - read with its child, and,
 * for one element, as that element's description. A count over `max` shows as `max+`, and a count
 * of zero shows nothing, unless `shouldShowZero`.
 */
export function Badge({
  children,
  badgeContent,
  max: maxProp,
  variant: variantProp,
  color: colorProp,
  isHidden = false,
  shouldShowZero = false,
  anchorOrigin: anchorOriginProp,
  overlap: overlapProp,
  badgeLabel,
  className,
  'data-testid': dataTestid,
  ...spaceProps
}: Readonly<BadgeProps>) {
  const dp = useDefaultProps('Badge')
  const max = maxProp ?? dp.max ?? 99
  const variant = variantProp ?? dp.variant ?? 'standard'
  const color = colorProp ?? dp.color ?? 'error'
  const anchorOrigin = anchorOriginProp ?? dp.anchorOrigin ?? DEFAULT_ANCHOR
  const overlap = overlapProp ?? dp.overlap ?? 'rectangular'
  const labelId = useId()

  const isEmptyCount = isEmpty(badgeContent) || (badgeContent === 0 && !shouldShowZero)
  const isShown = !isHidden && (variant === 'dot' || !isEmptyCount)
  const hasLabel = isShown && badgeLabel !== undefined

  // One element is described by the badge; anything else is read with it.
  const child =
    hasLabel && isValidElement(children)
      ? cloneElement(children as ReactElement<{ 'aria-describedby'?: string }>, {
          'aria-describedby': [
            (children.props as { 'aria-describedby'?: string })['aria-describedby'],
            labelId,
          ]
            .filter(Boolean)
            .join(' '),
        })
      : children

  return (
    <BadgeRoot className={className} data-testid={dataTestid} {...spaceProps}>
      {child}
      {hasLabel && <VisuallyHidden id={labelId}>{badgeLabel}</VisuallyHidden>}
      {isShown && (
        <BadgeMark
          variant={variant}
          color={color}
          anchorOrigin={anchorOrigin}
          overlap={overlap}
          aria-hidden="true"
        >
          {variant === 'dot' ? null : getShown(badgeContent, max)}
        </BadgeMark>
      )}
    </BadgeRoot>
  )
}
