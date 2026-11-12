import { describe, it, expect } from 'vitest'
import { toPx } from './toPx'

describe('toPx', () => {
  it('resolves rem against the 16px root, whatever font size it is given', () => {
    expect(toPx('1.5rem')).toBe('24px')
    expect(toPx('0.875rem', '20px')).toBe('14px')
  })

  it('resolves em and a unitless number against the font size', () => {
    expect(toPx('-0.025em')).toBe('-0.4px')
    expect(toPx('-0.05em', '14px')).toBe('-0.7px')
    expect(toPx(1.35, '14px')).toBe('18.9px')
    expect(toPx('0em')).toBe('0px')
  })

  it('returns any other value as it is', () => {
    expect(toPx('20px')).toBe('20px')
    expect(toPx('50%')).toBe('50%')
    expect(toPx('auto')).toBe('auto')
  })
})
