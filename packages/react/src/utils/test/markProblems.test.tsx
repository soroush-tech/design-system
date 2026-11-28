import { describe, it, expect } from 'vitest'
import { View } from '../../View'
import { renderWithTheme } from './renderWithTheme'
import { mark } from './slotMark'
import { markProblems } from './markProblems'

describe('markProblems', () => {
  it('is empty for an element that has the class, the attribute and the entry of the mark', () => {
    renderWithTheme(<View {...mark('a')} />)
    expect(markProblems('a')).toEqual([])
  })

  it('says that no element is marked when there is none', () => {
    renderWithTheme(<i />)
    expect(markProblems('a')).toEqual(['no element is marked a'])
  })

  it('names each part the marked element lacks', () => {
    renderWithTheme(<i data-mark="b" />)
    expect(markProblems('b')).toEqual([
      'b lacks its class',
      'b lacks its attribute',
      'b lacks its entry',
    ])
  })

  it('looks in the container it is given', () => {
    const { container } = renderWithTheme(<i data-mark="c" />)
    expect(markProblems('c', container)).toHaveLength(3)
    expect(markProblems('c', document.createElement('div'))).toEqual(['no element is marked c'])
  })
})
