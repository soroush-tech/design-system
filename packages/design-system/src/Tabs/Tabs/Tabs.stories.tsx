import { Children, isValidElement, useState, type ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  p,
  tabsVariant,
  tabsOrientation,
  tabsColor,
  tabsTextColor,
  tabsSize,
  tabsFullWidth,
  tabsIsCentered,
  tabsShouldSelectOnFocus,
  tabsOverflowBehavior,
  tabsOverflowLabel,
  tabsScrollButtons,
  tabsShouldShowScrollButtonsOnMobile,
  tabsHasVisibleScrollbar,
  tabsBg,
  tabsSelectedBg,
  tabsHasDivider,
  tabsAriaLabel,
  tabsAs,
} from '../../utils/test/storiesArgs'
import { tabsVariantTokens } from '../../utils/test/storiesOptions'
import { Button } from '../../Button'
import { Icon } from '../../Icon'
import { Menu, MenuDivider } from '../../Menu'
import { MenuItem } from '../../MenuItem'
import { TabPanel } from '../TabPanel'
import { Typography } from '../../Typography'
import { Flex } from '../../Flex'
import { View } from '../../View'
import { Tab, type TabProps } from '../Tab'
import { TabContext } from '../TabContext'
import { TabList } from '../TabList'
import { TabScrollButton, type TabScrollButtonProps } from '../TabScrollButton'
import { baseTheme, createTheme } from '../../theme/themes'
import { ThemeProvider } from '../../theme'
import { exampleArgs } from '../../utils/test/renderExample'
import { tabsCatalog } from './Tabs.catalog'
import { Tabs, type TabsProps } from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Theme/Tabs/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      include: [
        'variant',
        'orientation',
        'color',
        'textColor',
        'size',
        'fullWidth',
        'isCentered',
        'shouldSelectOnFocus',
        'overflowBehavior',
        'overflowLabel',
        'scrollButtons',
        'shouldShowScrollButtonsOnMobile',
        'hasVisibleScrollbar',
        'hasDivider',
        'bg',
        'selectedBg',
        'aria-label',
        'as',
        'p',
      ],
    },
  },
  args: {
    ...exampleArgs(tabsCatalog.example),
    variant: 'underline',
    orientation: 'horizontal',
    color: 'primary',
    size: 'md',
    fullWidth: false,
    isCentered: false,
    shouldSelectOnFocus: false,
  },
  argTypes: {
    variant: tabsVariant,
    orientation: tabsOrientation,
    color: tabsColor,
    textColor: tabsTextColor,
    size: tabsSize,
    fullWidth: tabsFullWidth,
    isCentered: tabsIsCentered,
    shouldSelectOnFocus: tabsShouldSelectOnFocus,
    overflowBehavior: tabsOverflowBehavior,
    overflowLabel: tabsOverflowLabel,
    scrollButtons: tabsScrollButtons,
    shouldShowScrollButtonsOnMobile: tabsShouldShowScrollButtonsOnMobile,
    hasVisibleScrollbar: tabsHasVisibleScrollbar,
    bg: tabsBg,
    selectedBg: tabsSelectedBg,
    hasDivider: tabsHasDivider,
    'aria-label': tabsAriaLabel,
    as: tabsAs,
    p,
  },
}

export default meta
type Story = StoryObj<typeof Tabs>

/**
 * The tabs with a content area for the chosen one - under a row, beside a column - so a story
 * shows the content change as tabs are chosen.
 */
