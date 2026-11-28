import { describe, expect, it } from 'vitest'
import { compareText } from './compareText'

describe('compareText', () => {
  it('orders by code unit: capitals before lower case, as sort() does by default', () => {
    expect(compareText('a', 'b')).toBe(-1)
    expect(compareText('b', 'a')).toBe(1)
    expect(compareText('a', 'a')).toBe(0)
    expect(['b', 'a', 'B', '@x'].sort(compareText)).toEqual(['B', '@x', 'a', 'b'].sort())
  })
})
