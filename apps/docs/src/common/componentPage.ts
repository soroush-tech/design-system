import { splitReadme } from '@soroush.tech/docs-content'
import { readmeForSlug } from 'src/mdx/readmeSources'
import { leadOf, splitAccessibility } from './readmeText'

/** What a component's pages are made of: its README, the line under its name, its a11y notes. */
export const componentPageParts = (slug: string) => {
  const source = readmeForSlug(slug)
  const { rest, accessibility } = splitAccessibility(source)
  return { source, rest, accessibility, lead: leadOf(splitReadme(rest).intro) }
}
