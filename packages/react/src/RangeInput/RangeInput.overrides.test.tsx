import { describe, it, expect } from 'vitest'
import { slotCases } from '../utils/test/slotCases'
import { RangeInput, type RangeInputProps } from './RangeInput'

const input = () => document.querySelector('input')!
const thumb = () => input().parentElement!
const root = () => thumb().parentElement

describe('RangeInput overrides', () => {
  it.each(
    slotCases({
      render: (props: RangeInputProps) => (
        <RangeInput
          defaultValue={20}
          marks={[{ value: 50, label: 'Half' }]}
          valueLabel="on"
          getAriaLabel={() => 'Level'}
          {...props}
        />
      ),
      root,
      slots: {
        root,
        rail: () => root()!.firstElementChild,
        track: () => root()!.children[1],
        mark: () => document.querySelector('[data-mark]'),
        markLabel: () => document.querySelector('[data-mark]')!.nextElementSibling,
        thumb,
        valueLabel: () => thumb().firstElementChild,
        input,
      },
    })
  )('$name', ({ run, expected }) => {
    expect(run()).toEqual(expected)
  })
})
