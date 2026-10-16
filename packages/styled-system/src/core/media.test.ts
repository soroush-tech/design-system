import { describe, expect, it } from 'vitest'
import { breakpointQueries, createMediaQuery } from './media'

describe('createMediaQuery', () => {
  it('keeps a plain length as a min-width query, byte for byte', () => {
    expect(createMediaQuery('40em')).toBe('@media screen and (min-width: 40em)')
    expect(createMediaQuery('.5rem')).toBe('@media screen and (min-width: .5rem)')
    expect(createMediaQuery('calc(600px + 2em)')).toBe(
      '@media screen and (min-width: calc(600px + 2em))'
    )
  })

  it('gives a number px', () => {
    expect(createMediaQuery(768)).toBe('@media screen and (min-width: 768px)')
  })

  it('passes a media condition, range or media type through', () => {
    expect(createMediaQuery('(600px <= width < 1200px)')).toBe('@media (600px <= width < 1200px)')
    expect(createMediaQuery('(orientation: landscape)')).toBe('@media (orientation: landscape)')
    expect(createMediaQuery('not (hover: hover)')).toBe('@media not (hover: hover)')
    expect(createMediaQuery('print')).toBe('@media print')
  })

  it('uses a full @media rule as written', () => {
    expect(createMediaQuery('@media screen and (max-width: 20em)')).toBe(
      '@media screen and (max-width: 20em)'
    )
  })
})

describe('breakpointQueries', () => {
  it('lists named breakpoints in declared order', () => {
    expect(breakpointQueries({ tablet: '37.5em', web: '(min-width: 75em)' })).toEqual([
      ['tablet', '@media screen and (min-width: 37.5em)'],
      ['web', '@media (min-width: 75em)'],
    ])
  })

  it('keys an array by index', () => {
    expect(breakpointQueries(['40em'])).toEqual([['0', '@media screen and (min-width: 40em)']])
  })
})
