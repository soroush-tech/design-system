import { describe, it, expect } from 'vitest'
import { getNextRow } from './getNextRow'

const rows = (...labels: string[]) =>
  labels.map((label) => {
    const row = document.createElement('li')
    row.textContent = label.replace('!', '')
    if (label.endsWith('!')) row.setAttribute('aria-disabled', 'true')
    return row
  })

describe('getNextRow', () => {
  const [a, b, c, d] = rows('a', 'b!', 'c', 'd')

  it('moves to the next and previous enabled row, skipping disabled ones', () => {
    expect(getNextRow([a, b, c, d], a, 'next', true)).toBe(c)
    expect(getNextRow([a, b, c, d], c, 'previous', true)).toBe(a)
  })

  it('wraps past either end when shouldWrap', () => {
    expect(getNextRow([a, b, c, d], d, 'next', true)).toBe(a)
    expect(getNextRow([a, b, c, d], a, 'previous', true)).toBe(d)
  })

  it('stays put at either end without shouldWrap', () => {
    expect(getNextRow([a, b, c, d], d, 'next', false)).toBeUndefined()
    expect(getNextRow([a, b, c, d], a, 'previous', false)).toBeUndefined()
  })

  it('goes to the first and last enabled row', () => {
    const [x, y, z] = rows('x!', 'y', 'z!')
    expect(getNextRow([x, y, z], null, 'first', true)).toBe(y)
    expect(getNextRow([x, y, z], null, 'last', true)).toBe(y)
  })

  it('starts at either end when focus is not on a row', () => {
    expect(getNextRow([a, b, c, d], null, 'next', true)).toBe(a)
    expect(getNextRow([a, b, c, d], b, 'previous', true)).toBe(d)
  })
})
