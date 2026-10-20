import type { Meta, StoryObj } from '@storybook/react-vite'
import { exampleArgs } from '../../utils/test/renderExample'
import { tabContextCatalog } from './TabContext.catalog'
import { TabContext } from './TabContext'

const meta: Meta<typeof TabContext> = {
  title: 'Theme/Tabs/TabContext',
  component: TabContext,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { include: [] },
  },
  args: exampleArgs(tabContextCatalog.example),
}

export default meta
type Story = StoryObj<typeof TabContext>

// The provider draws nothing - it links the tabs to the panels it holds.
export const Default: Story = {}
