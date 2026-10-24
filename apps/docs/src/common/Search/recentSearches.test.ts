import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { readRecentSearches, saveRecentSearch } from './recentSearches'

beforeEach(() => {
  window.localStorage.clear()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('recent searches', () => {
  it('has none to begin with', () => {
    expect(readRecentSearches()).toEqual([])
  })

  it('keeps a search as the newest, once', () => {
    saveRecentSearch('button')
    saveRecentSearch('tabs')
    expect(saveRecentSearch('button')).toEqual(['button', 'tabs'])
    expect(readRecentSearches()).toEqual(['button', 'tabs'])
  })

  it('trims a search, and keeps no blank one', () => {
    expect(saveRecentSearch('  menu  ')).toEqual(['menu'])
    expect(saveRecentSearch('   ')).toEqual(['menu'])
    expect(saveRecentSearch('')).toEqual(['menu'])
  })

  it('keeps the five newest', () => {
    for (const word of ['a', 'b', 'c', 'd', 'e', 'f']) saveRecentSearch(word)
    expect(readRecentSearches()).toEqual(['f', 'e', 'd', 'c', 'b'])
  })

  it('ignores what is stored that is not a list of words', () => {
    window.localStorage.setItem('docs:recent-searches', '{"a":1}')
    expect(readRecentSearches()).toEqual([])
    window.localStorage.setItem('docs:recent-searches', '["ok",3,null,"fine"]')
    expect(readRecentSearches()).toEqual(['ok', 'fine'])
    window.localStorage.setItem('docs:recent-searches', 'not json')
    expect(readRecentSearches()).toEqual([])
  })

  it('has none where storage cannot be read', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    expect(readRecentSearches()).toEqual([])
  })

  it('still answers with the list when storage refuses the write', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('full')
    })
    expect(saveRecentSearch('card')).toEqual(['card'])
  })
})
