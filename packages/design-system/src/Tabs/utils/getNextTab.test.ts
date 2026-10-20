import { describe, it, expect } from 'vitest'
import { getNextTab, isTabEnabled } from './getNextTab'

const tabs = (...labels: string[]) =>
  labels.map((label) => {
    const tab = document.createElement('button')
    if (label.endsWith('!')) tab.setAttribute('aria-disabled', 'true')
    return tab
  })

describe('getNextTab', () => {
  const [a, b, c] = tabs('a', 'b!', 'c')

  it('moves to the next and previous enabled tab, coming round at the ends', () => {
    expect(getNextTab([a, b, c], a, 'next')).toBe(c)
    expect(getNextTab([a, b, c], c, 'next')).toBe(a)
    expect(getNextTab([a, b, c], a, 'previous')).toBe(c)
    expect(getNextTab([a, b, c], c, 'previous')).toBe(a)
  })

  it('goes to the first and last enabled tab', () => {
    const [x, y, z] = tabs('x!', 'y', 'z!')
    expect(getNextTab([x, y, z], null, 'first')).toBe(y)
    expect(getNextTab([x, y, z], null, 'last')).toBe(y)
  })

  it('starts at either end when focus is not on an enabled tab', () => {
    expect(getNextTab([a, b, c], b, 'next')).toBe(a)
    expect(getNextTab([a, b, c], null, 'previous')).toBe(c)
  })

  it('reads aria-disabled', () => {
    expect(isTabEnabled(a)).toBe(true)
    expect(isTabEnabled(b)).toBe(false)
  })
})
