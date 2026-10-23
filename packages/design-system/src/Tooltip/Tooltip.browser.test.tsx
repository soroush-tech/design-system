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
