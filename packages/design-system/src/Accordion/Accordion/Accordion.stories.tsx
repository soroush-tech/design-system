import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../../Button'
import { Flex } from '../../Flex'
import { Icon } from '../../Icon'
import { Typography } from '../../Typography'
import { View } from '../../View'
import { exampleArgs } from '../../utils/test/renderExample'
import { AccordionActions } from '../AccordionActions'
import { AccordionDetails } from '../AccordionDetails'
import { AccordionGroup } from '../AccordionGroup'
import { AccordionSummary } from '../AccordionSummary'
import { accordionCatalog } from './Accordion.catalog'
import { Accordion } from './Accordion'

const meta: Meta<typeof Accordion> = {
  title: 'Theme/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { include: ['defaultExpanded', 'disabled', 'hasGutters', 'p', 'm'] },
  },
  args: exampleArgs(accordionCatalog.example),
  decorators: [
    (Story) => (
      <View width="28rem" maxWidth="100%">
        <Story />
      </View>
    ),
  ],
  argTypes: {
    defaultExpanded: {
      control: 'boolean',
      description: 'Whether it is open at first. Changing it starts the story over.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Stays as it is, and its summary is off.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    hasGutters: {
      control: 'boolean',
      description: 'Side padding on the summary, the details and the actions.',
      table: { category: 'Layout', defaultValue: { summary: 'true' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof Accordion>

const details = (
  <AccordionDetails>
    <Typography variant="body2">
      Content that opens and closes. Its height is measured as it moves, and left to it once it is
      open.
    </Typography>
  </AccordionDetails>
)

// The expanded state is only the start: changing the control starts the accordion over.
export const Default: Story = {
  render: (args) => (
    <Accordion key={String(args.defaultExpanded)} {...args}>
      <AccordionSummary>Shipping</AccordionSummary>
      {details}
    </Accordion>
  ),
}

export const Expanded: Story = {
  args: { defaultExpanded: true },
  render: (args) => (
    <Accordion key={String(args.defaultExpanded)} {...args}>
      <AccordionSummary>Shipping</AccordionSummary>
      {details}
    </Accordion>
  ),
}

export const WithActions: Story = {
  args: { defaultExpanded: true },
  render: (args) => (
    <Accordion {...args}>
      <AccordionSummary>Shipping</AccordionSummary>
      {details}
      <AccordionActions>
        <Button variant="text" size="sm">
          Cancel
        </Button>
        <Button size="sm">Save</Button>
      </AccordionActions>
    </Accordion>
  ),
}

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <Accordion {...args}>
      <AccordionSummary>Shipping</AccordionSummary>
      {details}
    </Accordion>
  ),
}

export const WithoutGutters: Story = {
  args: { hasGutters: false, defaultExpanded: true },
  render: (args) => (
    <Accordion {...args}>
      <AccordionSummary>Shipping</AccordionSummary>
      {details}
    </Accordion>
  ),
}

export const CustomIcon: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Accordion {...args}>
      <AccordionSummary expandIcon={<Icon name="chevron_right" size="1em" color="inherit" />}>
        Shipping
      </AccordionSummary>
      {details}
    </Accordion>
  ),
}

function Controlled(args: Readonly<{ children?: never }>) {
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <Flex gap={1}>
      <Accordion {...args} isExpanded={isExpanded} onChange={(_event, next) => setIsExpanded(next)}>
        <AccordionSummary>Shipping</AccordionSummary>
        {details}
      </Accordion>
      <Button size="sm" variant="outlined" onClick={() => setIsExpanded((current) => !current)}>
        {isExpanded ? 'Close it' : 'Open it'}
      </Button>
    </Flex>
  )
}

// The owner holds the state: the summary asks, a button elsewhere decides too.
export const ControlledState: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => <Controlled {...(args as { children?: never })} />,
}

const titles = ['Shipping', 'Returns', 'Warranty']

// A column that moves by the keys - the arrows, Home and End - and keeps one open at a time.
export const Group: Story = {
  parameters: { controls: { include: [] } },
  render: () => (
    <AccordionGroup isExclusive>
      {titles.map((title) => (
        <Accordion key={title}>
          <AccordionSummary>{title}</AccordionSummary>
          {details}
        </Accordion>
      ))}
    </AccordionGroup>
  ),
}

// No gap: one block, one border at each joint, the outer corners round.
export const Attached: Story = {
  parameters: { controls: { include: [] } },
  render: () => (
    <AccordionGroup isAttached isExclusive>
      {titles.map((title) => (
        <Accordion key={title}>
          <AccordionSummary>{title}</AccordionSummary>
          {details}
        </Accordion>
      ))}
    </AccordionGroup>
  ),
}

export const GroupOfSeveral: Story = {
  parameters: { controls: { include: [] } },
  render: () => (
    <AccordionGroup>
      {titles.map((title, index) => (
        <Accordion key={title} disabled={index === 1}>
          <AccordionSummary>{index === 1 ? `${title} (off)` : title}</AccordionSummary>
          {details}
        </Accordion>
      ))}
    </AccordionGroup>
  ),
}
