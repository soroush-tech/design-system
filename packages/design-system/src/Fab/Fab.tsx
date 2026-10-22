import type { ReactNode } from 'react'
import { get, styled } from '../index'
import { useDefaultProps } from '../theme'
import { Button, type ButtonProps } from '../Button'

export type FabVariant = 'circular' | 'extended'

type FabButtonProps = Omit<
  ButtonProps,
  | 'variant'
  | 'shape'
  | 'endIcon'
  | 'loading'
  | 'loadingIndicator'
  | 'loadingPosition'
  | 'fullWidth'
  | 'href'
  | 'target'
  | 'rel'
  | 'gap'
>

export type FabProps = FabButtonProps & {
  /** A circle, or a pill with a label. Default: `'circular'`. */
  variant?: FabVariant
  /** An extended fab's icon, before the label. A circular one is its content. */
  startIcon?: ReactNode
}

interface RootStyle {
  fabVariant: FabVariant
}

const FabRoot = styled(Button, {
  name: 'Fab',
  label: 'Fab',
  // A Button is the target: everything but the fab's own look goes on to it.
  shouldForwardProp: (prop) => prop !== 'fabVariant',
})<RootStyle>(({ theme, size, fabVariant }) => {
  // A fab is as tall as an avatar of its size: the same scale of round things.
  const side = get(theme, `avatar.${size}`)
  return {
    height: side,
    boxShadow: theme.shadows[6],
    '&:hover:not(:disabled)': { boxShadow: theme.shadows[8] },
    '&:active:not(:disabled)': { boxShadow: theme.shadows[12] },
    ...(fabVariant === 'circular'
      ? { width: side, minWidth: side, padding: 0, borderRadius: '50%' }
      : { paddingLeft: theme.space[3], paddingRight: theme.space[3], borderRadius: '9999px' }),
  }
})

/**
 * @description A floating action button: the one main action of a page, circular - its icon - or
 * extended, a pill with a label. It is a `Button`, with its focus ring, press state and disabled
 * behavior, raised on a shadow. Where it floats is the page's: no position is built in. A fab with
 * no text - a circular one - must be named: `aria-label` or `aria-labelledby`.
 */
export function Fab({
  variant: variantProp,
  color,
  size,
  startIcon,
  children,
  ...rest
}: Readonly<FabProps>) {
  const dp = useDefaultProps('Fab')
  const variant = variantProp ?? dp.variant ?? 'circular'
  return (
    <FabRoot
      fabVariant={variant}
      variant="contained"
      color={color ?? dp.color ?? 'primary'}
      size={size ?? dp.size ?? 'md'}
      startIcon={variant === 'extended' ? startIcon : undefined}
      {...rest}
    >
      {children}
    </FabRoot>
  )
}
