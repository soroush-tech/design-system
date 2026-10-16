import { describe, expect, it } from 'vitest'
import {
  breakpointQueries,
  containerKey,
  createContainerQueries,
  createMediaHelpers,
  createMediaQuery,
  responsiveQueries,
} from './media'

const breakpoints = { xs: '0px', sm: '600px', md: '840px', lg: '1200px', xl: '1600px' }

describe('createMediaQuery', () => {
  it('writes a length as a range from that width up', () => {
    expect(createMediaQuery('40em')).toBe('@media (width >= 40em)')
    expect(createMediaQuery('calc(600px + 2em)')).toBe('@media (width >= calc(600px + 2em))')
    expect(createMediaQuery(768)).toBe('@media (width >= 768px)')
  })

  it('gives a breakpoint that starts at 0 no query - it is the base', () => {
    expect(createMediaQuery(0)).toBeNull()
    expect(createMediaQuery('0px')).toBeNull()
    expect(createMediaQuery('0')).toBeNull()
  })

  it('passes a media condition, media type or full rule through', () => {
    expect(createMediaQuery('(orientation: landscape)')).toBe('@media (orientation: landscape)')
    expect(createMediaQuery('print')).toBe('@media print')
    expect(createMediaQuery('@media (hover: hover)')).toBe('@media (hover: hover)')
  })
})

describe('breakpointQueries', () => {
  it('lists the queries in declared order, the base as null', () => {
    expect(breakpointQueries({ xs: 0, sm: '600px' })).toEqual([
      ['xs', null],
      ['sm', '@media (width >= 600px)'],
    ])
    expect(breakpointQueries(['40em'])).toEqual([['0', '@media (width >= 40em)']])
  })
})

describe('createMediaHelpers', () => {
  const { up, down, only, between, not } = createMediaHelpers(breakpoints)

  it('writes up, down and between by name or width', () => {
    expect(up('md')).toBe('@media (width >= 840px)')
    expect(up(500)).toBe('@media (width >= 500px)')
    expect(up('30em')).toBe('@media (width >= 30em)')
    expect(down('md')).toBe('@media (width < 840px)')
    expect(between('sm', 'lg')).toBe('@media (600px <= width < 1200px)')
    expect(between('xs', 'md')).toBe('@media (width < 840px)')
  })

  it('writes only as the range up to the next breakpoint, open-ended for the last', () => {
    expect(only('xs')).toBe('@media (width < 600px)')
    expect(only('md')).toBe('@media (840px <= width < 1200px)')
    expect(only('xl')).toBe('@media (width >= 1600px)')
  })

  it('writes not as the complement of only', () => {
    expect(not('xs')).toBe('@media (width >= 600px)')
    expect(not('md')).toBe('@media (width < 840px), (width >= 1200px)')
    expect(not('xl')).toBe('@media (width < 1600px)')
    expect(createMediaHelpers({ base: 0 }).not('base')).toBe('@media not all')
  })

  it('rejects an unknown breakpoint and one that is not a width', () => {
    expect(() => up('huge')).toThrow('Unknown breakpoint "huge"')
    expect(() => only('huge')).toThrow('Unknown breakpoint "huge"')
    const { up: upWide } = createMediaHelpers({ landscape: '(orientation: landscape)' })
    expect(() => upWide('landscape')).toThrow('is not a width')
  })
})

describe('createContainerQueries', () => {
  const containerQueries = createContainerQueries(breakpoints)

  it('writes the same helpers as container queries, unnamed or named', () => {
    expect(containerQueries.up('sm')).toBe('@container (width >= 600px)')
    expect(containerQueries.only('md')).toBe('@container (840px <= width < 1200px)')
    expect(containerQueries('sidebar').up(400)).toBe('@container sidebar (width >= 400px)')
    expect(containerQueries('sidebar').down('sm')).toBe('@container sidebar (width < 600px)')
  })
})

describe('responsiveQueries', () => {
  it('maps array positions onto a scale that starts at 0, and keeps a base slot otherwise', () => {
    expect(responsiveQueries({ xs: 0, sm: '600px' }).array).toEqual([
      null,
      '@media (width >= 600px)',
    ])
    expect(responsiveQueries(['40em']).array).toEqual([null, '@media (width >= 40em)'])
  })

  it('keys breakpoint names and their cq keys, and orders media before containers', () => {
    const { keyed, order } = responsiveQueries({
      xs: 0,
      sm: '600px',
      wide: '(orientation: landscape)',
    })
    expect(Object.fromEntries(keyed)).toEqual({
      xs: null,
      sm: '@media (width >= 600px)',
      wide: '@media (orientation: landscape)',
      cqXs: '@container (width >= 0px)',
      cqSm: '@container (width >= 600px)',
    })
    expect(order).toEqual([
      '@media (width >= 600px)',
      '@media (orientation: landscape)',
      '@container (width >= 0px)',
      '@container (width >= 600px)',
    ])
  })
})

describe('containerKey', () => {
  it('prefixes the breakpoint name with cq', () => {
    expect(containerKey('md')).toBe('cqMd')
    expect(containerKey('tablet')).toBe('cqTablet')
  })
})