function WithContent({ args, children }: { args: Story['args']; children?: ReactNode }) {
  const [value, setValue] = useState<string | number>(args?.value ?? args?.defaultValue ?? 0)
  const isVertical = args?.orientation === 'vertical'
  const tabs = children ?? args?.children
  // The chosen tab's label, by its value; its position when it has no value of its own.
  const chosen = Children.toArray(tabs)
    .filter((tab) => isValidElement<TabProps>(tab))
    .find((tab, index) => (tab.props.value ?? index) === value)
  const label = chosen?.props.label ?? String(value)
  return (
    <Flex flexDirection={isVertical ? 'row' : 'column'} gap={2} minHeight={0} height="100%">
      <Tabs {...args} value={value} defaultValue={undefined} onChange={setValue}>
        {tabs}
      </Tabs>
      {/* Grows from nothing, so the tabs keep their own width and the content takes what is left. */}
      <Flex
        role="region"
        aria-label="Content"
        flexGrow={1}
        flexBasis={0}
        minWidth={0}
        gap={1}
        p={2}
      >
        <Typography variant="h6">{label}</Typography>
        <Typography color="secondary">
          The content of {label}. Choose another tab and this changes with it.
        </Typography>
      </Flex>
    </Flex>
  )
}

export const Default: Story = {
  render: (args) => <WithContent args={args} />,
}

export const Boxed: Story = {
  args: { variant: 'boxed', size: 'sm' },
  render: (args) => <WithContent args={args} />,
}

// The selected tab outlined on its top and sides, open onto the line along the row's foot.
export const Enclosed: Story = {
  args: { variant: 'enclosed', defaultValue: 'classic' },
  render: (args) => (
    <WithContent args={args}>
      <Tab value="images" label="Images" />
      <Tab value="classic" label="Classic" />
      <Tab value="videos" label="Videos" />
      <Tab value="stores" label="Stores" />
      <Tab value="settings" label="Settings" />
      <Tab value="tools" label="Tools" />
    </WithContent>
  ),
}

export const EnclosedVertical: Story = {
  args: { variant: 'enclosed', orientation: 'vertical', defaultValue: 'classic' },
  render: (args) => (
    <View width="28rem">
      <WithContent args={args}>
        <Tab value="images" label="Images" />
        <Tab value="classic" label="Classic" />
        <Tab value="videos" label="Videos" />
      </WithContent>
    </View>
  ),
}

export const EnclosedWithContentBeforeAndAfter: Story = {
  args: { variant: 'enclosed', defaultValue: 'classic', 'aria-label': 'Search' },
  render: (args) => (
    <WithContent
      args={{
        ...args,
        startContent: <Icon name="zoom_in" size="sm" />,
        endContent: (
          <Button size="sm" variant="text" aria-label="Add a view">
            +
          </Button>
        ),
      }}
    >
      <Tab value="images" label="Images" />
      <Tab value="classic" label="Classic" />
      <Tab value="videos" label="Videos" />
    </WithContent>
  ),
}

// The divider is the same switch in every look: a line under the row, round the selected tab
// when enclosed - or none.
export const Divider: Story = {
  render: (args) => (
    <Flex flexDirection="column" gap={4}>
      {tabsVariantTokens.flatMap((variant) =>
        [true, false].map((hasDivider) => (
          <Tabs
            key={`${variant}-${hasDivider}`}
            {...args}
            aria-label={`${variant}, ${hasDivider ? 'with' : 'without'} a divider`}
            variant={variant}
            hasDivider={hasDivider}
            startContent={<Icon name="zoom_in" size="sm" />}
            endContent={
              <Button size="sm" variant="text" aria-label="Add a view">
                +
              </Button>
            }
          />
        ))
      )}
    </Flex>
  ),
}

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <View width="28rem">
      <WithContent args={args} />
    </View>
  ),
}

export const FullWidth: Story = {
  args: { fullWidth: true },
  render: (args) => <WithContent args={args} />,
}

export const Centered: Story = {
  args: { isCentered: true },
  render: (args) => <WithContent args={args} />,
}

