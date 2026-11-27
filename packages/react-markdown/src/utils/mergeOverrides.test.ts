import { describe, it, expect } from 'vitest'
import { StyleSheet } from '@gild-ui/react'
import { mergeOverrides } from './mergeOverrides'

const sheet = StyleSheet.create({ first: { color: 'red' }, second: { color: 'blue' } })

describe('mergeOverrides', () => {
  it('gives nothing for nothing', () => {
    expect(mergeOverrides()).toEqual({ className: undefined, style: undefined })
    expect(mergeOverrides(undefined, { style: false })).toEqual({
      className: undefined,
      style: undefined,
    })
  })

  it('keeps one style as it is, and lists several in order without the ones that are off', () => {
    expect(mergeOverrides({ style: sheet.first }).style).toBe(sheet.first)
    expect(
      mergeOverrides({ style: sheet.first }, { style: null }, { style: sheet.second }).style
    ).toEqual([sheet.first, sheet.second])
  })

  it('joins the class names and takes the attributes of every part, the later winning', () => {
    expect(
      mergeOverrides(
        { className: 'a', 'data-mark': 'one', 'aria-label': 'x' },
        { className: 'b', 'data-mark': 'two' }
      )
    ).toMatchObject({ className: 'a b', 'data-mark': 'two', 'aria-label': 'x' })
  })
})
