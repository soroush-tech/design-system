import { describe, it, expect } from 'vitest'
import { maskSource } from './maskSource'

describe('maskSource', () => {
  it('blanks string contents but keeps the delimiters', () => {
    expect(maskSource("const a = 'b { c }'")).toBe("const a = '       '")
  })

  it('handles a string at the very start of the source', () => {
    expect(maskSource("'use strict'")).toBe("'          '")
  })

  it('recognizes strings after keywords like from and return', () => {
    expect(maskSource("import { A } from './a{'")).toBe("import { A } from '    '")
    expect(maskSource("const f = () => { return 'x}' }")).toBe("const f = () => { return '  ' }")
  })

  it.each([
    ['apostrophes in JSX text', "const a = <span>It's fine</span>"],
    ['a quote after a closing brace', "const a = <span>{x}'s</span>"],
    ['division', 'const a = b / c'],
  ])('leaves %s untouched', (_label, source) => {
    expect(maskSource(source)).toBe(source)
  })

  it('skips escape sequences inside strings', () => {
    expect(maskSource("const a = 'it\\'s'")).toBe("const a = '     '")
  })

  it('blanks line comments entirely', () => {
    expect(maskSource('const a = 1 // brace }\nconst b = 2')).toBe(
      'const a = 1           \nconst b = 2'
    )
  })

  it('blanks block comments and keeps their newlines', () => {
    expect(maskSource('/* {\n} */ const a = 1')).toBe('    \n     const a = 1')
  })

  it('is resilient to an unterminated block comment', () => {
    expect(maskSource('const a = 1\n/* open {')).toBe('const a = 1\n         ')
  })

  it('is resilient to an unterminated string', () => {
    expect(maskSource("const a = 'open {")).toBe("const a = '      ")
  })

  it('blanks template contents including interpolated code', () => {
    expect(maskSource('const a = `x ${foo({ b: 1 })} y`')).toBe('const a = `                    `')
  })

  it('masks strings nested inside template interpolations', () => {
    expect(maskSource("const a = `${x ? 'y{' : 'z'}`")).toBe('const a = `                 `')
  })

  it('masks templates nested inside interpolations', () => {
    expect(maskSource('const a = `x${`y${b}`}z`')).toBe('const a = `            `')
  })

  it('treats a bare dollar inside a template as content', () => {
    expect(maskSource('const a = `1 $ 2`')).toBe('const a = `     `')
  })

  it('skips escaped backticks inside templates', () => {
    expect(maskSource('const a = `x\\`y`')).toBe('const a = `    `')
  })

  it('keeps brace depth intact across masked regions', () => {
    const source = "const s = { key: 'value } with brace', other: 1 }"
    const mask = maskSource(source)
    expect(mask.split('{')).toHaveLength(mask.split('}').length)
  })
})
