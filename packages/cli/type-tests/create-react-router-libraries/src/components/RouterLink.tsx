import { Link, type LinkProps } from '@soroush.design/react/Link'
import { useHref, useLinkClickHandler } from 'react-router'

/**
 * The design system's Link to a page of the app: a click moves to it with no reload, as the
 * router's own Link does, and a click that opens a new tab still does.
 */
export function RouterLink({ to, ...props }: Omit<LinkProps, 'href' | 'onClick'> & { to: string }) {
  const href = useHref(to)
  const handleClick = useLinkClickHandler(to)
  return <Link {...props} href={href} onClick={handleClick} />
}
