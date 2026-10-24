import { describe, it, expect, vi, afterEach } from 'vitest'
import { fireEvent, screen, waitFor, within } from '@testing-library/react'
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

  it('links the source of the component on GitHub, in a tab of its own', () => {
    renderHero()
    const source = screen.getByRole('link', { name: 'Source' })
    expect(source).toHaveAttribute(
      'href',
      'https://github.com/soroush-tech/design-system/tree/main/packages/design-system/src/Button'
    )
    expect(source).toHaveAttribute('target', '_blank')
    expect(source).toHaveAttribute('rel', 'noopener noreferrer')
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

  // `barTop` is where the tab bar is in the window: below `stuckAt` it is in its place, at it stuck.
  const stubScroll = (heroBottom: number, scrolledBy: number, stuckAt = 0, barTop = 400) => {
    const scrollTo = vi.fn()
    vi.stubGlobal('scrollTo', scrollTo)
    vi.stubGlobal('scrollY', scrolledBy)
    // A browser answers the computed top of a sticky element in pixels; jsdom does not. The bar is the element around the tabs' nav.
    const computed = window.getComputedStyle.bind(window)
    vi.spyOn(window, 'getComputedStyle').mockImplementation((element, pseudo) => {
      const style = computed(element, pseudo)
      if (!element.querySelector(':scope > nav')) return style
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
      top: barTop,
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
    expect(screen.getByRole('navigation', { name: 'Button pages' }).parentElement).toHaveStyle({
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

describe('ComponentHero tab bar width', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  const bar = () => screen.getByRole('navigation', { name: 'Button pages' }).parentElement!

  const stubBarAt = (top: number) => {
    vi.stubGlobal('scrollTo', vi.fn())
    const computed = window.getComputedStyle.bind(window)
    vi.spyOn(window, 'getComputedStyle').mockImplementation((element, pseudo) => {
      const style = computed(element, pseudo)
      if (element.tagName !== 'NAV') return style
      return new Proxy(style, {
        get: (target, property) => {
          if (property === 'top') return '0px'
          const value = Reflect.get(target, property)
          return typeof value === 'function' ? value.bind(target) : value
        },
      })
    })
    const rect = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect')
    rect.mockReturnValue({ top, bottom: 300 } as DOMRect)
    return rect
  }

  it('spans the head in its place on the page', async () => {
    stubBarAt(400)
    renderHero()
    await waitFor(() => expect(bar()).toHaveStyle({ width: '100%' }))
  })

  it('shrinks to the content grid once it sticks, and spans the head again when it does not', async () => {
    const rect = stubBarAt(0)
    renderHero()
    await waitFor(() => expect(bar()).toHaveAttribute('data-stuck'))
    rect.mockReturnValue({ top: 400, bottom: 300 } as DOMRect)
    fireEvent.scroll(window)
    await waitFor(() => expect(bar()).not.toHaveAttribute('data-stuck'))
    expect(bar()).toHaveStyle({ width: '100%' })
    rect.mockReturnValue({ top: 0, bottom: 300 } as DOMRect)
    fireEvent.scroll(window)
    await waitFor(() => expect(bar()).toHaveAttribute('data-stuck'))
  })

  it('animates the width', () => {
    stubBarAt(400)
    renderHero()
    expect(bar()).toHaveStyle({ transition: 'width 280ms cubic-bezier(0.2, 0, 0, 1)' })
  })

  it('stops listening to the page once it is gone', () => {
    stubBarAt(400)
    const remove = vi.spyOn(window, 'removeEventListener')
    const { unmount } = renderHero()
    unmount()
    expect(remove).toHaveBeenCalledWith('scroll', expect.any(Function))
  })
})
