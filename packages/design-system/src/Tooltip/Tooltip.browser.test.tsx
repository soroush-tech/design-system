import { describe, it, expect, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { View } from '../View'
import { Tooltip, type TooltipProps } from './Tooltip'

// Real layout and a real pointer and keyboard: where the tooltip lands, where it flips, and how it
// is opened - none of which jsdom can do.

const trigger = () => screen.getByRole('button', { name: 'Save' })
const tooltip = () => screen.getByRole('tooltip')
const view = (props: Partial<TooltipProps> = {}, top = 200) => (
  <View position="absolute" top={`${top}px`} left="300px">
    <Tooltip title="Save" enterDelay={10} {...props}>
      <button type="button">Icon</button>
    </Tooltip>
  </View>
)

describe('Tooltip in a browser', () => {
  it('opens on hover, above its child and a gap from it, then closes', async () => {
    renderWithTheme(view())
    await userEvent.hover(trigger())
    await vi.waitFor(() => expect(tooltip()).toBeVisible())
    const child = trigger().getBoundingClientRect()
    const surface = tooltip().getBoundingClientRect()
    expect(surface.bottom).toBeCloseTo(child.top - 8, 0)
    // Centred on its child.
    expect(surface.left + surface.width / 2).toBeCloseTo(child.left + child.width / 2, 0)
    await userEvent.unhover(trigger())
    await vi.waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument())
  })

  it('opens over a disabled child, beside the control itself', async () => {
    renderWithTheme(
      <View position="absolute" top="200px" left="300px">
        <Tooltip title="Fill in the name first" enterDelay={10}>
          <button type="button" disabled>
            Save
          </button>
        </Tooltip>
      </View>
    )
    const control = screen.getByRole('button', { name: 'Fill in the name first' })
    await userEvent.hover(control)
    await vi.waitFor(() => expect(tooltip()).toBeVisible())
    expect(tooltip().getBoundingClientRect().bottom).toBeCloseTo(
      control.getBoundingClientRect().top - 8,
      0
    )
  })

  it('sits above a point, a gap away and centred on it, with no child', async () => {
    renderWithTheme(
      <Tooltip title="Move the track" anchorPosition={{ top: 300, left: 200 }} isOpen />
    )
    await vi.waitFor(() => expect(tooltip()).toBeVisible())
    const surface = tooltip().getBoundingClientRect()
    expect(surface.bottom).toBeCloseTo(300 - 8, 0)
    // The position is floored to a whole pixel, so the middle may be a pixel short.
    expect(Math.abs(surface.left + surface.width / 2 - 200)).toBeLessThanOrEqual(1)
  })

  it('flips below a point near the top of the window, and follows it as it moves', async () => {
    const { rerender } = renderWithTheme(
      <Tooltip title="Agents" anchorPosition={{ top: 4, left: 200 }} isOpen />
    )
    await vi.waitFor(() => expect(tooltip()).toBeVisible())
    expect(tooltip().getBoundingClientRect().top).toBeCloseTo(4 + 8, 0)
    rerender(<Tooltip title="Agents" anchorPosition={{ top: 300, left: 200 }} isOpen />)
    await vi.waitFor(() => expect(tooltip().getBoundingClientRect().bottom).toBeCloseTo(300 - 8, 0))
  })

  // A second button, right where a tooltip to the right of the first one lands.
  const covered = (props: Partial<TooltipProps>) => (
    <View position="absolute" top="200px" left="100px">
      <Tooltip title="Layers" placement="right" isOpen {...props}>
        <button type="button">Rail</button>
      </Tooltip>
      <button type="button" style={{ position: 'absolute', top: 0, left: 70 }}>
        Row
      </button>
    </View>
  )
  const centreOf = (element: Element) => {
    const rect = element.getBoundingClientRect()
    return { x: rect.left + 8, y: rect.top + rect.height / 2 }
  }

  it('takes a click meant for what it covers, as it is interactive', async () => {
    renderWithTheme(covered({}))
    await vi.waitFor(() => expect(tooltip()).toBeVisible())
    const { x, y } = centreOf(screen.getByRole('button', { name: 'Row' }))
    expect(document.elementFromPoint(x, y)).toBe(tooltip())
  })

  it('lets a click through to what it covers, when it is not interactive', async () => {
    renderWithTheme(covered({ isInteractive: false }))
    await vi.waitFor(() => expect(tooltip()).toBeVisible())
    const row = screen.getByRole('button', { name: 'Row' })
    const { x, y } = centreOf(row)
    expect(document.elementFromPoint(x, y)).toBe(row)
  })

  it('flips below its child where there is no room above it', async () => {
    renderWithTheme(view({}, 0))
    await userEvent.hover(trigger())
    await vi.waitFor(() => expect(tooltip()).toBeVisible())
    expect(tooltip().getBoundingClientRect().top).toBeGreaterThan(
      trigger().getBoundingClientRect().bottom
    )
  })

  it('sits beside its child when asked, and keeps inside the window', async () => {
    renderWithTheme(view({ placement: 'right' }))
    await userEvent.hover(trigger())
    await vi.waitFor(() => expect(tooltip()).toBeVisible())
    const child = trigger().getBoundingClientRect()
    const surface = tooltip().getBoundingClientRect()
    expect(surface.left).toBeCloseTo(child.right + 8, 0)
    expect(surface.right).toBeLessThanOrEqual(window.innerWidth)
  })

  it.each([
    ['top-start', 'left', 'left'],
    ['bottom-end', 'right', 'right'],
    ['right-start', 'top', 'top'],
    ['left-end', 'bottom', 'bottom'],
  ] as const)(
    'lines up with the child edge, not the gap beyond it: %s',
    async (placement, own, child) => {
      renderWithTheme(view({ placement }))
      await userEvent.hover(trigger())
      await vi.waitFor(() => expect(tooltip()).toBeVisible())
      expect(tooltip().getBoundingClientRect()[own]).toBeCloseTo(
        trigger().getBoundingClientRect()[child],
        0
      )
    }
  )

  it('opens on keyboard focus, never takes the focus, and closes on Escape', async () => {
    renderWithTheme(view())
    await userEvent.tab()
    expect(trigger()).toHaveFocus()
    await vi.waitFor(() => expect(tooltip()).toBeVisible())
    expect(trigger()).toHaveFocus()
    await userEvent.keyboard('{Escape}')
    await vi.waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument())
  })

  it('stays open while the pointer is on the tooltip', async () => {
    renderWithTheme(view({ leaveDelay: 150 }))
    await userEvent.hover(trigger())
    await vi.waitFor(() => expect(tooltip()).toBeVisible())
    await userEvent.hover(tooltip())
    await new Promise((resolve) => setTimeout(resolve, 300))
    expect(tooltip()).toBeVisible()
    await userEvent.unhover(tooltip())
    await vi.waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument())
  })

  it('points its arrow at the middle of its child', async () => {
    renderWithTheme(view({ hasArrow: true }))
    await userEvent.hover(trigger())
    await vi.waitFor(() => expect(tooltip().querySelector('[aria-hidden="true"]')).toBeTruthy())
    const arrow = tooltip().querySelector('[aria-hidden="true"]') as HTMLElement
    const child = trigger().getBoundingClientRect()
    const mark = arrow.getBoundingClientRect()
    expect(mark.left + mark.width / 2).toBeCloseTo(child.left + child.width / 2, 0)
  })
})
