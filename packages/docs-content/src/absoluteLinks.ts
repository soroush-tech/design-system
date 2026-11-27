import { allDocComponents, componentLinkPath, docPagePath, sitePath } from './registry'

/** Where the published docs live; component pages hang off this. */
export const DOCS_URL = 'https://gild-ui.soroush.design'

/**
 * A link to a file of the component library's docs, from a README (`../../docs/theming.md`) or
 * from one of the docs (`./theming.md`).
 */
export const DOC_LINK = /^(?:\.{1,2}\/)+(?:docs\/)?([\w-]+\.md)(#[\w-]+)?$/

/**
 * Resolves one relative README link target to its absolute docs URL. READMEs link
 * siblings as `../Other/` or `../Other/README.md` - a family member through its family's folder,
 * `../Menu/MenuItems/`, from outside it - and package docs as `../../docs/theming.md` (or
 * `./theming.md`, from a doc); lifted out of the repo - into llms.txt or an MCP response -
 * those paths point nowhere, so they become site URLs, keeping a `#section` they end in.
 * Absolute URLs, anchors, and unrecognized targets pass through unchanged.
 */
export const absoluteReadmeLink = (href: string): string => {
  const docsMatch = DOC_LINK.exec(href)
  const docPath = docsMatch && docPagePath(docsMatch[1])
  if (docPath) return DOCS_URL + sitePath('react', docPath) + (docsMatch[2] ?? '')

  const componentMatch =
    /(?:\.\.\/)+(?:[A-Z][A-Za-z0-9]*\/)?([A-Z][A-Za-z0-9]*)\/(?:README\.md)?(#[\w-]+)?$/.exec(href)
  if (componentMatch) {
    const item = allDocComponents.find((component) => component.name === componentMatch[1])
    if (item) return DOCS_URL + sitePath(item.pkg, componentLinkPath(item, componentMatch[2]))
  }

  return href
}

/** Rewrites every markdown link target in a README via `absoluteReadmeLink`. */
export const absoluteReadmeLinks = (readme: string): string =>
  readme.replace(/\]\(([^)\s]+)\)/g, (_full, href: string) => `](${absoluteReadmeLink(href)})`)
