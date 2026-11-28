import { describe, it, expect } from 'vitest'
import { toRgb } from './toRgb'

describe('toRgb', () => {
  it('writes a six-digit hex color the way a computed style does', () => {
    expect(toRgb('#ffd930')).toBe('rgb(255, 217, 48)')
    expect(toRgb('#009928')).toBe('rgb(0, 153, 40)')
  })
})
