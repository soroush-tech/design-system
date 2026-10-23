import { describe, it, expect } from 'vitest'
import { baseTheme, createTheme } from '../theme/themes'
import { getSurfaceRadius } from './getSurfaceRadius'

describe('getSurfaceRadius', () => {
  it('is square by default, the theme surface radius, and a radius asked for first', () => {
    expect(getSurfaceRadius(baseTheme)).toBe(baseTheme.radii.sq)
    const rounded = createTheme(baseTheme, { defaults: { surfaceRadius: 'md' } })
    expect(getSurfaceRadius(rounded)).toBe(baseTheme.radii.md)
    expect(getSurfaceRadius(rounded, 'lg')).toBe(baseTheme.radii.lg)
  })
})
