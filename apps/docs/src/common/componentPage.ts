import { componentByName, type ComponentNavItem } from 'src/common/nav'
import { splitReadme } from '@soroush.tech/docs-content'
import { readmeForSlug } from 'src/mdx/readmeSources'
import { leadOf, splitAccessibility } from './readmeText'

/** What a component's pages are made of: its README, the line under its name, its a11y notes. */
export const componentPageParts = (slug: string) => {
  const source = readmeForSlug(slug)
  const { rest, accessibility } = splitAccessibility(source)
  return { source, rest, accessibility, lead: leadOf(splitReadme(rest).intro) }
}

/**
 * The component a docs route is for: `/react/Button/...` names it, and `/react/Table/TableCell/`
 * names a member by the entry it is imported from. Throws for a route that is none, which fails
 * the prerender.
 */
export const componentOfRoute = ({
  name,
  member,
}: Readonly<Record<string, string>>): ComponentNavItem => {
  const item = componentByName.get(member ?? name)
  if (!item || (member !== undefined && item.family !== name)) {
    throw new Error(`No component for the route "${member ? `${name}/${member}` : name}"`)
  }
  return item
}
