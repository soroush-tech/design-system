import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  p,
  tabsAriaLabel,
  tabsBg,
  tabsColor,
  tabsFullWidth,
  tabsHasDivider,
  tabsHasVisibleScrollbar,
  tabsIsCentered,
  tabsOrientation,
  tabsOverflowBehavior,
  tabsOverflowLabel,
  tabsScrollButtons,
  tabsSelectedBg,
  tabsShouldSelectOnFocus,
  tabsShouldShowScrollButtonsOnMobile,
  tabsSize,
  tabsTextColor,
  tabsVariant,
} from '../../utils/test/storiesArgs'
import { Flex } from '../../Flex'
import { Typography } from '../../Typography'
import { View } from '../../View'
import { exampleArgs } from '../../utils/test/renderExample'
import { Tab } from '../Tab'
import { TabContext } from '../TabContext'
import { TabPanel } from '../TabPanel'
import { tabListCatalog } from './TabList.catalog'
import { TabList } from './TabList'

// A TabList takes every Tabs prop but the value, which its TabContext holds - the same controls.
const panelValues = ['layers', 'assets', 'components', 'tokens', 'history']

const meta: Meta<typeof TabList> = {
  title: 'Theme/Tabs/TabList',
  component: TabList,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        'variant',
        'orientation',
        'color',
        'textColor',
        'size',
        'fullWidth',
        'isCentered',
        'shouldSelectOnFocus',
        'overflowBehavior',
        'overflowLabel',
        'scrollButtons',
        'shouldShowScrollButtonsOnMobile',
        'hasVisibleScrollbar',
        'hasDivider',
        'bg',
        'selectedBg',
        'aria-label',
        'p',
      ],
    },
  },
  args: {
    ...exampleArgs(tabListCatalog.example),
    variant: 'underline',
    orientation: 'horizontal',
    color: 'primary',
    size: 'md',
    fullWidth: false,
    isCentered: false,
    shouldSelectOnFocus: false,
  },
  argTypes: {
    variant: tabsVariant,
    orientation: tabsOrientation,
    color: tabsColor,
    textColor: tabsTextColor,
    size: tabsSize,
    fullWidth: tabsFullWidth,
    isCentered: tabsIsCentered,
    shouldSelectOnFocus: tabsShouldSelectOnFocus,
    overflowBehavior: tabsOverflowBehavior,
    overflowLabel: tabsOverflowLabel,
    scrollButtons: tabsScrollButtons,
    shouldShowScrollButtonsOnMobile: tabsShouldShowScrollButtonsOnMobile,
    hasVisibleScrollbar: tabsHasVisibleScrollbar,
    hasDivider: tabsHasDivider,
    bg: tabsBg,
    selectedBg: tabsSelectedBg,
    'aria-label': tabsAriaLabel,
    p,
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

// Down a column, the panels beside it: the list and its panels sit apart, linked by the context.
export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <TabContext defaultValue="layers">
      <Flex flexDirection="row" gap={2}>
        <TabList {...args} />
        <TabPanel value="layers" p={2}>
          <Typography>Layers of the page.</Typography>
        </TabPanel>
        <TabPanel value="assets" p={2}>
          <Typography>The page&apos;s assets.</Typography>
        </TabPanel>
      </Flex>
    </TabContext>
  ),
}

// More tabs than fit: they go to a menu, and choosing one there still shows its panel.
export const OverflowMenu: Story = {
  args: { overflowBehavior: 'menu', overflowLabel: 'More panels' },
  render: (args) => (
    <TabContext defaultValue="layers">
      <View width="18rem" maxWidth="100%" overflow="hidden" style={{ resize: 'horizontal' }}>
        <TabList {...args}>
          {panelValues.map((value) => (
            <Tab key={value} value={value} label={value[0].toUpperCase() + value.slice(1)} />
          ))}
        </TabList>
      </View>
      {panelValues.map((value) => (
        <TabPanel key={value} value={value} p={2}>
          <Typography>The {value} panel.</Typography>
        </TabPanel>
      ))}
    </TabContext>
  ),
}
