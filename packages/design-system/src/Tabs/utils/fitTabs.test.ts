import { describe, it, expect } from 'vitest'
import { fitTabs } from './fitTabs'

// Four tabs, 100px each.
const values = ['a', 'b', 'c', 'd']
const sizes = new Map(values.map((value) => [value, 100]))

describe('fitTabs', () => {
  it('keeps the tabs that fit whole, in order, and lists the rest', () => {
    expect(fitTabs(values, 'a', sizes, 250, 0)).toEqual(['c', 'd'])
    expect(fitTabs(values, 'a', sizes, 400, 0)).toEqual([])
  })

  it('counts the gap between tabs', () => {
    expect(fitTabs(values, 'a', sizes, 300, 10)).toEqual(['c', 'd'])
  })

  it('takes the selected tab first, wherever it sits', () => {
    expect(fitTabs(values, 'd', sizes, 250, 0)).toEqual(['b', 'c'])
  })

  it('ends the row at the first tab that does not fit, so a later short one waits too', () => {
    const uneven = new Map([...sizes, ['b', 300], ['c', 20]])
    expect(fitTabs(values, 'a', uneven, 250, 0)).toEqual(['b', 'c', 'd'])
  })

  it('draws the selected tab even when it alone is larger than the room', () => {
    expect(fitTabs(values, 'b', sizes, 50, 0)).toEqual(['a', 'c', 'd'])
  })

  it('fits with nothing selected, or a selection not among the tabs', () => {
    expect(fitTabs(values, null, sizes, 250, 0)).toEqual(['c', 'd'])
    expect(fitTabs(values, 'x', sizes, 250, 0)).toEqual(['c', 'd'])
  })

  it('counts a tab not measured yet as nothing, so it is drawn and measured', () => {
    expect(fitTabs(['a', 'new'], 'a', sizes, 100, 0)).toEqual([])
  })

  it('lists nothing while no room is measured', () => {
    expect(fitTabs(values, 'a', sizes, 0, 0)).toEqual([])
  })
})
