import type { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../../Button'
import { Flex } from '../../Flex'
import { Icon, type IconName, type IconProps } from '../../Icon'
import { Menu, MenuDivider } from '../../Menu'
import { MenuItem } from '../../MenuItem'
import { Typography } from '../../Typography'
import { exampleArgs } from '../../utils/test/renderExample'
import {
  backgroundTokens,
  borderRadiiTokens,
  buttonColorTokens,
  tabIconPositionTokens,
  textColorTokens,
  textInputSizeTokens,
} from '../../utils/test/storiesOptions'
import { Tabs } from '../Tabs'
import { tabCatalog } from './Tab.catalog'
import { Tab } from './Tab'

const meta: Meta<typeof Tab> = {
  title: 'Theme/Tabs/Tab',
  component: Tab,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        'label',
        'iconPosition',
        'color',
        'textColor',
        'size',
        'bg',
        'selectedBg',
        'borderRadius',
        'disabled',
        'isWrapped',
        'closeLabel',
        'title',
      ],
    },
  },
  args: { ...exampleArgs(tabCatalog.example), disabled: false, isWrapped: false },
  argTypes: {
    label: {
      control: 'text',
      description: "The tab's label.",
      table: { category: 'Content' },
    },
    iconPosition: {
      control: { type: 'select' },
      options: tabIconPositionTokens,
      description: 'Where the icon sits around the label.',
      table: { category: 'Layout', defaultValue: { summary: 'top' } },
    },
    disabled: {
      control: 'boolean',
      description: "The tab can't be chosen, and the arrow keys pass it.",
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    isWrapped: {
      control: 'boolean',
      description: 'The label may take two lines.',
      table: { category: 'Layout', defaultValue: { summary: 'false' } },
    },
    closeLabel: {
      control: 'text',
      description: "Makes the tab closable: its close button's tooltip. Delete closes it.",
      table: { category: 'Content' },
    },
    color: {
      control: { type: 'select' },
      options: buttonColorTokens,
      description: "The tab's accent - resolves to `theme.palette`. Its row's when unset.",
      table: { category: 'Visual', defaultValue: { summary: "its Tabs'" } },
    },
    textColor: {
      control: { type: 'select' },
      options: textColorTokens,
      description: "The label's color - resolves against `theme.text`. Its row's when unset.",
      table: { category: 'Visual', defaultValue: { summary: "its Tabs'" } },
    },
    size: {
      control: { type: 'select' },
      options: textInputSizeTokens,
      description: "Density - resolves against `theme.sizes`. Its row's when unset.",
      table: { category: 'Layout', defaultValue: { summary: "its Tabs'" } },
    },
    selectedBg: {
      control: { type: 'select' },
      options: backgroundTokens,
      description: "The tab's ground while selected - resolves against `theme.background`.",
      table: { category: 'Visual', defaultValue: { summary: "its Tabs' selectedBg" } },
    },
    bg: {
      control: { type: 'select' },
      options: backgroundTokens,
      description: "The tab's ground while unselected - resolves against `theme.background`.",
      table: { category: 'Visual' },
    },
    borderRadius: {
      control: { type: 'select' },
      options: borderRadiiTokens,
      description: 'Corner radius - resolves against `theme.radii`.',
      table: { category: 'Visual' },
    },
    title: {
      control: 'text',
      description: 'Hover text.',
      table: { category: 'Content' },
    },
  },
}

export default meta
type Story = StoryObj<typeof Tab>

const icon = (name: IconName, size?: IconProps['size']) => (
  <Icon name={name} size={size} color="inherit" />
)

// A tab only makes sense in a row - the story's tab sits first, its neighbours fixed.
export const Default: Story = {
  render: (args) => (
    <Tabs aria-label="Views" defaultValue="canvas" variant="boxed">
      <Tab {...args} />
      <Tab value="system" label="Design system" />
    </Tabs>
  ),
}

// As a table cell's: each tab takes its row's look, and its own value wins - an unsaved file in
// the error color (its accent, shown selected and under the pointer), a pinned one on a ground of
// its own, a quieter, smaller one.
export const OwnLook: Story = {
  parameters: { controls: { include: [] } },
  render: () => (
    <Tabs aria-label="Files" defaultValue="tabs" variant="enclosed" color="primary">
      <Tab value="readme" label="README.md" />
      <Tab value="tabs" label="Tabs.tsx ●" color="error" />
      <Tab value="theme" label="theme.ts" selectedBg="default" bg="paper" />
      <Tab value="notes" label="notes" size="sm" textColor="secondary" />
    </Tabs>
  ),
}

