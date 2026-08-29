import { describe, it, expect } from 'vitest'
import { stripReadmeChrome } from './stripReadmeChrome'

describe('stripReadmeChrome', () => {
  it('drops the leading H1 and badge lines', () => {
    const readme = '# Package\n[![badge](img)](url)\n\nIntro text.\n\n## Section'
    expect(stripReadmeChrome(readme)).toBe('Intro text.\n\n## Section')
  })

  it('keeps an H1 that is not the first line', () => {
    const readme = 'Intro.\n# Not chrome'
    expect(stripReadmeChrome(readme)).toBe('Intro.\n# Not chrome')
  })

  it('returns unbadged content unchanged', () => {
    expect(stripReadmeChrome('Plain content.')).toBe('Plain content.')
  })
})
