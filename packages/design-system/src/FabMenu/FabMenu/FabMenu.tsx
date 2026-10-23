import {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  type KeyboardEvent,
  type ReactNode,
  type ReactElement,
  type SyntheticEvent,
} from 'react'
import type { SpaceProps } from '@soroush.tech/styled-system'
import { createShouldForwardProp, props, space, styled, type Theme } from '../../index'
import { useDefaultProps } from '../../theme'
import { Fab } from '../../Fab'
import { Icon } from '../../Icon'
import { Zoom } from '../../Zoom'
import { isRtl } from '../../utils/isRtl'
import { useControlled } from '../../utils/useControlled'
import { FabMenuContext } from '../FabMenuContext'

export type FabMenuDirection = 'up' | 'down' | 'left' | 'right'
export type FabMenuAlign = 'start' | 'end'

export interface FabMenuProps extends SpaceProps<Theme> {
  /** The `FabMenuItem`s. */
  children?: ReactNode
  /** The trigger's icon while closed. Default: an add icon. */
  icon?: ReactNode
  /** The trigger's icon while open. Default: a close icon. */
  closeIcon?: ReactNode
  /** A label for the trigger, which makes it an extended `Fab`. Without it, it is a circle. */
  label?: ReactNode
  /** Names a trigger with no label - the same open or closed: `aria-expanded` says which. */
  'aria-label'?: string
  /** Whether it is open. Controlled with `onOpen` and `onClose`. */
  isOpen?: boolean
  /** Whether it is open at first, when uncontrolled. Default: `false`. */
  defaultOpen?: boolean
  /** Fired when it asks to open. */
  onOpen?: (event: SyntheticEvent | Event) => void
  /** Fired when it asks to close - on Escape, a press away, or an item chosen. */
  onClose?: (event: SyntheticEvent | Event) => void
  /**
   * Which way the actions go from the trigger: a column above or below it, or a row beside it.
   * `'left'` and `'right'` are the page's start and end, so they swap right to left. Default: `'up'`.
   */
  direction?: FabMenuDirection
  /**
   * Which edge of the trigger a column of actions lines up with; mirrored right to left. A row of
   * actions is as tall as the trigger and sits level with it, so this does not apply. Default: `'end'`.
   */
  align?: FabMenuAlign
  /** Color of the trigger - resolves to `theme.palette`. Default: `'primary'`. */
  color?: keyof Theme['palette']
  /** Size of the trigger, and of the items. Default: `'md'`. */
  size?: keyof Theme['sizes']
  className?: string
  'data-testid'?: string
}

interface RootStyle {
  direction: FabMenuDirection
  align: FabMenuAlign
}

// The trigger's own box: the actions are placed against it, out of the flow, so the page holds
// only the trigger.
const FabMenuRoot = styled('div', {
  name: 'FabMenu',
  label: 'FabMenu',
  shouldForwardProp: createShouldForwardProp([...props]),
  systemProps: [space],
})({ position: 'relative', display: 'inline-flex' })

const FabMenuList = styled('div', {
  name: 'FabMenu',
  slot: 'list',
  label: 'FabMenuList',
  shouldForwardProp: createShouldForwardProp(['direction', 'align']),
})<RootStyle>(({ theme, direction, align }) => {
  // The room between the actions and the trigger is the same step as between the actions.
  const clear = `calc(100% + ${theme.space[1]})`
  // As wide as its widest action - or all of them in a row - not as the trigger it is placed beside.
  const base = {
    position: 'absolute',
    display: 'flex',
    gap: theme.space[1],
    width: 'max-content',
  } as const
  if (direction === 'left' || direction === 'right') {
    // A row beside the trigger, level with it: the first action is the farthest on the start side,
    // the nearest on the end side, in either writing direction.
    return {
      ...base,
      flexDirection: 'row',
      top: 0,
      bottom: 0,
      alignItems: 'center',
      [direction === 'left' ? 'insetInlineEnd' : 'insetInlineStart']: clear,
    } as const
  }
  return {
    ...base,
    flexDirection: 'column',
    [direction === 'up' ? 'bottom' : 'top']: clear,
    [align === 'end' ? 'insetInlineEnd' : 'insetInlineStart']: 0,
    alignItems: align === 'end' ? 'flex-end' : 'flex-start',
  } as const
})

// The actions, whatever groups them: a fragment's children are the menu's own.
const getItems = (children: ReactNode): ReactElement[] =>
  Children.toArray(children).flatMap((child) => {
    if (!isValidElement<{ children?: ReactNode }>(child)) return []
    if (child.type !== Fragment) return [child]
    // Keyed under the fragment's, so two fragments' first actions are not the same key.
    return getItems(child.props.children).map((inner) =>
      cloneElement(inner, { key: `${child.key}/${inner.key}` })
    )
  })

const ITEMS = '[data-fab-menu-item]:not(:disabled)'

