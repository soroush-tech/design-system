const KEY = 'docs:recent-searches'
const MAX_RECENT = 5

/**
 * The words last searched for, newest first - kept in this browser only. Storage can be
 * missing or refuse a read (a private window, blocked site data, the server), and then there
 * are no recent searches rather than an error.
 */
export const readRecentSearches = (): string[] => {
  try {
    const stored: unknown = JSON.parse(window.localStorage.getItem(KEY) ?? '[]')
    return Array.isArray(stored)
      ? stored.filter((word): word is string => typeof word === 'string')
      : []
  } catch {
    return []
  }
}

/** Remembers a search as the newest, once; a blank one is not kept. Returns the list now kept. */
export const saveRecentSearch = (query: string): string[] => {
  const word = query.trim()
  if (word === '') return readRecentSearches()
  const next = [word, ...readRecentSearches().filter((kept) => kept !== word)].slice(0, MAX_RECENT)
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // Storage refused the write - the list lives for this visit only.
  }
  return next
}
