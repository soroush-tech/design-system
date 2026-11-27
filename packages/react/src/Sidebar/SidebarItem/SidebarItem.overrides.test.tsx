import { screen } from '@testing-library/react'
import { describeSlots } from '../../utils/test/describeSlots'
import { Sidebar } from '../Sidebar'
import { SidebarItem, type SidebarItemProps } from './SidebarItem'

const root = () => screen.getByRole('button')

describeSlots({
  name: 'SidebarItem',
  render: (props: Partial<SidebarItemProps>) => (
    <Sidebar aria-label="Panels" layout="stacked">
      <SidebarItem icon="folder" label="Directory" {...props} />
    </Sidebar>
  ),
  root,
  slots: { root, pill: () => document.querySelector('[data-sidebar-pill]') },
})
