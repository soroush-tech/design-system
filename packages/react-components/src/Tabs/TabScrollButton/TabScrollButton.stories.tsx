import type { Meta, StoryObj } from '@storybook/react-vite'
import { exampleArgs } from '../../utils/test/renderExample'
import {
  buttonColorTokens,
  tabScrollDirectionTokens,
  tabsOrientationTokens,
  textColorTokens,
} from '../../utils/test/storiesOptions'
import { tabScrollButtonCatalog } from './TabScrollButton.catalog'
import { TabScrollButton } from './TabScrollButton'

const meta: Meta<typeof TabScrollButton> = {
  title: 'Theme/Tabs/TabScrollButton',
  component: TabScrollButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: ['direction', 'orientation', 'disabled', 'isHidden', 'color', 'textColor'],
    },
  },
  args: { ...exampleArgs(tabScrollButtonCatalog.example), orientation: 'horizontal' },
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: tabScrollDirectionTokens,
      description: 'Which way it scrolls the row.',
      table: { category: 'Behavior' },
    },
    orientation: {
      control: { type: 'select' },
      options: tabsOrientationTokens,
      description: "The row's orientation - a chevron left/right, or up/down.",
      table: { category: 'Layout', defaultValue: { summary: 'horizontal' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Nowhere further to scroll this way - kept, but off.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    isHidden: {
      control: 'boolean',
      description: 'Nowhere further to scroll this way - hidden, keeping its room.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    color: {
      control: { type: 'select' },
      options: buttonColorTokens,
      description:
        "Its stretch of an enclosed row's divider - resolves to `theme.palette`. The row's line when unset.",
      table: { category: 'Visual', defaultValue: { summary: "the selected tab's" } },
    },
    textColor: {
      control: { type: 'select' },
      options: textColorTokens,
      description: "The chevron's color - resolves against `theme.text`. Its row's when unset.",
      table: { category: 'Visual', defaultValue: { summary: "its Tabs', else primary" } },
    },
  },
}

export default meta
type Story = StoryObj<typeof TabScrollButton>

export const Default: Story = {}
