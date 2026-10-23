import { describe, it, expect, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { screen } from '@testing-library/react'
import { baseTheme } from '../theme/themes'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { View } from '../View'
import { Fab, type FabProps } from './Fab'

// Real layout and pointer: the touch target past the drawn fab, the label cut on one line, and the
// motion of its shadow - none of which jsdom can measure.

const glyph = <i style={{ display: 'block', width: 16, height: 16 }} />
const view = ({ children, ...props }: Partial<FabProps> = {}, width = '400px') => (
  <View position="absolute" top="100px" left="100px" width={width}>
    <Fab aria-label="Add" {...props}>
      {children ?? glyph}
    </Fab>
  </View>
)
const fab = () => screen.getByRole('button')
const px = (length: string) => Number.parseFloat(length)

describe('Fab in a browser', () => {
  it('keeps the least touch target square around the smallest fab, without drawing it larger', async () => {
    renderWithTheme(view({ size: 'sm' }))
    const box = fab().getBoundingClientRect()
    const target = px(baseTheme.space[6])
    expect(box.width).toBeLessThan(target)
    // A point outside the drawn fab, inside the target, still hits it.
    const gap = (target - box.width) / 2 - 1
    const hit = document.elementFromPoint(box.left - gap, box.top + box.height / 2)
    expect(hit).toBe(fab())
    // And one past the target does not.
    expect(document.elementFromPoint(box.left - target, box.top + box.height / 2)).not.toBe(fab())
  })

  it('is pressed from the edge of its touch target', async () => {
    const onClick = vi.fn()
    renderWithTheme(view({ size: 'sm', onClick }))
    const box = fab().getBoundingClientRect()
    await userEvent.click(fab(), { position: { x: -6, y: box.height / 2 } })
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('moves its shadow over the theme duration, with the theme easing', () => {
    renderWithTheme(view())
    const style = getComputedStyle(fab())
    const seconds = baseTheme.transitions.duration.standard / 1000
    expect(style.transitionProperty).toContain('box-shadow')
    expect(style.transitionDuration.split(', ')).toContain(`${seconds}s`)
  })

  it('keeps an extended label on one line, cut where the container ends', () => {
    renderWithTheme(
      view(
        {
          variant: 'extended',
          startIcon: glyph,
          children: 'A label that is far too long to fit the room this container gives it',
        },
        '160px'
      )
    )
    const box = fab().getBoundingClientRect()
    expect(box.width).toBeLessThanOrEqual(160)
    expect(box.height).toBe(px(baseTheme.avatar.md))
    const label = screen.getByText(/A label that is far/)
    expect(label.scrollWidth).toBeGreaterThan(label.clientWidth)
    expect(getComputedStyle(label).textOverflow).toBe('ellipsis')
  })

  it('lets its padding and margin be theme space keys, winning over its own', () => {
    renderWithTheme(view({ variant: 'extended', px: 5, m: 2, children: 'Create' }))
    const style = getComputedStyle(fab())
    expect(style.paddingLeft).toBe(baseTheme.space[5])
    expect(style.paddingRight).toBe(baseTheme.space[5])
    expect(style.margin).toBe(baseTheme.space[2])
  })

  it('collapses to a circle of its height with the icon centred, and extends again', async () => {
    const extended = (isCollapsed: boolean) =>
      view({
        variant: 'extended',
        startIcon: glyph,
        children: 'Create',
        isCollapsed,
        'aria-label': undefined,
      })
    const { rerender } = renderWithTheme(extended(false))
    expect(fab().getBoundingClientRect().width).toBeGreaterThan(px(baseTheme.avatar.md))
    rerender(extended(true))
    await vi.waitFor(() =>
      expect(fab().getBoundingClientRect().width).toBeCloseTo(px(baseTheme.avatar.md), 0)
    )
    expect(fab().getBoundingClientRect().height).toBe(px(baseTheme.avatar.md))
    // Once the label is gone the icon is in the middle of the circle.
    await vi.waitFor(() => {
      const box = fab().getBoundingClientRect()
      const mark = (fab().querySelector('i') as HTMLElement).getBoundingClientRect()
      expect(mark.left + mark.width / 2).toBeCloseTo(box.left + box.width / 2, 0)
    })
    // The label is out of sight but in the tree: the fab keeps its name.
    expect(screen.getByRole('button', { name: 'Create' })).toBe(fab())
    rerender(extended(false))
    await vi.waitFor(() =>
      expect(fab().getBoundingClientRect().width).toBeGreaterThan(px(baseTheme.avatar.md) * 2)
    )
  })
})
