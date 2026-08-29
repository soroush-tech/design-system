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

/**
 * The first prose paragraph, ignoring anything inside a fenced code block. READMEs wrap
 * their prose, so a paragraph is collected to its blank line rather than stopping at the
 * first physical line - otherwise a summary is cut wherever the author happened to wrap.
 */
const firstProseParagraph = (markdown: string): string | undefined => {
  let fenced = false
  const paragraph: string[] = []
  for (const line of markdown.split('\n')) {
    if (line.trim().startsWith('```')) {
      fenced = !fenced
      continue
    }
    if (fenced) continue
    if (isProse(line)) paragraph.push(line.trim())
    else if (paragraph.length) break
  }
  return paragraph.length ? paragraph.join(' ') : undefined
}

// Abbreviations whose dot is not a sentence end. Without this, "items (e.g. a blog
// index), with ..." is cut to "items (e.g." - a summary that stops mid-parenthesis.
const ABBREVIATION = /\b(?:e\.g|i\.e|etc|vs|cf|approx|Dr|Mr|Ms|St|no)\.$/
// A lone capital before a dot is an initial only as part of a run, as in "J. R. R.
// Tolkien" - it counts when another initial sits on either side of it. Standing alone it
// ends the sentence, so "Select option A." stops there rather than swallowing the next.
const INITIAL = /\s[A-Z]\.$/
const AFTER_INITIAL = /\s[A-Z]\.\s[A-Z]\.$/
const BEFORE_INITIAL = /^\s+[A-Z]\./

/** Whether the dot ending `trimmed.slice(0, end)` closes a sentence. */
const endsSentence = (trimmed: string, end: number): boolean => {
  const upTo = trimmed.slice(0, end)
  if (ABBREVIATION.test(upTo)) return false
  const inRunOfInitials =
    INITIAL.test(upTo) && (BEFORE_INITIAL.test(trimmed.slice(end)) || AFTER_INITIAL.test(upTo))
  return !inRunOfInitials
}

/** The first sentence of a README's prose, used as the one-line inventory summary. */
export const summarize = (intro: string): string => {
  const line = firstProseParagraph(stripReadmeChrome(intro))
  if (!line) return ''
  const trimmed = line.trim()
  const sentence = /(?:^|\s)\S*?[.!?](?=\s|$)/g
  for (const match of trimmed.matchAll(sentence)) {
    const end = match.index + match[0].length
    if (endsSentence(trimmed, end)) return trimmed.slice(0, end).replace(/\s+/g, ' ')
  }
  return trimmed.replace(/\s+/g, ' ')
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
