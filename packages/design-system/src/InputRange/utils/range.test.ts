import { describe, it, expect } from 'vitest'
import {
  areValuesEqual,
  findClosest,
  fractionToValue,
  getKeyValue,
  getMarks,
  getValueAtPoint,
  isRangeKey,
  moveThumb,
  normalizeValues,
  valueToPercent,
  type KeyParams,
} from './range'

describe('valueToPercent and fractionToValue', () => {
  it('map a value along the range, and back', () => {
    expect(valueToPercent(25, 0, 100)).toBe(25)
    expect(valueToPercent(5, 0, 20)).toBe(25)
    expect(valueToPercent(-5, -10, 10)).toBe(25)
    expect(fractionToValue(0.25, 0, 100)).toBe(25)
    expect(fractionToValue(0.5, -10, 10)).toBe(0)
  })

  it('put a range with no length at its start', () => {
    expect(valueToPercent(5, 5, 5)).toBe(0)
  })
})

describe('normalizeValues', () => {
  it('clamps a number to the range, into a list of one', () => {
    expect(normalizeValues(150, 0, 100)).toEqual([100])
    expect(normalizeValues(-5, 0, 100)).toEqual([0])
  })

  it('sorts and clamps a list, whatever order it was given in', () => {
    expect(normalizeValues([80, 20, 120], 0, 100)).toEqual([20, 80, 100])
  })
})

describe('getMarks', () => {
  it('has one at every step for true, counted from the least', () => {
    expect(getMarks(true, 25, 0, 100).map((mark) => mark.value)).toEqual([0, 25, 50, 75, 100])
    expect(getMarks(true, 0.1, 0, 0.3).map((mark) => mark.value)).toEqual([0, 0.1, 0.2, 0.3])
  })

  it('has the marks it is given, and none otherwise', () => {
    const given = [{ value: 10, label: 'ten' }]
    expect(getMarks(given, null, 0, 100)).toBe(given)
    expect(getMarks(false, 1, 0, 100)).toEqual([])
    expect(getMarks(undefined, 1, 0, 100)).toEqual([])
    // True with no step has no step to mark.
    expect(getMarks(true, null, 0, 100)).toEqual([])
  })
})

describe('findClosest', () => {
  it('is the index of the nearest value, the later one on a tie', () => {
    expect(findClosest([10, 50, 90], 40)).toBe(1)
    expect(findClosest([10, 50, 90], 70)).toBe(2)
    expect(findClosest([10, 30], 20)).toBe(1)
  })

  it('prefers a place when it holds the nearest value', () => {
    expect(findClosest([30, 30, 80], 30, 0)).toBe(0)
    expect(findClosest([30, 30, 80], 30)).toBe(1)
    expect(findClosest([30, 40, 80], 31, 2)).toBe(0)
  })
})

describe('moveThumb', () => {
  it('moves a thumb, keeping the values sorted and following the thumb past a neighbour', () => {
    expect(moveThumb([20, 60], 0, 40, true)).toEqual({ values: [40, 60], index: 0 })
    expect(moveThumb([20, 60], 0, 80, true)).toEqual({ values: [60, 80], index: 1 })
  })

  it('stops a thumb at its neighbours without swapping', () => {
    expect(moveThumb([20, 60], 0, 80, false)).toEqual({ values: [60, 60], index: 0 })
    expect(moveThumb([20, 60], 1, 5, false)).toEqual({ values: [20, 20], index: 1 })
    expect(moveThumb([0, 60], 1, -5, false)).toEqual({ values: [0, 0], index: 1 })
    expect(moveThumb([40], 0, 90, false)).toEqual({ values: [90], index: 0 })
  })
})

describe('areValuesEqual', () => {
  it('compares each place', () => {
    expect(areValuesEqual([1, 2], [1, 2])).toBe(true)
    expect(areValuesEqual([1, 2], [1, 3])).toBe(false)
    expect(areValuesEqual([1], [1, 2])).toBe(false)
  })
})

