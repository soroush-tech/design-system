import type { ContentBundle } from './types'

export interface SearchHit {
  kind: 'component' | 'doc'
  /** Component name or doc id - what to pass to get_component / get_doc. */
  ref: string
  title: string
  /** A short excerpt around the first match. */
  snippet: string
  score: number
}

interface Indexed {
  kind: SearchHit['kind']
  ref: string
  title: string
  /** Short, high-signal text: name, summary. Matches here weigh more. */
  heading: string
  body: string
}

const index = (bundle: ContentBundle): Indexed[] => [
  ...bundle.components.map((component) => ({
    kind: 'component' as const,
    ref: component.name,
    title: component.name,
    heading: `${component.name} ${component.category ?? ''} ${component.summary}`,
    body: `${component.intro}\n${component.api}`,
  })),
  ...bundle.docs.map((doc) => ({
    kind: 'doc' as const,
    ref: doc.id,
    title: doc.title,
    heading: `${doc.id} ${doc.title} ${doc.summary}`,
    body: doc.body,
  })),
]

const terms = (query: string): string[] =>
  query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((term) => term.length > 1)

const count = (haystack: string, term: string): number => haystack.split(term).length - 1

/** An excerpt centred on the first hit, so the caller can judge relevance cheaply. */
const excerpt = (body: string, term: string): string => {
  const at = body.toLowerCase().indexOf(term)
  if (at < 0) return body.slice(0, 160).replace(/\s+/g, ' ').trim()
  const start = Math.max(0, at - 60)
  return `${start > 0 ? '...' : ''}${body
    .slice(start, at + 100)
    .replace(/\s+/g, ' ')
    .trim()}...`
}

/**
 * Ranks components and docs against a query. Deliberately simple term scoring - the
 * corpus is a few hundred documents, and hits are meant to be followed by a
 * get_component / get_doc call rather than read in place.
 */
export const search = (bundle: ContentBundle, query: string, limit = 5): SearchHit[] => {
  const words = terms(query)
  if (!words.length) return []
  return index(bundle)
    .map((entry) => {
      const heading = entry.heading.toLowerCase()
      const body = entry.body.toLowerCase()
      const score = words.reduce(
        (total, term) => total + count(heading, term) * 10 + Math.min(count(body, term), 5),
        0
      )
      return { entry, score }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.entry.ref.localeCompare(b.entry.ref))
    .slice(0, limit)
    .map(({ entry, score }) => ({
      kind: entry.kind,
      ref: entry.ref,
      title: entry.title,
      snippet: excerpt(entry.body, words[0]),
      score,
    }))
}
