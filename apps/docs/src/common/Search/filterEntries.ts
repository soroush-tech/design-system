import type { SearchEntry } from 'src/common/nav'

const MAX_RESULTS = 20

/**
 * The entries whose label or group holds every word of the query, in any case - the ones that
 * start with the query first, then in the order the docs list them.
 */
export const filterEntries = (entries: SearchEntry[], query: string): SearchEntry[] => {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (words.length === 0) return []
  const phrase = words.join(' ')
  return entries
    .filter((entry) => {
      const text = `${entry.label} ${entry.group}`.toLowerCase()
      return words.every((word) => text.includes(word))
    })
    .map((entry, order) => ({
      entry,
      order,
      isPrefix: entry.label.toLowerCase().startsWith(phrase),
    }))
    .sort((a, b) => Number(b.isPrefix) - Number(a.isPrefix) || a.order - b.order)
    .slice(0, MAX_RESULTS)
    .map(({ entry }) => entry)
}
