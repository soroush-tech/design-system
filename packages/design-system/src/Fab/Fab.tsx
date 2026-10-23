import type { ReactNode, Ref } from 'react'
import { get, space, styled } from '../index'
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
  /** The button element, for a trigger that places something against it or moves its focus. */
  ref?: Ref<HTMLButtonElement>
  /**
   * Draws an extended fab as its icon alone - a circle - and back again, the label moving in and out
   * over `theme.transitions`. The label stays in the tree, so the fab keeps its name. A circular
   * fab ignores it. Default: `false`.
   */
  isCollapsed?: boolean
}

interface RootStyle {
  fabVariant: FabVariant
  isCollapsed: boolean
}

const FabRoot = styled(Button, {
  name: 'Fab',
  label: 'Fab',
  // A Button is the target: everything but the fab's own look goes on to it.
  shouldForwardProp: (prop) => prop !== 'fabVariant' && prop !== 'isCollapsed',
  // After its own styles, so a margin or padding of the instance - a `theme.space` key - wins over
  // the fab's.
  systemProps: [space],
})<RootStyle>(({ theme, size, fabVariant, isCollapsed }) => {
  // A fab is as tall as an avatar of its size: the same scale of round things.
  const side = get(theme, `avatar.${size}`)
  const { duration, easing } = theme.transitions
  const move = (property: string) => `${property} ${duration.standard}ms ${easing.standard}`
  return {
    height: side,
    // Rises under the pointer, and falls back as it is pressed: a press does not lift it further.
    boxShadow: theme.shadows[6],
    '&:hover:not(:disabled)': { boxShadow: theme.shadows[8] },
    '&:active:not(:disabled)': { boxShadow: theme.shadows[6] },
    transition: [
      'background-color',
      'color',
      'border-color',
      'opacity',
      'box-shadow',
      'padding-left',
      'padding-right',
    ]
      .map(move)
      .join(', '),
    '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
    // A target of the least size a finger needs, centred on the fab - the fab is not drawn larger.
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height: '100%',
      minWidth: theme.space[6],
      minHeight: theme.space[6],
    },
    // The icon and the label shrink with the fab, so a long label is cut, not the fab's end.
    '& > span': { minWidth: 0 },
    ...(fabVariant === 'circular'
      ? { width: side, minWidth: side, padding: 0, borderRadius: '50%' }
      : {
          // More room after the label than before the icon, as the text ends the fab. Collapsed, there
          // is none, and the fab is as wide as it is tall: a circle with its icon centred, whatever the
          // icon's size.
          minWidth: side,
          paddingLeft: isCollapsed ? 0 : theme.space[2],
          paddingRight: isCollapsed ? 0 : theme.space[3],
          borderRadius: '9999px',
          maxWidth: '100%',
        }),
  }
})

// A column that is as wide as the label - or nothing, collapsed: the width moves between the two
// (`1fr` and `0fr`), so the label is cut by its container as well as it moves.
const FabLabel = styled('span', {
  name: 'Fab',
  slot: 'label',
  label: 'FabLabel',
  shouldForwardProp: (prop) => prop !== 'isCollapsed',
})<{ isCollapsed: boolean }>(({ theme, isCollapsed }) => ({
  display: 'grid',
  gridTemplateColumns: isCollapsed ? '0fr' : '1fr',
  minWidth: 0,
  transition: `grid-template-columns ${theme.transitions.duration.standard}ms ${theme.transitions.easing.standard}`,
  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
}))

// One line, cut with an ellipsis where its container ends. Its first line starts a `theme.space[1.5]`
// in, which is the room between the icon and the label - and goes with the label as it collapses.
const FabLabelText = styled('span', {
  name: 'Fab',
  slot: 'labelText',
  label: 'FabLabelText',
})(({ theme }) => ({
  display: 'block',
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textIndent: theme.space[1.5],
  whiteSpace: 'nowrap',
}))

/**
 * @description A floating action button: the one main action of a page, circular - its icon - or
 * extended, a pill with a label. It is a `Button`, with its focus ring, press state and disabled
 * behavior, raised on a shadow that lifts on hover and moves with `theme.transitions` (and not at
 * all under `prefers-reduced-motion`). Its touch target is at least `theme.space[6]` square however
 * small the fab. An extended fab keeps its label on one line, with the icon a `theme.space[1.5]`
 * before it, and `isCollapsed` draws it as a circle - the label moving out over `theme.transitions`. Margin and padding are `theme.space` keys, as everywhere. Where it floats is the
 * page's: no position is built in. A fab with no text - a circular one - must be named:
 * `aria-label` or `aria-labelledby`.
 */
export function Fab({
  variant: variantProp,
  color,
  size,
  startIcon,
  isCollapsed = false,
  children,
  ...rest
}: Readonly<FabProps>) {
  const dp = useDefaultProps('Fab')
  const variant = variantProp ?? dp.variant ?? 'circular'
  const isExtended = variant === 'extended'
  return (
    <FabRoot
      fabVariant={variant}
      isCollapsed={isExtended && isCollapsed}
      variant="contained"
      color={color ?? dp.color ?? 'primary'}
      size={size ?? dp.size ?? 'md'}
      startIcon={isExtended ? startIcon : undefined}
      // The room between the icon and the label is the label's own, so it collapses with it.
      gap={isExtended ? 0 : undefined}
      {...rest}
    >
      {isExtended ? (
        <FabLabel isCollapsed={isCollapsed}>
          <FabLabelText data-fab-label="">{children}</FabLabelText>
        </FabLabel>
      ) : (
        children
      )}
    </FabRoot>
  )
}
