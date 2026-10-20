import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../../Button'
import { Flex } from '../../Flex'
import { Typography } from '../../Typography'
import { exampleArgs } from '../../utils/test/renderExample'
import { Tab } from '../Tab'
import { TabList } from '../TabList'
import { TabPanel } from '../TabPanel'
import { tabContextCatalog } from './TabContext.catalog'
import { TabContext, type TabContextProps } from './TabContext'

const panelValues = ['layers', 'assets', 'history']
const labelOf = (value: string) => value[0].toUpperCase() + value.slice(1)

const meta: Meta<typeof TabContext> = {
  title: 'Theme/Tabs/TabContext',
  component: TabContext,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { include: ['defaultValue'] },
  },
  args: exampleArgs(tabContextCatalog.example),
  argTypes: {
    defaultValue: {
      control: { type: 'select' },
      options: panelValues,
      description: "The selected tab's value at first, when uncontrolled.",
      table: { category: 'Behavior', defaultValue: { summary: 'null' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof TabContext>

const Panels = () =>
  panelValues.map((value) => (
    <TabPanel key={value} value={value} p={2}>
      <Typography>The {value} panel.</Typography>
    </TabPanel>
  ))

// The provider draws nothing - it links the tabs to the panels it holds. Keyed by its
// defaultValue, so changing the control starts it over.
export const Default: Story = {
  render: ({ defaultValue }) => (
    <TabContext key={String(defaultValue)} defaultValue={defaultValue}>
      <TabList aria-label="Left panel">
        {panelValues.map((value) => (
          <Tab key={value} value={value} label={labelOf(value)} />
        ))}
      </TabList>
      <Panels />
    </TabContext>
  ),
}

// Controlled: the value lives outside, so something else - here, a button - can choose a tab.
function Controlled(args: Readonly<TabContextProps>) {
  const [value, setValue] = useState<string | number | null>('layers')
  return (
    <Flex gap={2} alignItems="flex-start">
      <Button variant="outlined" onClick={() => setValue('history')}>
        Show history
      </Button>
      <TabContext {...args} value={value} onChange={setValue}>
        <TabList aria-label="Left panel">
          {panelValues.map((item) => (
            <Tab key={item} value={item} label={labelOf(item)} />
          ))}
        </TabList>
        <Panels />
      </TabContext>
    </Flex>
  )
}

export const ControlledValue: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => <Controlled {...args} />,
}
