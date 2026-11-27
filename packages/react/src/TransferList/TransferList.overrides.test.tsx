import { screen } from '@testing-library/react'
import { describeSlots } from '../utils/test/describeSlots'
import { TransferList, type TransferListProps } from './TransferList'

const items = [{ value: 'a', label: 'Apple' }]
const list = () => document.querySelector('[data-side="left"]')!

describeSlots({
  name: 'TransferList',
  render: (props: TransferListProps) => (
    <TransferList items={items} leftLabel="Left" hasSelectAll {...props} />
  ),
  root: () => screen.getByRole('group'),
  slots: {
    root: () => screen.getByRole('group'),
    list,
    header: () => list().firstElementChild,
    title: () => screen.getAllByText('Left')[0].parentElement,
    count: () => screen.getAllByText('0/1')[0].parentElement,
    items: () => screen.getAllByRole('list')[0],
    item: () => screen.getAllByRole('listitem')[0],
    controls: () => list().nextElementSibling,
    icon: () => document.querySelector('[class*="TransferListIcon"]'),
  },
})
