import { useContext, type AnchorHTMLAttributes, type ReactNode } from 'react'
import { createShouldForwardProp, get, styled, type Theme } from '../../index'
import { Icon } from '../../Icon'
import { alpha } from '../../utils'
import { NavTreeContext } from '../NavTreeContext'

export interface NavLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'color'> {
  /** Where it goes. */
  href: string
  /** The name of the page. */
  children: ReactNode
  /** Whether it is the page the reader is on - marked with `aria-current="page"` and filled. Default: `false`. */
  isCurrent?: boolean
  /** A short note beside the name - a version, a count. */
  note?: ReactNode
  /** Whether the page is outside the site: it opens in a tab of its own, with an arrow after it. Default: `false`. */
  isExternal?: boolean
  /** Palette color of the pill - resolves to `theme.palette`. Default: its `NavTree`'s. */
  color?: keyof Theme['palette']
}

interface NavLinkRootProps {
  isCurrent: boolean
  accent: keyof Theme['palette']
}

// A rounded row, the current page filled with the color's tone; a hover is a wash of it.
const NavLinkRoot = styled('a', {
  name: 'NavLink',
  label: 'NavLink',
  shouldForwardProp: createShouldForwardProp(['isCurrent', 'accent']),
})<NavLinkRootProps>(({ theme, isCurrent, accent }) => {
  const { main } = theme.palette[accent]
  return {
    display: 'flex',
    alignItems: 'center',
    gap: theme.space[1],
    padding: `${theme.space[1]} ${theme.space[2]}`,
    borderRadius: '1.5rem',
    color: get(theme, 'text.initial'),
    textDecoration: 'none',
    fontWeight: isCurrent ? 600 : 400,
    backgroundColor: isCurrent ? alpha(main, 0.28) : 'transparent',
    '&:hover': { backgroundColor: alpha(main, isCurrent ? 0.28 : 0.1) },
    '&:focus-visible': { outline: `2px solid ${main}`, outlineOffset: -2 },
  }
})

const NavLinkName = styled('span', {
  name: 'NavLink',
  slot: 'label',
  label: 'NavLinkLabel',
})({ flex: '1 1 auto', minWidth: 0 })

const NavLinkNote = styled('span', {
  name: 'NavLink',
  slot: 'note',
  label: 'NavLinkNote',
})(({ theme }) => ({
  flexShrink: 0,
  fontSize: theme.fontSizes[0],
  color: get(theme, 'text.secondary'),
}))

/**
 * @description A link to a page of the site, a row of a `NavTree`: its name, an optional note
 * beside it, and a fill when it is the current page. It is a plain anchor - a keyboard follows it
 * as any link - with `aria-current="page"` for the current one. An external link opens in a tab
 * of its own, `noopener noreferrer`, and carries an arrow so it is not taken for a page here.
 */
export function NavLink({
  children,
  isCurrent = false,
  note,
  isExternal = false,
  color,
  ...rest
}: Readonly<NavLinkProps>) {
  const tree = useContext(NavTreeContext)
  return (
    <NavLinkRoot
      isCurrent={isCurrent}
      accent={color ?? tree.color}
      aria-current={isCurrent ? 'page' : undefined}
      {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
      {...rest}
    >
      <NavLinkName>{children}</NavLinkName>
      {note != null && <NavLinkNote>{note}</NavLinkNote>}
      {isExternal && <Icon name="external_link" size="0.875rem" color="inherit" />}
    </NavLinkRoot>
  )
}
