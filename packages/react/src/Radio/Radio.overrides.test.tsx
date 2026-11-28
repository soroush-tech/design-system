import { describe, it, expect } from 'vitest'
import { slotCases } from '../utils/test/slotCases'
import { Radio, type RadioProps } from './Radio'

const root = () => document.querySelector('label')!
const icon = () => document.querySelector('.rb-unchecked')!.parentElement

describe('Radio overrides', () => {
  it.each(
    slotCases({
      render: (props: RadioProps) => <Radio {...props}>Label</Radio>,
      root,
      slots: {
        root,
        input: () => document.querySelector('input'),
        icon,
        label: () => root().lastElementChild,
      },
    })
  )('$name', ({ run, expected }) => {
    expect(run()).toEqual(expected)
  })
})
