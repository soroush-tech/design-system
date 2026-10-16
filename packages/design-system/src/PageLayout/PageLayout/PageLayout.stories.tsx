import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppBar } from '@soroush.tech/design-system/AppBar'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Sidebar, SidebarItem } from '@soroush.tech/design-system/Sidebar'
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
  // PageLayout fills the window by default (`min-height: 100dvh`). The stories cap it at
  // 30rem so a demo fits inside the docs page; set `minHeight` to `100dvh` to see the
  // bottom bar at the window's bottom edge.
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

/**
 * A `Sidebar` in the start panel fills the panel's track: a 72px rail at `tablet` shows its
 * icons only, the 280px inline panel at `web` shows the labels too. The `AppBar` fills the
 * top bar's height.
 */
export const WithSidebarAndAppBar: Story = {
  render: (args) => (
    <PageLayout
      {...args}
      topBar={
        <AppBar>
          <Typography variant="h6">App</Typography>
        </AppBar>
      }
      startPanel={
        <Sidebar aria-label="Sections" isOpen bg="paper">
          <SidebarItem icon="folder" label="Directory" isSelected />
          <SidebarItem icon="terminal" label="Terminal console" />
        </Sidebar>
      }
      bottomBar={<Region label="bottom bar" />}
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
