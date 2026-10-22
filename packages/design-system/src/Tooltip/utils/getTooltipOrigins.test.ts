import { describe, it, expect } from 'vitest'
import { getTooltipOrigins, tooltipPlacementValues } from './getTooltipOrigins'

describe('getTooltipOrigins', () => {
  it('puts a tooltip above, centred, by default of its side', () => {
    expect(getTooltipOrigins('top', false)).toEqual({
      anchorOrigin: { vertical: 'top', horizontal: 'center' },
      transformOrigin: { vertical: 'bottom', horizontal: 'center' },
    })
  })

  it('puts it below', () => {
    expect(getTooltipOrigins('bottom', false)).toEqual({
      anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
      transformOrigin: { vertical: 'top', horizontal: 'center' },
    })
  })

  it('lines it up with the start or the end of the child on a vertical side', () => {
    expect(getTooltipOrigins('top-start', false).anchorOrigin.horizontal).toBe('left')
    expect(getTooltipOrigins('bottom-end', false).anchorOrigin.horizontal).toBe('right')
  })

  it('mirrors start and end right to left on a vertical side', () => {
    expect(getTooltipOrigins('top-start', true).anchorOrigin.horizontal).toBe('right')
    expect(getTooltipOrigins('top-end', true).anchorOrigin.horizontal).toBe('left')
    expect(getTooltipOrigins('top', true).anchorOrigin.horizontal).toBe('center')
  })

  it('puts it beside the child, centred', () => {
    expect(getTooltipOrigins('left', false)).toEqual({
      anchorOrigin: { vertical: 'center', horizontal: 'left' },
      transformOrigin: { vertical: 'center', horizontal: 'right' },
    })
    expect(getTooltipOrigins('right', false)).toEqual({
      anchorOrigin: { vertical: 'center', horizontal: 'right' },
      transformOrigin: { vertical: 'center', horizontal: 'left' },
    })
  })

  it('lines it up with the top or the bottom of the child on a horizontal side', () => {
    expect(getTooltipOrigins('left-start', false).anchorOrigin.vertical).toBe('top')
    expect(getTooltipOrigins('right-end', false).anchorOrigin.vertical).toBe('bottom')
  })

  it('swaps left and right right to left, and keeps top and bottom', () => {
    expect(getTooltipOrigins('left', true).anchorOrigin.horizontal).toBe('right')
    expect(getTooltipOrigins('right', true).anchorOrigin.horizontal).toBe('left')
    expect(getTooltipOrigins('top', true).anchorOrigin.vertical).toBe('top')
  })

  it('has origins for every placement', () => {
    for (const placement of tooltipPlacementValues) {
      expect(getTooltipOrigins(placement, false).anchorOrigin).toBeDefined()
    }
  })
})
