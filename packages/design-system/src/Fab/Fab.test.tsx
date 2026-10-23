import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { ThemeProvider } from '../theme'
import { baseTheme, createTheme, type Theme } from '../theme/themes'
import { renderWithTheme } from '../utils/test/renderWithTheme'
import { Fab, type FabProps } from './Fab'

const withTheme = (theme: Theme) =>
  function Wrapper({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
  }

const fab = () => screen.getByTestId('fab')
const icon = <i data-testid="icon" />
const view = ({ children, ...props }: Partial<FabProps> = {}) => (
  <Fab data-testid="fab" aria-label="Add" {...props}>
    {children ?? icon}
  </Fab>
)

describe('Fab', () => {
  describe('circular', () => {
    it('is a round button of one side, named by its aria-label', () => {
      renderWithTheme(view())
      expect(screen.getByRole('button', { name: 'Add' })).toBe(fab())
      expect(fab()).toHaveStyle({
        borderRadius: '50%',
        width: baseTheme.avatar.md,
        height: baseTheme.avatar.md,
      })
      expect(screen.getByTestId('icon')).toBeInTheDocument()
    })

    it('leaves out the icon of an extended one', () => {
      renderWithTheme(
        <Fab data-testid="fab" aria-label="Add" startIcon={<b data-testid="start" />}>
          {icon}
        </Fab>
      )
      expect(screen.queryByTestId('start')).not.toBeInTheDocument()
    })

    it('can be named by aria-labelledby', () => {
      renderWithTheme(
        <>
          <span id="name">Create</span>
          <Fab aria-labelledby="name">{icon}</Fab>
        </>
      )
      expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument()
    })
  })

  describe('extended', () => {
    it('is a pill with its label and the icon before it', () => {
      renderWithTheme(
        <Fab data-testid="fab" variant="extended" startIcon={<b data-testid="start" />}>
          Create
        </Fab>
      )
      expect(screen.getByRole('button', { name: 'Create' })).toBe(fab())
      expect(fab()).toHaveStyle({ borderRadius: '9999px' })
      expect(fab()).toContainElement(screen.getByTestId('start'))
    })
  })

  describe('as a button', () => {
    it('presses, and does nothing while disabled', () => {
      const onClick = vi.fn()
      const { unmount } = renderWithTheme(view({ onClick }))
      fireEvent.click(fab())
      expect(onClick).toHaveBeenCalledTimes(1)
      unmount()
      renderWithTheme(view({ onClick, disabled: true }))
      expect(fab()).toBeDisabled()
      fireEvent.click(fab())
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('is raised on a shadow of the theme', () => {
      renderWithTheme(view())
      expect(fab()).toHaveStyle({ boxShadow: baseTheme.shadows[6] })
    })
  })

  describe('looks', () => {
    it('is filled with the primary color by default, and with the one it is given', () => {
      const { unmount } = renderWithTheme(view())
      expect(fab()).toHaveStyle({ backgroundColor: baseTheme.palette.primary.main })
      unmount()
      renderWithTheme(view({ color: 'secondary' }))
      expect(fab()).toHaveStyle({ backgroundColor: baseTheme.palette.secondary.main })
    })

    it('is as tall as an avatar of its size', () => {
      renderWithTheme(view({ size: 'lg' }))
      expect(fab()).toHaveStyle({ height: baseTheme.avatar.lg })
    })
  })

  describe('theme', () => {
    it('takes its defaults from the theme, an own prop winning', () => {
      const theme = createTheme(baseTheme, {
        components: {
          Fab: { defaultProps: { variant: 'extended', color: 'success', size: 'sm' } },
        },
      })
      const { unmount } = render(<Fab data-testid="fab">Create</Fab>, { wrapper: withTheme(theme) })
      expect(fab()).toHaveStyle({
        borderRadius: '9999px',
        backgroundColor: baseTheme.palette.success.main,
        height: baseTheme.avatar.sm,
      })
      unmount()
      render(
        <Fab data-testid="fab" aria-label="Add" variant="circular" color="error" size="lg">
          {icon}
        </Fab>,
        { wrapper: withTheme(theme) }
      )
      expect(fab()).toHaveStyle({
        borderRadius: '50%',
        backgroundColor: baseTheme.palette.error.main,
        height: baseTheme.avatar.lg,
      })
    })

    it('styles its root from styleOverrides', () => {
      const theme = createTheme(baseTheme, {
        components: { Fab: { styleOverrides: { root: { opacity: 0.9 } } } },
      })
      render(view(), { wrapper: withTheme(theme) })
      expect(fab()).toHaveStyle({ opacity: '0.9' })
    })
  })

  describe('motion', () => {
    it('moves its shadow and its colors over the theme duration, with its easing', () => {
      renderWithTheme(view())
      const { duration, easing } = baseTheme.transitions
      const transition = getComputedStyle(fab()).transition
      expect(transition).toContain(`box-shadow ${duration.standard}ms`)
      expect(transition).toContain(`background-color ${duration.standard}ms`)
      expect(transition).toContain(easing.standard)
    })

    it('rises on hover and is no higher pressed than at rest', () => {
      // The rules are on the stylesheet: the rest, hover and pressed shadows are theme shadows.
      renderWithTheme(view())
      const css = [...document.querySelectorAll('style')].map((node) => node.textContent).join('')
      expect(css).toContain(`:hover:not(:disabled){box-shadow:${baseTheme.shadows[8]}`)
      expect(css).toContain(`:active:not(:disabled){box-shadow:${baseTheme.shadows[6]}`)
    })

    it('takes its transition from a theme of its own', () => {
      const theme = createTheme(baseTheme, {
        transitions: { duration: { standard: 400 } },
      })
      render(view(), { wrapper: withTheme(theme) })
      expect(getComputedStyle(fab()).transition).toContain('box-shadow 400ms')
    })
  })

  describe('spacing', () => {
    it('takes margin and padding as theme space keys, winning over its own', () => {
      renderWithTheme(view({ variant: 'extended', children: 'Create', px: 5, m: 2, mt: 4 }))
      expect(fab()).toHaveStyle({
        paddingLeft: baseTheme.space[5],
        paddingRight: baseTheme.space[5],
        marginTop: baseTheme.space[4],
        marginLeft: baseTheme.space[2],
      })
    })

    it('has more room after the label than before the icon, and the icon one space step from it', () => {
      renderWithTheme(view({ variant: 'extended', children: 'Create', startIcon: icon }))
      expect(fab()).toHaveStyle({
        paddingLeft: baseTheme.space[2],
        paddingRight: baseTheme.space[3],
        gap: baseTheme.space[1.5],
      })
    })
  })

  describe('extended label', () => {
    it('is on one line, cut with an ellipsis', () => {
      renderWithTheme(view({ variant: 'extended', children: 'Create a project' }))
      expect(screen.getByText('Create a project')).toHaveStyle({
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      })
    })

    it('has a slot of its own in the theme', () => {
      const theme = createTheme(baseTheme, {
        components: { Fab: { styleOverrides: { label: { outlineColor: 'rgb(1, 2, 3)' } } } },
      })
      render(view({ variant: 'extended', children: 'Create' }), { wrapper: withTheme(theme) })
      expect(screen.getByText('Create')).toHaveStyle({ outlineColor: 'rgb(1, 2, 3)' })
    })

    it('is not wrapped on a circular fab, whose content is its own', () => {
      renderWithTheme(view())
      expect(fab().querySelector('[data-testid="icon"]')?.parentElement?.tagName).toBe('SPAN')
      expect(screen.getByTestId('icon').parentElement).not.toHaveStyle({ whiteSpace: 'nowrap' })
    })
  })

  it('takes a class name and a test id on its button', () => {
    renderWithTheme(view({ className: 'extra' }))
    expect(fab()).toHaveClass('extra')
  })
})