export const WithIcon: Story = {
  args: { iconPosition: 'start' },
  render: (args) => (
    <Tabs aria-label="Views" defaultValue="canvas">
      <Tab {...args} icon={icon('folder', 'sm')} />
      <Tab value="code" label="Code" icon={icon('code', 'sm')} iconPosition={args.iconPosition} />
    </Tabs>
  ),
}

// The tab's own menu, opened from its secondary action - its keys stay the menu's.
export const SecondaryAction: Story = {
  render: (args) => (
    <Tabs aria-label="Views" defaultValue="canvas" variant="boxed" size="sm">
      <Tab
        {...args}
        secondaryAction={
          <Menu
            align="end"
            trigger={
              <Button size="sm" variant="text" aria-label="Canvas options">
                ⋮
              </Button>
            }
          >
            <MenuItem value="rename">Rename...</MenuItem>
            <MenuItem value="duplicate">Duplicate</MenuItem>
            <MenuDivider />
            <MenuItem value="close">Close</MenuItem>
          </Menu>
        }
      />
      <Tab value="system" label="Design system" />
    </Tabs>
  ),
}

// ---------------------------------------------------------------------------------------------
// Every way a tab can carry its icon, at every size - each row a Tabs of its own, captioned
// with what it shows. The icon is the caller's, at the size the caller gives it; it inherits
// the tab's text color, as it would in an app.

function Scenario({ title, children }: Readonly<{ title: string; children: ReactNode }>) {
  return (
    <Flex flexDirection="column" gap={1}>
      <Typography variant="caption" color="secondary">
        {title}
      </Typography>
      {children}
    </Flex>
  )
}

function Scenarios({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <Flex flexDirection="column" gap={4}>
      {children}
    </Flex>
  )
}

const fixed = { controls: { include: [] } }

export const IconPositions: Story = {
  parameters: fixed,
  render: () => (
    <Scenarios>
      <Scenario title="iconPosition - top when unset, then each side">
        <Tabs aria-label="Icon positions" defaultValue="unset">
          <Tab value="unset" label="unset" icon={icon('table', 'sm')} />
          {tabIconPositionTokens.map((position) => (
            <Tab
              key={position}
              value={position}
              label={position}
              icon={icon('folder', 'sm')}
              iconPosition={position}
            />
          ))}
        </Tabs>
      </Scenario>
      <Scenario title="Icon only - no label; title names it">
        <Tabs aria-label="Icon only" defaultValue="files">
          <Tab value="files" title="Files" icon={icon('folder', 'sm')} />
          <Tab value="code" title="Code" icon={icon('code', 'sm')} />
          <Tab value="history" title="History" icon={icon('history', 'sm')} />
        </Tabs>
      </Scenario>
      <Scenario title="Mixed in one row - every label on the same line">
        <Tabs aria-label="Mixed" defaultValue="plain">
          <Tab value="plain" label="Plain" />
          <Tab value="start" label="Start" icon={icon('folder', 'sm')} iconPosition="start" />
          <Tab value="top" label="Top" icon={icon('table', 'sm')} />
          <Tab value="end" label="End" icon={icon('link', 'sm')} iconPosition="end" />
        </Tabs>
      </Scenario>
      <Scenario title="Below the label - labels on the row's first line">
        <Tabs aria-label="Icons below" defaultValue="files">
          <Tab value="files" label="Files" icon={icon('folder', 'sm')} iconPosition="bottom" />
          <Tab value="code" label="Code" icon={icon('code', 'md')} iconPosition="bottom" />
          <Tab value="history" label="History" icon={icon('history')} iconPosition="bottom" />
        </Tabs>
      </Scenario>
    </Scenarios>
  ),
}

const tabSizes = ['sm', 'md', 'lg'] as const
const iconSizes = [undefined, 'sm', 'md', 'lg'] as const
const iconSizeName = (size: (typeof iconSizes)[number]) => size ?? 'unset'

export const IconSizes: Story = {
  parameters: fixed,
  render: () => (
    <Scenarios>
      {(['start', 'top'] as const).flatMap((position) =>
        tabSizes.map((tabSize) => (
          <Scenario
            key={`${position}-${tabSize}`}
            title={`Tabs size="${tabSize}", iconPosition="${position}" - an icon of every size`}
          >
            <Tabs
              aria-label={`${position} icons, ${tabSize} tabs`}
              size={tabSize}
              defaultValue="unset"
            >
              {iconSizes.map((iconSize) => (
                <Tab
                  key={iconSizeName(iconSize)}
                  value={iconSizeName(iconSize)}
                  label={`icon ${iconSizeName(iconSize)}`}
                  icon={icon(position === 'top' ? 'table' : 'folder', iconSize)}
                  iconPosition={position}
                />
              ))}
            </Tabs>
          </Scenario>
        ))
      )}
    </Scenarios>
  ),
}

