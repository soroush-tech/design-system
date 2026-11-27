import { describe, it, expect } from 'vitest'
import { slotCases } from '../utils/test/slotCases'
import { Switch, type SwitchProps } from './Switch'

const root = () => document.querySelector('label')!

describe('Switch overrides', () => {
  it.each(
    slotCases({
      render: (props: SwitchProps) => <Switch {...props}>Label</Switch>,
      root,
      slots: {
        root,
        input: () => document.querySelector('input'),
        track: () => document.querySelector('.sw-track'),
        thumb: () => document.querySelector('.sw-thumb'),
        label: () => root().lastElementChild,
      },
    })
  )('$name', ({ run, expected }) => {
    expect(run()).toEqual(expected)
  })
})
