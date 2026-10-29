import {
  cloneElement,
  useCallback,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
  type SyntheticEvent,
} from 'react'
import { createShouldForwardProp, get, styled, type Theme } from '../index'
import { useDefaultProps } from '../theme'
import { themeDefault } from '../theme/utils/themeDefault'
import { getSurfaceRadius } from '../utils/getSurfaceRadius'
import { Portal } from '../Portal'
import type { PopoverPosition } from '../Popover/utils/computePopoverPosition'
import { useMergedRefs } from '../Modal/hooks/useMergedRefs'
import {
  useAnchoredPlacement,
  type AnchoredPlacement,
  type PlacementContext,
} from '../utils/useAnchoredPlacement'
import { useTooltip } from './hooks/useTooltip'
import {
  getTooltipOrigins,
  resolveTooltipPlacement,
  type TooltipPlacement,
} from './utils/getTooltipOrigins'

export type { TooltipPlacement } from './utils/getTooltipOrigins'

export interface TooltipSlots {
  root?: ElementType
  arrow?: ElementType
}

type SlotProps = HTMLAttributes<HTMLElement> & { 'data-testid'?: string }

export interface TooltipSlotProps {
  root?: SlotProps
  arrow?: SlotProps
}

/**
 * What a parent that clones its child (a `Menu` with a `Tooltip` for a trigger) hands the tooltip
 * instead: it is not the tooltip's, so it goes on to the child. The tooltip's own props are left out.
 */
export type TooltipForwardedProps = Omit<
  HTMLAttributes<HTMLElement>,
  'title' | 'children' | 'className' | 'color'
> & { ref?: Ref<HTMLElement> }

export interface TooltipProps extends TooltipForwardedProps {
  /**
   * The one element the tooltip is about - it holds a `ref` and takes the handlers. Without it, the
   * tooltip is at `anchorPosition`, and open when `isOpen` says so.
   */
  children?: ReactElement
  /**
   * A point in the window - client coordinates, as Popover's - to place the tooltip at instead of
   * beside the child: a hint that depends on where the pointer is. It follows the point and the
   * `title` as they change.
   */
  anchorPosition?: PopoverPosition
  /** What the tooltip says. Nothing says no tooltip. */
  title?: ReactNode
  /** The side of the child it sits on, and the end it lines up with; `auto` takes the side with the most room. Flips for want of room. Default: `'top'`. */
  placement?: TooltipPlacement
  /** Swaps the element a part is drawn as - it keeps its styles. `root` is the surface. */
  slots?: TooltipSlots
  /** Props for a part: they are put first, so the tooltip's own `ref`, `id`, `role`, pointer handlers and the arrow's position win. */
  slotProps?: TooltipSlotProps
  /** Draws an arrow towards the child. Default: `false`. */
  hasArrow?: boolean
  /** How long the pointer or focus rests on the child before it opens, in milliseconds. Default: `100`. */
  enterDelay?: number
  /** How long after they leave before it closes. Default: `0`. */
  leaveDelay?: number
  /** How long a touch is held before it opens. Default: `700`. */
  enterTouchDelay?: number
  /** How long after a touch ends before it closes. Default: `1500`. */
  leaveTouchDelay?: number
  /** Describes the child (`aria-describedby`, while open) instead of naming it (`aria-label`). Default: `false`. */
  shouldDescribeChild?: boolean
  /**
   * With `shouldDescribeChild`: the child is described the whole time, as by a native `title`, not
   * only while the tooltip is open. A visually hidden copy of a `title` sits beside the child for it
   * to point at. Default: `false`.
   */
  isDescriptionPersistent?: boolean
  /** Whether it is shown. Controlled with `onOpen` and `onClose`. */
  isOpen?: boolean
  /** Whether it is shown at first, when uncontrolled. Default: `false`. */
  defaultOpen?: boolean
  /** Fired when it asks to open. */
  onOpen?: (event: Event | SyntheticEvent) => void
  /** Fired when it asks to close. */
  onClose?: (event: Event | SyntheticEvent) => void
  /**
   * Whether a disabled child (`disabled`) is wrapped in an element of its own, which takes the pointer
   * handlers and the placement, since a disabled control sends no pointer events. Left out for a child
   * that is only marked disabled and still takes them - a menu row. Default: `true`.
   */
  shouldWrapDisabledChild?: boolean
  /**
   * Whether the pointer can be moved onto the tooltip, which then stays open (WCAG 1.4.13). With
   * `false` it takes no pointer events - a click goes to what is under it - and closes as the
   * pointer leaves the child: for a text hint that holds nothing to use. Default: `true`.
   */
  isInteractive?: boolean
  /** Opens on hover. Default: `true`. */
  shouldOpenOnHover?: boolean
  /** Opens on keyboard focus. Default: `true`. */
  shouldOpenOnFocus?: boolean
  /** Opens on a long touch. Default: `true`. */
  shouldOpenOnTouch?: boolean
  /** Corner radius, resolves against `theme.radii`. Default: `theme.defaults.surfaceRadius`, else square. */
  borderRadius?: keyof Theme['radii']
  /** Background, resolves against `theme.background`. Default: `'modal'`. */
  bg?: keyof Theme['background']
  /** Text color, resolves against `theme.text`. Default: `theme.defaults.textColor`, else `'initial'`. */
  textColor?: keyof Theme['text']
  /** Stacking layer from `theme.zOrder`. Default: `'tooltip'`. */
  layer?: keyof Theme['zOrder']
  className?: string
  'data-testid'?: string
}

