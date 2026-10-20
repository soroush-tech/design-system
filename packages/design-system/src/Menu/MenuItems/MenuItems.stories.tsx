import type { Meta, StoryObj } from '@storybook/react-vite'
import { MenuList } from '../MenuList'
import { Paper } from '../../Paper'
import { MenuItems, type MenuItemData } from './MenuItems'

const items: MenuItemData[] = [
  { value: 'new', label: 'New branch...', shortcut: 'Control+B' },
  { value: 'checkout', label: 'Checkout...', disabled: true, note: 'Coming later' },
  { type: 'divider' },
  {
    label: 'Local branches',
    submenu: [
      { value: 'main', label: 'main', role: 'menuitemradio', selected: true },
      { value: 'feat', label: 'feat/menu', role: 'menuitemradio' },
    ],
  },
  { label: 'Remote branches', submenu: [], emptyLabel: 'Coming soon' },
]

const meta: Meta<typeof MenuItems> = {
  title: 'Theme/Menu/MenuItems',
  component: MenuItems,
  tags: ['autodocs'],
  args: { items },
  parameters: {
    layout: 'padded',
    controls: { include: [] },
  },
  decorators: [
    (Story) => (
      <Paper elevation={8} p={0} borderRadius="sm" width={240}>
        <MenuList aria-label="Branch">
          <Story />
        </MenuList>
      </Paper>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof MenuItems>

export const Default: Story = {}
