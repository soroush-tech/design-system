import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import * as root from './index'
import * as engine from './engine'
import * as style from './style'
import * as theme from './theme'
import { ThemeProvider, baseTheme, createTheme, styled, useTheme } from './index'

// An app with this package and no components: a styled element on the app's own tokens.
const Badge = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
  padding: theme.space[2],
}))

const brand = createTheme(baseTheme, { palette: { primary: { main: '#0a7a5a' } } })

describe('an app with the theme package and no components', () => {
  it('renders a themed, styled element on the client', () => {
    render(
      <ThemeProvider theme={brand}>
        <Badge data-testid="badge">hello</Badge>
      </ThemeProvider>
    )
    expect(screen.getByTestId('badge').className).toMatch(/^soroush-/)
    expect(screen.getByTestId('badge')).toHaveStyle({ color: '#0a7a5a' })
  })

  it('reads the theme in a hook of its own', () => {
    const Name = () => <i data-testid="name">{useTheme().name}</i>
    render(
      <ThemeProvider theme={brand}>
        <Name />
      </ThemeProvider>
    )
    expect(screen.getByTestId('name').textContent).toBe(brand.name)
  })
})

describe('the root entry', () => {
  it('holds every name of the other entries and the styling functions', () => {
    for (const entry of [theme, style, engine]) {
      for (const name of Object.keys(entry)) expect(root, name).toHaveProperty(name)
    }
    for (const name of ['styled', 'css', 'keyframes']) expect(root).toHaveProperty(name)
  })

  it('keeps the internal helpers of the core off the theme entry', () => {
    expect(theme).not.toHaveProperty('deepMerge')
    expect(theme).not.toHaveProperty('withHelpers')
  })
})