export const IconsInEveryLook: Story = {
  parameters: fixed,
  render: () => (
    <Scenarios>
      {(['underline', 'boxed'] as const).map((variant) => (
        <Scenario key={variant} title={`variant="${variant}"`}>
          <Tabs aria-label={`${variant} with icons`} variant={variant} defaultValue="start">
            <Tab value="start" label="Start" icon={icon('folder', 'sm')} iconPosition="start" />
            <Tab value="top" label="Top" icon={icon('table', 'sm')} />
            <Tab value="plain" label="Plain" />
          </Tabs>
        </Scenario>
      ))}
      <Scenario title="fullWidth - the tabs share the row">
        <Tabs aria-label="Full width with icons" fullWidth defaultValue="start">
          <Tab value="start" label="Start" icon={icon('folder', 'sm')} iconPosition="start" />
          <Tab value="top" label="Top" icon={icon('table', 'sm')} />
          <Tab value="end" label="End" icon={icon('link', 'sm')} iconPosition="end" />
        </Tabs>
      </Scenario>
      <Scenario title='orientation="vertical"'>
        <Flex gap={4}>
          <Tabs aria-label="Vertical start icons" orientation="vertical" defaultValue="files">
            <Tab value="files" label="Files" icon={icon('folder', 'sm')} iconPosition="start" />
            <Tab value="code" label="Code" icon={icon('code', 'sm')} iconPosition="start" />
            <Tab
              value="history"
              label="History"
              icon={icon('history', 'sm')}
              iconPosition="start"
            />
          </Tabs>
          <Tabs aria-label="Vertical top icons" orientation="vertical" defaultValue="files">
            <Tab value="files" label="Files" icon={icon('folder', 'sm')} />
            <Tab value="code" label="Code" icon={icon('code', 'sm')} />
            <Tab value="history" label="History" icon={icon('history', 'sm')} />
          </Tabs>
        </Flex>
      </Scenario>
      <Scenario title='as="nav" - links'>
        <Tabs aria-label="Navigation with icons" as="nav" defaultValue="files">
          <Tab
            value="files"
            label="Files"
            href="#files"
            icon={icon('folder', 'sm')}
            iconPosition="start"
          />
          <Tab
            value="code"
            label="Code"
            href="#code"
            icon={icon('code', 'sm')}
            iconPosition="start"
          />
        </Tabs>
      </Scenario>
    </Scenarios>
  ),
}

export const IconsWithEveryState: Story = {
  parameters: fixed,
  render: () => (
    <Scenarios>
      <Scenario title="disabled">
        <Tabs aria-label="Disabled with icons" defaultValue="on">
          <Tab value="on" label="Enabled" icon={icon('folder', 'sm')} iconPosition="start" />
          <Tab
            value="off"
            label="Disabled"
            icon={icon('lock', 'sm')}
            iconPosition="start"
            disabled
          />
        </Tabs>
      </Scenario>
      <Scenario title="isWrapped - a long label on two lines">
        <Flex width="16rem">
          <Tabs aria-label="Wrapped with icons" fullWidth defaultValue="long">
            <Tab
              value="long"
              label="A label long enough to wrap"
              icon={icon('folder', 'sm')}
              iconPosition="start"
              isWrapped
            />
            <Tab value="top" label="Another long label here" icon={icon('table', 'sm')} isWrapped />
          </Tabs>
        </Flex>
      </Scenario>
      <Scenario title="closeLabel - closable, with an icon">
        <Tabs aria-label="Closable with icons" variant="boxed" defaultValue="button">
          <Tab
            value="button"
            label="Button"
            icon={icon('code', 'sm')}
            iconPosition="start"
            closeLabel="Close Button"
          />
          <Tab value="card" label="Card" icon={icon('table', 'sm')} closeLabel="Close Card" />
        </Tabs>
      </Scenario>
      <Scenario title="secondaryAction - a menu, with an icon">
        <Tabs aria-label="Secondary action with icons" variant="boxed" defaultValue="light">
          <Tab
            value="light"
            label="Light"
            icon={icon('visibility', 'sm')}
            iconPosition="start"
            secondaryAction={
              <Menu
                align="end"
                trigger={
                  <Button size="sm" variant="text" aria-label="Light options">
                    ⋮
                  </Button>
                }
              >
                <MenuItem value="rename">Rename...</MenuItem>
              </Menu>
            }
          />
          <Tab value="dark" label="Dark" icon={icon('visibility', 'sm')} />
        </Tabs>
      </Scenario>
    </Scenarios>
  ),
}
