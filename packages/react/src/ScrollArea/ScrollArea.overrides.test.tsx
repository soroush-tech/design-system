import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { slotCases } from '../utils/test/slotCases'
import { ScrollArea, type ScrollAreaProps } from './ScrollArea'

// jsdom measures nothing: boxes of 400 in a view of 100 give the area a track and a thumb.
beforeEach(() => {
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      disconnect() {}
    }
  )
  for (const name of ['scrollHeight', 'scrollWidth'] as const) {
    vi.spyOn(HTMLElement.prototype, name, 'get').mockReturnValue(400)
  }
  for (const name of ['clientHeight', 'clientWidth'] as const) {
    vi.spyOn(HTMLElement.prototype, name, 'get').mockReturnValue(100)
  }
})
afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

const root = () => document.querySelector('[data-scroll-viewport]')!.parentElement

describe('ScrollArea overrides', () => {
  it.each(
    slotCases({
      render: (props: Partial<ScrollAreaProps>) => (
        <ScrollArea {...props}>
          <p>Content</p>
        </ScrollArea>
      ),
      root,
      slots: {
        root,
        viewport: () => document.querySelector('[data-scroll-viewport]'),
        track: () => document.querySelector('[data-scroll-track]'),
        thumb: () => document.querySelector('[data-scroll-thumb]'),
      },
    })
  )('$name', ({ run, expected }) => {
    expect(run()).toEqual(expected)
  })
})
