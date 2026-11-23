import { describe, expect, it } from 'vitest'
import { withBreakpointHelpers } from './withBreakpointHelpers'

describe('withBreakpointHelpers', () => {
  it('attaches the helpers without adding keys to the scale', () => {
    const scale = withBreakpointHelpers({ xs: '0px', sm: '600px' })
    expect(Object.keys(scale)).toEqual(['xs', 'sm'])
    expect(JSON.stringify(scale)).toBe('{"xs":"0px","sm":"600px"}')
    expect(scale.up('sm')).toBe('@media (width >= 600px)')
    expect(scale.containerQueries('aside').down('sm')).toBe('@container aside (width < 600px)')
  })
})
