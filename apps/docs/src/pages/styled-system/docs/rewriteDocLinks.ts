import { styledSystemDocSlug } from 'src/common/nav'
import { sectionPath } from 'src/common/sectionPath'

/** The path of a relative link, resolved against the folder of the doc it is in. */
const resolveFrom = (file: string, target: string): string => {
  const parts = file.split('/').slice(0, -1)
  for (const part of target.split('/')) {
    if (part === '..') parts.pop()
    else if (part !== '.') parts.push(part)
  }
  return parts.join('/')
}

/**
 * Rewrites the relative links of a styled-system doc (`./spacing.md`, `../theming.md#scales`) to
 * the routes the docs are served at, keeping a `#section`. A link to a file that is not one of
 * `files` - or an absolute URL, or an anchor - passes through unchanged.
 */
export const rewriteDocLinks = (source: string, file: string, files: string[]): string =>
  source.replace(/\]\((\.{1,2}\/[^)\s#]+\.md)(#[\w-]+)?\)/g, (full, href: string, hash = '') => {
    const target = resolveFrom(file, href)
    return files.includes(target)
      ? `](${sectionPath('styled-system', `/docs/${styledSystemDocSlug(target)}/`)}${hash})`
      : full
  })
