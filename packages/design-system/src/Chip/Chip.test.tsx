import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { ThemeProvider } from '../theme'
import { baseTheme, createTheme, type Theme } from '../theme/themes'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { Chip, type ChipProps } from './Chip'

const withTheme = (theme: Theme) =>
  function Wrapper({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
  }

const root = () => screen.getByTestId('chip')
const view = (props: Partial<ChipProps> = {}) => <Chip label="Tag" data-testid="chip" {...props} />

describe('Chip', () => {
  describe('a plain chip', () => {
    it('says its label, and is neither a button nor in the tab order', () => {
      renderWithTheme(view())
      expect(root()).toHaveTextContent('Tag')
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
      expect(root().querySelector('[tabindex]')).toBeNull()
    })

    it('truncates a long label rather than growing', () => {
      renderWithTheme(view({ label: 'A very long label indeed' }))
      expect(screen.getByText('A very long label indeed')).toHaveStyle({
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      })
    })
  })

  describe('clickable', () => {
    it('is one button, and one tab stop', () => {
      const onClick = vi.fn()
      renderWithTheme(view({ onClick }))
      const button = screen.getByRole('button', { name: 'Tag' })
      expect(button).not.toHaveAttribute('tabindex')
      fireEvent.click(button)
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('does nothing while disabled', () => {
      const onClick = vi.fn()
      renderWithTheme(view({ onClick, disabled: true }))
      expect(screen.getByRole('button', { name: 'Tag' })).toBeDisabled()
      fireEvent.click(screen.getByRole('button', { name: 'Tag' }))
      expect(onClick).not.toHaveBeenCalled()
      expect(root()).toHaveStyle({ opacity: '0.5', pointerEvents: 'none' })
    })
  })

  describe('deletable', () => {
    it('deletes through its control, which is named and out of the tab order', () => {
      const onDelete = vi.fn()
      renderWithTheme(view({ onDelete, deleteLabel: 'Remove Tag' }))
      const control = screen.getByRole('button', { name: 'Remove Tag' })
      expect(control).toHaveAttribute('tabindex', '-1')
      fireEvent.click(control)
      expect(onDelete).toHaveBeenCalledTimes(1)
    })

    it('has the focus itself, for the keys, when it only deletes', () => {
      renderWithTheme(view({ onDelete: vi.fn(), deleteLabel: 'Remove' }))
      expect(screen.getByText('Tag').parentElement).toHaveAttribute('tabindex', '0')
    })

    it('deletes on Backspace and Delete, and leaves other keys alone', () => {
      const onDelete = vi.fn()
      renderWithTheme(view({ onDelete, deleteLabel: 'Remove' }))
      const body = screen.getByText('Tag').parentElement as HTMLElement
      expect(fireEvent.keyDown(body, { key: 'Backspace' })).toBe(false)
      expect(fireEvent.keyDown(body, { key: 'Delete' })).toBe(false)
      expect(onDelete).toHaveBeenCalledTimes(2)
      expect(fireEvent.keyDown(body, { key: 'a' })).toBe(true)
      expect(onDelete).toHaveBeenCalledTimes(2)
    })

    it('ignores Backspace when there is nothing to delete', () => {
      renderWithTheme(view({ onClick: vi.fn() }))
      expect(fireEvent.keyDown(screen.getByRole('button'), { key: 'Backspace' })).toBe(true)
    })

    it('keeps its button the one tab stop when it is clickable too', () => {
      const onClick = vi.fn()
      const onDelete = vi.fn()
      renderWithTheme(view({ onClick, onDelete, deleteLabel: 'Remove' }))
      const button = screen.getByRole('button', { name: 'Tag' })
      expect(button).not.toHaveAttribute('tabindex')
      expect(screen.getByRole('button', { name: 'Remove' })).toHaveAttribute('tabindex', '-1')
      fireEvent.keyDown(button, { key: 'Delete' })
      expect(onDelete).toHaveBeenCalledTimes(1)
      // The control is no child of the button: pressing it does not click the chip.
      fireEvent.click(screen.getByRole('button', { name: 'Remove' }))
      expect(onClick).not.toHaveBeenCalled()
    })

    it('is off, and out of the focus, while disabled', () => {
      renderWithTheme(view({ onDelete: vi.fn(), deleteLabel: 'Remove', disabled: true }))
      expect(screen.getByRole('button', { name: 'Remove' })).toBeDisabled()
      expect(screen.getByText('Tag').parentElement).not.toHaveAttribute('tabindex')
    })
  })

  describe('before the label', () => {
    it('draws an icon, or an avatar in its place', () => {
      const { unmount } = renderWithTheme(view({ icon: <i data-testid="icon" /> }))
      expect(screen.getByTestId('icon')).toBeInTheDocument()
      unmount()
      renderWithTheme(view({ icon: <i data-testid="icon" />, avatar: <b data-testid="avatar" /> }))
      expect(screen.getByTestId('avatar')).toBeInTheDocument()
      expect(screen.queryByTestId('icon')).not.toBeInTheDocument()
    })
  })

  describe('looks', () => {
    it('is filled with its color, in the theme text for it, by default', () => {
      renderWithTheme(view())
      expect(root()).toHaveStyle({
        backgroundColor: baseTheme.palette.default.main,
        color: baseTheme.palette.default.contrastText,
      })
    })

    it.each(['primary', 'secondary', 'success', 'error', 'info', 'warning'] as const)(
      "is filled with %s, and its text is that color's contrast text",
      (color) => {
        renderWithTheme(view({ color }))
        expect(root()).toHaveStyle({
          backgroundColor: baseTheme.palette[color].main,
          color: baseTheme.palette[color].contrastText,
        })
      }
    )

    it('is only outlined, in its color, when outlined', () => {
      renderWithTheme(view({ variant: 'outlined', color: 'success' }))
      expect(root()).toHaveStyle({
        color: baseTheme.palette.success.main,
        border: `${baseTheme.borderWidths.thin} solid ${baseTheme.palette.success.main}`,
      })
      expect(root()).not.toHaveStyle({ backgroundColor: baseTheme.palette.success.main })
    })

    it('is outlined in the text and border colors of the theme when it has no color', () => {
      renderWithTheme(view({ variant: 'outlined' }))
      expect(root()).toHaveStyle({
        color: baseTheme.text.initial,
        border: `${baseTheme.borderWidths.thin} solid ${baseTheme.border.default}`,
      })
    })

    it('takes its padding and font from its size', () => {
      const { unmount } = renderWithTheme(view({ size: 'sm' }))
      const small = baseTheme.sizes.sm
      expect(root()).toHaveStyle({
        paddingTop: baseTheme.space[small.paddingTop],
        fontSize: `${baseTheme.fontSizes[small.fontSize]}px`,
      })
      unmount()
      renderWithTheme(view({ size: 'lg' }))
      expect(root()).toHaveStyle({ paddingTop: baseTheme.space[baseTheme.sizes.lg.paddingTop] })
    })
  })

  describe('corners', () => {
    it('is a pill by default, square or rounded by shape, and a radius of its own wins', () => {
      const { rerender } = renderWithTheme(view())
      expect(root()).toHaveStyle({ borderRadius: '9999px' })
      rerender(view({ shape: 'square' }))
      expect(root()).toHaveStyle({ borderRadius: '0' })
      rerender(view({ shape: 'rounded' }))
      expect(root()).toHaveStyle({ borderRadius: baseTheme.radii.md })
      rerender(view({ shape: 'pill', borderRadius: 'lg' }))
      expect(root()).toHaveStyle({ borderRadius: baseTheme.radii.lg })
    })

    it('takes its shape and radius from the theme, an own prop winning', () => {
      const theme = createTheme(baseTheme, {
        components: { Chip: { defaultProps: { shape: 'square' } } },
      })
      const { unmount } = render(view(), { wrapper: withTheme(theme) })
      expect(root()).toHaveStyle({ borderRadius: '0' })
      unmount()
      const radius = createTheme(baseTheme, {
        components: { Chip: { defaultProps: { borderRadius: 'sm' } } },
      })
      render(view(), { wrapper: withTheme(radius) })
      expect(root()).toHaveStyle({ borderRadius: baseTheme.radii.sm })
    })
  })

  describe('theme', () => {
    it('takes its defaults from the theme, an own prop winning', () => {
      const theme = createTheme(baseTheme, {
        components: {
          Chip: {
            defaultProps: {
              variant: 'outlined',
              color: 'info',
              size: 'sm',
              deleteLabel: 'Remove it',
            },
          },
        },
      })
      const { unmount } = render(view({ onDelete: vi.fn() }), { wrapper: withTheme(theme) })
      expect(root()).toHaveStyle({ color: baseTheme.palette.info.main })
      expect(root()).not.toHaveStyle({ backgroundColor: baseTheme.palette.info.main })
      expect(screen.getByRole('button', { name: 'Remove it' })).toBeInTheDocument()
      unmount()
      render(
        view({ onDelete: vi.fn(), deleteLabel: 'Own', color: 'error', variant: 'contained' }),
        {
          wrapper: withTheme(theme),
        }
      )
      expect(screen.getByRole('button', { name: 'Own' })).toBeInTheDocument()
      expect(root()).toHaveStyle({ backgroundColor: baseTheme.palette.error.main })
    })

    it('styles each slot from styleOverrides', () => {
      const theme = createTheme(baseTheme, {
        components: {
          Chip: {
            styleOverrides: {
              root: { opacity: 0.9 },
              body: { opacity: 0.8 },
              label: { opacity: 0.7 },
              icon: { opacity: 0.6 },
              deleteIcon: { opacity: 0.5 },
            },
          },
        },
      })
      render(view({ icon: <i data-testid="icon" />, onDelete: vi.fn(), deleteLabel: 'Remove' }), {
        wrapper: withTheme(theme),
      })
      expect(root()).toHaveStyle({ opacity: '0.9' })
      expect(screen.getByText('Tag').parentElement).toHaveStyle({ opacity: '0.8' })
      expect(screen.getByText('Tag')).toHaveStyle({ opacity: '0.7' })
      expect(screen.getByTestId('icon').parentElement).toHaveStyle({ opacity: '0.6' })
      expect(screen.getByRole('button', { name: 'Remove' })).toHaveStyle({ opacity: '0.5' })
    })

    it('styles the avatar slot', () => {
      const theme = createTheme(baseTheme, {
        components: { Chip: { styleOverrides: { avatar: { opacity: 0.4 } } } },
      })
      render(view({ avatar: <b data-testid="avatar" /> }), { wrapper: withTheme(theme) })
      expect(screen.getByTestId('avatar').parentElement).toHaveStyle({ opacity: '0.4' })
    })
  })

  it('takes space props, a class name and a test id on its root', () => {
    renderWithTheme(view({ className: 'extra', m: 1 }))
    expect(root()).toHaveClass('extra')
    expect(root()).toHaveStyle({ margin: baseTheme.space[1] })
  })
})
