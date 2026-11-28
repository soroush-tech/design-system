import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { slotCases } from '../utils/test/slotCases'
import { TransferList, type TransferListProps } from './TransferList'

const items = [{ value: 'a', label: 'Apple' }]
const list = () => document.querySelector('[data-side="left"]')!

describe('TransferList overrides', () => {
  it.each(
    slotCases({
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
  )('$name', ({ run, expected }) => {
    expect(run()).toEqual(expected)
  })
})
