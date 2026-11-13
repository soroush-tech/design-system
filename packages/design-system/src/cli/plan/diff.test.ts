// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { diffLines } from './diff'

describe('diffLines', () => {
  it('marks removed lines before the added lines that replace them', () => {
    expect(diffLines('a\nb\nc', 'a\nB\nc')).toEqual(['  a', '- b', '+ B', '  c'])
  })

  it('shows added lines at the start and the end', () => {
    expect(diffLines('b', 'a\nb\nc')).toEqual(['+ a', '  b', '+ c'])
    expect(diffLines('a\nb', 'b')).toEqual(['- a', '  b'])
  })

  it('leaves out unchanged lines far from a change, once per run', () => {
    const before = ['1', '2', '3', '4', '5', '6', '7', '8', '9'].join('\n')
    const after = ['1', '2', '3', '4', 'five', '6', '7', '8', '9'].join('\n')
    expect(diffLines(before, after, 1)).toEqual(['  ...', '  4', '- 5', '+ five', '  6', '  ...'])
  })

  it('trims the trailing space of an empty unchanged line', () => {
    expect(diffLines('a\n', 'b\n')).toEqual(['- a', '+ b', ''])
  })
})
