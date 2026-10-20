import { describe, it, expect } from 'vitest'
import { getMenuOrigins } from './getMenuOrigins'

describe('getMenuOrigins', () => {
  it('lines a list up under its trigger, from the start or end edge', () => {
    expect(getMenuOrigins('below', 'start', false)).toEqual({
      anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
      transformOrigin: { vertical: 'top', horizontal: 'left' },
    })
    expect(getMenuOrigins('below', 'end', false)).toEqual({
      anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
      transformOrigin: { vertical: 'top', horizontal: 'right' },
    })
  })

  it('mirrors the edges in a right-to-left page', () => {
    expect(getMenuOrigins('below', 'start', true).anchorOrigin.horizontal).toBe('right')
    expect(getMenuOrigins('below', 'end', true).anchorOrigin.horizontal).toBe('left')
  })

  it("opens a submenu past its row's far edge", () => {
    expect(getMenuOrigins('beside', 'start', false)).toEqual({
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
      transformOrigin: { vertical: 'top', horizontal: 'left' },
    })
    expect(getMenuOrigins('beside', 'end', false)).toEqual({
      anchorOrigin: { vertical: 'top', horizontal: 'left' },
      transformOrigin: { vertical: 'top', horizontal: 'right' },
    })
    expect(getMenuOrigins('beside', 'start', true).anchorOrigin.horizontal).toBe('left')
  })
})
