import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import { ThemeProvider } from '../../theme'
import { baseTheme, createTheme, type Theme } from '../../theme/themes'
import { renderWithTheme } from '../../utils/test/renderWithTheme'
import { AlertTitle } from './AlertTitle'

const withTheme = (theme: Theme) =>
  function Wrapper({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
  }

describe('AlertTitle', () => {
  it('says its title in a heavier weight, with a class name and a test id', () => {
    renderWithTheme(
      <AlertTitle className="extra" data-testid="title">
        Saved
      </AlertTitle>
    )
    const title = screen.getByTestId('title')
    expect(title).toHaveTextContent('Saved')
    expect(title).toHaveClass('extra')
    expect(title).toHaveStyle({ fontWeight: String(baseTheme.fontWeights.semiBold) })
  })

  it('styles its root from styleOverrides', () => {
    const theme = createTheme(baseTheme, {
      components: { AlertTitle: { styleOverrides: { root: { opacity: 0.9 } } } },
    })
    render(<AlertTitle data-testid="title">Saved</AlertTitle>, { wrapper: withTheme(theme) })
    expect(screen.getByTestId('title')).toHaveStyle({ opacity: '0.9' })
  })
})
