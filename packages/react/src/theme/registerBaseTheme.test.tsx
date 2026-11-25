// @vitest-environment node
import { renderToString } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { createTheme, defineThemes } from '@soroush.design/core/theme'
import { styled } from '../style/styled'
import { baseTheme } from './themes'
import { useDefaultProps } from './hooks/useDefaultProps'
import { useTheme } from './hooks/useTheme'
import { registerBaseTheme } from './registerBaseTheme'

const Card = styled('div', { name: 'Card' })({ padding: 4 })

const Probe = () => {
  const theme = useTheme()
  return <i data-defaults={theme.defaults?.size}>{String(useDefaultProps('Card').size)}</i>
}

const themes = defineThemes(
  { light: createTheme(baseTheme, { defaults: { size: 'lg' } }) },
  { Card: { defaultProps: { size: 'xl' }, styleOverrides: { root: { margin: 7 } } } }
)

describe('registerBaseTheme', () => {
  it('gives what has no provider above it the app theme: its components and its defaults', () => {
    registerBaseTheme(themes.light)
    const html = renderToString(
      <Card>
        <Probe />
      </Card>
    )
    expect(html).toContain('data-defaults="lg"')
    expect(html).toContain('>xl</i>')
    expect(html).toMatch(/<div class="soroush-[a-z0-9-]+"/)
  })
})
