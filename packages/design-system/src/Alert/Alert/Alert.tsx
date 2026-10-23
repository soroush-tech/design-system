import type { MouseEvent, ReactNode } from 'react'
import type { SpaceProps } from '@soroush.tech/styled-system'
import { createShouldForwardProp, get, props, space, styled, type Theme } from '../../index'
import { useDefaultProps } from '../../theme'
import { getSurfaceRadius } from '../../utils/getSurfaceRadius'
import { Icon, type IconName } from '../../Icon'
import { alpha } from '../../utils'

export type AlertSeverity = 'success' | 'info' | 'warning' | 'error'
export type AlertVariant = 'standard' | 'contained' | 'outlined'

export interface AlertProps extends SpaceProps<Theme> {
  /** The message. An `AlertTitle` may come first. */
  children?: ReactNode
  /** Picks the icon and the palette color. Default: `'info'`. */
  severity?: AlertSeverity
  /** Tinted, filled, or only outlined. Default: `'standard'`. */
  variant?: AlertVariant
  /** The icon before the message - the severity's by default; `false` draws none. */
  icon?: ReactNode | false
  /** What sits at the end of the alert - a button. */
  action?: ReactNode
  /** Shows a close control. */
  onClose?: (event: MouseEvent<HTMLElement>) => void
  /** Names the close control - no built-in English. */
  closeLabel?: string
  /** `'alert'` is announced at once; `'status'`, politely. Default: `'alert'`. */
  role?: 'alert' | 'status'
  /** Corner radius, resolves against `theme.radii`. Default: `theme.defaults.surfaceRadius`, else square. */
  borderRadius?: keyof Theme['radii']
  className?: string
  'data-testid'?: string
}

const SEVERITY_ICONS = {
  success: 'check_circle',
  info: 'info',
  warning: 'warning',
  error: 'error',
} satisfies Record<AlertSeverity, IconName>

interface RootStyle extends SpaceProps<Theme> {
  severity: AlertSeverity
  variant: AlertVariant
  borderRadius?: keyof Theme['radii']
}

const AlertRoot = styled('div', {
  name: 'Alert',
  label: 'Alert',
  shouldForwardProp: createShouldForwardProp([...props, 'severity', 'variant', 'borderRadius']),
  systemProps: [space],
})<RootStyle>(({ theme, severity, variant, borderRadius }) => {
  const palette = get(theme, `palette.${severity}`)
  const text = get(theme, 'text.initial')
  return {
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.space[2],
    boxSizing: 'border-box',
    padding: `${theme.space[1]} ${theme.space[2]}`,
    borderRadius: getSurfaceRadius(theme, borderRadius),
    fontFamily: get(theme, 'fonts.body'),
    fontSize: theme.fontSizes[1],
    lineHeight: get(theme, 'lineHeights.base'),
    ...(variant === 'contained' && {
      backgroundColor: palette.main,
      color: palette.contrastText,
    }),
    // Tinted and outlined read as the theme's own text, so their contrast is the theme's.
    ...(variant === 'standard' && {
      backgroundColor: alpha(palette.main, 0.15),
      color: text,
    }),
    ...(variant === 'outlined' && {
      backgroundColor: 'transparent',
      color: text,
      border: `${theme.borderWidths.thin} solid ${palette.main}`,
    }),
  }
})

const AlertIcon = styled('span', {
  name: 'Alert',
  slot: 'icon',
  label: 'AlertIcon',
  shouldForwardProp: createShouldForwardProp(['severity', 'variant']),
})<{ severity: AlertSeverity; variant: AlertVariant }>(({ theme, severity, variant }) => ({
  display: 'inline-flex',
  flexShrink: 0,
  padding: `${theme.space[1]} 0`,
  fontSize: '1.25em',
  color: variant === 'contained' ? 'inherit' : get(theme, `palette.${severity}.main`),
}))

const AlertMessage = styled('div', {
  name: 'Alert',
  slot: 'message',
  label: 'AlertMessage',
})(({ theme }) => ({ flex: 1, minWidth: 0, padding: `${theme.space[1]} 0` }))

const AlertAction = styled('div', {
  name: 'Alert',
  slot: 'action',
  label: 'AlertAction',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  gap: theme.space[1],
  marginInlineStart: 'auto',
  paddingInlineStart: theme.space[2],
}))

const AlertClose = styled('button', {
  name: 'Alert',
  slot: 'closeButton',
  label: 'AlertCloseButton',
})(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 0,
  padding: theme.space[1],
  border: 0,
  borderRadius: '50%',
  background: 'none',
  color: 'inherit',
  opacity: 0.8,
  cursor: 'pointer',
  '&:hover': { opacity: 1 },
  '&:focus-visible': {
    outline: `${theme.borderWidths.base} solid ${get(theme, 'palette.primary.main')}`,
  },
}))

/**
 * @description An inline message with a severity: an icon, the message, an optional `AlertTitle`,
 * an action and a close control. `role="alert"` is announced at once, `"status"` politely. Tinted
 * and outlined, its text is the theme's text on a surface, so its contrast is the theme's; filled,
 * it is the severity color's `contrastText`.
 */
export function Alert({
  children,
  severity: severityProp,
  variant: variantProp,
  icon,
  action,
  onClose,
  closeLabel: closeLabelProp,
  role: roleProp,
  borderRadius: borderRadiusProp,
  className,
  'data-testid': dataTestid,
  ...spaceProps
}: Readonly<AlertProps>) {
  const dp = useDefaultProps('Alert')
  const severity = severityProp ?? dp.severity ?? 'info'
  const variant = variantProp ?? dp.variant ?? 'standard'
  const closeLabel = closeLabelProp ?? dp.closeLabel
  const role = roleProp ?? dp.role ?? 'alert'
  const borderRadius = borderRadiusProp ?? dp.borderRadius
  const iconName = SEVERITY_ICONS[severity]
  const hasAction = action !== undefined || onClose !== undefined

  return (
    <AlertRoot
      role={role}
      severity={severity}
      variant={variant}
      borderRadius={borderRadius}
      className={className}
      data-testid={dataTestid}
      {...spaceProps}
    >
      {icon !== false && (
        <AlertIcon severity={severity} variant={variant}>
          {icon ?? <Icon name={iconName} size="1em" color="inherit" />}
        </AlertIcon>
      )}
      <AlertMessage>{children}</AlertMessage>
      {hasAction && (
        <AlertAction>
          {action}
          {onClose && (
            <AlertClose type="button" aria-label={closeLabel} onClick={onClose}>
              <Icon name="close" size="1em" color="inherit" />
            </AlertClose>
          )}
        </AlertAction>
      )}
    </AlertRoot>
  )
}
