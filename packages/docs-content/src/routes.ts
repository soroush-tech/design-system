import {
  allComponents,
  componentAccessibilityPath,
  componentPagePath,
  componentSpecsPath,
  entryGuides,
  markdownComponents,
  membersOf,
  reactGuides,
  reactHooks,
  sitePath,
  type ComponentNavItem,
} from './registry'
import { sectionIds, sections } from './sections'

/** What a page of the site is, for the route map and the checks over it. */
export type PageKind =
  | 'home'
  | 'packages'
  | 'section-index'
  | 'releases'
  | 'guide'
  | 'entry'
  | 'hooks'
  | 'hook'
  | 'component'
  | 'specs'
  | 'accessibility'
  | 'member'

export interface DocsPage {
  /** The page's path, with the trailing slash of its `index.html`. */
  path: string
  kind: PageKind
}

/**
 * Every page of the live site, in one place: the sitemap, the redirects and the route checks read
 * this list, and the route folders of the app answer for the same paths. Which components have
 * an accessibility page depends on their README, so the caller says.
 */
export const docsPages = (hasAccessibility: (item: ComponentNavItem) => boolean): DocsPage[] => {
  const page = (path: string, kind: PageKind): DocsPage => ({ path, kind })
  const components = (items: ComponentNavItem[]): DocsPage[] =>
    items.flatMap((item) => [
      page(sitePath(item.pkg, componentPagePath(item)), 'component'),
      ...(item.pkg === 'react'
        ? [page(sitePath(item.pkg, componentSpecsPath(item)), 'specs')]
        : []),
      ...(hasAccessibility(item)
        ? [page(sitePath(item.pkg, componentAccessibilityPath(item)), 'accessibility')]
        : []),
      ...membersOf(item).map((member) =>
        page(sitePath(member.pkg, componentPagePath(member)), 'member')
      ),
    ])
  return [
    page('/', 'home'),
    page('/packages/', 'packages'),
    ...sectionIds.flatMap((id) => [
      page(sitePath(id, '/'), 'section-index'),
      // A package in its own repository keeps its release notes there.
      ...(sections[id].dir === null ? [] : [page(sitePath(id, '/releases/'), 'releases')]),
    ]),
    ...reactGuides.map((guide) => page(sitePath('react', `/${guide}/`), 'guide')),
    ...Object.keys(entryGuides).map((entry) => page(sitePath('react', `/${entry}/`), 'entry')),
    page(sitePath('react', '/hooks/'), 'hooks'),
    ...reactHooks.map((hook) => page(sitePath('react', `/hooks/${hook}/`), 'hook')),
    ...components(allComponents),
    ...components(markdownComponents),
  ]
}

/**
 * The redirects to write for a host that tells paths apart by case: a component's page is
 * `/react/Button/`, and `/react/button/` goes there. A page whose path is already lowercase needs
 * none; one whose lowercase form is a page of its own is a collision, caught by the route checks.
 */
export const caseRedirects = (pages: DocsPage[]): Array<[from: string, to: string]> =>
  pages
    .filter(({ path }) => path !== path.toLowerCase())
    .map(({ path }): [string, string] => [path.toLowerCase(), path])

/** What Cloudflare Pages accepts in a `_redirects` file: 2000 static rules (and 100 dynamic). */
export const REDIRECT_LIMIT = 2000

/**
 * The `_redirects` file of the build: every case redirect, with the trailing slash of the path and
 * without it, as the host matches a rule on the exact path it is given. Permanent (301). Fails
 * past the host's limit instead of letting it drop the file.
 */
export const renderRedirects = (pages: DocsPage[]): string => {
  const rules = caseRedirects(pages).flatMap(([from, to]) => [
    `${from} ${to} 301`,
    `${from.slice(0, -1)} ${to} 301`,
  ])
  if (rules.length > REDIRECT_LIMIT) {
    throw new Error(`${rules.length} redirects, and Cloudflare Pages takes ${REDIRECT_LIMIT}`)
  }
  return `${rules.join('\n')}\n`
}
