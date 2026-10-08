import { getOwn, isObject, setOwn } from './types'

describe('isObject', () => {
  it('is true for a plain object only', () => {
    expect(isObject({})).toBe(true)
    expect(isObject([])).toBe(false)
    expect(isObject(null)).toBe(false)
    expect(isObject('text')).toBe(false)
  })
})

describe('getOwn', () => {
  it('reads a key the object has', () => {
    expect(getOwn({ size: 'sm' }, 'size')).toBe('sm')
  })

  it('does not read what the object only inherits', () => {
    expect(getOwn({}, 'toString')).toBeUndefined()
    expect(getOwn({}, 'constructor')).toBeUndefined()
    expect(getOwn({}, '__proto__')).toBeUndefined()
  })

  it('reads a key spelled `__proto__` when the object has one', () => {
    // What `JSON.parse` makes of that key: a key, not a prototype.
    expect(getOwn(JSON.parse('{ "__proto__": 1 }'), '__proto__')).toBe(1)
  })

  it('answers nothing for an object that is not there', () => {
    expect(getOwn(undefined, 'size')).toBeUndefined()
  })
})

describe('setOwn', () => {
  it('writes a key that reads, lists and deletes like any other', () => {
    const object: Record<string, unknown> = {}

    setOwn(object, 'size', 'sm')
    setOwn(object, 'size', 'md')

    expect(object).toEqual({ size: 'md' })
    expect(Object.keys(object)).toEqual(['size'])
    expect(delete object.size).toBe(true)
  })

  it('writes `__proto__` as a key, leaving the prototype alone', () => {
    const object = {}

    setOwn(object, '__proto__', { polluted: true })

    expect(Object.getPrototypeOf(object)).toBe(Object.prototype)
    expect(Object.hasOwn(object, '__proto__')).toBe(true)
    expect(({} as Record<string, unknown>).polluted).toBeUndefined()
  })
})
