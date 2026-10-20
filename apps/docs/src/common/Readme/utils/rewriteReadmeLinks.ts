import { allDocComponents, componentLinkPath } from 'src/common/nav'
import { sectionPath } from 'src/common/sectionPath'

const DOCS_TARGETS: Record<string, string> = {
  'theming.md': '/customization/theming/',
  'customization.md': '/customization/how-to/',
}

/**
 * Rewrites a single relative README link target to its in-site route. READMEs link
 * siblings as `../Other/README.md` (a family member as `../Menu/MenuItems/README.md` from outside
 * its family) and package docs as `../../docs/customization.md`;
 * lifted into the site those files live at section routes instead. A linked component
 * resolves to its own package's section - a family member to its API page - keeping a
 * `#section` the link ends in. Absolute URLs, anchors, and unrecognized targets pass
 * through unchanged.
 */
export const rewriteReadmeLink = (href: string): string => {
  const docsMatch = /(?:\.\.\/)+docs\/([\w-]+\.md)(#[\w-]+)?$/.exec(href)
  if (docsMatch && DOCS_TARGETS[docsMatch[1]])
    return sectionPath('design-system', DOCS_TARGETS[docsMatch[1]]) + (docsMatch[2] ?? '')

  const componentMatch =
    /(?:\.\.\/)+(?:[A-Z][A-Za-z0-9]*\/)?([A-Z][A-Za-z0-9]*)\/(?:README\.md)?(#[\w-]+)?$/.exec(href)
  if (componentMatch) {
    const item = allDocComponents.find((component) => component.name === componentMatch[1])
    if (item) return sectionPath(item.pkg, componentLinkPath(item, componentMatch[2]))
  }

  return href
}

/** Rewrites every markdown link target in a README source string via `rewriteReadmeLink`. */
export const rewriteReadmeLinks = (readme: string): string =>
  readme.replace(/\]\(([^)\s]+)\)/g, (_full, href: string) => `](${rewriteReadmeLink(href)})`)
