import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { createRef } from 'react'
import { act, fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from '../../utils/test/renderWithTheme'
import { Tabs, type TabsActions, type TabsProps } from './Tabs'
import { Tab } from '../Tab'

interface Box {
  clientWidth?: number
  scrollWidth?: number
  scrollLeft?: number
  clientHeight?: number
  scrollHeight?: number
  scrollTop?: number
}

// jsdom lays nothing out: give every element the list's measurements.
const measure = (box: Box) => {
  for (const [key, value] of Object.entries(box)) {
    vi.spyOn(HTMLElement.prototype, key as 'clientWidth', 'get').mockReturnValue(value)
  }
}

const renderRow = (props: Partial<TabsProps> = {}) =>
  renderWithTheme(
    <Tabs aria-label="Components" overflowBehavior="scroll" {...props}>
      {Array.from({ length: 12 }, (_, index) => (
        <Tab key={index} value={index} label={`Component ${index}`} />
      ))}
    </Tabs>
  )

const button = (direction: 'start' | 'end') =>
  document.querySelector<HTMLButtonElement>(`[data-scroll-direction="${direction}"]`)
const list = () => screen.getByRole('tablist')

beforeEach(() => {
  HTMLElement.prototype.scrollBy = vi.fn()
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('scrolling Tabs', () => {
  it('neither scrolls nor shows buttons by default', () => {
    measure({ clientWidth: 100, scrollWidth: 400, scrollLeft: 0 })
    renderRow({ overflowBehavior: 'none' })
    expect(button('start')).toBeNull()
    expect(list()).not.toHaveStyle({ overflowX: 'auto' })
  })

  it('scrolls, and shows no buttons while everything fits', () => {
    measure({ clientWidth: 400, scrollWidth: 400, scrollLeft: 0 })
    renderRow()
    expect(list()).toHaveStyle({ overflowX: 'auto', overflowY: 'hidden' })
    expect(button('start')).toBeNull()
  })

  it('shows each button only while tabs are out of view its way', () => {
    measure({ clientWidth: 100, scrollWidth: 400, scrollLeft: 0 })
    renderRow()
    expect(button('start')).toHaveStyle({ visibility: 'hidden' })
    expect(button('end')).toHaveStyle({ visibility: 'visible' })
    expect(button('end')).toHaveAttribute('aria-hidden', 'true')
    expect(button('end')).toHaveAttribute('tabindex', '-1')

    measure({ clientWidth: 100, scrollWidth: 400, scrollLeft: 300 })
    fireEvent.scroll(list())
    expect(button('start')).toHaveStyle({ visibility: 'visible' })
    expect(button('end')).toHaveStyle({ visibility: 'hidden' })
  })

  it('scrolls a view at a time, smoothly', () => {
    measure({ clientWidth: 100, scrollWidth: 400, scrollLeft: 100 })
    renderRow()
    fireEvent.click(button('end')!)
    expect(list().scrollBy).toHaveBeenCalledWith({ left: 100, behavior: 'smooth' })
    fireEvent.click(button('start')!)
    expect(list().scrollBy).toHaveBeenCalledWith({ left: -100, behavior: 'smooth' })
  })

  it('jumps rather than glides for reduced motion', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }))
    measure({ clientWidth: 100, scrollWidth: 400, scrollLeft: 0 })
    renderRow()
    fireEvent.click(button('end')!)
    expect(list().scrollBy).toHaveBeenCalledWith({ left: 100, behavior: 'auto' })
  })

  it('scrolls the other way toward the end right to left', () => {
    measure({ clientWidth: 100, scrollWidth: 400, scrollLeft: 0 })
    renderWithTheme(
      <div dir="rtl">
        <Tabs overflowBehavior="scroll">
          <Tab label="One" />
        </Tabs>
      </div>
    )
    fireEvent.click(button('end')!)
    expect(list().scrollBy).toHaveBeenCalledWith({ left: -100, behavior: 'smooth' })
  })

  it('scrolls vertically, with up and down buttons', () => {
    measure({ clientHeight: 100, scrollHeight: 400, scrollTop: 0, clientWidth: 0, scrollWidth: 0 })
    renderRow({ orientation: 'vertical' })
    expect(list()).toHaveStyle({ overflowY: 'auto', overflowX: 'hidden' })
    fireEvent.click(button('end')!)
    expect(list().scrollBy).toHaveBeenCalledWith({ top: 100, behavior: 'smooth' })
    // A strip across the column as tall as a tab, its chevron an icon's size - never as tall as the
    // column is wide.
    expect(button('end')).toHaveStyle({ minHeight: '40px' })
    expect(button('end')).not.toHaveStyle({ minWidth: '1.5rem' })
    expect(button('end')!.querySelector('svg')).toHaveStyle({ width: '1rem', height: '1rem' })
  })

  it("keeps both buttons with 'always', disabling the one at an end", () => {
    measure({ clientWidth: 400, scrollWidth: 400, scrollLeft: 0 })
    renderRow({
      scrollButtons: 'always',
      shouldShowScrollButtonsOnMobile: true,
      hasVisibleScrollbar: true,
    })
    expect(button('start')).toBeDisabled()
    expect(button('end')).toBeDisabled()
    expect(button('end')).toHaveStyle({ visibility: 'visible' })
  })

  it("hides the buttons with 'never'", () => {
    measure({ clientWidth: 100, scrollWidth: 400, scrollLeft: 0 })
    renderRow({ scrollButtons: 'never' })
    expect(button('start')).toBeNull()
    expect(button('end')).toBeNull()
  })

  it('brings the selected tab into view when the selection changes', () => {
    const scrollIntoView = vi.fn()
    HTMLElement.prototype.scrollIntoView = scrollIntoView
    renderRow({ defaultValue: 0 })
    expect(scrollIntoView).toHaveBeenCalledWith({ block: 'nearest', inline: 'nearest' })
    fireEvent.click(screen.getByRole('tab', { name: 'Component 9' }))
    expect(scrollIntoView).toHaveBeenCalledTimes(2)
    delete (HTMLElement.prototype as Partial<HTMLElement>).scrollIntoView
  })

  it('does without scrollIntoView, or a selection', () => {
    expect(() => renderRow({ defaultValue: 0 })).not.toThrow()
  })

  it('re-reads on resize, through a ResizeObserver, and through action.updateOverflow', () => {
    const observed: Array<() => void> = []
    const disconnect = vi.fn()
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(callback: () => void) {
          observed.push(callback)
        }
        observe() {}
        disconnect = disconnect
      }
    )
    const action = createRef<TabsActions>()
    measure({ clientWidth: 400, scrollWidth: 400, scrollLeft: 0 })
    const { unmount } = renderRow({ action })
    expect(button('end')).toBeNull()

    measure({ clientWidth: 100, scrollWidth: 400, scrollLeft: 0 })
    act(() => {
      window.dispatchEvent(new Event('resize'))
    })
    expect(button('end')).not.toBeNull()

    measure({ clientWidth: 400, scrollWidth: 400, scrollLeft: 0 })
    act(() => observed[0]())
    expect(button('end')).toBeNull()

    measure({ clientWidth: 100, scrollWidth: 400, scrollLeft: 0 })
    act(() => action.current!.updateOverflow())
    expect(button('end')).not.toBeNull()

    unmount()
    expect(disconnect).toHaveBeenCalled()
  })
})
