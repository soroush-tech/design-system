import { getAcceptedReturns, getCommonType, fitsSlot } from './slots'

const common = (name: string) => ({ $ref: `common_types.json#/$defs/${name}` })

describe('getCommonType', () => {
  it('names the common type a schema points at', () => {
    expect(getCommonType(common('ChildList'))).toBe('ChildList')
  })

  it('answers nothing for a local reference or none', () => {
    expect(getCommonType({ $ref: '#/components/Box' })).toBeUndefined()
    expect(getCommonType({ type: 'string' })).toBeUndefined()
  })
})

describe('getAcceptedReturns', () => {
  it('reads what each dynamic type must be filled with', () => {
    expect(getAcceptedReturns(common('DynamicString'))).toEqual(new Set(['string']))
    expect(getAcceptedReturns(common('DynamicNumber'))).toEqual(new Set(['number']))
    expect(getAcceptedReturns(common('DynamicBoolean'))).toEqual(new Set(['boolean']))
    expect(getAcceptedReturns(common('DynamicStringList'))).toEqual(new Set(['array']))
  })

  it('takes anything where the slot is a dynamic value, or a type that says nothing', () => {
    expect(getAcceptedReturns(common('DynamicValue'))).toBeUndefined()
    expect(getAcceptedReturns(common('Child'))).toBeUndefined()
    expect(getAcceptedReturns({})).toBeUndefined()
  })

  it('reads the literal branch of a generated prop, past the two ways to be dynamic', () => {
    const prop = { anyOf: [{ enum: ['sm', 'md'] }, common('DataBinding'), common('FunctionCall')] }

    expect(getAcceptedReturns(prop)).toEqual(new Set(['string']))
  })

  it('joins the branches of a union, either keyword', () => {
    const responsive = { oneOf: [{ enum: [0, 1] }, { type: 'array' }, 'not a schema'] }

    expect(getAcceptedReturns(responsive)).toEqual(new Set(['number', 'array']))
  })

  it('takes anything when a branch does, or when no branch is a literal', () => {
    expect(
      getAcceptedReturns({ anyOf: [{ type: 'string' }, common('DynamicValue')] })
    ).toBeUndefined()
    expect(
      getAcceptedReturns({ anyOf: [common('DataBinding'), common('FunctionCall')] })
    ).toBeUndefined()
  })

  it('reads an enumeration and a constant by their values', () => {
    expect(getAcceptedReturns({ enum: ['a', 1, true, ['x']] })).toEqual(
      new Set(['string', 'number', 'boolean', 'array'])
    )
    expect(getAcceptedReturns({ const: 'fixed' })).toEqual(new Set(['string']))
  })

  it('reads a declared type, counting an integer as a number and skipping null', () => {
    expect(getAcceptedReturns({ type: 'integer' })).toEqual(new Set(['number']))
    expect(getAcceptedReturns({ type: ['string', 'null', 'object'] })).toEqual(
      new Set(['string', 'object'])
    )
  })
})

describe('fitsSlot', () => {
  it('fits a matching type, any type into an open slot, and `any` into every slot', () => {
    expect(fitsSlot('string', new Set(['string']))).toBe(true)
    expect(fitsSlot('number', undefined)).toBe(true)
    expect(fitsSlot('any', new Set(['string']))).toBe(true)
  })

  it('does not fit a different type, and never a function that returns nothing', () => {
    expect(fitsSlot('number', new Set(['string']))).toBe(false)
    expect(fitsSlot('void', undefined)).toBe(false)
  })
})