/**
 * @description A `Fab` that opens a stack of actions - extended pills, each a `FabMenuItem` - from
 * one corner of a page. The trigger is a disclosure button: `aria-expanded` and `aria-controls`,
 * its icon turning to a close one while open. The actions zoom in over `theme.transitions` and are
 * out of the tree while closed. Escape, a press away, or choosing an action closes it and, for
 * Escape and an action, returns the focus to the trigger; the arrow keys, Home and End walk the
 * actions and the trigger in the order they are drawn. Where it floats is the page's.
 */
export function FabMenu({
  children,
  icon,
  closeIcon,
  label,
  'aria-label': ariaLabel,
  isOpen: isOpenProp,
  defaultOpen = false,
  onOpen,
  onClose,
  direction: directionProp,
  align: alignProp,
  color,
  size: sizeProp,
  className,
  'data-testid': dataTestid,
  ...spaceProps
}: Readonly<FabMenuProps>) {
  const dp = useDefaultProps('FabMenu')
  const direction = directionProp ?? dp.direction ?? 'up'
  const align = alignProp ?? dp.align ?? 'end'
  const size = sizeProp ?? dp.size ?? 'md'
  const [isOpen, setIsOpen] = useControlled({ controlled: isOpenProp, default: defaultOpen })
  const listId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // Both are asked only from what is shown for it: a closed trigger opens, an open menu closes.
  const open = (event: SyntheticEvent | Event) => {
    setIsOpen(true)
    onOpen?.(event)
  }
  const close = useCallback(
    (event: SyntheticEvent | Event) => {
      setIsOpen(false)
      onClose?.(event)
      // Chosen with a pointer or a key, the focus was on an action that is gone: it goes back.
      if (event.type === 'click' || event.type === 'keydown') triggerRef.current!.focus()
    },
    [setIsOpen, onClose]
  )

  // A press anywhere but in the menu closes it - the focus is where the press put it.
  useEffect(() => {
    if (!isOpen) return undefined
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close(event)
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [isOpen, close])

  // Actions drawn before the trigger go above it or on its start side; after it, below or at its end.
  const isRow = direction === 'left' || direction === 'right'
  const isBefore = direction === 'up' || direction === 'left'

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape' && isOpen) {
      event.preventDefault()
      close(event)
      return
    }
    // The arrows of the axis the actions are drawn on; the others are not the menu's.
    const [back, forward] = isRow ? ['ArrowLeft', 'ArrowRight'] : ['ArrowUp', 'ArrowDown']
    if (![back, forward, 'Home', 'End'].includes(event.key)) return
    // Closed, an arrow on the trigger opens it; the keys then walk what is drawn.
    if (!isOpen) {
      if (event.key === back || event.key === forward) {
        event.preventDefault()
        open(event)
      }
      return
    }
    // As drawn, along the axis: the actions before the trigger - above it, or at its start - or after.
    const found = [...rootRef.current!.querySelectorAll<HTMLElement>(ITEMS)]
    const drawn = isBefore ? [...found, triggerRef.current!] : [triggerRef.current!, ...found]
    const at = drawn.indexOf(document.activeElement as HTMLElement)
    if (at === -1) return
    event.preventDefault()
    const last = drawn.length - 1
    // A row reads the other way right to left, and so do its arrows.
    const toward = isRow && isRtl(rootRef.current!) ? back : forward
    const step = event.key === toward ? 1 : -1
    const target = { Home: 0, End: last }[event.key] ?? Math.min(last, Math.max(0, at + step))
    drawn[target].focus()
  }

  // The trigger's icon turns to a close one while the menu is open.
  const triggerIcon = isOpen
    ? (closeIcon ?? <Icon name="close" color="inherit" />)
    : (icon ?? <Icon name="add" color="inherit" />)
  const isExtended = label !== undefined

  const context = useMemo(() => ({ close, size }), [close, size])
  const items = getItems(children)
  // The action next to the trigger comes quickest, the farthest last: a stack that unfolds.
  const unfolding = isBefore ? [...items].reverse() : items

  return (
    <FabMenuContext.Provider value={context}>
      <FabMenuRoot
        ref={rootRef}
        className={className}
        data-testid={dataTestid}
        onKeyDown={handleKeyDown}
        {...spaceProps}
      >
        <FabMenuList id={listId} direction={direction} align={align}>
          {items.map((item) => (
            <Zoom
              key={item.key}
              isShown={isOpen}
              shouldAppear={false}
              timeout={{ enter: 225 + 40 * unfolding.indexOf(item), exit: 150 }}
            >
              {item}
            </Zoom>
          ))}
        </FabMenuList>
        <Fab
          ref={triggerRef}
          variant={isExtended ? 'extended' : 'circular'}
          color={color ?? dp.color ?? 'primary'}
          size={size}
          startIcon={isExtended ? triggerIcon : undefined}
          aria-label={isExtended ? undefined : ariaLabel}
          aria-expanded={isOpen}
          aria-controls={isOpen ? listId : undefined}
          onClick={(event) => (isOpen ? close(event) : open(event))}
        >
          {isExtended ? label : triggerIcon}
        </Fab>
      </FabMenuRoot>
    </FabMenuContext.Provider>
  )
}
