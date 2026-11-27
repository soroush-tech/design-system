import { describe, it, expect } from 'vitest'
import { slotCases } from '../utils/test/slotCases'
import { Skeleton, type SkeletonProps } from './Skeleton'

const root = () => document.querySelector('span')!

describe('Skeleton overrides', () => {
  it.each(
    slotCases({
      render: (props: SkeletonProps) => <Skeleton {...props}>Text</Skeleton>,
      root,
      slots: { root, content: () => root().firstElementChild },
    })
  )('$name', ({ run, expected }) => {
    expect(run()).toEqual(expected)
  })
})
