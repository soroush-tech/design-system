import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { slotCases } from '../../utils/test/slotCases'
import { Sidebar } from '../Sidebar'
import { SidebarItem, type SidebarItemProps } from './SidebarItem'

const root = () => screen.getByRole('button')

describe('SidebarItem overrides', () => {
  it.each(
    slotCases({
      render: (props: Partial<SidebarItemProps>) => (
        <Sidebar aria-label="Panels" layout="stacked">
          <SidebarItem icon="folder" label="Directory" {...props} />
        </Sidebar>
      ),
      root,
      slots: { root, pill: () => document.querySelector('[data-sidebar-pill]') },
    })
  )('$name', ({ run, expected }) => {
    expect(run()).toEqual(expected)
  })
})
