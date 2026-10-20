import { describe, it, expect } from 'vitest'
import { readScroll } from './useTabsScroll'

interface Box {
  clientWidth?: number
  scrollWidth?: number
  scrollLeft?: number
  clientHeight?: number
  scrollHeight?: number
  scrollTop?: number
}

describe('readScroll', () => {
  const element = (box: Box) => box as unknown as HTMLElement

  it('reads overflow and each side, start edge first', () => {
    expect(
      readScroll(element({ clientWidth: 100, scrollWidth: 100, scrollLeft: 0 }), false)
    ).toEqual({
      isOverflowing: false,
      canScrollStart: false,
      canScrollEnd: false,
    })
    expect(
      readScroll(element({ clientWidth: 100, scrollWidth: 300, scrollLeft: 100 }), false)
    ).toEqual({
      isOverflowing: true,
      canScrollStart: true,
      canScrollEnd: true,
    })
    expect(
      readScroll(element({ clientWidth: 100, scrollWidth: 300, scrollLeft: 199.5 }), false)
    ).toMatchObject({ canScrollEnd: false })
  })

  it('reads a right-to-left offset, which counts down from 0', () => {
    expect(
      readScroll(element({ clientWidth: 100, scrollWidth: 300, scrollLeft: -200 }), false)
    ).toMatchObject({ canScrollStart: true, canScrollEnd: false })
  })

  it('reads the vertical axis', () => {
    expect(
      readScroll(element({ clientHeight: 100, scrollHeight: 300, scrollTop: 0 }), true)
    ).toEqual({ isOverflowing: true, canScrollStart: false, canScrollEnd: true })
  })
})
