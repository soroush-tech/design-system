import { describe, it, expect } from 'vitest'
import { StyleSheet } from './styled'
import { mergeOverrides } from './overrides'

const sheet = StyleSheet.create({ first: { color: 'red' }, second: { color: 'blue' } })

describe('mergeOverrides', () => {
  it('gives nothing for nothing', () => {
    expect(mergeOverrides()).toEqual({ className: undefined, style: undefined })
    expect(mergeOverrides(undefined, { style: false })).toEqual({
      className: undefined,
      style: undefined,
    })
  })

  it('keeps one style as it is, not wrapped in a list', () => {
    expect(mergeOverrides({ style: sheet.first }, undefined).style).toBe(sheet.first)
  })

  it('lists several styles in order, and drops the ones that are off', () => {
    const merged = mergeOverrides({ style: sheet.first }, { style: null }, { style: sheet.second })
    expect(merged.style).toEqual([sheet.first, sheet.second])
  })

  it('joins the class names and takes the attributes of every part, the later winning', () => {
    const merged = mergeOverrides(
      { className: 'a', 'data-mark': 'one', 'aria-label': 'first' },
      { className: 'b', 'data-mark': 'two' }
    )
    expect(merged).toMatchObject({ className: 'a b', 'data-mark': 'two', 'aria-label': 'first' })
  })
})
