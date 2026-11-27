import { screen } from '@testing-library/react'
import { describeSlots } from '../../utils/test/describeSlots'
import { Sidebar, type SidebarProps } from './Sidebar'

const root = () => screen.getByRole('navigation')

describeSlots({
  name: 'Sidebar',
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
