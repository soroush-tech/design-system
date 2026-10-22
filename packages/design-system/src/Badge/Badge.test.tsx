import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { ThemeProvider } from '../theme'
import { baseTheme, createTheme, type Theme } from '../theme/themes'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { Badge, type BadgeProps } from './Badge'

const withTheme = (theme: Theme) =>
  function Wrapper({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
  }

const root = () => screen.getByTestId('badge')
const mark = () => root().querySelector('[aria-hidden="true"]') as HTMLElement | null
const view = (props: Partial<BadgeProps> = {}) => (
  <Badge data-testid="badge" badgeContent={4} {...props}>
    <button type="button">Inbox</button>
  </Badge>
)

describe('Badge', () => {
  describe('what shows', () => {
    it('draws its content over its child, hidden from assistive technology', () => {
      renderWithTheme(view())
      expect(mark()).toHaveTextContent('4')
      expect(root()).toContainElement(screen.getByRole('button', { name: 'Inbox' }))
    })

    it('shows a count past max as max+, and one at max as it is', () => {
      const { unmount } = renderWithTheme(view({ badgeContent: 120 }))
      expect(mark()).toHaveTextContent('99+')
      unmount()
      const { unmount: again } = renderWithTheme(view({ badgeContent: 99 }))
      expect(mark()).toHaveTextContent('99')
      again()
      renderWithTheme(view({ badgeContent: 12, max: 9 }))
      expect(mark()).toHaveTextContent('9+')
    })

    it('shows text as it is, and a count past max only when it is a number', () => {
      renderWithTheme(view({ badgeContent: 'new', max: 1 }))
      expect(mark()).toHaveTextContent('new')
    })

    it('draws no badge for nothing, or a count of zero', () => {
      const { unmount } = renderWithTheme(view({ badgeContent: undefined }))
      expect(mark()).toBeNull()
      unmount()
      const { unmount: second } = renderWithTheme(view({ badgeContent: null }))
      expect(mark()).toBeNull()
      second()
      const { unmount: third } = renderWithTheme(view({ badgeContent: '' }))
      expect(mark()).toBeNull()
      third()
      renderWithTheme(view({ badgeContent: 0 }))
      expect(mark()).toBeNull()
    })

    it('draws a count of zero when asked', () => {
      renderWithTheme(view({ badgeContent: 0, shouldShowZero: true }))
      expect(mark()).toHaveTextContent('0')
    })

    it('draws nothing when hidden', () => {
      renderWithTheme(view({ isHidden: true }))
      expect(mark()).toBeNull()
    })

    it('draws a dot with no content, and a dot is not hidden for having none', () => {
      renderWithTheme(view({ variant: 'dot', badgeContent: undefined }))
      expect(mark()).toBeInTheDocument()
      expect(mark()).toBeEmptyDOMElement()
      expect(mark()).toHaveStyle({ width: '8px', height: '8px' })
    })

    it('draws no dot when hidden', () => {
      renderWithTheme(view({ variant: 'dot', isHidden: true }))
      expect(mark()).toBeNull()
    })
  })

  describe('where it sits', () => {
    it('is on the top end by default, pulled over the corner', () => {
      renderWithTheme(view())
      expect(mark()).toHaveStyle({ top: '0px', transform: 'translate(50%, -50%)' })
    })

    it('goes to the other corners', () => {
      const { unmount } = renderWithTheme(
        view({ anchorOrigin: { vertical: 'bottom', horizontal: 'start' } })
      )
      expect(mark()).toHaveStyle({ bottom: '0px', transform: 'translate(-50%, 50%)' })
      unmount()
      renderWithTheme(view({ anchorOrigin: { vertical: 'bottom', horizontal: 'end' } }))
      expect(mark()).toHaveStyle({ bottom: '0px', transform: 'translate(50%, 50%)' })
    })

    it('is pulled in on a circle', () => {
      renderWithTheme(view({ overlap: 'circular' }))
      expect(mark()).toHaveStyle({ top: '14%' })
    })

    it('turns the pull round right to left', () => {
      render(<div dir="rtl">{view()}</div>, { wrapper: ThemeProvider })
      // The rule for right to left sits in the stylesheet under [dir="rtl"].
      const rule = [...document.querySelectorAll('style')]
        .map((style) => style.textContent ?? '')
        .join('')
      expect(rule).toContain('[dir="rtl"]')
      expect(rule).toContain('translate(-50%, -50%)')
    })
  })

  describe('looks', () => {
    it('is the error color by default, with its contrast text', () => {
      renderWithTheme(view())
      expect(mark()).toHaveStyle({
        backgroundColor: baseTheme.palette.error.main,
        color: baseTheme.palette.error.contrastText,
      })
    })

    it.each(['default', 'primary', 'secondary', 'success', 'info', 'warning'] as const)(
      'takes the %s color, and its contrast text',
      (color) => {
        renderWithTheme(view({ color }))
        expect(mark()).toHaveStyle({
          backgroundColor: baseTheme.palette[color].main,
          color: baseTheme.palette[color].contrastText,
        })
      }
    )
  })

  describe('its label', () => {
    it('is read with the badge, and describes its one child', () => {
      renderWithTheme(view({ badgeLabel: '4 unread' }))
      const button = screen.getByRole('button', { name: 'Inbox' })
      expect(button).toHaveAccessibleDescription('4 unread')
    })

    it('is read after several children, which it leaves as they are', () => {
      renderWithTheme(
        <Badge data-testid="badge" badgeContent={4} badgeLabel="4 unread">
          <button type="button" aria-describedby="help">
            Inbox
          </button>
          <span id="help">Your messages</span>
        </Badge>
      )
      // Two children: they are read together, and the label is read after them.
      expect(root()).toHaveTextContent('Inbox')
      expect(root()).toHaveTextContent('4 unread')
    })

    it('adds to a description the one child already has', () => {
      renderWithTheme(
        <>
          <span id="help">Your messages</span>
          <Badge data-testid="badge" badgeContent={4} badgeLabel="4 unread">
            <button type="button" aria-describedby="help">
              Inbox
            </button>
          </Badge>
        </>
      )
      expect(screen.getByRole('button', { name: 'Inbox' })).toHaveAccessibleDescription(
        'Your messages 4 unread'
      )
    })

    it('is read after a child that is not one element', () => {
      renderWithTheme(
        <Badge data-testid="badge" badgeContent={4} badgeLabel="4 unread">
          Inbox
        </Badge>
      )
      expect(root()).toHaveTextContent('Inbox4 unread')
    })

    it('is not read when there is no badge', () => {
      renderWithTheme(view({ badgeContent: 0, badgeLabel: '0 unread' }))
      expect(root()).not.toHaveTextContent('0 unread')
    })
  })

  describe('theme', () => {
    it('takes its defaults from the theme, an own prop winning', () => {
      const theme = createTheme(baseTheme, {
        components: {
          Badge: {
            defaultProps: {
              max: 9,
              variant: 'dot',
              color: 'info',
              anchorOrigin: { vertical: 'bottom', horizontal: 'start' },
              overlap: 'circular',
            },
          },
        },
      })
      const { unmount } = render(view(), { wrapper: withTheme(theme) })
      expect(mark()).toHaveStyle({
        backgroundColor: baseTheme.palette.info.main,
        bottom: '14%',
        width: '8px',
      })
      unmount()
      render(view({ variant: 'standard', badgeContent: 12 }), { wrapper: withTheme(theme) })
      expect(mark()).toHaveTextContent('9+')
    })

    it('styles each slot from styleOverrides', () => {
      const theme = createTheme(baseTheme, {
        components: {
          Badge: {
            styleOverrides: {
              root: { opacity: 0.9 },
              badge: { opacity: 0.8 },
              label: { opacity: 0.7 },
            },
          },
        },
      })
      render(view({ badgeLabel: '4 unread' }), { wrapper: withTheme(theme) })
      expect(root()).toHaveStyle({ opacity: '0.9' })
      expect(mark()).toHaveStyle({ opacity: '0.8' })
      expect(screen.getByText('4 unread')).toHaveStyle({ opacity: '0.7' })
    })
  })

  it('takes space props, a class name and a test id on its root', () => {
    renderWithTheme(view({ className: 'extra', m: 1 }))
    expect(root()).toHaveClass('extra')
    expect(root()).toHaveStyle({ margin: baseTheme.space[1] })
  })
})
