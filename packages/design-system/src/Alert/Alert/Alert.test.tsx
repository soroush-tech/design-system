import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { ThemeProvider } from '../../theme'
import { baseTheme, createTheme, type Theme } from '../../theme/themes'
import { renderWithTheme } from '../../utils/test/renderWithTheme'
import { Alert, type AlertProps } from './Alert'

const withTheme = (theme: Theme) =>
  function Wrapper({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
  }

const severities = ['success', 'info', 'warning', 'error'] as const
const root = () => screen.getByTestId('alert')
const view = (props: Partial<AlertProps> = {}) => (
  <Alert data-testid="alert" {...props}>
    Saved
  </Alert>
)

// WCAG contrast of two #RRGGBB colors.
const channel = (value: number) => {
  const unit = value / 255
  return unit <= 0.03928 ? unit / 12.92 : ((unit + 0.055) / 1.055) ** 2.4
}
const relative = (rgb: number[]) =>
  0.2126 * channel(rgb[0]) + 0.7152 * channel(rgb[1]) + 0.0722 * channel(rgb[2])
const parse = (hex: string) => [1, 3, 5].map((at) => Number.parseInt(hex.slice(at, at + 2), 16))
const contrast = (first: number[], second: number[]) => {
  const [lighter, darker] = [relative(first), relative(second)].sort((a, b) => b - a)
  return (lighter + 0.05) / (darker + 0.05)
}
// A color laid over another at an opacity.
const over = (top: number[], bottom: number[], opacity: number) =>
  top.map((value, index) => value * opacity + bottom[index] * (1 - opacity))

describe('Alert', () => {
  describe('the message', () => {
    it('is an alert that says what it is given', () => {
      renderWithTheme(view())
      expect(screen.getByRole('alert')).toHaveTextContent('Saved')
    })

    it('is a status, announced politely, when asked', () => {
      renderWithTheme(view({ role: 'status' }))
      expect(screen.getByRole('status')).toBeInTheDocument()
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })
  })

  describe('the icon', () => {
    it.each(severities)('is the %s icon for that severity', (severity) => {
      renderWithTheme(view({ severity }))
      expect(root().querySelector('svg')).toBeInTheDocument()
    })

    it('draws the icon of the severity that is given, and info when none is', () => {
      const { unmount } = renderWithTheme(view())
      const info = root().querySelector('svg path')?.getAttribute('d')
      unmount()
      renderWithTheme(view({ severity: 'error' }))
      expect(root().querySelector('svg path')?.getAttribute('d')).not.toBe(info)
    })

    it('draws the icon it is given in place of the one of the severity, or none with false', () => {
      const { unmount } = renderWithTheme(view({ icon: <i data-testid="own" /> }))
      expect(screen.getByTestId('own')).toBeInTheDocument()
      expect(root().querySelector('svg')).not.toBeInTheDocument()
      unmount()
      renderWithTheme(view({ icon: false }))
      expect(root().querySelector('svg')).not.toBeInTheDocument()
    })
  })

  describe('the action and the close control', () => {
    it('draws an action at the end', () => {
      renderWithTheme(view({ action: <button type="button">Undo</button> }))
      expect(screen.getByRole('button', { name: 'Undo' })).toBeInTheDocument()
    })

    it('draws a close control, named by closeLabel, that tells onClose', () => {
      const onClose = vi.fn()
      renderWithTheme(view({ onClose, closeLabel: 'Dismiss' }))
      fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }))
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('draws neither without an action or onClose', () => {
      renderWithTheme(view())
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('draws both: the action, then the close control', () => {
      renderWithTheme(
        view({
          action: <button type="button">Undo</button>,
          onClose: vi.fn(),
          closeLabel: 'Dismiss',
        })
      )
      const buttons = screen.getAllByRole('button')
      expect(
        buttons.map((button) => button.textContent || button.getAttribute('aria-label'))
      ).toEqual(['Undo', 'Dismiss'])
    })
  })

  describe('looks', () => {
    it.each(severities)('is tinted with %s, in the theme text, by default', (severity) => {
      renderWithTheme(view({ severity }))
      expect(root()).toHaveStyle({ color: baseTheme.text.initial })
      expect(root()).not.toHaveStyle({ backgroundColor: baseTheme.palette[severity].main })
    })

    it.each(severities)('is filled with %s, with its contrast text', (severity) => {
      renderWithTheme(view({ severity, variant: 'contained' }))
      expect(root()).toHaveStyle({
        backgroundColor: baseTheme.palette[severity].main,
        color: baseTheme.palette[severity].contrastText,
      })
    })

    it.each(severities)('is outlined in %s, in the theme text', (severity) => {
      renderWithTheme(view({ severity, variant: 'outlined' }))
      expect(root()).toHaveStyle({
        color: baseTheme.text.initial,
        border: `${baseTheme.borderWidths.thin} solid ${baseTheme.palette[severity].main}`,
      })
    })

    it('colors the icon of a tinted alert in the severity, and a filled one in its text', () => {
      const { unmount } = renderWithTheme(view({ severity: 'warning' }))
      expect(root().querySelector('svg')?.parentElement).toHaveStyle({
        color: baseTheme.palette.warning.main,
      })
      unmount()
      renderWithTheme(view({ severity: 'warning', variant: 'contained' }))
      expect(root().querySelector('svg')?.parentElement).toHaveStyle({
        color: baseTheme.palette.warning.contrastText,
      })
    })

    describe.each(severities)('the text of a %s alert', (severity) => {
      const text = parse(baseTheme.text.initial)
      const paper = parse(baseTheme.background.paper)
      const main = parse(baseTheme.palette[severity].main)

      it('reads on its tinted surface (AA)', () => {
        expect(contrast(text, over(main, paper, 0.15))).toBeGreaterThanOrEqual(4.5)
      })

      it('reads on the page behind it, outlined (AA)', () => {
        expect(contrast(text, paper)).toBeGreaterThanOrEqual(4.5)
      })
    })
  })

  describe('corners', () => {
    it("is square by default, and takes a radius of its own or the theme's", () => {
      const { rerender } = renderWithTheme(view())
      expect(root()).toHaveStyle({ borderRadius: baseTheme.radii.sq })
      rerender(view({ borderRadius: 'lg' }))
      expect(root()).toHaveStyle({ borderRadius: baseTheme.radii.lg })
      const theme = createTheme(baseTheme, {
        components: { Alert: { defaultProps: { borderRadius: 'md' } } },
      })
      render(view(), { wrapper: withTheme(theme) })
      expect(screen.getAllByTestId('alert')[1]).toHaveStyle({ borderRadius: baseTheme.radii.md })
    })
  })

  describe('theme', () => {
    it('takes its defaults from the theme, an own prop winning', () => {
      const theme = createTheme(baseTheme, {
        components: {
          Alert: {
            defaultProps: {
              severity: 'warning',
              variant: 'outlined',
              closeLabel: 'Close it',
              role: 'status',
            },
          },
        },
      })
      const { unmount } = render(view({ onClose: vi.fn() }), { wrapper: withTheme(theme) })
      expect(screen.getByRole('status')).toHaveStyle({
        border: `${baseTheme.borderWidths.thin} solid ${baseTheme.palette.warning.main}`,
      })
      expect(screen.getByRole('button', { name: 'Close it' })).toBeInTheDocument()
      unmount()
      render(view({ onClose: vi.fn(), closeLabel: 'Own', role: 'alert', severity: 'error' }), {
        wrapper: withTheme(theme),
      })
      expect(screen.getByRole('button', { name: 'Own' })).toBeInTheDocument()
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it('styles each slot from styleOverrides', () => {
      const theme = createTheme(baseTheme, {
        components: {
          Alert: {
            styleOverrides: {
              root: { opacity: 0.9 },
              icon: { opacity: 0.8 },
              message: { opacity: 0.7 },
              action: { opacity: 0.6 },
              closeButton: { opacity: 0.5 },
            },
          },
        },
      })
      render(view({ onClose: vi.fn(), closeLabel: 'Dismiss' }), { wrapper: withTheme(theme) })
      expect(root()).toHaveStyle({ opacity: '0.9' })
      expect(root().querySelector('svg')?.parentElement).toHaveStyle({ opacity: '0.8' })
      expect(screen.getByText('Saved')).toHaveStyle({ opacity: '0.7' })
      expect(screen.getByRole('button', { name: 'Dismiss' }).parentElement).toHaveStyle({
        opacity: '0.6',
      })
      expect(screen.getByRole('button', { name: 'Dismiss' })).toHaveStyle({ opacity: '0.5' })
    })
  })

  it('takes space props, a class name and a test id on its root', () => {
    renderWithTheme(view({ className: 'extra', m: 1 }))
    expect(root()).toHaveClass('extra')
    expect(root()).toHaveStyle({ margin: baseTheme.space[1] })
  })
})
