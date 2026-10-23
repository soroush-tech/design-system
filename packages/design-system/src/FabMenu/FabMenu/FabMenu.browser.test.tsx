import { describe, it, expect, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { screen } from '@testing-library/react'
import { baseTheme } from '../../theme/themes'
import { renderWithTheme } from '../../utils/test/renderWithTheme'
import { View } from '../../View'
import { FabMenuItem } from '../FabMenuItem'
import { FabMenu, type FabMenuProps } from './FabMenu'

// Real layout, focus and keyboard: where the actions stack against the trigger, that they appear
// and go, and that the keys walk them - none of which jsdom can lay out.

const view = (props: Partial<FabMenuProps> = {}) => (
  <View position="absolute" top="300px" left="300px">
    <FabMenu aria-label="Create" {...props}>
      <FabMenuItem>Document</FabMenuItem>
      <FabMenuItem>Folder with a long name</FabMenuItem>
    </FabMenu>
  </View>
)
const trigger = () => screen.getByRole('button', { name: 'Create' })
const item = (name: string) => screen.getByRole('button', { name })
const px = (length: string) => Number.parseFloat(length)

describe('FabMenu in a browser', () => {
  it('stacks its actions above the trigger, along its end edge, a space step clear of it', async () => {
    renderWithTheme(view())
    await userEvent.click(trigger())
    await vi.waitFor(() => expect(item('Document')).toBeVisible())
    // Once they have zoomed in: the measures are of the finished stack.
    await vi.waitFor(() => {
      const base = trigger().getBoundingClientRect()
      const near = item('Folder with a long name').getBoundingClientRect()
      const far = item('Document').getBoundingClientRect()
      // The one drawn last is next to the trigger, with a step between.
      expect(base.top - near.bottom).toBeCloseTo(px(baseTheme.space[1]), 0)
      expect(far.bottom).toBeLessThan(near.top)
      // Both line up with the trigger's end edge.
      expect(near.right).toBeCloseTo(base.right, 0)
      expect(far.right).toBeCloseTo(base.right, 0)
      // A label is whole: the action is as wide as its label.
      expect(near.width).toBeGreaterThan(far.width)
    })
  })

  it('stacks below the trigger, along its start edge, when it is told', async () => {
    renderWithTheme(view({ direction: 'down', align: 'start' }))
    await userEvent.click(trigger())
    await vi.waitFor(() => expect(item('Document')).toBeVisible())
    await vi.waitFor(() => {
      const base = trigger().getBoundingClientRect()
      const first = item('Document').getBoundingClientRect()
      expect(first.top - base.bottom).toBeCloseTo(px(baseTheme.space[1]), 0)
      expect(first.left).toBeCloseTo(base.left, 0)
    })
  })

  it.each(['left', 'right'] as const)(
    'puts a row of actions on the %s of the trigger, a step clear and level with it',
    async (direction) => {
      renderWithTheme(view({ direction }))
      await userEvent.click(trigger())
      await vi.waitFor(() => expect(item('Document')).toBeVisible())
      await vi.waitFor(() => {
        const base = trigger().getBoundingClientRect()
        const first = item('Document').getBoundingClientRect()
        const second = item('Folder with a long name').getBoundingClientRect()
        const step = px(baseTheme.space[1])
        const middle = base.top + base.height / 2
        if (direction === 'left') {
          // Drawn first is the farthest: the second is next to the trigger.
          expect(base.left - second.right).toBeCloseTo(step, 0)
          expect(second.left - first.right).toBeCloseTo(step, 0)
        } else {
          expect(first.left - base.right).toBeCloseTo(step, 0)
          expect(second.left - first.right).toBeCloseTo(step, 0)
        }
        expect(first.top + first.height / 2).toBeCloseTo(middle, 0)
        expect(second.top + second.height / 2).toBeCloseTo(middle, 0)
      })
    }
  )

  it('takes no room in the page: the page holds only the trigger', async () => {
    renderWithTheme(view())
    const closed = trigger().parentElement!.getBoundingClientRect()
    await userEvent.click(trigger())
    await vi.waitFor(() => expect(item('Document')).toBeVisible())
    expect(trigger().parentElement!.getBoundingClientRect().height).toBe(closed.height)
  })

  it('is walked with the keyboard, and closed with Escape that returns to the trigger', async () => {
    renderWithTheme(view())
    await userEvent.tab()
    expect(trigger()).toHaveFocus()
    await userEvent.keyboard('{Enter}')
    await vi.waitFor(() => expect(item('Document')).toBeVisible())
    await userEvent.keyboard('{ArrowUp}')
    expect(item('Folder with a long name')).toHaveFocus()
    await userEvent.keyboard('{ArrowUp}')
    expect(item('Document')).toHaveFocus()
    await userEvent.keyboard('{Escape}')
    await vi.waitFor(() => expect(screen.queryByRole('button', { name: 'Document' })).toBeNull())
    expect(trigger()).toHaveFocus()
    expect(trigger()).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes on a press elsewhere, and on an action chosen', async () => {
    renderWithTheme(
      <>
        {view()}
        <button type="button">Elsewhere</button>
      </>
    )
    await userEvent.click(trigger())
    await vi.waitFor(() => expect(item('Document')).toBeVisible())
    await userEvent.click(screen.getByRole('button', { name: 'Elsewhere' }))
    await vi.waitFor(() => expect(trigger()).toHaveAttribute('aria-expanded', 'false'))
    await userEvent.click(trigger())
    await vi.waitFor(() => expect(item('Document')).toBeVisible())
    await userEvent.click(item('Document'))
    await vi.waitFor(() => expect(trigger()).toHaveAttribute('aria-expanded', 'false'))
    expect(trigger()).toHaveFocus()
  })
})
