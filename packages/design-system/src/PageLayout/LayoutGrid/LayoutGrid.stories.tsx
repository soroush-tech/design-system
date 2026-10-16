import type { Meta, StoryObj } from '@storybook/react-vite'
import { Grid } from '@soroush.tech/design-system/Grid'
import { Typography } from '@soroush.tech/design-system/Typography'
import { LayoutGrid } from './LayoutGrid'

const Cell = ({ label, gridColumn }: { label: string; gridColumn?: string }) => (
  <Grid gridColumn={gridColumn} p={2} bg="secondary" justifyItems="center">
    <Typography variant="caption">{label}</Typography>
  </Grid>
)

const meta: Meta<typeof LayoutGrid> = {
  title: 'Theme/PageLayout/LayoutGrid',
  component: LayoutGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { include: ['rowGap'] },
  },
  args: {
    rowGap: 2,
  },
  argTypes: {
    rowGap: {
      control: 'number',
      description: 'Gap between rows - a `theme.space` key. Columns keep the theme gutter.',
      table: { category: 'Spacing' },
    },
  },
}

export default meta
type Story = StoryObj<typeof LayoutGrid>

/** Items span the theme's columns: a full row, then halves, then one column each. */
export const Spans: Story = {
  render: (args) => (
    <LayoutGrid {...args}>
      <Cell label="1 / -1" gridColumn="1 / -1" />
      <Cell label="span 2" gridColumn="span 2" />
      <Cell label="span 2" gridColumn="span 2" />
      {Array.from({ length: 4 }, (_, column) => (
        <Cell key={column} label="1" />
      ))}
    </LayoutGrid>
  ),
}
