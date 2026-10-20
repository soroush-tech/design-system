import { allDocComponents, componentLinkPath } from './registry'

/** Where the published docs live; component pages hang off this. */
export const DOCS_URL = 'https://docs.soroush.tech'

const DOCS_TARGETS: Record<string, string> = {
  'theming.md': '/design-system/customization/theming/',
  'customization.md': '/design-system/customization/how-to/',
}

/**
 * Resolves one relative README link target to its absolute docs URL. READMEs link
 * siblings as `../Other/` or `../Other/README.md` - a family member through its family's folder,
 * `../Menu/MenuItems/`, from outside it - and package docs as
 * `../../docs/theming.md`; lifted out of the repo - into llms.txt or an MCP response -
 * those paths point nowhere, so they become site URLs, keeping a `#section` they end in.
 * Absolute URLs, anchors, and unrecognized targets pass through unchanged.
 */
export const absoluteReadmeLink = (href: string): string => {
  const docsMatch = /(?:\.\.\/)+docs\/([\w-]+\.md)(#[\w-]+)?$/.exec(href)
  if (docsMatch && DOCS_TARGETS[docsMatch[1]]) {
    return DOCS_URL + DOCS_TARGETS[docsMatch[1]] + (docsMatch[2] ?? '')
  }

  const componentMatch =
    /(?:\.\.\/)+(?:[A-Z][A-Za-z0-9]*\/)?([A-Z][A-Za-z0-9]*)\/(?:README\.md)?(#[\w-]+)?$/.exec(href)
  if (componentMatch) {
    const item = allDocComponents.find((component) => component.name === componentMatch[1])
    if (item) return `${DOCS_URL}/${item.pkg}${componentLinkPath(item, componentMatch[2])}`
  }

  return href
}

/** Rewrites every markdown link target in a README via `absoluteReadmeLink`. */
export const absoluteReadmeLinks = (readme: string): string =>
  readme.replace(/\]\(([^)\s]+)\)/g, (_full, href: string) => `](${absoluteReadmeLink(href)})`)
