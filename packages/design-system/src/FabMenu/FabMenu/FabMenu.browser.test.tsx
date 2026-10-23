import { describe, it, expect, vi } from 'vitest'
import { page, userEvent } from 'vitest/browser'
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
      // A window wide enough for the row on either side of a trigger in the middle of it.
      await page.viewport(1280, 800)
      try {
        renderWithTheme(
          <View position="absolute" top="300px" left="500px">
            <FabMenu aria-label="Create" direction={direction}>
              <FabMenuItem>Document</FabMenuItem>
              <FabMenuItem>Folder with a long name</FabMenuItem>
            </FabMenu>
          </View>
        )
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
      } finally {
        await page.viewport(414, 896)
      }
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

  describe('against the window', () => {
    // A trigger fixed in the corner of the screen, as a floating action button is.
    const corner = (
      props: Partial<FabMenuProps> = {},
      labels: string[] = ['Document', 'Folder']
    ) => (
      <View position="fixed" bottom={2} right={2}>
        <FabMenu aria-label="Create" {...props}>
          {labels.map((label) => (
            <FabMenuItem key={label}>{label}</FabMenuItem>
          ))}
        </FabMenu>
      </View>
    )
    const inView = (box: DOMRect) =>
      box.left >= 0 &&
      box.top >= 0 &&
      box.right <= window.innerWidth &&
      box.bottom <= window.innerHeight

    it('turns a row that does not fit the narrow screen into a column, above the trigger', async () => {
      // The window is 414 wide: three labelled actions do not fit beside a trigger at its corner.
      renderWithTheme(
        corner({ direction: 'left' }, ['New document', 'New folder', 'Upload a file'])
      )
      await userEvent.click(trigger())
      await vi.waitFor(() => {
        const first = item('New document').getBoundingClientRect()
        const last = item('Upload a file').getBoundingClientRect()
        // One above the other, above the trigger, all on the screen.
        expect(last.top).toBeGreaterThan(first.bottom - 1)
        expect(last.bottom).toBeLessThanOrEqual(trigger().getBoundingClientRect().top)
        expect(inView(first)).toBe(true)
        expect(inView(last)).toBe(true)
      })
    })

    it('keeps a row where the window has room for it', async () => {
      await page.viewport(1280, 800)
      try {
        renderWithTheme(
          corner({ direction: 'left' }, ['New document', 'New folder', 'Upload a file'])
        )
        await userEvent.click(trigger())
        await vi.waitFor(() => {
          const first = item('New document').getBoundingClientRect()
          const last = item('Upload a file').getBoundingClientRect()
          expect(Math.abs(first.top - last.top)).toBeLessThan(1)
          expect(inView(first)).toBe(true)
        })
      } finally {
        await page.viewport(414, 896)
      }
    })

    it('goes back to the row when the window widens, and to a column when it narrows', async () => {
      await page.viewport(1280, 800)
      try {
        renderWithTheme(
          corner({ direction: 'left' }, ['New document', 'New folder', 'Upload a file'])
        )
        await userEvent.click(trigger())
        await vi.waitFor(() => expect(item('Upload a file')).toBeVisible())
        await page.viewport(414, 896)
        await vi.waitFor(() =>
          expect(item('Upload a file').getBoundingClientRect().top).toBeGreaterThan(
            item('New document').getBoundingClientRect().bottom - 1
          )
        )
        await page.viewport(1280, 800)
        await vi.waitFor(() =>
          expect(
            Math.abs(
              item('Upload a file').getBoundingClientRect().top -
                item('New document').getBoundingClientRect().top
            )
          ).toBeLessThan(1)
        )
      } finally {
        await page.viewport(414, 896)
      }
    })

    it('cuts a label that is wider than the screen, with an ellipsis, and keeps the action on it', async () => {
      const long = 'A label so long that no screen of a phone could hold it whole in a single line'
      renderWithTheme(corner({}, [long]))
      await userEvent.click(trigger())
      await vi.waitFor(() => {
        const box = item(long).getBoundingClientRect()
        expect(inView(box)).toBe(true)
      })
      const text = item(long).querySelector('[data-fab-label]') as HTMLElement
      expect(text.scrollWidth).toBeGreaterThan(text.clientWidth)
      expect(getComputedStyle(text).textOverflow).toBe('ellipsis')
    })

    it('scrolls a column that is taller than the room above the trigger, every action reachable', async () => {
      const labels = Array.from({ length: 30 }, (_, index) => `Action ${index + 1}`)
      renderWithTheme(corner({}, labels))
      await userEvent.click(trigger())
      await vi.waitFor(() => expect(item('Action 30')).toBeVisible())
      const list = document.getElementById(
        trigger().getAttribute('aria-controls') as string
      ) as HTMLElement
      await vi.waitFor(() => {
        const box = list.getBoundingClientRect()
        expect(box.top).toBeGreaterThanOrEqual(0)
        expect(list.scrollHeight).toBeGreaterThan(list.clientHeight)
        expect(getComputedStyle(list).overflowY).toBe('auto')
      })
      // The keys walk to the first, scrolling it into view.
      trigger().focus()
      await userEvent.keyboard('{Home}')
      expect(item('Action 1')).toHaveFocus()
      await vi.waitFor(() => {
        const box = item('Action 1').getBoundingClientRect()
        const edge = list.getBoundingClientRect()
        expect(box.top).toBeGreaterThanOrEqual(edge.top - 1)
        expect(box.bottom).toBeLessThanOrEqual(edge.bottom + 1)
      })
    })
  })
})
