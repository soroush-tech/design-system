import { allDocComponents } from 'src/common/nav'
import { sectionPath } from 'src/common/sectionPath'

const DOCS_TARGETS: Record<string, string> = {
  'theming.md': '/customization/theming/',
  'customization.md': '/customization/how-to/',
}

/**
 * Rewrites a single relative README link target to its in-site route. READMEs link
 * siblings as `../Other/README.md` and package docs as `../../docs/customization.md`;
 * lifted into the site those files live at section routes instead. A linked component
 * resolves to its own package's section. Absolute URLs, anchors, and unrecognized
 * targets pass through unchanged.
 */
export const rewriteReadmeLink = (href: string): string => {
  const docsMatch = /(?:\.\.\/)+docs\/([\w-]+\.md)$/.exec(href)
  if (docsMatch && DOCS_TARGETS[docsMatch[1]])
    return sectionPath('design-system', DOCS_TARGETS[docsMatch[1]])

  const componentMatch = /(?:\.\.\/)+([A-Z][A-Za-z0-9]*)\/README\.md$/.exec(href)
  if (componentMatch) {
    const item = allDocComponents.find((component) => component.name === componentMatch[1])
    if (item) return sectionPath(item.pkg, `/components/${item.slug}/`)
  }

  return href
}

/** Rewrites every markdown link target in a README source string via `rewriteReadmeLink`. */
export const rewriteReadmeLinks = (readme: string): string =>
  readme.replace(/\]\(([^)\s]+)\)/g, (_full, href: string) => `](${rewriteReadmeLink(href)})`)
