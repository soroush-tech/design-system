import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import * as root from './index'
import * as engine from './engine'
import { ThemeProvider } from './theme/ThemeProvider'
import { baseTheme } from './theme/themes'
import { createTheme } from '@soroush.design/core/theme'
import { styled } from './style/styled'
import { useTheme } from './theme/hooks/useTheme'

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
  it('holds the provider, the hooks and the styling functions, and nothing of the core', () => {
    expect(Object.keys(root).sort()).toEqual(
      [
        'Global',
        'LayoutProvider',
        'StylesConsumer',
        'ThemeProvider',
        'css',
        'keyframes',
        'registerBaseTheme',
        'styled',
        'useDefaultProps',
        'useMediaQuery',
        'useStyle',
        'useTheme',
        'withStyles',
        'withTheme',
      ].sort()
    )
  })

  it('keeps the engine escape hatches on their own entry', () => {
    for (const name of Object.keys(engine)) expect(root).not.toHaveProperty(name)
  })
})
