import { describe, it, expect } from 'vitest'
import { baseTheme, createTheme } from '../theme/themes'
import { getFocusRing, getInputMinWidth } from './inputStyles'

describe('getInputMinWidth', () => {
  it('is 12rem, or what the theme sets', () => {
    expect(getInputMinWidth(baseTheme)).toBe('12rem')
    expect(getInputMinWidth(createTheme(baseTheme, { defaults: { inputMinWidth: '8rem' } }))).toBe(
      '8rem'
    )
  })
})

describe('getFocusRing', () => {
  it('is a ring in the color, or in the error color while it is in error', () => {
    expect(getFocusRing(baseTheme, 'secondary')).toEqual({
      outline: `2px solid ${baseTheme.palette.secondary.main}`,
      outlineOffset: '2px',
    })
    expect(getFocusRing(baseTheme, 'secondary', true).outline).toBe(
      `2px solid ${baseTheme.palette.error.main}`
    )
  })
})
