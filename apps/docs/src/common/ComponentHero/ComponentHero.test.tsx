import { describe, it, expect, vi, afterEach } from 'vitest'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme } from 'src/test/utils/wrapper'
import { allComponents } from 'src/common/nav'
import { ComponentHero, type ComponentHeroProps } from './ComponentHero'

const button = allComponents.find((item) => item.name === 'Button')!

const renderHero = (props: Partial<ComponentHeroProps> = {}) =>
  renderWithTheme(
    <ComponentHero
      item={button}
      lead="A button."
      hasAccessibility={false}
      active="overview"
      {...props}
    />
  )

const tabs = () => within(screen.getByRole('navigation', { name: 'Button pages' }))

describe('ComponentHero', () => {
  it('names the component and says what it is', () => {
    renderHero()
    expect(screen.getByRole('heading', { level: 1, name: 'Button' })).toBeInTheDocument()
    expect(screen.getByText('A button.')).toBeInTheDocument()
  })

  it('draws the component beside its name', () => {
    const { container } = renderHero()
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
  })

  it('leaves the line out when there is none', () => {
    renderHero({ lead: '' })
    expect(screen.queryByText('A button.')).not.toBeInTheDocument()
  })

  it('has an Overview tab and a Specs tab, linked to the component pages', () => {
    renderHero()
    expect(tabs().getByRole('link', { name: 'Overview' })).toHaveAttribute(
      'href',
      '/design-system/components/button/'
    )
    expect(tabs().getByRole('link', { name: 'Specs' })).toHaveAttribute(
      'href',
      '/design-system/api/button/'
    )
  })

  it('has an Accessibility tab only when the component has notes', () => {
    const { unmount } = renderHero()
    expect(tabs().queryByRole('link', { name: 'Accessibility' })).not.toBeInTheDocument()
    unmount()
    renderHero({ hasAccessibility: true })
    expect(tabs().getByRole('link', { name: 'Accessibility' })).toHaveAttribute(
      'href',
      '/design-system/components/button/accessibility/'
    )
  })

  it.each([
    ['overview', 'Overview'],
    ['specs', 'Specs'],
    ['accessibility', 'Accessibility'],
  ] as const)('marks the %s tab as the current page', (active, name) => {
    renderHero({ active, hasAccessibility: true })
    const links = tabs().getAllByRole('link')
    const current = links.filter((link) => link.getAttribute('aria-current') === 'page')
    expect(current).toHaveLength(1)
    expect(current[0]).toHaveTextContent(name)
  })

  it('has no tabs for a page that has none of its own', () => {
    renderHero({ active: undefined })
    expect(screen.queryByRole('navigation', { name: 'Button pages' })).not.toBeInTheDocument()
  })
})

describe('ComponentHero tabs at the top of the window', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  const stubScroll = (heroBottom: number, scrolledBy: number, stuckAt = 0) => {
    const scrollTo = vi.fn()
    vi.stubGlobal('scrollTo', scrollTo)
    vi.stubGlobal('scrollY', scrolledBy)
    // A browser answers the computed top of a sticky element in pixels; jsdom does not.
    const computed = window.getComputedStyle.bind(window)
    vi.spyOn(window, 'getComputedStyle').mockImplementation((element, pseudo) => {
      const style = computed(element, pseudo)
      if (element.tagName !== 'NAV') return style
      return new Proxy(style, {
        get: (target, property) => {
          if (property === 'top') return `${stuckAt}px`
          const value = Reflect.get(target, property)
          return typeof value === 'function' ? value.bind(target) : value
        },
      })
    })
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      bottom: heroBottom,
    } as DOMRect)
    return scrollTo
  }

  const chooseTab = async (name: string, options?: { ctrlKey?: boolean }) => {
    const user = userEvent.setup()
    const link = tabs().getByRole('link', { name })
    // The navigation is the router's; the click is what is read.
    link.addEventListener('click', (event) => event.preventDefault())
    if (options?.ctrlKey) await user.keyboard('{Control>}')
    await user.click(link)
    if (options?.ctrlKey) await user.keyboard('{/Control}')
  }

  it('sticks the tab bar to the top of the window', () => {
    renderHero()
    expect(screen.getByRole('navigation', { name: 'Button pages' })).toHaveStyle({
      position: 'sticky',
    })
  })

  it('leaves the scroll to the page while it is not a tab that was chosen', () => {
    const scrollTo = stubScroll(300, 0)
    renderHero()
    expect(scrollTo).not.toHaveBeenCalled()
  })

  it('keeps the scroll position when a tab is followed, so the page is scrolled by the hero', () => {
    renderHero({ hasAccessibility: true })
    for (const link of tabs().getAllByRole('link')) {
      expect(link).toHaveAttribute('keep-scroll-position', 'true')
    }
  })

  it('scrolls the page a tab opens to the tabs, whether the reader was down it or at its head', async () => {
    const scrollTo = stubScroll(300, 40, 56)
    const { unmount } = renderHero()
    await chooseTab('Specs')
    unmount()
    // The page that replaces it: its hero ends 300px below the window top, the window is 40px down.
    renderHero({ active: 'specs' })
    // The tabs' own place is 340px down the page; they stick 56px down, under the top bar.
    expect(scrollTo).toHaveBeenCalledWith({ top: 284 })
  })

  it('scrolls once, and not for a page that was not reached by a tab', async () => {
    const scrollTo = stubScroll(300, 0)
    const { unmount } = renderHero()
    await chooseTab('Specs')
    unmount()
    const next = renderHero({ active: 'specs' })
    next.unmount()
    renderHero()
    expect(scrollTo).toHaveBeenCalledTimes(1)
  })

  it('does not scroll for a click that opens the page elsewhere', async () => {
    const scrollTo = stubScroll(300, 0)
    const { unmount } = renderHero()
    await chooseTab('Specs', { ctrlKey: true })
    unmount()
    renderHero({ active: 'specs' })
    expect(scrollTo).not.toHaveBeenCalled()
  })

  it('has nothing to scroll to on a page without tabs', async () => {
    const scrollTo = stubScroll(300, 0)
    const { unmount } = renderHero()
    await chooseTab('Specs')
    unmount()
    renderHero({ active: undefined })
    expect(scrollTo).not.toHaveBeenCalled()
  })
})
