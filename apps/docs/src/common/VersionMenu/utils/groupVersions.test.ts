import { describe, it, expect } from 'vitest'
import { groupVersions } from './groupVersions'

const none = { formerVersions: {} }
const renamed = {
  formerVersions: { '@soroush.tech/design-system@': ['1.3.3', '2.0.0', '2.2.0'] },
}

describe('groupVersions', () => {
  it('keeps every version of a section with one line in the current group', () => {
    expect(groupVersions(['0.2.0', '0.1.0'], none)).toEqual({
      current: ['0.2.0', '0.1.0'],
      former: [],
    })
    expect(groupVersions([], none)).toEqual({ current: [], former: [] })
  })

  it('puts the versions of the former name apart, whatever their numbers', () => {
    expect(groupVersions(['2.2.0', '2.0.0', '0.1.0'], renamed)).toEqual({
      current: ['0.1.0'],
      former: [{ name: '@soroush.tech/design-system', versions: ['2.2.0', '2.0.0'] }],
    })
  })

  it('groups several versions of each line, in the manifest order', () => {
    const groups = groupVersions(['2.2.0', '1.3.3', '0.3.0', '0.2.0', '0.1.0'], renamed)
    expect(groups.current).toEqual(['0.3.0', '0.2.0', '0.1.0'])
    expect(groups.former).toEqual([
      { name: '@soroush.tech/design-system', versions: ['2.2.0', '1.3.3'] },
    ])
  })

  it('names no former group when the manifest lists none of its versions', () => {
    expect(groupVersions(['0.1.0'], renamed)).toEqual({ current: ['0.1.0'], former: [] })
  })
})
