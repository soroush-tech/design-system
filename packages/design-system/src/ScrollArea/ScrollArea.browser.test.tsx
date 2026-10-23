import { describe, it, expect, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { ScrollArea } from './ScrollArea'

// Real layout and a real pointer: the bar takes no room beside the content, shows on hover, and
// its thumb scrolls the box - none of which jsdom can measure.

const lines = Array.from({ length: 40 }, (_, index) => <p key={index}>Line {index + 1}</p>)
const view = () => (
  <ScrollArea maxHeight={120} width="200px" data-testid="area" aria-label="Lines" tabIndex={0}>
    {lines}
  </ScrollArea>
)
const viewport = () => screen.getByRole('region', { name: 'Lines' })
const thumb = () => document.querySelector('[data-scroll-thumb]') as HTMLElement

describe('ScrollArea in a browser', () => {
  it('grows no further than its ceiling, scrolls natively, and takes no room for the bar', async () => {
    renderWithTheme(view())
    await vi.waitFor(() => expect(thumb()).toBeTruthy())
    expect(screen.getByTestId('area').getBoundingClientRect().height).toBeLessThanOrEqual(120)
    // The native bar is off: the content is as wide as the box.
    expect(viewport().clientWidth).toBe(viewport().getBoundingClientRect().width)
    expect(viewport().scrollHeight).toBeGreaterThan(viewport().clientHeight)
  })

  it('shows its thumb while the pointer is over the area, and hides it again', async () => {
    renderWithTheme(view())
    await vi.waitFor(() => expect(thumb()).toBeTruthy())
    expect(getComputedStyle(thumb()).opacity).toBe('0')
    await userEvent.hover(viewport())
    await vi.waitFor(() => expect(getComputedStyle(thumb()).opacity).toBe('1'))
    await userEvent.unhover(viewport())
    await vi.waitFor(() => expect(getComputedStyle(thumb()).opacity).toBe('0'))
  })

  it('follows the scroll, and scrolls the box when the track is pressed beyond the thumb', async () => {
    renderWithTheme(view())
    await vi.waitFor(() => expect(thumb()).toBeTruthy())
    const track = thumb().parentElement as HTMLElement
    const before = viewport().scrollTop
    const bounds = track.getBoundingClientRect()
    // A press at the bottom of the track, below the thumb, pages down.
    await userEvent.click(track, { position: { x: 2, y: bounds.height - 4 } })
    await vi.waitFor(() => expect(viewport().scrollTop).toBeGreaterThan(before))
    await vi.waitFor(() => expect(parseFloat(thumb().style.top)).toBeGreaterThan(0))
  })
})
