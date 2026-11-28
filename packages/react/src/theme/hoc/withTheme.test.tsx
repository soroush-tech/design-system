import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '../ThemeProvider'
import { baseTheme } from '../themes'
import type { Theme } from '../themes'
import { withTheme } from './withTheme'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={baseTheme}>{children}</ThemeProvider>
)

describe('withTheme', () => {
  it('injects the current theme into the wrapped component', () => {
    function Base({ theme }: { theme: Theme }) {
      return <span data-testid="out">{theme.name}</span>
    }
    const Enhanced = withTheme(Base)
    render(wrapper({ children: <Enhanced /> }))
    expect(screen.getByTestId('out').textContent).toBe(baseTheme.name)
  })
})