// How close a tooltip keeps to the window's edge, how far from its child, and how big its arrow is.
const MARGIN = 8
const GAP = 8
const ARROW = 8

type ArrowSide = 'top' | 'bottom' | 'left' | 'right'
interface ArrowState {
  /** The side of the child the tooltip landed on. */
  side: ArrowSide
  /** Where along the tooltip's own edge the arrow points at the child's middle. */
  offset: number
}

const TooltipSurface = styled('div', {
  name: 'Tooltip',
  label: 'Tooltip',
  shouldForwardProp: createShouldForwardProp([
    'layer',
    'isInteractive',
    'borderRadius',
    'bg',
    'textColor',
  ]),
})<{
  layer: keyof Theme['zOrder']
  isInteractive: boolean
  borderRadius?: keyof Theme['radii']
  bg?: keyof Theme['background']
  textColor?: keyof Theme['text']
}>(({ theme, layer, isInteractive, borderRadius, bg, textColor }) => ({
  position: 'fixed',
  // A tooltip that cannot be used is not a click target: the click goes on to what is under it.
  ...(!isInteractive && { pointerEvents: 'none' }),
  top: 0,
  left: 0,
  // Shown by the placement, as it is placed.
  visibility: 'hidden',
  zIndex: theme.zOrder[layer],
  boxSizing: 'border-box',
  maxWidth: '20rem',
  padding: `${theme.space[0.5]} ${theme.space[1]}`,
  borderRadius: getSurfaceRadius(theme, borderRadius),
  boxShadow: theme.shadows[4],
  backgroundColor: get(theme, `background.${bg ?? 'modal'}`),
  color: get(theme, `text.${textColor ?? themeDefault(theme, 'textColor', 'initial')}`),
  fontFamily: get(theme, 'fonts.body'),
  fontSize: theme.fontSizes[0],
  lineHeight: get(theme, 'lineHeights.base'),
  overflowWrap: 'break-word',
}))

