import { describe, expect, it } from 'vitest'
import { withBreakpointHelpers } from './breakpoints'
import { baseTheme, between, containerQueries, down, not, only, up } from './themes'

describe('withBreakpointHelpers', () => {
  it('attaches the helpers without adding keys to the scale', () => {
    const scale = withBreakpointHelpers({ xs: '0px', sm: '600px' })
    expect(Object.keys(scale)).toEqual(['xs', 'sm'])
    expect(JSON.stringify(scale)).toBe('{"xs":"0px","sm":"600px"}')
    expect(scale.up('sm')).toBe('@media (width >= 600px)')
    expect(scale.containerQueries('aside').down('sm')).toBe('@container aside (width < 600px)')
  })
})

describe("baseTheme's breakpoints", () => {
  it('are the Material window classes, each the start of its range', () => {
    expect({ ...baseTheme.breakpoints }).toEqual({
      xs: '0px',
      sm: '600px',
      md: '840px',
      lg: '1200px',
      xl: '1600px',
    })
  })

  it('carry the query helpers, also exported as plain functions', () => {
    expect(baseTheme.breakpoints.only('md')).toBe('@media (840px <= width < 1200px)')
    expect(up('md')).toBe('@media (width >= 840px)')
    expect(down('sm')).toBe('@media (width < 600px)')
    expect(only('xs')).toBe('@media (width < 600px)')
    expect(between('sm', 'lg')).toBe('@media (600px <= width < 1200px)')
    expect(not('md')).toBe('@media (width < 840px), (width >= 1200px)')
    expect(containerQueries.up('sm')).toBe('@container (width >= 600px)')
  })
})
