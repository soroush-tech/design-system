import { describe, it, expect } from 'vitest'
import { MIN_THUMB_PX, getScrollForDrag, getThumb } from './scrollThumb'

describe('getThumb', () => {
  it('is null while nothing overflows, or there is no view', () => {
    expect(getThumb({ offset: 0, content: 100, view: 100 })).toBeNull()
    expect(getThumb({ offset: 0, content: 50, view: 100 })).toBeNull()
    expect(getThumb({ offset: 0, content: 100, view: 0 })).toBeNull()
  })

  it('is the share in view, travelling the rest of the track as the box scrolls', () => {
    expect(getThumb({ offset: 0, content: 400, view: 100 })).toEqual({ start: 0, size: 25 })
    expect(getThumb({ offset: 300, content: 400, view: 100 })).toEqual({ start: 75, size: 25 })
    expect(getThumb({ offset: 150, content: 400, view: 100 })).toEqual({ start: 37.5, size: 25 })
  })

  it('is never under the least, and stays in its track past the ends', () => {
    const long = getThumb({ offset: 0, content: 100_000, view: 200 })
    expect(long?.size).toBeCloseTo((MIN_THUMB_PX / 200) * 100)
    expect(getThumb({ offset: -50, content: 400, view: 100 })?.start).toBe(0)
    expect(getThumb({ offset: 900, content: 400, view: 100 })?.start).toBe(75)
  })
})

describe('getScrollForDrag', () => {
  const metrics = { offset: 0, content: 400, view: 100 }

  it('maps the thumb travel onto the whole scroll range', () => {
    // The thumb travels 75px for a 300px range: 25px of drag is 100px of scroll.
    expect(getScrollForDrag(0, 25, metrics)).toBe(100)
    expect(getScrollForDrag(100, -25, metrics)).toBe(0)
  })

  it('stays inside the range', () => {
    expect(getScrollForDrag(0, 1000, metrics)).toBe(300)
    expect(getScrollForDrag(0, -1000, metrics)).toBe(0)
  })

  it('leaves the offset as it is where nothing overflows', () => {
    expect(getScrollForDrag(7, 30, { offset: 7, content: 100, view: 100 })).toBe(7)
  })
})