// The text a persistent description points at: there for assistive technology, not to be seen.
// audit-styled-ignore: hidden text, nothing of it to restyle
const TooltipDescription = styled('span', { label: 'TooltipDescription' })({
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

// A disabled control sends no pointer events of its own, so the tooltip listens on this.
// audit-styled-ignore: a layout shim around the child, nothing of it to restyle
const TooltipTarget = styled('span', { label: 'TooltipTarget' })({
  display: 'inline-grid',
})

const TooltipArrow = styled('span', {
  name: 'Tooltip',
  slot: 'arrow',
  label: 'TooltipArrow',
})({
  position: 'absolute',
  width: ARROW,
  height: ARROW,
  // The surface's own background, whatever it was given.
  backgroundColor: 'inherit',
  transform: 'rotate(45deg)',
  pointerEvents: 'none',
})

// Where the tooltip landed, and so which side the arrow is on and where along it.
const getArrow = ({ anchorRect, surfaceSize, top, left }: AnchoredPlacement): ArrowState => {
  const { width, height } = surfaceSize
  if (top + height <= anchorRect.top + 1 || top >= anchorRect.bottom - 1) {
    const side = top + height <= anchorRect.top + 1 ? 'top' : 'bottom'
    const middle = anchorRect.left + anchorRect.width / 2 - left
    return { side, offset: Math.min(Math.max(middle, ARROW), width - ARROW) }
  }
  const side = left + width <= anchorRect.left + 1 ? 'left' : 'right'
  const middle = anchorRect.top + anchorRect.height / 2 - top
  return { side, offset: Math.min(Math.max(middle, ARROW), height - ARROW) }
}

const isSameArrow = (a: ArrowState | null, b: ArrowState) =>
  a !== null && a.side === b.side && a.offset === b.offset

// The arrow sticks out of the edge of the tooltip that faces the child.
const getArrowStyle = ({ side, offset }: ArrowState): CSSProperties => {
  const half = ARROW / 2
  if (side === 'top') return { bottom: -half, left: offset - half }
  if (side === 'bottom') return { top: -half, left: offset - half }
  if (side === 'left') return { right: -half, top: offset - half }
  return { left: -half, top: offset - half }
}

type ChildProps = Record<string, unknown> & { ref?: Ref<HTMLElement> }

// What the child already has with what it is handed: a handler of each runs, the child's first, a
// description is added to, anything else is replaced - as it would be had the parent cloned the
// child itself.
const mergeForwarded = (own: ChildProps, forwarded: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(forwarded)
      .filter(([, value]) => value !== undefined)
      .map(([name, value]) => {
        const current = own[name]
        if (typeof value === 'function' && typeof current === 'function') {
          return [
            name,
            (...args: unknown[]) => {
              current(...args)
              value(...args)
            },
          ]
        }
        if (name === 'aria-describedby' && current)
          return [name, `${String(current)} ${String(value)}`]
        return [name, value]
      })
  )

// A name is for what assistive technology can reach: a child hidden from it is not given one, nor
// is one that already has its own.
const getChildName = (title: ReactNode, own: ChildProps) => {
  const isHidden = own['aria-hidden'] === true || own['aria-hidden'] === 'true'
  const isNamed = own['aria-label'] !== undefined || own['aria-labelledby'] !== undefined
  return typeof title === 'string' && !isHidden && !isNamed ? { 'aria-label': title } : {}
}

/**
 * @description A short description of one child, shown on hover, keyboard focus and a long touch -
 * a `role="tooltip"` in a `Portal`, placed beside its child and flipped for want of room. The
 * child is named by it (`aria-label`) or described by it (`aria-describedby`, with
 * `shouldDescribeChild`). It opens and closes after their delays, stays open while the pointer is
 * on the tooltip itself, closes on Escape, and never takes or traps the focus.
 */
export function Tooltip({
  children,
  anchorPosition,
  title,
  placement: placementProp,
  hasArrow: hasArrowProp,
  enterDelay: enterDelayProp,
  leaveDelay: leaveDelayProp,
  enterTouchDelay: enterTouchDelayProp,
  leaveTouchDelay: leaveTouchDelayProp,
  shouldDescribeChild: shouldDescribeChildProp,
  isDescriptionPersistent: isDescriptionPersistentProp,
  isOpen: isOpenProp,
  defaultOpen = false,
  onOpen,
  onClose,
  isInteractive: isInteractiveProp,
  shouldWrapDisabledChild: shouldWrapDisabledChildProp,
  shouldOpenOnHover: shouldOpenOnHoverProp,
  shouldOpenOnFocus: shouldOpenOnFocusProp,
  shouldOpenOnTouch: shouldOpenOnTouchProp,
  slots,
  slotProps,
  layer: layerProp,
  borderRadius: borderRadiusProp,
  bg: bgProp,
  textColor: textColorProp,
  className,
  'data-testid': dataTestid,
  ref: forwardedRef,
  ...forwarded
}: Readonly<TooltipProps>) {
  const dp = useDefaultProps('Tooltip')
  const placement = placementProp ?? dp.placement ?? 'top'
  const hasArrow = hasArrowProp ?? dp.hasArrow ?? false
  const shouldDescribeChild = shouldDescribeChildProp ?? dp.shouldDescribeChild ?? false
  const isDescriptionPersistent = isDescriptionPersistentProp ?? dp.isDescriptionPersistent ?? false
  const isInteractive = isInteractiveProp ?? dp.isInteractive ?? true
  const shouldWrapDisabledChild = shouldWrapDisabledChildProp ?? dp.shouldWrapDisabledChild ?? true
  const layer = layerProp ?? dp.layer ?? 'tooltip'
  const borderRadius = borderRadiusProp ?? dp.borderRadius
  const bg = bgProp ?? dp.bg
  const textColor = textColorProp ?? dp.textColor
  const id = useId()

  // At a point, nothing of the child or of the tooltip itself opens or closes it: `isOpen` does.
  const isAtPoint = anchorPosition !== undefined
  const { isOpen, childHandlers, surfaceHandlers } = useTooltip({
    isOpen: isOpenProp,
    defaultOpen,
    isAtPoint,
    onOpen,
    onClose,
    enterDelay: enterDelayProp ?? dp.enterDelay ?? 100,
    leaveDelay: leaveDelayProp ?? dp.leaveDelay ?? 0,
    enterTouchDelay: enterTouchDelayProp ?? dp.enterTouchDelay ?? 700,
    leaveTouchDelay: leaveTouchDelayProp ?? dp.leaveTouchDelay ?? 1500,
    shouldOpenOnHover: shouldOpenOnHoverProp ?? dp.shouldOpenOnHover ?? true,
    shouldOpenOnFocus: shouldOpenOnFocusProp ?? dp.shouldOpenOnFocus ?? true,
    shouldOpenOnTouch: shouldOpenOnTouchProp ?? dp.shouldOpenOnTouch ?? true,
  })
  const hasTitle = title !== undefined && title !== null && title !== ''
  const isShown = isOpen && hasTitle

  const anchorRef = useRef<HTMLElement | null>(null)
  // A tooltip at a point goes by the point alone, whatever child it has.
  const noAnchorRef = useRef<HTMLElement | null>(null)
  const surfaceRef = useRef<HTMLDivElement>(null)
  const childProps = (children?.props ?? {}) as ChildProps
  const forwardedProps = mergeForwarded(childProps, forwarded)
  const own = { ...childProps, ...forwardedProps } as ChildProps
  // A disabled control sends no pointer events, so the tooltip is placed against, and listens on,
  // a wrapper of its own; the control keeps its own ref.
  const isChildDisabled = shouldWrapDisabledChild && own.disabled === true
  const childRef = useMergedRefs(childProps.ref, forwardedRef)
  const ref = useMergedRefs(isChildDisabled ? undefined : anchorRef, childRef)

  const [arrow, setArrow] = useState<ArrowState | null>(null)
  const getOrigins = useCallback(
    (context: PlacementContext) =>
      getTooltipOrigins(resolveTooltipPlacement(placement, context), context.isRtl),
    [placement]
  )
  const onPlaced = useCallback(
    (placed: AnchoredPlacement) => {
      if (!hasArrow) return
      const next = getArrow(placed)
      setArrow((current) => (isSameArrow(current, next) ? current : next))
    },
    [hasArrow]
  )
  useAnchoredPlacement({
    isOpen: isShown,
    anchorRef: anchorPosition ? noAnchorRef : anchorRef,
    anchorPosition,
    surfaceRef,
    getOrigins,
    margin: MARGIN,
    gap: GAP,
    onPlaced,
  })

  // The handlers of the child itself come first, then the tooltip's.
  const handlers = Object.fromEntries(
    Object.entries(childHandlers).map(([name, handler]) => [
      name,
      (event: SyntheticEvent) => {
        ;(own[name] as ((event: SyntheticEvent) => void) | undefined)?.(event)
        handler(event)
      },
    ])
  )
  const ownDescription = own['aria-describedby'] as string | undefined
  const names = getChildName(title, own)
  // A persistent description points at a copy of the title that is always there, so the open
  // tooltip is not read as well.
  const descriptionId = `${id}-description`
  const hasPersistentDescription =
    children !== undefined && shouldDescribeChild && isDescriptionPersistent && hasTitle
  const describedBy = (shown: boolean) =>
    hasPersistentDescription
      ? [ownDescription, descriptionId].filter(Boolean).join(' ')
      : [ownDescription, shown ? id : undefined].filter(Boolean).join(' ') || undefined
  const ariaProps = shouldDescribeChild ? { 'aria-describedby': describedBy(isShown) } : names
  const child = children
    ? cloneElement(children as ReactElement<ChildProps>, {
        ...forwardedProps,
        ...(isChildDisabled || isAtPoint ? {} : handlers),
        ...ariaProps,
        ref,
      })
    : null

  return (
    <>
      {isChildDisabled && !isAtPoint ? (
        <TooltipTarget ref={anchorRef} {...handlers}>
          {child}
        </TooltipTarget>
      ) : (
        child
      )}
      {hasPersistentDescription && (
        <TooltipDescription id={descriptionId}>{title}</TooltipDescription>
      )}
      {isShown && (
        <Portal>
          <TooltipSurface
            {...slotProps?.root}
            as={slots?.root}
            ref={surfaceRef}
            id={id}
            role="tooltip"
            layer={layer}
            isInteractive={isInteractive}
            borderRadius={borderRadius}
            bg={bg}
            textColor={textColor}
            className={
              [slotProps?.root?.className, className].filter(Boolean).join(' ') || undefined
            }
            data-testid={dataTestid ?? slotProps?.root?.['data-testid']}
            {...(isAtPoint || !isInteractive ? {} : surfaceHandlers)}
          >
            {title}
            {hasArrow && arrow ? (
              <TooltipArrow
                {...slotProps?.arrow}
                as={slots?.arrow}
                style={{ ...slotProps?.arrow?.style, ...getArrowStyle(arrow) }}
                aria-hidden="true"
              />
            ) : null}
          </TooltipSurface>
        </Portal>
      )}
    </>
  )
}