export const IconPosition: Story = {
  args: { defaultValue: 'top' },
  render: (args) => (
    <WithContent args={{ ...args, 'aria-label': 'Icon by position' }}>
      <Tab value="top" label="Top" icon={<Icon name="table" size="sm" color="inherit" />} />
      <Tab
        value="start"
        label="Start"
        icon={<Icon name="folder" size="sm" color="inherit" />}
        iconPosition="start"
      />
      <Tab
        value="end"
        label="End"
        icon={<Icon name="link" size="sm" color="inherit" />}
        iconPosition="end"
      />
      <Tab
        value="bottom"
        label="Bottom"
        icon={<Icon name="code" size="sm" color="inherit" />}
        iconPosition="bottom"
      />
    </WithContent>
  ),
}

export const WrappedLabels: Story = {
  render: (args) => (
    <View width="18rem">
      <Tabs {...args} fullWidth aria-label="Wrapped">
        <Tab value="canvas" label="Canvas" />
        <Tab value="long" label="A label long enough to wrap" isWrapped />
      </Tabs>
    </View>
  ),
}

export const Disabled: Story = {
  render: (args) => (
    <WithContent args={args}>
      <Tab value="canvas" label="Canvas" />
      <Tab value="system" label="Design system" disabled />
      <Tab value="common" label="Common components" />
    </WithContent>
  ),
}

export const Navigation: Story = {
  args: { defaultValue: 'layers', variant: 'boxed', 'aria-label': 'Left panel' },
  render: (args) => (
    <Tabs {...args} as="nav">
      <Tab value="layers" label="Layers" href="#layers" />
      <Tab value="assets" label="Assets" href="#assets" />
      <Tab value="variables" label="Variables" href="#variables" />
    </Tabs>
  ),
}

export const ContentBeforeAndAfter: Story = {
  args: { variant: 'boxed', size: 'sm', defaultValue: 'light' },
  render: (args) => (
    <WithContent
      args={{
        ...args,
        'aria-label': 'Themes',
        startContent: <Icon name="groups" size="sm" />,
        endContent: (
          <Button size="sm" variant="text" aria-label="Add a theme">
            +
          </Button>
        ),
      }}
    >
      <Tab value="light" label="Light" />
      <Tab value="dark" label="Dark" />
    </WithContent>
  ),
}

export const WithPanels: Story = {
  // A TabList is the Tabs of a TabContext - the context holds the value.
  render: ({ value: _value, defaultValue: _defaultValue, ...args }) => (
    <TabContext defaultValue="canvas">
      <TabList {...args} />
      <TabPanel value="canvas" p={2}>
        <Typography>The canvas.</Typography>
      </TabPanel>
      <TabPanel value="system" p={2}>
        <Typography>The design system.</Typography>
      </TabPanel>
      <TabPanel value="common" p={2}>
        <Typography>Common components.</Typography>
      </TabPanel>
    </TabContext>
  ),
}

function EditorTabs(args: Story['args']) {
  const [open, setOpen] = useState(['Button', 'Card', 'Select'])
  const [view, setView] = useState<string | number>('canvas')
  const closeTab = (value: string | number) => {
    setOpen((tabs) => tabs.filter((name) => name !== value))
    if (view === value) setView('canvas')
  }
  return (
    <Tabs
      {...args}
      aria-label="Views"
      value={view}
      defaultValue={undefined}
      onChange={setView}
      onTabClose={closeTab}
    >
      <Tab value="canvas" label="Canvas" />
      {open.map((name) => (
        <Tab key={name} value={name} label={name} closeLabel={`Close ${name}`} />
      ))}
    </Tabs>
  )
}

export const Closable: Story = {
  args: { variant: 'boxed', size: 'sm' },
  render: (args) => <EditorTabs {...args} />,
}

// A tab's own menu, opened from its secondary action.
function ThemeMenu({ name }: { name: string }) {
  return (
    <Menu
      align="end"
      trigger={
        <Button size="sm" variant="text" aria-label={`${name} theme options`}>
          ⋮
        </Button>
      }
    >
      <MenuItem value="rename">Rename...</MenuItem>
      <MenuItem value="duplicate">Duplicate</MenuItem>
      <MenuDivider />
      <MenuItem value="delete">Delete</MenuItem>
    </Menu>
  )
}

