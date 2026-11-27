import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { slotCases } from '../../utils/test/slotCases'
import { Sidebar, type SidebarProps } from './Sidebar'

const root = () => screen.getByRole('navigation')

describe('Sidebar overrides', () => {
  it.each(
    slotCases({
      render: (props: Partial<SidebarProps>) => (
        <Sidebar aria-label="Panels" panel={<p>Panel</p>} {...props}>
          <span>Item</span>
        </Sidebar>
      ),
      root,
      slots: {
        root,
        rail: () => root().firstElementChild,
        panel: () => screen.getByText('Panel').parentElement,
      },
    })
  )('$name', ({ run, expected }) => {
    expect(run()).toEqual(expected)
  })
})
