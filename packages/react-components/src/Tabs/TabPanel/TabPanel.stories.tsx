import type { Meta, StoryObj } from '@storybook/react-vite'
import { p } from '../../utils/test/storiesArgs'
import { Tab } from '../Tab'
import { TabList } from '../TabList'
import { TabContext } from '../TabContext'
import { Typography } from '../../Typography'
import { exampleArgs } from '../../utils/test/renderExample'
import { backgroundTokens, borderRadiiTokens } from '../../utils/test/storiesOptions'
import { tabPanelCatalog } from './TabPanel.catalog'
import { TabPanel } from './TabPanel'

const meta: Meta<typeof TabPanel> = {
  title: 'Theme/Tabs/TabPanel',
  component: TabPanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { include: ['shouldKeepMounted', 'bg', 'borderRadius', 'p'] },
  },
  args: { ...exampleArgs(tabPanelCatalog.example), shouldKeepMounted: false, p: 2 },
  argTypes: {
    shouldKeepMounted: {
      control: 'boolean',
      description: 'Keep the content mounted while the panel is hidden.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    bg: {
      control: { type: 'select' },
      options: backgroundTokens,
      description: "The panel's ground - match its tab's selectedBg.",
      table: { category: 'Visual' },
    },
    borderRadius: {
      control: { type: 'select' },
      options: borderRadiiTokens,
      description: 'Corner radius - resolves against `theme.radii`.',
      table: { category: 'Visual' },
    },
    p,
  },
}

export default meta
type Story = StoryObj<typeof TabPanel>

export const Default: Story = {
  render: (args) => (
    <TabContext defaultValue="layers">
      <TabList aria-label="Left panel">
        <Tab value="layers" label="Layers" />
        <Tab value="assets" label="Assets" />
      </TabList>
      <TabPanel {...args} />
      <TabPanel {...args} value="assets">
        <Typography>The page&apos;s assets.</Typography>
      </TabPanel>
    </TabContext>
  ),
}