export const SecondaryAction: Story = {
  args: { variant: 'boxed', size: 'sm', defaultValue: 'light' },
  render: (args) => (
    <Tabs {...args} aria-label="Themes">
      <Tab value="light" label="Light" secondaryAction={<ThemeMenu name="Light" />} />
      <Tab value="dark" label="Dark" secondaryAction={<ThemeMenu name="Dark" />} />
    </Tabs>
  ),
}

const manyTabs = Array.from({ length: 20 }, (_, index) => (
  <Tab key={index} value={index} label={`Component ${index + 1}`} />
))

export const Scrolling: Story = {
  args: { defaultValue: 0, overflowBehavior: 'scroll', scrollButtons: 'auto' },
  render: (args) => (
    <View width="28rem" maxWidth="100%">
      <WithContent args={{ ...args, 'aria-label': 'Components' }}>{manyTabs}</WithContent>
    </View>
  ),
}

export const ScrollButtonsAlways: Story = {
  args: { defaultValue: 0, overflowBehavior: 'scroll', scrollButtons: 'always' },
  render: (args) => (
    <View width="28rem" maxWidth="100%">
      <WithContent args={{ ...args, 'aria-label': 'Components' }}>{manyTabs}</WithContent>
    </View>
  ),
}

export const VisibleScrollbar: Story = {
  args: {
    defaultValue: 0,
    overflowBehavior: 'scroll',
    scrollButtons: 'never',
    hasVisibleScrollbar: true,
  },
  render: (args) => (
    <View width="28rem" maxWidth="100%">
      <WithContent args={{ ...args, 'aria-label': 'Components' }}>{manyTabs}</WithContent>
    </View>
  ),
}

// A row whose tabs don't fit: the ones that do are drawn whole, the rest are listed behind the
// button at its end - closable there too. Drag the box's corner to give it more or less room.
function OverflowRow(args: Readonly<Partial<TabsProps>>) {
  const [open, setOpen] = useState(() => Array.from({ length: 20 }, (_, index) => index))
  const isVertical = args.orientation === 'vertical'
  return (
    <View
      {...(isVertical ? { height: '16rem', display: 'flex' } : { width: '28rem' })}
      maxWidth="100%"
      overflow="hidden"
      style={{ resize: isVertical ? 'vertical' : 'horizontal' }}
    >
      <Tabs
        {...args}
        aria-label="Components"
        onTabClose={(value) => setOpen(open.filter((index) => index !== value))}
      >
        {open.map((index) => (
          <Tab
            key={index}
            value={index}
            label={`Component ${index + 1}`}
            closeLabel={`Close Component ${index + 1}`}
          />
        ))}
      </Tabs>
    </View>
  )
}

export const OverflowMenu: Story = {
  args: { defaultValue: 0, overflowBehavior: 'menu', overflowLabel: 'More tabs' },
  render: (args) => <OverflowRow {...args} />,
}

// Down a column: the tabs that fit its height are drawn, the rest are behind the button below.
export const OverflowMenuVertical: Story = {
  args: {
    defaultValue: 0,
    overflowBehavior: 'menu',
    overflowLabel: 'More tabs',
    orientation: 'vertical',
  },
  render: (args) => <OverflowRow {...args} />,
}

// The enclosed look with content after the tabs: the button draws its stretch of the divider,
// and the content takes its room before the tabs are fitted.
export const OverflowMenuEnclosed: Story = {
  args: {
    defaultValue: 0,
    overflowBehavior: 'menu',
    overflowLabel: 'More tabs',
    variant: 'enclosed',
  },
  render: (args) => (
    <OverflowRow
      {...args}
      endContent={
        <Button size="sm" variant="text" aria-label="New tab">
          +
        </Button>
      }
    />
  ),
}

