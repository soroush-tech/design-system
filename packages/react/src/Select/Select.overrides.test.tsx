import { screen } from '@testing-library/react'
import { describeSlots } from '../utils/test/describeSlots'
import { MenuItem } from '../MenuItem'
import { Select, type SelectProps } from './Select'

const root = () => screen.getByRole('combobox')
const area = () => root().firstElementChild!

describeSlots({
  name: 'Select',
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

describeSlots({
  name: 'Select (native)',
  render: (props: Partial<SelectProps>) => (
    <Select native defaultValue={1} {...props}>
      <MenuItem value={1}>One</MenuItem>
    </Select>
  ),
  root: () => document.querySelector('select')!.parentElement,
  slots: { root: () => document.querySelector('select')!.parentElement },
})
