import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { ThemeProvider } from '../theme'
import { baseTheme, createTheme } from '../theme/themes'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { Tooltip } from './Tooltip'
import { TooltipGroup } from './TooltipGroup'

const tick = (ms: number) => act(() => vi.advanceTimersByTime(ms))
const icon = (name: string) => screen.getByRole('button', { name, hidden: true })
const open = (name: string) => screen.queryByRole('tooltip', { name })

const rail = (props: { skipDelayDuration?: number; leaveDelay?: number } = {}) => (
  <TooltipGroup skipDelayDuration={props.skipDelayDuration}>
    <Tooltip title="First" enterDelay={500} leaveDelay={props.leaveDelay}>
      <button type="button">a</button>
    </Tooltip>
    <Tooltip title="Second" enterDelay={500} leaveDelay={props.leaveDelay}>
      <button type="button">b</button>
    </Tooltip>
  </TooltipGroup>
)

beforeEach(() => vi.useFakeTimers())
afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe('TooltipGroup', () => {
  it('opens the next tooltip at once, and closes the one before it', () => {
    renderWithTheme(rail())
    fireEvent.mouseEnter(icon('First'))
    tick(500)
    expect(screen.getByText('First')).toBeInTheDocument()
    fireEvent.mouseLeave(icon('First'))
    fireEvent.mouseEnter(icon('Second'))
    tick(0)
    expect(screen.getByText('Second')).toBeInTheDocument()
    expect(screen.queryByText('First')).not.toBeInTheDocument()
    expect(screen.getAllByRole('tooltip')).toHaveLength(1)
  })

  it('closes the one still showing in its leave delay', () => {
    renderWithTheme(rail({ leaveDelay: 1000 }))
    fireEvent.mouseEnter(icon('First'))
    tick(500)
    fireEvent.mouseLeave(icon('First'))
    tick(100)
    expect(screen.getByText('First')).toBeInTheDocument()
    fireEvent.mouseEnter(icon('Second'))
    tick(0)
    expect(screen.queryByText('First')).not.toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
  })

  it('opens at once within the skip window after the last one closed, and not after it', () => {
    renderWithTheme(rail())
    fireEvent.mouseEnter(icon('First'))
    tick(500)
    fireEvent.mouseLeave(icon('First'))
    tick(0)
    expect(screen.queryByText('First')).not.toBeInTheDocument()
    tick(200)
    fireEvent.mouseEnter(icon('Second'))
    tick(0)
    expect(screen.getByText('Second')).toBeInTheDocument()
    fireEvent.mouseLeave(icon('Second'))
    tick(400)
    expect(screen.queryByText('Second')).not.toBeInTheDocument()
    fireEvent.mouseEnter(icon('Second'))
    tick(499)
    expect(screen.queryByText('Second')).not.toBeInTheDocument()
    tick(1)
    expect(screen.getByText('Second')).toBeInTheDocument()
  })

  it('takes the window it is given', () => {
    renderWithTheme(rail({ skipDelayDuration: 50 }))
    fireEvent.mouseEnter(icon('First'))
    tick(500)
    fireEvent.mouseLeave(icon('First'))
    tick(100)
    fireEvent.mouseEnter(icon('Second'))
    tick(499)
    expect(screen.queryByText('Second')).not.toBeInTheDocument()
  })

  it('applies to keyboard focus as well', () => {
    const matches = Element.prototype.matches
    vi.spyOn(Element.prototype, 'matches').mockImplementation(function (
      this: Element,
      selector: string
    ) {
      return selector === ':focus-visible' || matches.call(this, selector)
    })
    renderWithTheme(rail())
    fireEvent.focus(icon('First'))
    tick(500)
    expect(screen.getByText('First')).toBeInTheDocument()
    fireEvent.blur(icon('First'))
    fireEvent.focus(icon('Second'))
    tick(0)
    expect(screen.getByText('Second')).toBeInTheDocument()
  })

  it('keeps a touch on its own delay', () => {
    renderWithTheme(rail())
    fireEvent.mouseEnter(icon('First'))
    tick(500)
    fireEvent.touchStart(icon('Second'))
    tick(699)
    expect(screen.queryByText('Second')).not.toBeInTheDocument()
    tick(1)
    expect(screen.getByText('Second')).toBeInTheDocument()
  })

  it('leaves a tooltip outside the group on its own delay', () => {
    renderWithTheme(
      <>
        {rail()}
        <Tooltip title="Outside" enterDelay={500}>
          <button type="button">c</button>
        </Tooltip>
      </>
    )
    fireEvent.mouseEnter(icon('First'))
    tick(500)
    fireEvent.mouseLeave(icon('First'))
    fireEvent.mouseEnter(icon('Outside'))
    tick(499)
    expect(screen.queryByText('Outside')).not.toBeInTheDocument()
    tick(1)
    expect(screen.getByText('Outside')).toBeInTheDocument()
  })

  it('does not open or close a tooltip the app controls, nor start the window for it', () => {
    const onClose = vi.fn()
    renderWithTheme(
      <TooltipGroup>
        <Tooltip title="Hint" isOpen onClose={onClose}>
          <button type="button">h</button>
        </Tooltip>
        <Tooltip title="Plain" enterDelay={500}>
          <button type="button">p</button>
        </Tooltip>
      </TooltipGroup>
    )
    expect(screen.getByText('Hint')).toBeInTheDocument()
    fireEvent.mouseEnter(icon('Plain'))
    tick(499)
    expect(screen.queryByText('Plain')).not.toBeInTheDocument()
    tick(1)
    expect(screen.getByText('Plain')).toBeInTheDocument()
    expect(screen.getByText('Hint')).toBeInTheDocument()
    expect(onClose).not.toHaveBeenCalled()
  })

  it('tells a tooltip it closed that it did', () => {
    const onClose = vi.fn()
    renderWithTheme(
      <TooltipGroup>
        <Tooltip title="First" enterDelay={500} onClose={onClose}>
          <button type="button">a</button>
        </Tooltip>
        <Tooltip title="Second" enterDelay={500}>
          <button type="button">b</button>
        </Tooltip>
      </TooltipGroup>
    )
    fireEvent.mouseEnter(icon('First'))
    tick(500)
    fireEvent.mouseEnter(icon('Second'))
    tick(0)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('counts a tooltip that unmounts open as one that closed', () => {
    const { rerender } = renderWithTheme(rail())
    fireEvent.mouseEnter(icon('First'))
    tick(500)
    rerender(
      <TooltipGroup>
        <Tooltip title="Second" enterDelay={500}>
          <button type="button">b</button>
        </Tooltip>
      </TooltipGroup>
    )
    fireEvent.mouseEnter(icon('Second'))
    tick(0)
    expect(open('Second') ?? screen.getByText('Second')).toBeInTheDocument()
  })
})

describe('skipDelayDuration in the theme', () => {
  const themed = (skipDelayDuration?: number) =>
    createTheme(baseTheme, {
      components: { Tooltip: { defaultProps: { enterDelay: 500, skipDelayDuration } } },
    })
  const pair = (
    <>
      <Tooltip title="First">
        <button type="button">a</button>
      </Tooltip>
      <Tooltip title="Second">
        <button type="button">b</button>
      </Tooltip>
    </>
  )

  it('groups every tooltip under the theme, with no wrapper', () => {
    render(<ThemeProvider theme={themed(300)}>{pair}</ThemeProvider>)
    fireEvent.mouseEnter(icon('First'))
    tick(499)
    expect(screen.queryByText('First')).not.toBeInTheDocument()
    tick(1)
    fireEvent.mouseLeave(icon('First'))
    fireEvent.mouseEnter(icon('Second'))
    tick(0)
    expect(screen.getByText('Second')).toBeInTheDocument()
    expect(screen.queryByText('First')).not.toBeInTheDocument()
    fireEvent.mouseLeave(icon('Second'))
    tick(400)
    fireEvent.mouseEnter(icon('First'))
    tick(499)
    expect(screen.queryByText('First')).not.toBeInTheDocument()
  })

  it('is off when unset or 0', () => {
    for (const duration of [undefined, 0]) {
      const { unmount } = render(<ThemeProvider theme={themed(duration)}>{pair}</ThemeProvider>)
      fireEvent.mouseEnter(icon('First'))
      tick(500)
      fireEvent.mouseLeave(icon('First'))
      fireEvent.mouseEnter(icon('Second'))
      tick(499)
      expect(screen.queryByText('Second')).not.toBeInTheDocument()
      unmount()
    }
  })

  it('gives way to a TooltipGroup around the tooltip', () => {
    render(
      <ThemeProvider theme={themed(5000)}>
        <TooltipGroup skipDelayDuration={50}>{pair}</TooltipGroup>
      </ThemeProvider>
    )
    fireEvent.mouseEnter(icon('First'))
    tick(500)
    fireEvent.mouseLeave(icon('First'))
    tick(100)
    fireEvent.mouseEnter(icon('Second'))
    tick(499)
    expect(screen.queryByText('Second')).not.toBeInTheDocument()
  })
})
