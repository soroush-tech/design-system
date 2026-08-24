import { describe, it, expect } from 'vitest'
import { dedent, indent } from './indentation'

describe('dedent', () => {
  it('strips the common leading whitespace', () => {
    expect(dedent('    <a>\n      <b />\n    </a>')).toBe('<a>\n  <b />\n</a>')
  })

  it('trims blank leading and trailing lines and trailing spaces', () => {
    expect(dedent('\n  one  \n\n  two\n')).toBe('one\n\ntwo')
  })

  it('returns an empty string for blank input', () => {
    expect(dedent('  \n  ')).toBe('')
  })
})

describe('indent', () => {
  it('prefixes non-empty lines only', () => {
    expect(indent('a\n\nb', 2)).toBe('  a\n\n  b')
  })
})
