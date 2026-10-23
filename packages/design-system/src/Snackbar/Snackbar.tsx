import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
  type SyntheticEvent,
} from 'react'
import { createShouldForwardProp, get, styled, type Theme } from '../index'
import { useDefaultProps } from '../theme'
import { themeDefault } from '../theme/utils/themeDefault'
import { getSurfaceRadius } from '../utils/getSurfaceRadius'
import { Grow } from '../Grow'
import { Portal, type PortalProps } from '../Portal'
import { useControlled } from '../utils/useControlled'
import type { TransitionProps } from '../utils/useTransition'
import { useAutoHide } from './hooks/useAutoHide'

/** Why a snackbar asks to close. */
export type SnackbarCloseReason = 'timeout' | 'clickaway' | 'escapeKeyDown'

export interface SnackbarAnchorOrigin {
  vertical: 'top' | 'bottom'
  /** `'start'` and `'end'` are the left and the right, and swap right to left. */
  horizontal: 'start' | 'center' | 'end'
}

export interface SnackbarProps {
  /** Corner radius, resolves against `theme.radii`. Default: `theme.defaults.surfaceRadius`, else square. */
  borderRadius?: keyof Theme['radii']
  /** Background, resolves against `theme.background`. Default: `'modal'`. */
  bg?: keyof Theme['background']
  /** Text color, resolves against `theme.text`. Default: `theme.defaults.textColor`, else `'initial'`. */
  textColor?: keyof Theme['text']
  /** Whether it is shown. Controlled with `onClose`. */
  isOpen?: boolean
  /** Whether it is shown at first, when uncontrolled. Default: `false`. */
  defaultOpen?: boolean
  /** Fired when it asks to close, with why. Uncontrolled, it closes itself - but not on a click away. */
  onClose?: (event: Event | SyntheticEvent, reason: SnackbarCloseReason) => void
  /** How long it stays, in milliseconds. Without it, it stays until it is closed. */
  autoHideDuration?: number
  /** How long it stays once the pointer or focus has left it. Default: half of `autoHideDuration`. */
  resumeHideDuration?: number
  /** The message. */
  message?: ReactNode
  /** What sits after the message - a button. */
  action?: ReactNode
  /** What it holds in place of the message and the action - an `Alert`. */
  children?: ReactNode
  /** Which corner of the window it sits in. Default: `{ vertical: 'bottom', horizontal: 'start' }`. */
  anchorOrigin?: SnackbarAnchorOrigin
  /** The transition that shows and hides it. Default: `Grow`. */
  transition?: ComponentType<TransitionProps>
  /** Stacking layer from `theme.zOrder`. Default: `'snackbar'`. */
  layer?: keyof Theme['zOrder']
  /** Portal target. Default: `document.body`. */
  container?: PortalProps['container']
  className?: string
  'data-testid'?: string
}

const DEFAULT_ANCHOR: SnackbarAnchorOrigin = { vertical: 'bottom', horizontal: 'start' }

interface RootStyle {
  anchorOrigin: SnackbarAnchorOrigin
  layer: keyof Theme['zOrder']
}

const SnackbarRoot = styled('div', {
  name: 'Snackbar',
  label: 'Snackbar',
  shouldForwardProp: createShouldForwardProp(['anchorOrigin', 'layer']),
})<RootStyle>(({ theme, anchorOrigin, layer }) => {
  const { vertical, horizontal } = anchorOrigin
  return {
    position: 'fixed',
    zIndex: theme.zOrder[layer],
    display: 'flex',
    // The root is only a place: the pointer goes through it to the page, and to the content.
    pointerEvents: 'none',
    [vertical]: theme.space[3],
    ...(horizontal === 'center'
      ? { left: 0, right: 0, justifyContent: 'center' }
      : {
          [horizontal === 'start' ? 'insetInlineStart' : 'insetInlineEnd']: theme.space[3],
        }),
  }
})

const SnackbarContent = styled('div', {
  name: 'Snackbar',
  slot: 'content',
  label: 'SnackbarContent',
  shouldForwardProp: createShouldForwardProp(['borderRadius', 'bg', 'textColor']),
})<{
  borderRadius?: keyof Theme['radii']
  bg?: keyof Theme['background']
  textColor?: keyof Theme['text']
}>(({ theme, borderRadius, bg, textColor }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.space[2],
  boxSizing: 'border-box',
  minWidth: '18rem',
  maxWidth: `calc(100vw - ${theme.space[3]} - ${theme.space[3]})`,
  padding: `${theme.space[1]} ${theme.space[2]}`,
  pointerEvents: 'auto',
  borderRadius: getSurfaceRadius(theme, borderRadius),
  boxShadow: theme.shadows[6],
  backgroundColor: get(theme, `background.${bg ?? 'modal'}`),
  color: get(theme, `text.${textColor ?? themeDefault(theme, 'textColor', 'initial')}`),
  fontFamily: get(theme, 'fonts.body'),
  fontSize: theme.fontSizes[1],
  lineHeight: get(theme, 'lineHeights.base'),
}))

