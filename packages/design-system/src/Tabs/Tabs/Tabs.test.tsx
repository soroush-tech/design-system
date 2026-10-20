import { describe, it, expect, vi, afterEach } from 'vitest'
import { createRef } from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { renderWithTheme } from '../../utils/test/renderWithTheme'
import { baseTheme, createTheme } from '../../theme/themes'
import { ThemeProvider, type TabsVariants } from '../../theme'
import { Tabs, type TabsActions, type TabsProps } from './Tabs'
import { Tab } from '../Tab'

const renderViews = (props: Partial<TabsProps> = {}) =>
  renderWithTheme(
    <Tabs aria-label="Views" {...props}>
      <Tab value="canvas" label="Canvas" />
      <Tab value="system" label="Design system" />
      <Tab value="common" label="Common components" disabled />
      <Tab value="tokens" label="Tokens" />
    </Tabs>
  )

const tab = (name: string) => screen.getByRole('tab', { name })

afterEach(() => {
  vi.restoreAllMocks()
})

describe('Tabs', () => {
  it('renders a named tablist of tabs, none selected by default', () => {
    renderViews()
    const list = screen.getByRole('tablist', { name: 'Views' })
    expect(list).toHaveAttribute('aria-orientation', 'horizontal')
    expect(screen.getAllByRole('tab')).toHaveLength(4)
    expect(tab('Canvas')).toHaveAttribute('aria-selected', 'false')
    expect(tab('Canvas').tagName).toBe('BUTTON')
    expect(tab('Canvas')).toHaveAttribute('type', 'button')
  })

  it('puts only the selected tab, or the first enabled one, in the tab order', () => {
    const { unmount } = renderViews()
    expect(tab('Canvas')).toHaveAttribute('tabindex', '0')
    expect(tab('Design system')).toHaveAttribute('tabindex', '-1')
    unmount()
    renderViews({ defaultValue: 'tokens' })
    expect(tab('Tokens')).toHaveAttribute('tabindex', '0')
    expect(tab('Canvas')).toHaveAttribute('tabindex', '-1')
  })

  it('has no tab in the tab order when every tab is disabled', () => {
    renderWithTheme(
      <Tabs>
        <Tab label="Off" disabled />
      </Tabs>
    )
    expect(tab('Off')).toHaveAttribute('tabindex', '-1')
  })

  it('selects a tab on a click, uncontrolled', () => {
    const onChange = vi.fn()
    renderViews({ onChange })
    fireEvent.click(tab('Design system'))
    expect(tab('Design system')).toHaveAttribute('aria-selected', 'true')
    expect(onChange).toHaveBeenCalledWith('system')
  })

  it('in controlled mode, reports a click and leaves the value to its owner', () => {
    const onChange = vi.fn()
    renderViews({ value: 'canvas', onChange })
    fireEvent.click(tab('Design system'))
    expect(onChange).toHaveBeenCalledWith('system')
    expect(tab('Canvas')).toHaveAttribute('aria-selected', 'true')
  })

  it('does not select a disabled tab', () => {
    const onChange = vi.fn()
    renderViews({ onChange })
    expect(tab('Common components')).toHaveAttribute('aria-disabled', 'true')
    fireEvent.click(tab('Common components'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it("keeps a tab's own onClick", () => {
    const onClick = vi.fn()
    renderWithTheme(
      <Tabs>
        <Tab label="One" onClick={onClick} />
      </Tabs>
    )
    fireEvent.click(tab('One'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('gives a tab without a value its position', () => {
    const onChange = vi.fn()
    renderWithTheme(
      <Tabs onChange={onChange}>
        {'text'}
        <Tab label="Zero" />
        {null}
        <Tab label="One" />
      </Tabs>
    )
    fireEvent.click(tab('One'))
    expect(onChange).toHaveBeenCalledWith(2)
  })

  it('moves focus with the arrow keys, skipping disabled tabs and coming round', () => {
    renderViews()
    tab('Design system').focus()
    expect(fireEvent.keyDown(tab('Design system'), { key: 'ArrowRight' })).toBe(false)
    expect(tab('Tokens')).toHaveFocus()
    fireEvent.keyDown(tab('Tokens'), { key: 'ArrowRight' })
    expect(tab('Canvas')).toHaveFocus()
    fireEvent.keyDown(tab('Canvas'), { key: 'ArrowLeft' })
    expect(tab('Tokens')).toHaveFocus()
    fireEvent.keyDown(tab('Tokens'), { key: 'Home' })
    expect(tab('Canvas')).toHaveFocus()
    fireEvent.keyDown(tab('Canvas'), { key: 'End' })
    expect(tab('Tokens')).toHaveFocus()
  })

  it('moves focus without selecting, unless shouldSelectOnFocus', () => {
    const onChange = vi.fn()
    const { unmount } = renderViews({ onChange })
    tab('Canvas').focus()
    fireEvent.keyDown(tab('Canvas'), { key: 'ArrowRight' })
    expect(onChange).not.toHaveBeenCalled()
    unmount()

    renderViews({ onChange, shouldSelectOnFocus: true })
    act(() => {
      tab('Canvas').focus()
    })
    expect(onChange).toHaveBeenCalledWith('canvas')
    fireEvent.keyDown(tab('Canvas'), { key: 'ArrowRight' })
    expect(tab('Design system')).toHaveAttribute('aria-selected', 'true')
  })

  it('does not select on focus a tab that is already selected or disabled', () => {
    const onChange = vi.fn()
    renderViews({ onChange, shouldSelectOnFocus: true, defaultValue: 'canvas' })
    act(() => {
      tab('Canvas').focus()
      tab('Common components').focus()
    })
    expect(onChange).not.toHaveBeenCalled()
  })

  it('ignores other keys', () => {
    renderViews()
    tab('Canvas').focus()
    expect(fireEvent.keyDown(tab('Canvas'), { key: 'ArrowDown' })).toBe(true)
    expect(tab('Canvas')).toHaveFocus()
  })

  it('swaps Left and Right right to left', () => {
    renderWithTheme(
      <div dir="rtl">
        <Tabs>
          <Tab label="One" />
          <Tab label="Two" />
          <Tab label="Three" />
        </Tabs>
      </div>
    )
    tab('One').focus()
    fireEvent.keyDown(tab('One'), { key: 'ArrowLeft' })
    expect(tab('Two')).toHaveFocus()
    fireEvent.keyDown(tab('Two'), { key: 'ArrowRight' })
    expect(tab('One')).toHaveFocus()
  })

  it('uses Up and Down when vertical', () => {
    renderViews({ orientation: 'vertical' })
    expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'vertical')
    tab('Canvas').focus()
    fireEvent.keyDown(tab('Canvas'), { key: 'ArrowDown' })
    expect(tab('Design system')).toHaveFocus()
    fireEvent.keyDown(tab('Design system'), { key: 'ArrowUp' })
    expect(tab('Canvas')).toHaveFocus()
    expect(fireEvent.keyDown(tab('Canvas'), { key: 'ArrowRight' })).toBe(true)
  })

  it('is a navigation of buttons or links with as="nav", the current one aria-current', () => {
    renderWithTheme(
      <Tabs as="nav" aria-label="Panel" defaultValue="layers">
        <Tab value="layers" label="Layers" />
        <Tab value="assets" label="Assets" href="#assets" />
      </Tabs>
    )
    const nav = screen.getByRole('navigation', { name: 'Panel' })
    expect(screen.queryByRole('tablist')).not.toBeInTheDocument()
    const layers = screen.getByRole('button', { name: 'Layers' })
    expect(layers).toHaveAttribute('aria-current', 'page')
    expect(layers).not.toHaveAttribute('tabindex')
    const assets = screen.getByRole('link', { name: 'Assets' })
    expect(assets).not.toHaveAttribute('aria-current')
    expect(assets).not.toHaveAttribute('type')
    expect(nav).toContainElement(assets)
    expect(fireEvent.keyDown(layers, { key: 'ArrowRight' })).toBe(true)
  })

  it('prevents a disabled link from navigating', () => {
    renderWithTheme(
      <Tabs as="nav">
        <Tab label="Off" href="#off" disabled />
      </Tabs>
    )
    expect(fireEvent.click(screen.getByRole('link', { name: 'Off' }))).toBe(false)
  })

  it('renders a tab as another element with as', () => {
    renderWithTheme(
      <Tabs>
        <Tab label="Custom" as="span" />
      </Tabs>
    )
    expect(tab('Custom').tagName).toBe('SPAN')
    expect(tab('Custom')).not.toHaveAttribute('type')
  })

  it('puts content of its own before and after the tabs, out of the tablist', () => {
    renderViews({
      startContent: <button type="button">Tools</button>,
      endContent: <button type="button">Add</button>,
    })
    const list = screen.getByRole('tablist')
    expect(list).not.toContainElement(screen.getByRole('button', { name: 'Tools' }))
    expect(list.previousElementSibling).toContainElement(
      screen.getByRole('button', { name: 'Tools' })
    )
    expect(list.nextElementSibling).toContainElement(screen.getByRole('button', { name: 'Add' }))
  })

  it('points a tab at no panel without a TabContext - there is none to point at', () => {
    renderWithTheme(
      <Tabs aria-label="Views">
        <Tab label="Canvas" />
      </Tabs>
    )
    expect(tab('Canvas')).not.toHaveAttribute('aria-controls')
  })

  it('wraps a label onto two lines with isWrapped', () => {
    renderWithTheme(
      <Tabs>
        <Tab label="One" />
        <Tab label="Two" isWrapped />
      </Tabs>
    )
    expect(tab('One')).toHaveStyle({ whiteSpace: 'nowrap' })
    expect(tab('Two')).toHaveStyle({ whiteSpace: 'normal' })
  })

  it('shares the width with fullWidth and centers with isCentered', () => {
    const { unmount } = renderViews({ fullWidth: true })
    expect(tab('Canvas').parentElement).toHaveStyle({ flexGrow: '1' })
    unmount()
    renderViews({ isCentered: true })
    expect(screen.getByRole('tablist')).toHaveStyle({ justifyContent: 'center' })
  })

  it('colors the selected tab with the accent in the underline look', () => {
    renderViews({ defaultValue: 'canvas', color: 'error', textColor: 'secondary' })
    expect(tab('Canvas')).toHaveStyle({ color: baseTheme.palette.error.main })
    expect(tab('Design system')).toHaveStyle({ color: baseTheme.text.secondary })
    expect(tab('Common components')).toHaveStyle({ color: baseTheme.text.disabled })
  })

  it('fills the selected tab with selectedBg, and the strip with bg', () => {
    const { unmount } = renderViews({ defaultValue: 'canvas', selectedBg: 'default', bg: 'paper' })
    expect(tab('Canvas').parentElement).toHaveStyle({
      backgroundColor: baseTheme.background.default,
    })
    expect(screen.getByRole('tablist').parentElement).toHaveStyle({
      backgroundColor: baseTheme.background.paper,
    })
    unmount()
    // The enclosed look with no divider to outline its tab fills it instead - paper by default.
    renderViews({ defaultValue: 'canvas', variant: 'enclosed', hasDivider: false })
    expect(tab('Canvas').parentElement).toHaveStyle({ backgroundColor: baseTheme.background.paper })
  })

  it('takes selectedBg from the theme', () => {
    const theme = createTheme(baseTheme, {
      components: { Tabs: { defaultProps: { selectedBg: 'default' } } },
    })
    render(
      <ThemeProvider theme={theme}>
        <Tabs aria-label="Views" defaultValue="a">
          <Tab value="a" label="A" />
        </Tabs>
      </ThemeProvider>
    )
    expect(tab('A').parentElement).toHaveStyle({ backgroundColor: baseTheme.background.default })
  })

  it('boxes the selected tab on a raised ground in the boxed look, with no indicator', () => {
    renderViews({ defaultValue: 'canvas', variant: 'boxed' })
    expect(tab('Canvas').parentElement).toHaveStyle({ backgroundColor: baseTheme.background.paper })
    expect(tab('Design system').parentElement).not.toHaveStyle({
      backgroundColor: baseTheme.background.paper,
    })
    expect(screen.getByRole('tablist').querySelector('[aria-hidden]')).toBeNull()
  })

  // The enclosed look and the divider are drawn with inset shadows, which jsdom doesn't model:
  // their shapes are held in Tabs.browser.test.tsx. Here, each arrangement renders its tabs.
  it('renders the enclosed look, with or without a divider, centred or shared', () => {
    for (const props of [
      { variant: 'enclosed' as const },
      { variant: 'enclosed' as const, hasDivider: false },
      { variant: 'enclosed' as const, isCentered: true },
      { variant: 'enclosed' as const, fullWidth: true },
    ]) {
      const { unmount } = renderViews({ defaultValue: 'canvas', ...props })
      expect(screen.getAllByRole('tab')).toHaveLength(4)
      expect(screen.getByRole('tablist').querySelector('[aria-hidden]')).toBeNull()
      unmount()
    }
  })

  it('takes its variant, color and size from the theme defaults', () => {
    const theme = createTheme(baseTheme, {
      components: { Tabs: { defaultProps: { variant: 'boxed', color: 'error', size: 'sm' } } },
    })
    render(
      <ThemeProvider theme={theme}>
        <Tabs defaultValue={0}>
          <Tab label="One" />
        </Tabs>
      </ThemeProvider>
    )
    expect(tab('One').parentElement).toHaveStyle({ backgroundColor: baseTheme.background.paper })
    expect(tab('One')).toHaveStyle({ paddingTop: baseTheme.space[baseTheme.sizes.sm.paddingTop] })
  })

  describe('indicator', () => {
    const measure = (
      offsets: Partial<Record<'offsetLeft' | 'offsetTop' | 'offsetWidth' | 'offsetHeight', number>>
    ) => {
      for (const [key, value] of Object.entries(offsets)) {
        vi.spyOn(HTMLElement.prototype, key as 'offsetLeft', 'get').mockReturnValue(value)
      }
    }
    const indicator = () => screen.getByRole('tablist').querySelector<HTMLElement>('[aria-hidden]')!

    it('sits under the selected tab, and hides with none selected', () => {
      measure({ offsetLeft: 40, offsetWidth: 90 })
      const { unmount } = renderViews({ defaultValue: 'system' })
      expect(indicator()).toHaveStyle({ display: 'block', left: '40px', width: '90px' })
      unmount()
      renderViews()
      expect(indicator()).toHaveStyle({ display: 'none' })
    })

    it('sits beside the selected tab when vertical', () => {
      measure({ offsetTop: 30, offsetHeight: 24 })
      renderViews({ defaultValue: 'system', orientation: 'vertical' })
      expect(indicator()).toHaveStyle({ top: '30px', height: '24px' })
    })

    it('drops the other axis when the orientation changes, so the line keeps its thickness', () => {
      measure({ offsetLeft: 40, offsetWidth: 90, offsetTop: 30, offsetHeight: 24 })
      const views = (orientation: TabsProps['orientation']) => (
        <Tabs aria-label="Views" defaultValue="system" orientation={orientation}>
          <Tab value="canvas" label="Canvas" />
          <Tab value="system" label="Design system" />
        </Tabs>
      )
      const { rerender } = renderWithTheme(views('horizontal'))
      rerender(views('vertical'))
      expect(indicator().style).toMatchObject({ left: '', width: '', top: '30px', height: '24px' })
      rerender(views('horizontal'))
      expect(indicator().style).toMatchObject({ top: '', height: '', left: '40px', width: '90px' })
    })

    it('re-measures through action.updateIndicator', () => {
      const action = createRef<TabsActions>()
      measure({ offsetLeft: 10, offsetWidth: 50 })
      renderViews({ defaultValue: 'canvas', action })
      measure({ offsetLeft: 12, offsetWidth: 60 })
      act(() => {
        action.current!.updateIndicator()
      })
      expect(indicator()).toHaveStyle({ left: '12px', width: '60px' })
    })
  })

  it('forwards id, className, data-testid and space props', () => {
    renderViews({ id: 'views', className: 'c', 'data-testid': 'tabs', p: 1 })
    const root = screen.getByTestId('tabs')
    expect(root).toHaveAttribute('id', 'views')
    expect(root).toHaveClass('c')
    expect(root).toHaveStyle({ padding: baseTheme.space[1] })
  })

  it("forwards a tab's className, data-testid and title", () => {
    renderWithTheme(
      <Tabs aria-labelledby="heading">
        <Tab label="One" className="t" data-testid="one" title="The first" />
      </Tabs>
    )
    expect(screen.getByRole('tablist')).toHaveAttribute('aria-labelledby', 'heading')
    expect(screen.getByTestId('one')).toHaveAttribute('title', 'The first')
    expect(screen.getByTestId('one').parentElement).toHaveClass('t')
  })

  it('throws for a Tab outside Tabs', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => renderWithTheme(<Tab label="Lost" />)).toThrow('A Tab must be inside Tabs.')
  })
})

describe('theme.components.Tabs', () => {
  const withComponents = (components: Parameters<typeof createTheme>[1]['components']) =>
    createTheme(baseTheme, { components })
  const indicator = () => screen.getByRole('tablist').querySelector('[aria-hidden]')

  it('applies a theme-contributed variant to a look of its own', () => {
    const theme = withComponents({
      Tabs: {
        variants: [
          {
            props: { variant: 'pill' as keyof TabsVariants },
            style: ({ theme: styled }) => ({
              borderStyle: 'dashed',
              borderColor: styled.border.primary,
            }),
          },
        ],
      },
    })
    render(
      <ThemeProvider theme={theme}>
        <Tabs aria-label="Views" variant={'pill' as keyof TabsVariants} data-testid="tabs">
          <Tab label="One" />
        </Tabs>
      </ThemeProvider>
    )
    expect(screen.getByTestId('tabs')).toHaveStyle({
      borderStyle: 'dashed',
      borderColor: baseTheme.border.primary,
    })
  })

  it('an explicit prop beats defaultProps', () => {
    render(
      <ThemeProvider theme={withComponents({ Tabs: { defaultProps: { variant: 'boxed' } } })}>
        <Tabs aria-label="Views" variant="underline" defaultValue={0}>
          <Tab label="One" />
        </Tabs>
      </ThemeProvider>
    )
    expect(indicator()).not.toBeNull()
  })

  it('defaultProps beat theme.defaults', () => {
    const theme = createTheme(baseTheme, {
      defaults: { color: 'success' },
      components: { Tabs: { defaultProps: { color: 'error' } } },
    })
    render(
      <ThemeProvider theme={theme}>
        <Tabs aria-label="Views" defaultValue={0}>
          <Tab label="One" />
        </Tabs>
      </ThemeProvider>
    )
    expect(indicator()).toHaveStyle({ backgroundColor: baseTheme.palette.error.main })
  })

  it('per-instance space props beat styleOverrides', () => {
    render(
      <ThemeProvider
        theme={withComponents({ Tabs: { styleOverrides: { root: { margin: '0px' } } } })}
      >
        <Tabs aria-label="Views" m={2} data-testid="tabs">
          <Tab label="One" />
        </Tabs>
      </ThemeProvider>
    )
    expect(screen.getByTestId('tabs')).toHaveStyle({ margin: baseTheme.space[2] })
  })
})
