import { describe, it, expect } from 'vitest'
import {
  getTooltipOrigins,
  resolveTooltipPlacement,
  tooltipPlacementValues,
  type FixedTooltipPlacement,
} from './getTooltipOrigins'

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

  it('has origins for every fixed placement', () => {
    for (const placement of tooltipPlacementValues.filter((value) => !value.startsWith('auto'))) {
      expect(
        getTooltipOrigins(placement as FixedTooltipPlacement, false).anchorOrigin
      ).toBeDefined()
    }
  })
})

describe('resolveTooltipPlacement', () => {
  const rect = (left: number, top: number, width: number, height: number) =>
    ({ left, top, width, height, right: left + width, bottom: top + height }) as DOMRect
  const context = (anchorRect: DOMRect, isRtl = false) => ({
    anchorRect,
    surfaceSize: { width: 40, height: 16 },
    viewport: { width: 1000, height: 800 },
    isRtl,
  })

  it('leaves a fixed placement as it is', () => {
    expect(resolveTooltipPlacement('left-end', context(rect(100, 100, 50, 20)))).toBe('left-end')
  })

  it('takes the side with the most room', () => {
    expect(resolveTooltipPlacement('auto', context(rect(480, 700, 50, 20)))).toBe('top')
    expect(resolveTooltipPlacement('auto', context(rect(480, 10, 50, 20)))).toBe('bottom')
    expect(resolveTooltipPlacement('auto', context(rect(10, 390, 50, 20)))).toBe('right')
    expect(resolveTooltipPlacement('auto', context(rect(940, 390, 50, 20)))).toBe('left')
  })

  it('lines up with the start or the end of that side', () => {
    expect(resolveTooltipPlacement('auto-start', context(rect(480, 700, 50, 20)))).toBe('top-start')
    expect(resolveTooltipPlacement('auto-end', context(rect(480, 10, 50, 20)))).toBe('bottom-end')
  })

  it('names the sides beside the child as the page does, right to left', () => {
    expect(resolveTooltipPlacement('auto', context(rect(10, 390, 50, 20), true))).toBe('left')
    expect(resolveTooltipPlacement('auto', context(rect(940, 390, 50, 20), true))).toBe('right')
  })
})