const SnackbarMessage = styled('div', {
  name: 'Snackbar',
  slot: 'message',
  label: 'SnackbarMessage',
})(({ theme }) => ({ flex: 1, minWidth: 0, padding: `${theme.space[1]} 0` }))

const SnackbarAction = styled('div', {
  name: 'Snackbar',
  slot: 'action',
  label: 'SnackbarAction',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  gap: theme.space[1],
  marginInlineStart: 'auto',
}))

/**
 * @description A transient message in a corner of the window, through a `Portal`. It hides itself
 * after `autoHideDuration` - the clock stops while the pointer or the focus is on it - and asks to
 * close on Escape and on a click away, `onClose` told why. It is a `role="status"`, announced
 * politely, and never takes the focus. Several at once do not stack: the app queues them.
 */
export function Snackbar({
  isOpen: isOpenProp,
  defaultOpen = false,
  onClose,
  autoHideDuration: autoHideDurationProp,
  resumeHideDuration: resumeHideDurationProp,
  message,
  action,
  children,
  anchorOrigin: anchorOriginProp,
  transition: Transition = Grow,
  layer: layerProp,
  borderRadius: borderRadiusProp,
  bg: bgProp,
  textColor: textColorProp,
  container,
  className,
  'data-testid': dataTestid,
}: Readonly<SnackbarProps>) {
  const dp = useDefaultProps('Snackbar')
  const autoHideDuration = autoHideDurationProp ?? dp.autoHideDuration
  const resumeHideDuration = resumeHideDurationProp ?? dp.resumeHideDuration
  const anchorOrigin = anchorOriginProp ?? dp.anchorOrigin ?? DEFAULT_ANCHOR
  const layer = layerProp ?? dp.layer ?? 'snackbar'
  const borderRadius = borderRadiusProp ?? dp.borderRadius
  const bg = bgProp ?? dp.bg
  const textColor = textColorProp ?? dp.textColor
  const [isOpen, setIsOpen] = useControlled({ controlled: isOpenProp, default: defaultOpen })
  // In the tree from the moment it opens until its transition has taken it out.
  const [isMounted, setIsMounted] = useState(isOpen)
  if (isOpen && !isMounted) setIsMounted(true)

  const close = (event: Event | SyntheticEvent, reason: SnackbarCloseReason) => {
    onClose?.(event, reason)
    if (isOpenProp === undefined && reason !== 'clickaway') setIsOpen(false)
  }
  const latestClose = useRef(close)
  useEffect(() => {
    latestClose.current = close
  })

  const { pause, resume } = useAutoHide({
    isOpen,
    duration: autoHideDuration,
    resumeDuration: resumeHideDuration,
    onHide: () => latestClose.current(new Event('timeout'), 'timeout'),
  })

  const contentRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!isOpen) return undefined
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') latestClose.current(event, 'escapeKeyDown')
    }
    const handlePointerDown = (event: PointerEvent) => {
      if (!contentRef.current?.contains(event.target as Node))
        latestClose.current(event, 'clickaway')
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [isOpen])

  if (!isMounted) return null

  return (
    <Portal container={container}>
      <SnackbarRoot
        anchorOrigin={anchorOrigin}
        layer={layer}
        className={className}
        data-testid={dataTestid}
      >
        <Transition isShown={isOpen} onExited={() => setIsMounted(false)}>
          <SnackbarContent
            ref={contentRef}
            role="status"
            borderRadius={borderRadius}
            bg={bg}
            textColor={textColor}
            onMouseEnter={pause}
            onMouseLeave={resume}
            onFocus={pause}
            onBlur={resume}
          >
            {children ?? (
              <>
                <SnackbarMessage>{message}</SnackbarMessage>
                {action ? <SnackbarAction>{action}</SnackbarAction> : null}
              </>
            )}
          </SnackbarContent>
        </Transition>
      </SnackbarRoot>
    </Portal>
  )
}
