import type { Meta, StoryObj } from '@storybook/react-vite'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Typography } from '@soroush.tech/design-system/Typography'
import { View } from '@soroush.tech/design-system/View'
import { LayoutGrid } from '../LayoutGrid'
import { PageLayout } from './PageLayout'

const Region = ({ label }: { label: string }) => (
  <Flex height="100%" p={2} bg="secondary" alignItems="center" justifyContent="center">
    <Typography variant="caption">{label}</Typography>
  </Flex>
)

const meta: Meta<typeof PageLayout> = {
  title: 'Theme/PageLayout',
  component: PageLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: { include: ['openPanels', 'minHeight'] },
  },
  args: {
    minHeight: '30rem',
  },
  argTypes: {
    openPanels: {
      control: 'object',
      description:
        'Which `overlay` panels are open, as `{ start?: boolean, end?: boolean }`. Panels in another mode ignore it.',
      table: { category: 'State' },
    },
    minHeight: {
      control: 'text',
      description: 'Height of the page frame. Default: `100dvh`.',
      table: { category: 'Layout', defaultValue: { summary: '100dvh' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof PageLayout>

/**
 * Resize the window across the theme's breakpoints: the top bar arrives at `web`, the
 * bottom bar leaves; the start panel is hidden, then a rail at `tablet`, then inline at
 * `web`; the content goes from 4 fluid columns to 8, then a centred 12 and 16.
 */
export const Default: Story = {
  render: (args) => (
    <PageLayout
      {...args}
      topBar={<Region label="top bar" />}
      bottomBar={<Region label="bottom bar" />}
      startPanel={<Region label="start panel" />}
    >
      <View py={3}>
        <LayoutGrid rowGap={2}>
          {Array.from({ length: 16 }, (_, column) => (
            <Region key={column} label={String(column + 1)} />
          ))}
        </LayoutGrid>
      </View>
    </PageLayout>
  ),
}
