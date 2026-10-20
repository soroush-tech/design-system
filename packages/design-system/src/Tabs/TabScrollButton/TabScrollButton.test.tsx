import { describe, it, expect, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { renderWithTheme } from '../../utils/test/renderWithTheme'
import { baseTheme, createTheme } from '../../theme/themes'
import { ThemeProvider } from '../../theme'
import type { ComponentType } from 'react'
import { Tab } from '../Tab'
import { Tabs } from '../Tabs'
import { TabScrollButton, type TabScrollButtonProps } from './TabScrollButton'

// It is aria-hidden - out of the accessibility tree - so it is found by its test id.
const button = () => screen.getByTestId('scroll')

describe('TabScrollButton', () => {
  it('is a plain button on its own, out of the tab order, pointing the way it scrolls', () => {
    const onClick = vi.fn()
    renderWithTheme(
      <TabScrollButton direction="end" onClick={onClick} className="c" data-testid="scroll" />
    )
    expect(button().tagName).toBe('BUTTON')
    expect(button()).toHaveAttribute('aria-hidden', 'true')
    expect(button()).toHaveAttribute('tabindex', '-1')
    expect(button()).toHaveAttribute('data-scroll-direction', 'end')
    expect(button()).toHaveClass('c')
    expect(button().querySelector('svg')).not.toBeNull()
    fireEvent.click(button())
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('hides keeping its room, or turns off, when there is nowhere further to scroll', () => {
    const { unmount } = renderWithTheme(
      <TabScrollButton direction="start" isHidden data-testid="scroll" />
    )
    expect(button()).toHaveStyle({ visibility: 'hidden' })
    unmount()
    renderWithTheme(
      <TabScrollButton direction="start" orientation="vertical" disabled data-testid="scroll" />
    )
    expect(button()).toBeDisabled()
    expect(button()).toHaveStyle({ visibility: 'visible' })
  })

  it('shows what it is given in place of the chevron', () => {
    renderWithTheme(
      <TabScrollButton direction="start" data-testid="scroll">
        ‹
      </TabScrollButton>
    )
    expect(button()).toHaveTextContent('‹')
    expect(button().querySelector('svg')).toBeNull()
  })
})

describe('Tabs slots.scrollButton', () => {
  it('renders the given button at each end, with the scroll button props', () => {
    const received: TabScrollButtonProps[] = []
    function Arrow(props: TabScrollButtonProps) {
      received.push(props)
      return (
        <button type="button" data-testid={`arrow-${props.direction}`} onClick={props.onClick}>
          {props.direction}
        </button>
      )
    }
    renderWithTheme(
      <Tabs
        aria-label="Views"
        overflowBehavior="scroll"
        scrollButtons="always"
        shouldShowScrollButtonsOnMobile
        variant="enclosed"
        slots={{ scrollButton: Arrow }}
      >
        <Tab label="One" />
        <Tab label="Two" />
      </Tabs>
    )
    expect(screen.getByTestId('arrow-start')).toBeInTheDocument()
    expect(screen.getByTestId('arrow-end')).toBeInTheDocument()
    expect(received.at(-1)).toMatchObject({ direction: 'end', orientation: 'horizontal' })
  })

  it("takes its Tabs' orientation when a slot leaves it out - a strip in a vertical column", () => {
    function Arrow({ orientation: _orientation, ...props }: TabScrollButtonProps) {
      return <TabScrollButton {...props} data-testid={`arrow-${props.direction}`} />
    }
    renderWithTheme(
      <Tabs
        aria-label="Views"
        orientation="vertical"
        overflowBehavior="scroll"
        scrollButtons="always"
        slots={{ scrollButton: Arrow }}
      >
        <Tab label="One" />
        <Tab label="Two" />
      </Tabs>
    )
    expect(screen.getByTestId('arrow-end')).toHaveStyle({ minHeight: baseTheme.space[5] })
  })
})

// As a tab's: the button takes its row's look, and its own value wins.
describe("a scroll button's own look", () => {
  const enclosedRow = (
    scrollButton: ComponentType<TabScrollButtonProps>,
    rowProps: Partial<React.ComponentProps<typeof Tabs>> = {}
  ) =>
    renderWithTheme(
      <Tabs
        aria-label="Views"
        variant="enclosed"
        overflowBehavior="scroll"
        scrollButtons="always"
        shouldShowScrollButtonsOnMobile
        defaultValue="a"
        slots={{ scrollButton }}
        {...rowProps}
      >
        <Tab value="a" label="A" color="warning" />
        <Tab value="b" label="B" />
      </Tabs>
    )

  it("draws its stretch of the divider in the row's line - the selected tab's color - or its own", () => {
    enclosedRow((props) => <TabScrollButton {...props} data-testid={`scroll-${props.direction}`} />)
    expect(getComputedStyle(screen.getByTestId('scroll-start')).boxShadow).toContain(
      baseTheme.palette.warning.main.toLowerCase()
    )
    cleanup()
    enclosedRow((props) => (
      <TabScrollButton {...props} color="error" data-testid={`scroll-${props.direction}`} />
    ))
    expect(getComputedStyle(screen.getByTestId('scroll-start')).boxShadow).toContain(
      baseTheme.palette.error.main.toLowerCase()
    )
  })

  it("colors its chevron by its own textColor, then the row's, then the theme's for every button", () => {
    const theme = createTheme(baseTheme, {
      components: {
        TabScrollButton: { defaultProps: { textColor: 'disabled', color: 'success' } },
      },
    })
    const row = (props: Partial<TabScrollButtonProps>, rowProps = {}) =>
      render(
        <ThemeProvider theme={theme}>
          <Tabs
            aria-label="Views"
            variant="enclosed"
            overflowBehavior="scroll"
            scrollButtons="always"
            shouldShowScrollButtonsOnMobile
            defaultValue="a"
            slots={{
              // On: at a row's end with nowhere to scroll, it would take the disabled color.
              scrollButton: (slot) => (
                <TabScrollButton
                  {...slot}
                  {...props}
                  disabled={false}
                  data-testid={`scroll-${slot.direction}`}
                />
              ),
            }}
            {...rowProps}
          >
            <Tab value="a" label="A" />
          </Tabs>
        </ThemeProvider>
      )
    const start = () => screen.getByTestId('scroll-start')
    row({ textColor: 'secondary' })
    expect(start()).toHaveStyle({ color: baseTheme.text.secondary })
    cleanup()
    row({}, { textColor: 'primary' })
    expect(start()).toHaveStyle({ color: baseTheme.text.primary })
    cleanup()
    row({})
    expect(start()).toHaveStyle({ color: baseTheme.text.disabled })
    expect(getComputedStyle(start()).boxShadow).toContain(
      baseTheme.palette.success.main.toLowerCase()
    )
  })
})
