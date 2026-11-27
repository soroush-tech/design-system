// @vitest-environment node
import { getEngine } from '@umber-style/react'
import { renderToString } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { createTheme } from '@gild-ui/core/theme'
import { styled } from '../style/styled'
import { baseTheme } from './themes'
import { useTheme } from './hooks/useTheme'
import { registerBaseTheme } from './registerBaseTheme'

const Probe = () => {
  const theme = useTheme()
  return (
    <i data-h3={theme.typography.h3.element} data-defaults={theme.defaults?.size}>
      {theme.typography.h3.element}
    </i>
  )
}
const Card = styled('div', { name: 'Card' })({ padding: 4 })
const render = () =>
  renderToString(
    <Card>
      <Probe />
    </Card>
  )

describe('the base theme of the engine', () => {
  it('is the built-in theme when an app registers none, so nothing without a provider is empty', () => {
    expect(render()).toContain('data-h3="h3"')
    expect(getEngine().givenTheme).toBe(baseTheme)
  })

  it('is replaced by the theme an app registers', () => {
    const own = createTheme(baseTheme, { defaults: { size: 'lg' } })
    registerBaseTheme(own)
    expect(getEngine().givenTheme).toBe(own)
    expect(render()).toContain('data-defaults="lg"')
  })
})
