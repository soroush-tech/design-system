import {
  DOCS_URL,
  absoluteReadmeLinks,
  allDocComponents,
  categoryOf,
  splitReadme,
  stripReadmeChrome,
  type ComponentNavItem,
} from '@soroush.tech/docs-content'
import { loadReadme } from '@soroush.tech/docs-content/node'
import type { ComponentRecord } from '../types'

export { DOCS_URL }

const packageNameFor = (pkg: string): string => `@soroush.tech/${pkg}`

/** The subpath import a consumer writes for a component. */
export const importPathFor = (item: ComponentNavItem): string =>
  `import { ${item.name} } from '${packageNameFor(item.pkg)}/${item.name}'`

// Markdown prose only: skip headings, badges, block quotes, HTML, and table or rule
// syntax, so the summary is the first real sentence a reader would see.
const isProse = (line: string): boolean =>
  line.trim().length > 0 && !/^(#|\[!\[|>|<|\||-{3,})/.test(line.trim())

/** The first prose line, ignoring anything inside a fenced code block. */
const firstProseLine = (markdown: string): string | undefined => {
  let fenced = false
  for (const line of markdown.split('\n')) {
    if (line.trim().startsWith('```')) {
      fenced = !fenced
      continue
    }
    if (!fenced && isProse(line)) return line
  }
  return undefined
}

/** The first sentence of a README's prose, used as the one-line inventory summary. */
export const summarize = (intro: string): string => {
  const line = firstProseLine(stripReadmeChrome(intro))
  if (!line) return ''
  const sentence = /^(.*?[.!?])(\s|$)/.exec(line.trim())
  return (sentence ? sentence[1] : line.trim()).replace(/\s+/g, ' ')
}

/** Reads every registered component's README and splits it into the served slices. */
export const buildComponents = (): ComponentRecord[] =>
  allDocComponents.map((item) => {
    // Links are rewritten to site URLs: a README's `../View/` means nothing to a
    // caller reading this outside the repo.
    const { intro, api, examples } = splitReadme(absoluteReadmeLinks(loadReadme(item)))
    return {
      name: item.name,
      slug: item.slug,
      pkg: item.pkg,
      packageName: packageNameFor(item.pkg),
      category: categoryOf(item),
      importPath: importPathFor(item),
      summary: summarize(intro),
      intro: stripReadmeChrome(intro),
      api,
      examples,
      url: `${DOCS_URL}/${item.pkg}/components/${item.slug}/`,
    }
  })
