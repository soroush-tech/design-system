import type { Meta, StoryObj } from '@storybook/react-vite'
import { MenuItem } from '../../MenuItem'
import { MenuList } from '../MenuList'
import { Paper } from '../../Paper'
import { exampleArgs } from '../../utils/test/renderExample'
import { menuDividerCatalog } from './MenuDivider.catalog'
import { MenuDivider } from './MenuDivider'

const meta: Meta<typeof MenuDivider> = {
  title: 'Theme/Menu/MenuDivider',
  component: MenuDivider,
  tags: ['autodocs'],
  args: exampleArgs(menuDividerCatalog.example),
  parameters: {
    layout: 'padded',
    controls: { include: [] },
  },
  decorators: [
    (Story) => (
      <Paper elevation={8} p={0} borderRadius="sm" style={{ width: 220 }}>
        <MenuList aria-label="Edit">
          <MenuItem>Cut</MenuItem>
          <MenuItem>Copy</MenuItem>
          <Story />
          <MenuItem>Select all</MenuItem>
        </MenuList>
      </Paper>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof MenuDivider>

export const Default: Story = {}
