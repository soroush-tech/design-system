import type { Meta, StoryObj } from '@storybook/react-vite'
import { Sidebar, SidebarItem } from '../../Sidebar'
import { exampleArgs } from '../../utils/test/renderExample'
import { buttonColorTokens } from '../../utils/test/storiesOptions'
import { NavGroup } from '../NavGroup'
import { NavLink } from '../NavLink'
import { NavTree } from './NavTree'
import { navTreeCatalog } from './NavTree.catalog'

const meta: Meta<typeof NavTree> = {
  title: 'Theme/NavTree',
  component: NavTree,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { include: ['color'] },
  },
  args: exampleArgs(navTreeCatalog.example),
  argTypes: {
    color: {
      control: { type: 'select' },
      options: buttonColorTokens,
      description:
        "Color of the current page's pill, a hovered link and the focus ring - resolves to `theme.palette`.",
      table: { category: 'Visual', defaultValue: { summary: 'primary' } },
    },
  },
  render: (args) => (
    <nav aria-label="Documentation" style={{ width: '18rem' }}>
      <NavTree {...args}>
        <NavGroup label="Get started">
          <NavLink href="#installation">Installation</NavLink>
          <NavLink href="#usage" isCurrent>
            Usage
          </NavLink>
        </NavGroup>
        <NavGroup label="Components" isCollapsible isOpen>
          <NavLink href="#button">Button</NavLink>
          <NavLink href="#tabs">Tabs</NavLink>
        </NavGroup>
        <NavGroup label="Packages">
          <NavLink href="#markdown" note="v1.2.3">
            Markdown
          </NavLink>
          <NavLink href="https://github.com/soroush-tech/design-system" isExternal note="v0.1.1">
            MCP server
          </NavLink>
        </NavGroup>
      </NavTree>
    </nav>
  ),
}

export default meta
type Story = StoryObj<typeof NavTree>

export const Default: Story = {}

export const Secondary: Story = { args: { color: 'secondary' } }

// A group that folds is a native `details`: closed it shows its name alone.
export const Folding: Story = {
  render: (args) => (
    <nav aria-label="Components" style={{ width: '18rem' }}>
      <NavTree {...args}>
        <NavGroup label="Layout" isCollapsible>
          <NavLink href="#view">View</NavLink>
          <NavLink href="#flex">Flex</NavLink>
        </NavGroup>
        <NavGroup label="Inputs" isCollapsible isOpen>
          <NavLink href="#button">Button</NavLink>
          <NavLink href="#text-input" isCurrent>
            TextInput
          </NavLink>
        </NavGroup>
        <NavGroup label="Feedback" isCollapsible>
          <NavLink href="#alert">Alert</NavLink>
        </NavGroup>
      </NavTree>
    </nav>
  ),
}

/**
 * The tree in the panel of a navigation rail: a `Sidebar` with `layout="stacked"` and a `panel` -
 * rendered in place, so it is in the server-rendered page.
 */
export const InANavigationRail: Story = {
  render: (args) => (
    <Sidebar
      aria-label="Documentation"
      layout="stacked"
      bg="paper"
      panelProps={{ 'aria-label': 'Components', bg: 'secondary', p: 2 }}
      panel={
        <NavTree {...args}>
          <NavGroup label="Components">
            <NavLink href="#button" isCurrent>
              Button
            </NavLink>
            <NavLink href="#tabs">Tabs</NavLink>
          </NavGroup>
        </NavTree>
      }
    >
      <SidebarItem icon="home" label="Home" href="#home" aria-pressed={undefined} />
      <SidebarItem
        icon="add_circle"
        label="Components"
        href="#components"
        isSelected
        aria-current="page"
        aria-pressed={undefined}
      />
      <SidebarItem icon="palette" label="Styles" href="#styles" aria-pressed={undefined} />
    </Sidebar>
  ),
}
