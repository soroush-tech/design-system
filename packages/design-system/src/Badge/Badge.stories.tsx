import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button'
import { Flex } from '../Flex'
import { Icon } from '../Icon'
import { Avatar } from '../Avatar'
import { m } from '../utils/test/storiesArgs'
import { exampleArgs } from '../utils/test/renderExample'
import { buttonColorTokens } from '../utils/test/storiesOptions'
import { badgeCatalog, badgeOverlapValues, badgeVariantValues } from './Badge.catalog'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Theme/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        'badgeContent',
        'max',
        'variant',
        'color',
        'isHidden',
        'shouldShowZero',
        'overlap',
        'badgeLabel',
        'm',
      ],
    },
  },
  args: exampleArgs(badgeCatalog.example),
  argTypes: {
    badgeContent: {
      control: 'text',
      description: 'The count or the text. A number over `max` shows as `max+`.',
      table: { category: 'Content' },
    },
    max: {
      control: 'number',
      description: 'Above it, a number shows as `max+`.',
      table: { category: 'Content', defaultValue: { summary: '99' } },
    },
    variant: {
      control: { type: 'inline-radio' },
      options: badgeVariantValues,
      description: 'A count, or only a dot.',
      table: { category: 'Visual', defaultValue: { summary: 'standard' } },
    },
    color: {
      control: { type: 'select' },
      options: buttonColorTokens,
      description: 'Resolves to `theme.palette`.',
      table: { category: 'Visual', defaultValue: { summary: 'error' } },
    },
    isHidden: {
      control: 'boolean',
      description: 'Draws no badge.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    shouldShowZero: {
      control: 'boolean',
      description: 'Draws a badge for a count of zero.',
      table: { category: 'Behavior', defaultValue: { summary: 'false' } },
    },
    overlap: {
      control: { type: 'inline-radio' },
      options: badgeOverlapValues,
      description: "Sits on the box's corner, or on the curve of a circle.",
      table: { category: 'Layout', defaultValue: { summary: 'rectangular' } },
    },
    badgeLabel: {
      control: 'text',
      description: 'What a screen reader hears of the badge, with its child - no built-in English.',
      table: { category: 'Content' },
    },
    m,
  },
}

export default meta
type Story = StoryObj<typeof Badge>

const inbox = <Icon name="star" size="lg" color="inherit" />

export const Default: Story = {
  render: (args) => <Badge {...args}>{inbox}</Badge>,
}

export const Dot: Story = {
  args: { variant: 'dot', badgeContent: undefined },
  render: (args) => <Badge {...args}>{inbox}</Badge>,
}

export const Colors: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Flex flexDirection="row" gap={3} alignItems="center">
      {buttonColorTokens.map((color) => (
        <Badge key={color} {...args} color={color}>
          {inbox}
        </Badge>
      ))}
    </Flex>
  ),
}

export const Corners: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Flex flexDirection="row" gap={3} alignItems="center">
      {(['top', 'bottom'] as const).flatMap((vertical) =>
        (['start', 'end'] as const).map((horizontal) => (
          <Badge
            key={`${vertical}-${horizontal}`}
            {...args}
            anchorOrigin={{ vertical, horizontal }}
          >
            {inbox}
          </Badge>
        ))
      )}
    </Flex>
  ),
}

export const OnACircle: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Badge {...args} overlap="circular">
      <Avatar>M</Avatar>
    </Badge>
  ),
}

export const Counts: Story = {
  parameters: { controls: { include: [] } },
  render: (args) => (
    <Flex flexDirection="row" gap={3} alignItems="center">
      {[0, 7, 99, 100, 1000].map((count) => (
        <Badge key={count} {...args} badgeContent={count} shouldShowZero>
          {inbox}
        </Badge>
      ))}
    </Flex>
  ),
}

// A screen reader hears the label with the button: "Inbox, 4 unread".
export const WithALabel: Story = {
  args: { badgeLabel: '4 unread' },
  render: (args) => (
    <Badge {...args}>
      <Button variant="outlined" size="sm">
        Inbox
      </Button>
    </Badge>
  ),
}
