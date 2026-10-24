import { Children, useId, type HTMLAttributes, type ReactNode } from 'react'
import { get, styled } from '../../index'
import { alpha } from '../../utils'
import { Typography } from '../../Typography'

export interface NavGroupProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** The group's name - a heading over its links, or the button that folds it. */
  label: ReactNode
  /** The `NavLink`s of the group - each is put in a list item of the group's list. */
  children?: ReactNode
  /** Whether the group folds under its label, as a native `details`. Default: `false`. */
  isCollapsible?: boolean
  /**
   * Whether a collapsible group is open. The reader can still fold it or open it; a change of this
   * prop opens or closes it - open the group that holds the current page. Default: `false`.
   */
  isOpen?: boolean
}

const NavGroupRoot = styled('section', { name: 'NavGroup', label: 'NavGroup' })({})

// The root of a group that folds: the same slot, on the element that folds.
const NavGroupDetails = styled('details', { name: 'NavGroup', label: 'NavGroup' })({})

// The name of a group that does not fold.
const NavGroupHeading = styled(Typography, {
  name: 'NavGroup',
  slot: 'label',
  label: 'NavGroupLabel',
})(({ theme }) => ({
  margin: 0,
  padding: `${theme.space[1]} ${theme.space[2]}`,
}))

// The name of a group that folds: a row, with an arrow that turns as it opens. The browser's own
// marker is dropped for it.
const NavGroupSummary = styled('summary', {
  name: 'NavGroup',
  slot: 'label',
  label: 'NavGroupLabel',
})(({ theme }) => {
  const main = theme.palette.primary.main
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${theme.space[1]} ${theme.space[2]}`,
    borderRadius: '1.5rem',
    cursor: 'pointer',
    listStyle: 'none',
    color: get(theme, 'text.initial'),
    '&::-webkit-details-marker': { display: 'none' },
    '&:hover': { backgroundColor: alpha(main, 0.1) },
    '&:focus-visible': { outline: `2px solid ${main}`, outlineOffset: -2 },
    '&::after': {
      content: '""',
      width: '0.5rem',
      height: '0.5rem',
      marginRight: theme.space[0.5],
      borderRight: '2px solid currentColor',
      borderBottom: '2px solid currentColor',
      transform: 'rotate(45deg) translate(-2px, -2px)',
    },
    'details[open] > &::after': { transform: 'rotate(-135deg) translate(-2px, -2px)' },
  }
})

const NavGroupList = styled('ul', {
  name: 'NavGroup',
  slot: 'list',
  label: 'NavGroupList',
})(({ theme }) => ({
  margin: 0,
  padding: 0,
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space[0.25],
}))

/**
 * @description A group of a `NavTree`: a name over a list of `NavLink`s. Plain, the name is a
 * heading and the links always show; collapsible, the name is a `summary` and the links fold under
 * it - a native `details`, so it folds and opens with scripts off.
 */
export function NavGroup({
  label,
  children,
  isCollapsible = false,
  isOpen = false,
  ...rest
}: Readonly<NavGroupProps>) {
  const headingId = useId()
  const list = (
    <NavGroupList>
      {Children.toArray(children).map((child, index) => (
        // toArray gave each child a key of its own.
        <li key={(child as { key?: string }).key ?? index}>{child}</li>
      ))}
    </NavGroupList>
  )
  if (isCollapsible) {
    return (
      <NavGroupDetails open={isOpen} {...rest}>
        <NavGroupSummary>{label}</NavGroupSummary>
        {list}
      </NavGroupDetails>
    )
  }
  return (
    <NavGroupRoot aria-labelledby={headingId} {...rest}>
      <NavGroupHeading id={headingId} variant="subtitle2" as="h2">
        {label}
      </NavGroupHeading>
      {list}
    </NavGroupRoot>
  )
}
