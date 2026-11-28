import { describe, it, expect } from 'vitest'
import { slotCases } from '../utils/test/slotCases'
import { TextInput, type TextInputProps } from './TextInput'

const input = () => document.querySelector('input')!

describe('TextInput overrides', () => {
  it.each(
    slotCases({
      render: (props: TextInputProps) => <TextInput classes={{ input: 'own-input' }} {...props} />,
      root: () => input().parentElement,
      slots: { root: () => input().parentElement, input },
    })
  )('$name', ({ run, expected }) => {
    expect(run()).toEqual(expected)
  })
})
