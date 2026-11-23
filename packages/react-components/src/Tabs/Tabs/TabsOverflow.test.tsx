import { describe, it, expect, vi, afterEach } from 'vitest'
import { createRef } from 'react'
import { act, fireEvent, screen } from '@testing-library/react'
import { renderWithTheme } from '../../utils/test/renderWithTheme'
import { Tabs, type TabsActions, type TabsProps } from './Tabs'
import { Tab } from '../Tab'

// jsdom lays nothing out: every tab is given `size` along the row, and the list `room`.
const measure = (room: number, size = 100, isVertical = false) => {
  vi.spyOn(
    HTMLElement.prototype,
    isVertical ? 'clientHeight' : 'clientWidth',
    'get'
  ).mockReturnValue(room)
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
    width: size,
    height: size,
  } as DOMRect)
}

const renderRow = (props: Partial<TabsProps> = {}) => {
  const action = createRef<TabsActions>()
  const view = renderWithTheme(
    <Tabs
      aria-label="Files"
      overflowBehavior="menu"
      overflowLabel="More tabs"
      defaultValue="a"
      action={action}
      {...props}
    >
      <Tab value="a" label="Alpha" />
      <Tab value="b" label="Beta" closeLabel="Close Beta" />
      <Tab value="c" label="Gamma" disabled />
      <Tab value="d" icon={<span>delta icon</span>} />
    </Tabs>
  )
  const remeasure = () => act(() => action.current!.updateOverflow())
  return { ...view, remeasure }
}

const chevron = () => screen.queryByRole('button', { name: 'More tabs' })
const openMenu = () => fireEvent.click(chevron()!)

afterEach(() => {
  vi.restoreAllMocks()
})

describe('Tabs with overflowBehavior="menu"', () => {
  it('draws the tabs that fit whole and lists the rest behind a button named overflowLabel', () => {
    const { remeasure } = renderRow()
    measure(250)
    remeasure()
    expect(screen.getAllByRole('tab').map((tab) => tab.textContent)).toEqual(['Alpha', 'Beta'])
    openMenu()
    const rows = screen.getAllByRole('menuitem')
    expect(rows.map((row) => row.textContent)).toEqual(['Gamma', 'delta icon'])
    expect(rows[0]).toHaveAttribute('aria-disabled', 'true')
  })

  it('carries no native title of its own: its hints are tooltips, and the list is named', () => {
    const onTabClose = vi.fn()
    const { remeasure } = renderRow({ onTabClose })
    measure(150)
    remeasure()
    expect(document.querySelector('[title]')).toBeNull()
    openMenu()
    expect(document.querySelector('[title]')).toBeNull()
    // The list reads as the label of the button that opens it.
    expect(screen.getByRole('menu')).toHaveAccessibleName('More tabs')
  })

  it('shows the label of the overflow button and of a close button as a tooltip', () => {
    vi.useFakeTimers()
    const { remeasure } = renderRow({ onTabClose: vi.fn() })
    measure(150)
    remeasure()
    fireEvent.mouseEnter(chevron()!)
    act(() => vi.advanceTimersByTime(100))
    expect(screen.getByRole('tooltip')).toHaveTextContent('More tabs')
    fireEvent.mouseLeave(chevron()!)
    act(() => vi.advanceTimersByTime(0))
    openMenu()
    const row = screen.getByRole('menuitem', { name: 'Beta' })
    fireEvent.mouseEnter(row.parentElement!.querySelector('button[tabindex="-1"]')!)
    act(() => vi.advanceTimersByTime(100))
    expect(screen.getByRole('tooltip')).toHaveTextContent('Close Beta')
    vi.useRealTimers()
  })

  it('selects a tab chosen from the menu, which brings it into the row', () => {
    const onChange = vi.fn()
    const { remeasure } = renderRow({ onChange })
    measure(150)
    remeasure()
    openMenu()
    fireEvent.click(screen.getByRole('menuitem', { name: 'Beta' }))
    expect(onChange).toHaveBeenCalledWith('b')
    remeasure()
    expect(screen.getByRole('tab', { name: 'Beta' })).toHaveAttribute('aria-selected', 'true')
  })

  it("closes a closable tab from its row's close button in the menu", () => {
    const onTabClose = vi.fn()
    const { remeasure } = renderRow({ onTabClose })
    measure(150)
    remeasure()
    openMenu()
    // Beside the row, not inside it - and the pointer's, hidden from assistive technology: a
    // menu owns rows alone.
    const row = screen.getByRole('menuitem', { name: 'Beta' })
    const close = row.parentElement!.querySelector<HTMLButtonElement>('button[tabindex="-1"]')!
    expect(close).not.toHaveAttribute('title')
    expect(row).not.toContainElement(close)
    expect(close).toHaveAttribute('aria-hidden', 'true')
    expect(close).toHaveAttribute('tabindex', '-1')
    fireEvent.click(close)
    expect(onTabClose).toHaveBeenCalledWith('b')
  })

  it("names a closable tab's close button in the menu with shouldAnnounceClose", () => {
    const onTabClose = vi.fn()
    const { remeasure } = renderRow({ onTabClose, shouldAnnounceClose: true })
    measure(150)
    remeasure()
    openMenu()
    const close = screen.getByRole('button', { name: 'Close Beta' })
    expect(close).not.toHaveAttribute('aria-hidden')
    expect(close).toHaveAttribute('tabindex', '-1')
    expect(screen.getByRole('menuitem', { name: 'Beta' })).not.toContainElement(close)
    fireEvent.click(close)
    expect(onTabClose).toHaveBeenCalledWith('b')
  })

  it("closes a closable tab's row with Delete, and leaves the others", () => {
    const onTabClose = vi.fn()
    const { remeasure } = renderRow({ onTabClose })
    measure(150)
    remeasure()
    openMenu()
    fireEvent.keyDown(screen.getByRole('menuitem', { name: 'Gamma' }), { key: 'Delete' })
    fireEvent.keyDown(screen.getByRole('menuitem', { name: 'Beta' }), { key: 'Backspace' })
    expect(onTabClose).not.toHaveBeenCalled()
    fireEvent.keyDown(screen.getByRole('menuitem', { name: 'Beta' }), { key: 'Delete' })
    expect(onTabClose).toHaveBeenCalledWith('b')
  })

  it('measures a column by its height', () => {
    const { remeasure } = renderRow({ orientation: 'vertical' })
    measure(150, 100, true)
    remeasure()
    expect(screen.getAllByRole('tab')).toHaveLength(1)
    expect(chevron()).toBeInTheDocument()
  })

  it('draws every tab, and no button, while all fit or no room is measured', () => {
    const { remeasure } = renderRow()
    expect(screen.getAllByRole('tab')).toHaveLength(4)
    expect(chevron()).toBeNull()
    measure(1000)
    remeasure()
    expect(screen.getAllByRole('tab')).toHaveLength(4)
    expect(chevron()).toBeNull()
  })

  it('leaves a row that scrolls, or does nothing, all drawn', () => {
    measure(150)
    for (const overflowBehavior of ['scroll', 'none'] as const) {
      const { unmount } = renderRow({ overflowBehavior })
      expect(screen.getAllByRole('tab')).toHaveLength(4)
      expect(chevron()).toBeNull()
      unmount()
    }
  })
})
