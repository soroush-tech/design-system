import { describe, it, expect } from 'vitest'
import { syntaxDark } from '@soroush.tech/markdown/CodeBlock'
import { prismTheme } from './prismTheme'

describe('prismTheme', () => {
  it('maps the syntax tokens onto prism token groups', () => {
    const theme = prismTheme(syntaxDark)
    expect(theme.plain).toEqual({
      color: syntaxDark.base,
      backgroundColor: 'transparent',
      fontFamily: syntaxDark.font,
    })
    const styleFor = (type: string) =>
      theme.styles.find((entry) => entry.types.includes(type))!.style
    expect(styleFor('comment')).toEqual({ color: syntaxDark.comment, fontStyle: 'italic' })
    expect(styleFor('keyword').color).toBe(syntaxDark.keyword)
    expect(styleFor('class-name').color).toBe(syntaxDark.type)
    expect(styleFor('string').color).toBe(syntaxDark.string)
    expect(styleFor('number').color).toBe(syntaxDark.number)
    expect(styleFor('constant').color).toBe(syntaxDark.constant)
    expect(styleFor('function').color).toBe(syntaxDark.title)
    expect(styleFor('tag').color).toBe(syntaxDark.tag)
  })
})
