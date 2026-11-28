import { describe, it, expect } from 'vitest'
import { baseTheme } from '../../theme/themes'
import { themeWith } from './themeWith'

describe('themeWith', () => {
  it('sets the components on the base theme', () => {
    const components = { Button: { defaultProps: { size: 'sm' } } } as const
    const theme = themeWith(components)
    expect(theme.components).toBe(components)
    expect(theme.palette).toEqual(baseTheme.palette)
  })

  it('applies token overrides', () => {
    const theme = themeWith({}, { name: 'brand' })
    expect(theme.name).toBe('brand')
  })
})
