import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button'
import { Flex } from '../Flex'
import { Icon } from '../Icon'
import { View } from '../View'
import { exampleArgs } from '../utils/test/renderExample'
import { tooltipCatalog, tooltipPlacementValues } from './Tooltip.catalog'
import { Tooltip } from './Tooltip'
import { TooltipGroup } from './TooltipGroup'

const meta: Meta<typeof Tooltip> = {
  title: 'Theme/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        'title',
        'placement',
        'hasArrow',
        'enterDelay',
        'leaveDelay',
        'shouldDescribeChild',
        'isDescriptionPersistent',
        'isInteractive',
        'shouldOpenOnHover',
        'shouldOpenOnFocus',
        'shouldOpenOnTouch',
        'layer',
      ],
    },
  },
  args: exampleArgs(tooltipCatalog.example),
  decorators: [
    (Story) => (
      <View padding={8}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    title: {
      control: 'text',
      description: 'What it says. Nothing says no tooltip.',
      table: { category: 'Content' },
    },
    placement: {
      control: { type: 'select' },
      options: tooltipPlacementValues,
      description: 'The side of the child, and the end it lines up with. Flips for want of room.',
      table: { category: 'Layout', defaultValue: { summary: 'top' } },
    },
    hasArrow: {
      control: 'boolean',
      description: 'An arrow towards the middle of the child.',
      table: { category: 'Visual', defaultValue: { summary: 'false' } },
    },
    enterDelay: {
      control: 'number',
      description: 'Before it opens, in milliseconds.',
      table: { category: 'Behavior', defaultValue: { summary: '100' } },
    },
    leaveDelay: {
      control: 'number',
      description: 'After the pointer or focus has left, in milliseconds.',
      table: { category: 'Behavior', defaultValue: { summary: '0' } },
    },
    shouldDescribeChild: {
      control: 'boolean',
      description: 'Describes the child instead of naming it.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    isDescriptionPersistent: {
      control: 'boolean',
      description: 'With shouldDescribeChild: describes the child while the tooltip is closed too.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    isInteractive: {
      control: 'boolean',
      description:
        'Whether the pointer can move onto the tooltip. False: it takes no pointer events, so a click goes to what is under it.',
      table: { category: 'Behavior', defaultValue: { summary: 'true' } },
    },
    shouldOpenOnHover: {
      control: 'boolean',
      description: 'Opens on hover.',
      table: { category: 'Behavior', defaultValue: { summary: 'true' } },
    },
    shouldOpenOnFocus: {
      control: 'boolean',
      description: 'Opens on keyboard focus.',
      table: { category: 'Behavior', defaultValue: { summary: 'true' } },
    },
    shouldOpenOnTouch: {
      control: 'boolean',
      description: 'Opens on a long touch.',
      table: { category: 'Behavior', defaultValue: { summary: 'true' } },
    },
    layer: {
      control: { type: 'select' },
      options: ['appBar', 'drawer', 'modal', 'snackbar', 'tooltip'],
      description: 'Stacking layer from `theme.zOrder`.',
      table: { category: 'Layout', defaultValue: { summary: 'tooltip' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="outlined">Hover or focus me</Button>
    </Tooltip>
  ),
}

export const WithAnArrow: Story = {
  args: { hasArrow: true, placement: 'bottom' },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="outlined">Arrow</Button>
    </Tooltip>
  ),
}

export const Placements: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Flex flexDirection="row" gap={2} flexWrap="wrap">
      {tooltipPlacementValues.map((placement) => (
        <Tooltip key={placement} {...args} placement={placement} title={placement}>
          <Button variant="outlined" size="sm">
            {placement}
          </Button>
        </Tooltip>
      ))}
    </Flex>
  ),
}

// An icon with no text: the title names it.
export const NamesAnIcon: Story = {
  render: (args) => (
    <Tooltip {...args} title="Star the page">
      <Button variant="text">
        <Icon name="star" size="1.25em" color="inherit" />
      </Button>
    </Tooltip>
  ),
}

// A disabled button: the tooltip still opens, and says why.
export const OverADisabledButton: Story = {
  args: {
    shouldDescribeChild: true,
    isDescriptionPersistent: true,
    title: 'Fill in the name first',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="outlined" disabled>
        Save
      </Button>
    </Tooltip>
  ),
}

// A text hint over a neighbor: a click goes through it to the button it covers.
export const NotInteractive: Story = {
  args: { isInteractive: false, placement: 'right', title: 'Layers' },
  render: (args) => (
    <Flex gap={1} alignItems="center">
      <Tooltip {...args}>
        <Button variant="outlined">Rail</Button>
      </Tooltip>
      <Button variant="outlined">Row</Button>
    </Flex>
  ),
}

// Hover the first until it opens, then move along: each next one opens at once.
export const InAGroup: Story = {
  args: { enterDelay: 500 },
  render: (args) => (
    <TooltipGroup skipDelayDuration={300}>
      <Flex gap={1}>
        {['Layers', 'Assets', 'Pages'].map((title) => (
          <Tooltip key={title} {...args} title={title}>
            <Button variant="outlined">{title}</Button>
          </Tooltip>
        ))}
      </Flex>
    </TooltipGroup>
  ),
}

// No child: the tooltip is at a point in the window, open when it is told to be.
export const AtAPoint: Story = {
  // The meta's example child is left out: there is none.
  args: {
    children: undefined,
    isOpen: true,
    title: 'Move the track',
    anchorPosition: { top: 160, left: 200 },
  },
  render: (args) => (
    <View height="240px">
      <Tooltip {...args} />
    </View>
  ),
}

// A button with text: the tooltip adds to it.
export const DescribesAButton: Story = {
  args: { shouldDescribeChild: true, title: 'Writes the page to your drafts' },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="outlined">Save</Button>
    </Tooltip>
  ),
}

export const Open: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Tooltip {...args} defaultOpen>
      <Button variant="outlined">Always open</Button>
    </Tooltip>
  ),
}
