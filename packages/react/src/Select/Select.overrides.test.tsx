import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { slotCases } from '../utils/test/slotCases'
import { MenuItem } from '../MenuItem'
import { Select, type SelectProps } from './Select'

const root = () => screen.getByRole('combobox')
const area = () => root().firstElementChild!

describe('Select overrides', () => {
  it.each(
    slotCases({
      render: (props: Partial<SelectProps>) => (
        <Select defaultOpen defaultValue={1} {...props}>
          <MenuItem value={1}>One</MenuItem>
        </Select>
      ),
      root,
      slots: {
        root,
        valueArea: area,
        valueGhost: () => area().firstElementChild,
        value: () => area().lastElementChild,
        listbox: () => screen.getByRole('listbox'),
      },
    })
  )('$name', ({ run, expected }) => {
    expect(run()).toEqual(expected)
  })
})

describe('Select (native) overrides', () => {
  it.each(
    slotCases({
      render: (props: Partial<SelectProps>) => (
        <Select native defaultValue={1} {...props}>
          <MenuItem value={1}>One</MenuItem>
        </Select>
      ),
      root: () => document.querySelector('select')!.parentElement,
      slots: { root: () => document.querySelector('select')!.parentElement },
    })
  )('$name', ({ run, expected }) => {
    expect(run()).toEqual(expected)
  })
})