describe('getKeyValue', () => {
  const base: KeyParams = {
    key: 'ArrowUp',
    shiftKey: false,
    value: 50,
    step: 5,
    shiftStep: 20,
    min: 0,
    max: 100,
    isRtl: false,
    marks: [],
  }
  const at = (params: Partial<KeyParams>) => getKeyValue({ ...base, ...params })

  it.each([
    ['ArrowUp', false, 55],
    ['ArrowDown', false, 45],
    ['ArrowRight', false, 55],
    ['ArrowLeft', false, 45],
    ['ArrowRight', true, 45],
    ['ArrowLeft', true, 55],
    ['ArrowUp', true, 55],
    ['ArrowDown', true, 45],
  ])('%s, right to left %s, goes to %s', (key, isRtl, expected) => {
    expect(at({ key, isRtl })).toBe(expected)
  })

  it('steps by the large step with Shift, and the page keys always do', () => {
    expect(at({ key: 'ArrowUp', shiftKey: true })).toBe(70)
    expect(at({ key: 'ArrowDown', shiftKey: true })).toBe(30)
    expect(at({ key: 'PageUp' })).toBe(70)
    expect(at({ key: 'PageDown' })).toBe(30)
  })

  it('goes to the ends with Home and End, and stops at them', () => {
    expect(at({ key: 'Home' })).toBe(0)
    expect(at({ key: 'End' })).toBe(100)
    expect(at({ key: 'ArrowUp', value: 98 })).toBe(100)
    expect(at({ key: 'ArrowDown', value: 2 })).toBe(0)
  })

  it('adds without float noise', () => {
    expect(at({ key: 'ArrowUp', value: 0.1, step: 0.2, max: 1 })).toBe(0.3)
  })

  it('moves nothing for a key it does not take', () => {
    expect(at({ key: 'a' })).toBeNull()
    expect(isRangeKey('a')).toBe(false)
    expect(isRangeKey('Home')).toBe(true)
  })

  describe('with no step, from mark to mark', () => {
    const marks = [{ value: 0 }, { value: 20 }, { value: 70 }, { value: 100 }]
    const goto = (key: string, value: number, isRtl = false) =>
      getKeyValue({ ...base, step: null, marks, key, value, isRtl })

    it.each([
      ['ArrowRight', 20, 70],
      ['ArrowUp', 20, 70],
      ['PageUp', 20, 70],
      ['ArrowLeft', 20, 0],
      ['ArrowDown', 20, 0],
      ['PageDown', 70, 20],
    ])('%s from %s goes to the mark %s', (key, value, expected) => {
      expect(goto(key, value)).toBe(expected)
    })

    it('goes the other way right to left, and stops at the last marks', () => {
      expect(goto('ArrowLeft', 20, true)).toBe(70)
      expect(goto('ArrowRight', 20, true)).toBe(0)
      expect(goto('ArrowUp', 100)).toBe(100)
      expect(goto('ArrowDown', 0)).toBe(0)
    })

    it('goes to the first and last mark with Home and End', () => {
      expect(goto('Home', 70)).toBe(0)
      expect(goto('End', 20)).toBe(100)
    })

    it('goes to the nearest mark from a value between marks, and has none to go to without any', () => {
      expect(goto('ArrowUp', 30)).toBe(70)
      expect(goto('ArrowDown', 30)).toBe(20)
      expect(getKeyValue({ ...base, step: null, marks: [] })).toBeNull()
    })
  })
})

describe('getValueAtPoint', () => {
  const rect = { left: 100, bottom: 300, width: 200, height: 200 }
  const at = (x: number, y: number, more: object = {}) =>
    getValueAtPoint({
      x,
      y,
      rect,
      orientation: 'horizontal',
      isRtl: false,
      min: 0,
      max: 100,
      step: 1,
      marks: [],
      ...more,
    })

  it('is the value along the box, rounded to the step', () => {
    expect(at(200, 0)).toBe(50)
    expect(at(101, 0)).toBe(1)
    expect(at(250, 0, { step: 10 })).toBe(80)
  })

  it('counts from the right right to left', () => {
    expect(at(120, 0, { isRtl: true })).toBe(90)
  })

  it('counts up from the bottom when vertical, whatever the direction', () => {
    expect(at(0, 100, { orientation: 'vertical' })).toBe(100)
    expect(at(0, 300, { orientation: 'vertical', isRtl: true })).toBe(0)
    expect(at(0, 200, { orientation: 'vertical' })).toBe(50)
  })

  it('stays inside the range', () => {
    expect(at(-500, 0)).toBe(0)
    expect(at(900, 0)).toBe(100)
  })

  it('snaps to the nearest mark with no step', () => {
    const marks = [{ value: 0 }, { value: 30 }, { value: 100 }]
    expect(at(190, 0, { step: null, marks })).toBe(30)
    expect(at(290, 0, { step: null, marks })).toBe(100)
  })

  it('is the plain value with no step and no marks', () => {
    expect(at(150.5, 0, { step: null })).toBe(25.25)
  })

  it('has no value for a box with no size', () => {
    expect(at(150, 0, { rect: { ...rect, width: 0 } })).toBeNull()
    expect(at(0, 150, { rect: { ...rect, height: 0 }, orientation: 'vertical' })).toBeNull()
  })
})
