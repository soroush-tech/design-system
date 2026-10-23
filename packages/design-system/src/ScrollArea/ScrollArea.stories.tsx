import type { Meta, StoryObj } from '@storybook/react-vite'
import { Flex } from '../Flex'
import { Paper } from '../Paper'
import { Typography } from '../Typography'
import { View } from '../View'
import { exampleArgs } from '../utils/test/renderExample'
import { scrollAreaAxesValues, scrollAreaCatalog } from './ScrollArea.catalog'
import { ScrollArea } from './ScrollArea'

const meta: Meta<typeof ScrollArea> = {
  title: 'Theme/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { include: ['axes', 'maxHeight'] },
  },
  args: { ...exampleArgs(scrollAreaCatalog.example), children: undefined },
  decorators: [
    (Story) => (
      <View padding={4} width="360px">
        <Story />
      </View>
    ),
  ],
  argTypes: {
    axes: {
      control: { type: 'inline-radio' },
      options: scrollAreaAxesValues,
      description: 'Which ways it scrolls.',
      table: { category: 'Behavior', defaultValue: { summary: 'y' } },
    },
    maxHeight: {
      control: 'number',
      description: 'A ceiling for an area that otherwise grows with its content, in pixels.',
      table: { category: 'Layout' },
    },
  },
}

export default meta
type Story = StoryObj<typeof ScrollArea>

const notes = Array.from({ length: 24 }, (_, index) => `Note ${index + 1}`)

const list = (
  <Flex flexDirection="column" gap={1} padding={2}>
    {notes.map((note) => (
      <Typography key={note} variant="body2">
        {note}
      </Typography>
    ))}
  </Flex>
)

export const Default: Story = {
  render: (args) => (
    <Paper p={0}>
      <ScrollArea {...args} aria-label="Notes" tabIndex={0}>
        {list}
      </ScrollArea>
    </Paper>
  ),
}

export const Sideways: Story = {
  args: { axes: 'x', maxHeight: undefined },
  render: (args) => (
    <Paper p={0}>
      <ScrollArea {...args} aria-label="Tags" tabIndex={0}>
        <Flex flexDirection="row" gap={2} padding={2} width="max-content">
          {notes.map((note) => (
            <Typography key={note} variant="body2" whiteSpace="nowrap">
              {note}
            </Typography>
          ))}
        </Flex>
      </ScrollArea>
    </Paper>
  ),
}

export const BothWays: Story = {
  args: { axes: 'both', maxHeight: 160 },
  render: (args) => (
    <Paper p={0}>
      <ScrollArea {...args} aria-label="Table of notes" tabIndex={0}>
        <Flex flexDirection="column" gap={1} padding={2} width="max-content">
          {notes.map((note) => (
            <Typography key={note} variant="body2" whiteSpace="nowrap">
              {`${note} - and a line that is wider than the area that holds it`}
            </Typography>
          ))}
        </Flex>
      </ScrollArea>
    </Paper>
  ),
}

// A card with rounded corners: the drawn bar lies over the content, so the corner stays clean.
export const InARoundedPanel: Story = {
  args: { maxHeight: 200 },
  render: (args) => (
    <Paper p={0} borderRadius="lg" overflow="hidden">
      <ScrollArea {...args} aria-label="Notes" tabIndex={0}>
        {list}
      </ScrollArea>
    </Paper>
  ),
}
