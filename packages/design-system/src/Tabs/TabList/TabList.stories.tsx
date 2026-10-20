import type { Meta, StoryObj } from '@storybook/react-vite'
import { Typography } from '../../Typography'
import { exampleArgs } from '../../utils/test/renderExample'
import { TabContext } from '../TabContext'
import { TabPanel } from '../TabPanel'
import { tabListCatalog } from './TabList.catalog'
import { TabList } from './TabList'

const meta: Meta<typeof TabList> = {
  title: 'Theme/Tabs/TabList',
  component: TabList,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { include: ['aria-label'] },
  },
  args: exampleArgs(tabListCatalog.example),
  argTypes: {
    'aria-label': {
      control: 'text',
      description: 'Names the tablist.',
      table: { category: 'Content' },
    },
  },
}

export default meta
type Story = StoryObj<typeof TabList>

// The TabContext holds the value; the TabList shows it, and links each tab to its panel.
export const Default: Story = {
  render: (args) => (
    <TabContext defaultValue="layers">
      <TabList {...args} />
      <TabPanel value="layers" p={2}>
        <Typography>Layers of the page.</Typography>
      </TabPanel>
      <TabPanel value="assets" p={2}>
        <Typography>The page&apos;s assets.</Typography>
      </TabPanel>
    </TabContext>
  ),
}
