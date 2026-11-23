import { describe, it, expect, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { render, screen } from '@testing-library/react'
import { renderWithTheme } from '../../utils/test/renderWithTheme'
import { baseTheme, createTheme } from '../../theme/themes'
import { ThemeProvider } from '../../theme'
import { Tabs, type TabsProps } from './Tabs'
import { Tab } from '../Tab'
import { TabContext } from '../TabContext'
import { TabList } from '../TabList'
import { TabPanel } from '../TabPanel'

// The indicator is measured from real layout, which jsdom doesn't have.

const indicator = () => screen.getByRole('tablist').querySelector<HTMLElement>('[aria-hidden]')!

describe('Tabs in a browser', () => {
  it('slides the indicator under the selected tab, by click and by key', async () => {
    renderWithTheme(
      <Tabs aria-label="Views" defaultValue="canvas" shouldSelectOnFocus>
        <Tab value="canvas" label="Canvas" />
        <Tab value="system" label="Design system" />
      </Tabs>
    )
    const under = (name: string) => {
      // Under the whole tab - its box, the label and its own controls.
      const tab = screen.getByRole('tab', { name }).parentElement!.getBoundingClientRect()
      const line = indicator().getBoundingClientRect()
      expect(Math.round(line.left)).toBe(Math.round(tab.left))
      expect(Math.round(line.width)).toBe(Math.round(tab.width))
    }
    await vi.waitFor(() => under('Canvas'))
    await userEvent.click(screen.getByRole('tab', { name: 'Design system' }))
    await vi.waitFor(() => under('Design system'))
    await userEvent.keyboard('{ArrowLeft}')
    expect(screen.getByRole('tab', { name: 'Canvas' })).toHaveFocus()
    await vi.waitFor(() => under('Canvas'))
  })

  it('puts the tabs that no longer fit in the menu as the row narrows, and back as it widens', async () => {
    const names = Array.from({ length: 8 }, (_, index) => `Component ${index + 1}`)
    renderWithTheme(
      <div data-testid="room" style={{ width: 2000 }}>
        <Tabs aria-label="Files" overflowBehavior="menu" overflowLabel="More tabs" defaultValue={0}>
          {names.map((name) => (
            <Tab key={name} label={name} />
          ))}
        </Tabs>
      </div>
    )
    const tabs = () => screen.getAllByRole('tab')
    const chevron = () => screen.queryByRole('button', { name: 'More tabs' })
    await vi.waitFor(() => expect(tabs()).toHaveLength(8))
    expect(chevron()).toBeNull()
    screen.getByTestId('room').style.width = '400px'
    await vi.waitFor(() => expect(chevron()).not.toBeNull())
    const shown = tabs().length
    expect(shown).toBeGreaterThan(0)
    expect(shown).toBeLessThan(8)
    // Whole tabs only, in order, none cut by the list's edge.
    const list = screen.getByRole('tablist').getBoundingClientRect()
    for (const tab of tabs()) {
      expect(tab.parentElement!.getBoundingClientRect().right).toBeLessThanOrEqual(list.right + 0.5)
    }
    expect(tabs().map((tab) => tab.textContent)).toEqual(names.slice(0, shown))
    screen.getByTestId('room').style.width = '2000px'
    await vi.waitFor(() => expect(tabs()).toHaveLength(8))
    expect(chevron()).toBeNull()
  })

  it('takes the same room in every look, so switching looks moves nothing', () => {
    renderWithTheme(
      <>
        {(['underline', 'boxed', 'enclosed'] as const).map((variant) => (
          <Tabs
            key={variant}
            aria-label={variant}
            variant={variant}
            defaultValue="canvas"
            hasDivider
          >
            <Tab value="canvas" label="Canvas" />
          </Tabs>
        ))}
      </>
    )
    const box = (variant: string) =>
      screen
        .getByRole('tablist', { name: variant })
        .querySelector('[role="tab"]')!
        .parentElement!.getBoundingClientRect()
    for (const variant of ['boxed', 'enclosed']) {
      expect(box(variant).width).toBe(box('underline').width)
      expect(box(variant).height).toBe(box('underline').height)
    }
  })
})

describe('scrolling Tabs in a browser', () => {
  it('scrolls by the buttons and brings a selected tab into view', async () => {
    renderWithTheme(
      <div style={{ width: 240 }}>
        {/* The test viewport is narrow, where the buttons hide unless asked for. */}
        <Tabs
          aria-label="Components"
          overflowBehavior="scroll"
          defaultValue={0}
          shouldShowScrollButtonsOnMobile
        >
          {Array.from({ length: 12 }, (_, index) => (
            <Tab key={index} value={index} label={`Component ${index}`} />
          ))}
        </Tabs>
      </div>
    )
    const list = screen.getByRole('tablist')
    const end = document.querySelector<HTMLButtonElement>('[data-scroll-direction="end"]')!
    expect(getComputedStyle(end).visibility).toBe('visible')
    await userEvent.click(end)
    await vi.waitFor(() => expect(list.scrollLeft).toBeGreaterThan(0))

    screen.getByRole('tab', { name: 'Component 0' }).focus()
    await userEvent.keyboard('{End}{Enter}')
    expect(screen.getByRole('tab', { name: 'Component 11' })).toHaveAttribute(
      'aria-selected',
      'true'
    )
    await vi.waitFor(() => {
      const tab = screen.getByRole('tab', { name: 'Component 11' }).getBoundingClientRect()
      expect(tab.right).toBeLessThanOrEqual(list.getBoundingClientRect().right + 1)
    })
  })
})

describe('the divider in a browser', () => {
  // Inset shadows aren't modelled by jsdom - read them as the browser computes them.
  const insets = (element: Element, pseudo?: string) =>
    (getComputedStyle(element, pseudo).boxShadow.match(/inset/g) ?? []).length
  const box = (name: string) => screen.getByRole('tab', { name }).parentElement!
  const renderRow = (props: Partial<TabsProps> = {}) =>
    renderWithTheme(
      <Tabs
        aria-label="Views"
        defaultValue="canvas"
        startContent={<span>Find</span>}
        endContent={<span>Add</span>}
        {...props}
      >
        <Tab value="canvas" label="Canvas" />
        <Tab value="system" label="Design system" />
      </Tabs>
    )
  const parts = () => {
    const list = screen.getByRole('tablist')
    return {
      root: list.parentElement!,
      list,
      start: list.previousElementSibling!,
      end: list.nextElementSibling!,
    }
  }

  it("runs the line the row's whole length, under its own content too, a space from the tabs", () => {
    renderRow()
    const { root, start, end } = parts()
    expect(insets(root)).toBe(1)
    expect(getComputedStyle(start).paddingRight).toBe(baseTheme.space[2])
    expect(getComputedStyle(end).paddingLeft).toBe(baseTheme.space[2])
  })

  it('draws no line without hasDivider, and none by default in the boxed look', () => {
    const { unmount } = renderRow({ hasDivider: false })
    expect(insets(parts().root)).toBe(0)
    unmount()
    renderRow({ variant: 'boxed' })
    expect(insets(parts().root)).toBe(0)
  })

  it('runs the line round the selected tab in the enclosed look, piece by piece', () => {
    renderRow({ variant: 'enclosed' })
    const { root, list, start, end } = parts()
    expect(insets(box('Canvas'))).toBe(3)
    expect(insets(box('Design system'))).toBe(1)
    expect(insets(start)).toBe(1)
    expect(insets(end)).toBe(1)
    expect(insets(list, '::after')).toBe(1)
    expect(insets(root)).toBe(0)
  })

  it('draws no line or outline in the enclosed look without a divider - the ground tells', () => {
    renderRow({ variant: 'enclosed', hasDivider: false })
    expect(insets(box('Canvas'))).toBe(0)
    expect(getComputedStyle(box('Canvas')).backgroundColor).not.toBe('rgba(0, 0, 0, 0)')
    expect(getComputedStyle(box('Design system')).backgroundColor).toBe('rgba(0, 0, 0, 0)')
    expect(insets(box('Design system'))).toBe(0)
    expect(insets(parts().start)).toBe(0)
  })

  it('takes hasDivider from the theme, and turns the line to the end side in a column', () => {
    const theme = createTheme(baseTheme, {
      components: { Tabs: { defaultProps: { hasDivider: false } } },
    })
    const { unmount } = render(
      <ThemeProvider theme={theme}>
        <Tabs aria-label="Views" defaultValue="canvas">
          <Tab value="canvas" label="Canvas" />
        </Tabs>
      </ThemeProvider>
    )
    expect(insets(screen.getByRole('tablist').parentElement!)).toBe(0)
    unmount()
    renderRow({ variant: 'enclosed', orientation: 'vertical' })
    const { start } = parts()
    expect(getComputedStyle(start).paddingBottom).toBe(baseTheme.space[2])
    expect(getComputedStyle(box('Design system')).boxShadow).toMatch(
      /-1px 0px 0px 0px inset|inset -1px 0px 0px/
    )
  })
})

describe('rounded tabs and panels in a browser', () => {
  // Per-corner radii aren't modelled by jsdom - read them as the browser computes them.
  const corners = (element: Element) => {
    const s = getComputedStyle(element)
    return [
      s.borderTopLeftRadius,
      s.borderTopRightRadius,
      s.borderBottomRightRadius,
      s.borderBottomLeftRadius,
    ]
  }
  const box = (name: string) => screen.getByRole('tab', { name }).parentElement!

  it('rounds all four corners of a tab, and only those away from the divider when enclosed', () => {
    const { unmount } = renderWithTheme(
      <Tabs aria-label="Views" defaultValue="a">
        <Tab value="a" label="A" borderRadius="md" />
        <Tab value="b" label="B" />
      </Tabs>
    )
    expect(corners(box('A'))).toEqual(['8px', '8px', '8px', '8px'])
    expect(corners(box('B'))).toEqual(['0px', '0px', '0px', '0px'])
    unmount()
    renderWithTheme(
      <Tabs aria-label="Views" defaultValue="a" variant="enclosed">
        <Tab value="a" label="A" borderRadius="lg" />
        <Tab value="b" label="B" />
      </Tabs>
    )
    expect(corners(box('A'))).toEqual(['16px', '16px', '0px', '0px'])
    expect(corners(box('B'))).toEqual(['4px', '4px', '0px', '0px'])
  })

  it('rounds a panel with borderRadius', () => {
    renderWithTheme(
      <TabContext defaultValue="a">
        <TabList aria-label="Views">
          <Tab value="a" label="A" />
        </TabList>
        <TabPanel value="a" bg="paper" borderRadius="md">
          Panel
        </TabPanel>
      </TabContext>
    )
    expect(corners(screen.getByRole('tabpanel'))).toEqual(['8px', '8px', '8px', '8px'])
  })
})