export const VerticalScrolling: Story = {
  args: { defaultValue: 0, overflowBehavior: 'scroll', orientation: 'vertical' },
  render: (args) => (
    <View width="28rem" height="16rem" display="flex">
      <WithContent args={{ ...args, 'aria-label': 'Components' }}>{manyTabs}</WithContent>
    </View>
  ),
}

// ---------------------------------------------------------------------------------------------
// Customization - every part of the row through the theme, and a scroll button of your own.

const customTheme = createTheme(baseTheme, {
  components: {
    Tabs: {
      defaultProps: { color: 'secondary' },
      styleOverrides: {
        // A short bar centred under the selected tab, in place of the full-width indicator.
        indicator: ({ theme }) => ({
          backgroundColor: 'transparent',
          '&::after': {
            content: '""',
            display: 'block',
            width: theme.space[5],
            height: '100%',
            marginInline: 'auto',
            backgroundColor: theme.palette.secondary.main,
            borderRadius: theme.radii.sm,
          },
        }),
      },
    },
    Tab: {
      styleOverrides: {
        label: ({ theme }) => ({
          fontWeight: theme.fontWeights.normal,
          '&[aria-selected="true"]': { fontWeight: theme.fontWeights.bold },
          '&:hover': { color: theme.palette.secondary.light },
        }),
      },
    },
  },
})

// A scroll button of your own - the Tabs hands it the same props as its own.
function ArrowButton(props: TabScrollButtonProps) {
  return <TabScrollButton {...props}>{props.direction === 'start' ? '‹' : '›'}</TabScrollButton>
}

export const Customized: Story = {
  render: () => (
    <ThemeProvider theme={customTheme}>
      <View width="30rem" maxWidth="100%">
        <Tabs
          aria-label="Customized"
          defaultValue={0}
          overflowBehavior="scroll"
          shouldShowScrollButtonsOnMobile
          slots={{ scrollButton: ArrowButton }}
        >
          {Array.from({ length: 10 }, (_, index) => (
            <Tab key={index} value={index} label={`Item ${index + 1}`} />
          ))}
        </Tabs>
      </View>
    </ThemeProvider>
  ),
}

// No divider, no border: the strip is one ground, the selected tab another - its panel's.
export const EnclosedWithoutDivider: Story = {
  render: () => (
    <TabContext defaultValue="classic">
      <TabList
        aria-label="Views"
        variant="enclosed"
        hasDivider={false}
        bg="default"
        selectedBg="paper"
      >
        <Tab value="images" label="Images" />
        <Tab value="classic" label="Classic" />
        <Tab value="videos" label="Videos" />
      </TabList>
      {['images', 'classic', 'videos'].map((value) => (
        <TabPanel key={value} value={value} bg="paper" p={3}>
          <Typography>The {value} view - its tab shares this ground.</Typography>
        </TabPanel>
      ))}
    </TabContext>
  ),
}

// The reference structure: the TabContext holds the value, the TabList shows it.
function ControlledTabContext() {
  const [value, setValue] = useState<string | number>('1')
  return (
    <TabContext value={value}>
      <TabList onChange={setValue} aria-label="Item tabs">
        <Tab label="Item One" value="1" />
        <Tab label="Item Two" value="2" />
        <Tab label="Item Three" value="3" />
      </TabList>
      <TabPanel value="1" p={2} shouldKeepMounted>
        <Typography>Item One</Typography>
      </TabPanel>
      <TabPanel value="2" p={2} shouldKeepMounted>
        <Typography>Item Two</Typography>
      </TabPanel>
      <TabPanel value="3" p={2} shouldKeepMounted>
        <Typography>Item Three</Typography>
      </TabPanel>
    </TabContext>
  )
}

export const ReferenceStructure: Story = {
  render: () => <ControlledTabContext />,
}
