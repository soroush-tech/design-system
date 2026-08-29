import { describe, it, expect } from 'vitest'
import sampleRaw from './__fixtures__/Sample.stories.tsx?raw'
import { listStoryNames } from './listStoryNames'

describe('listStoryNames', () => {
  it('lists the story exports in file order, not alphabetically', () => {
    expect(listStoryNames(sampleRaw)).toEqual([
      'Default',
      'Grouped',
      'Sizes',
      'Destructured',
      'Block',
      'Decorated',
      'Composed',
    ])
  })
})
