// @vitest-environment node
import { renderToString } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { ThemeProvider } from './theme/ThemeProvider'
import { baseTheme } from './theme/themes'
import { createTheme } from '@gild-ui/core/theme'
import { styled } from './style/styled'

const Badge = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
  padding: theme.space[2],
}))

const brand = createTheme(baseTheme, { palette: { primary: { main: '#0a7a5a' } } })

describe('an app with the theme package and no components, on the server', () => {
  it('renders a themed, styled element with the theme variables and the soroush class prefix', () => {
    const html = renderToString(
      <ThemeProvider theme={brand}>
        <Badge>hello</Badge>
      </ThemeProvider>
    )
    expect(html).toMatch(/<span class="soroush-[a-z0-9]+">hello<\/span>/)
    expect(html).toContain('--soroush-')
    expect(html).toContain('#0a7a5a')
  })
})
