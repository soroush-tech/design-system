import { createRef, type ReactNode } from 'react'
import { describe, it, expect, afterEach, vi } from 'vitest'
import { act, render, cleanup, fireEvent, screen } from '@testing-library/react'
import { ThemeProvider } from './theme'
import { Flex } from './Flex'
import { Grid } from './Grid'
import { View } from './View'
import { createTheme, baseTheme, type ThemeComponents } from './theme/themes'
import { AppBar } from './AppBar'
import { Avatar } from './Avatar'
import { Backdrop } from './Backdrop'
import { Button } from './Button'
import { ButtonGroup } from './ButtonGroup'
import { Checkbox } from './Checkbox'
import { CircularProgress } from './CircularProgress'
import { ContextMenu } from './Menu/ContextMenu'
import { Drawer } from './Drawer'
import { FormControl } from './FormControl'
import { FormHelperText } from './FormHelperText'
import { FormLabel } from './FormLabel'
import { Icon } from './Icon'
import { Image } from './Image'
import { LinearProgress } from './LinearProgress'
import { Link } from './Link'
import { Menu } from './Menu/Menu'
import { MenuDivider } from './Menu/MenuDivider'
import { MenuItem } from './MenuItem'
import { MenuList } from './Menu/MenuList'
import { Modal } from './Modal'
import { NativeSelect } from './NativeSelect'
import { Pagination } from './Pagination'
import { InputRange } from './InputRange'
import { NumberField } from './NumberField'
import { Rating } from './Rating'
import { Breadcrumbs } from './Breadcrumbs'
import { Paper } from './Paper'
import { Popover } from './Popover'
import { Pressable } from './Pressable'
import { Quote } from './Quote'
import { Radio } from './Radio'
import { Select } from './Select'
import { Sidebar, SidebarItem } from './Sidebar'
import { Skeleton } from './Skeleton'
import { Switch } from './Switch'
import { Table } from './Table/Table'
import { TableBody } from './Table/TableBody'
import { TableCell } from './Table/TableCell'
import { TableContainer } from './Table/TableContainer'
import { TableFooter } from './Table/TableFooter'
import { TableHead } from './Table/TableHead'
import { TablePagination } from './Table/TablePagination'
import { TableRow } from './Table/TableRow'
import { TableSortLabel } from './Table/TableSortLabel'
import { TabPanel } from './Tabs/TabPanel'
import { Tab, Tabs, TabContext, type TabsActions } from './Tabs'
import { TextInput } from './TextInput'
import { ToggleButton } from './ToggleButton/ToggleButton'
import { ToggleButtonGroup } from './ToggleButton/ToggleButtonGroup'
import { TransferList } from './TransferList'
import { Collapse } from './Collapse'
import { Snackbar } from './Snackbar'
import { Fab } from './Fab'
import { Alert, AlertTitle } from './Alert'
import { Badge } from './Badge'
import { Chip } from './Chip'
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
} from './Accordion'
import { Typography } from './Typography'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

// A declaration no component sets on its own, so a match proves the override applied.
const MARKER = { textIndent: '7px' }

/**
 * Finds the rendered element whose emotion class carries the given styled
 * `label` - works across portals since it scans the whole document.
 */
function byLabel(label: string): HTMLElement {
  const matcher = new RegExp(`(^|\\s)css-[^ ]+-${label}(\\s|$)`)
  const match = Array.from(document.body.querySelectorAll<HTMLElement>('*')).find((element) =>
    matcher.test(element.getAttribute('class') ?? '')
  )
  if (!match) throw new Error(`no element rendered with emotion label "${label}"`)
  return match
}

function makeAnchor() {
  const anchor = document.createElement('button')
  anchor.getBoundingClientRect = () =>
    ({ top: 100, left: 40, width: 120, height: 30, bottom: 130, right: 160 }) as DOMRect
  document.body.appendChild(anchor)
  return anchor
}

interface Case {
  /** `theme.components` key receiving the styleOverrides. */
  name: keyof ThemeComponents
  /** The `styleOverrides` slot under test. */
  slot: string
  /** Emotion `label` of the styled element the override must land on. */
  label: string
  ui: ReactNode
  /** Post-render interaction that mounts the slot's element (e.g. opening a menu). */
  open?: () => void
}

const table = (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>h</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>c</TableCell>
      </TableRow>
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell>f</TableCell>
      </TableRow>
    </TableFooter>
  </Table>
)

// Marked, labelled and with two thumbs, so every slot - the marks and their labels, each thumb's
// value label and input - is drawn.
const inputRange = (
  <InputRange
    defaultValue={[10, 60]}
    marks={[{ value: 0, label: 'min' }, { value: 100 }]}
    valueLabel="on"
  />
)

// Both buttons drawn, so every slot - the stacked pair and each of them - is.
const numberField = <NumberField defaultValue={1} />

// Fractional and named, so every slot - the steps of an icon, the "no rating" radio - is drawn.
// Open, with every part, so each styled element is drawn.
const accordion = (
  <AccordionGroup>
    <Accordion defaultExpanded>
      <AccordionSummary>Title</AccordionSummary>
      <AccordionDetails>Body</AccordionDetails>
      <AccordionActions>Save</AccordionActions>
    </Accordion>
  </AccordionGroup>
)
// A chip with an icon, a delete control and a second with an avatar, so every part is drawn.
const chip = (
  <>
    <Chip label="Tag" icon={<span />} onDelete={() => {}} deleteLabel="Remove" />
    <Chip label="Tag" avatar={<span />} />
  </>
)
// A badge with content and a label, so every part is drawn.
const badge = (
  <Badge badgeContent={4} badgeLabel="4 unread">
    <span>Inbox</span>
  </Badge>
)
// An alert with a title, an action and a close control, so every part is drawn.
const alert = (
  <Alert onClose={() => {}} closeLabel="Close" action={<span />}>
    <AlertTitle>Title</AlertTitle>
    Message
  </Alert>
)
// A fab with its root drawn.
const fab = <Fab aria-label="Add">+</Fab>
// An open snackbar with an action, so every part is drawn.
const snackbar = <Snackbar defaultOpen message="Saved" action={<span />} />
// Open, so the root, the wrapper and the inner box are all drawn.
const collapse = (
  <Collapse isShown shouldAppear={false}>
    Content
  </Collapse>
)
// Both lists with a header, a checked row and a title, so every slot - the count and the icons too - is drawn.
const transferList = (
  <TransferList
    items={[
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B' },
    ]}
    defaultValue={['b']}
    leftLabel="Left"
    rightLabel="Right"
    hasSelectAll
  />
)
const rating = <Rating precision={0.5} max={2} emptyLabelText="None" />

// Collapsed, so every slot - the button and its icon too - is drawn.
const breadcrumbs = (
  <Breadcrumbs maxItems={2} expandLabel="Show path">
    <span>a</span>
    <span>b</span>
    <span>c</span>
  </Breadcrumbs>
)

const tabs = (
  <Tabs startContent={<span>s</span>} endContent={<span>e</span>}>
    <Tab label="t" icon={<span>i</span>} closeLabel="c" secondaryAction={<span>a</span>} />
  </Tabs>
)

// A row with room for one tab, so the second goes to the menu. jsdom lays nothing out: the
// sizes are stubbed, then the row measured again.
const overflowAction = createRef<TabsActions>()
const overflowingTabs = (
  <Tabs overflowBehavior="menu" overflowLabel="More" action={overflowAction} defaultValue={0}>
    <Tab label="a" />
    <Tab label="b" closeLabel="Close b" />
  </Tabs>
)
const overflow = () => {
  vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(100)
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
    width: 100,
    height: 100,
  } as DOMRect)
  act(() => overflowAction.current!.updateOverflow())
}

const tabPanel = (
  <TabContext defaultValue="a">
    <TabPanel value="a">p</TabPanel>
  </TabContext>
)

const tablePagination = (
  <table>
    <tfoot>
      <tr>
        <TablePagination count={100} page={2} rowsPerPage={10} onPageChange={() => {}} />
      </tr>
    </tfoot>
  </table>
)

const cases: Case[] = [
  { name: 'AppBar', slot: 'root', label: 'AppBar', ui: <AppBar>x</AppBar> },
  { name: 'Avatar', slot: 'root', label: 'avatar', ui: <Avatar>A</Avatar> },
  { name: 'Backdrop', slot: 'root', label: 'Backdrop', ui: <Backdrop /> },
  {
    name: 'ButtonGroup',
    slot: 'root',
    label: 'ButtonGroup',
    ui: (
      <ButtonGroup>
        <Button>a</Button>
      </ButtonGroup>
    ),
  },
  { name: 'Checkbox', slot: 'root', label: 'Checkbox', ui: <Checkbox /> },
  {
    name: 'CircularProgress',
    slot: 'root',
    label: 'CircularProgress',
    ui: <CircularProgress />,
  },
  { name: 'Drawer', slot: 'root', label: 'Drawer', ui: <Drawer id="drawer">x</Drawer> },
  { name: 'FormControl', slot: 'root', label: 'FormControl', ui: <FormControl>x</FormControl> },
  {
    name: 'FormHelperText',
    slot: 'root',
    label: 'FormHelperText',
    ui: <FormHelperText>h</FormHelperText>,
  },
  { name: 'FormLabel', slot: 'root', label: 'FormLabel', ui: <FormLabel>l</FormLabel> },
  { name: 'Icon', slot: 'root', label: 'icon', ui: <Icon name="external_link" /> },
  { name: 'Image', slot: 'root', label: 'image', ui: <Image src="p.jpg" alt="t" /> },
  { name: 'LinearProgress', slot: 'root', label: 'LinearProgress', ui: <LinearProgress /> },
  { name: 'Link', slot: 'root', label: 'Link', ui: <Link href="/">x</Link> },
  { name: 'MenuItem', slot: 'root', label: 'MenuItem', ui: <MenuItem value="a">A</MenuItem> },
  { name: 'MenuList', slot: 'root', label: 'MenuList', ui: <MenuList /> },
  {
    name: 'ContextMenu',
    slot: 'root',
    label: 'ContextMenu',
    ui: <ContextMenu target={<div>t</div>} />,
  },
  {
    name: 'Menu',
    slot: 'root',
    label: 'Menu',
    ui: <Menu trigger={<button type="button">m</button>} />,
  },
  {
    name: 'MenuDivider',
    slot: 'root',
    label: 'MenuDivider',
    ui: (
      <ul>
        <MenuDivider />
      </ul>
    ),
  },
  {
    name: 'Modal',
    slot: 'root',
    label: 'Modal',
    ui: (
      <Modal isOpen>
        <div>x</div>
      </Modal>
    ),
  },
  {
    name: 'NativeSelect',
    slot: 'root',
    label: 'NativeSelect',
    ui: <NativeSelect options={[{ label: 'Ten', value: 10 }]} defaultValue={10} />,
  },
  { name: 'Pagination', slot: 'root', label: 'PaginationNav', ui: <Pagination count={3} /> },
  { name: 'InputRange', slot: 'root', label: 'InputRange', ui: inputRange },
  { name: 'InputRange', slot: 'rail', label: 'InputRangeRail', ui: inputRange },
  { name: 'InputRange', slot: 'track', label: 'InputRangeTrack', ui: inputRange },
  { name: 'InputRange', slot: 'thumb', label: 'InputRangeThumb', ui: inputRange },
  { name: 'InputRange', slot: 'mark', label: 'InputRangeMark', ui: inputRange },
  { name: 'InputRange', slot: 'markLabel', label: 'InputRangeMarkLabel', ui: inputRange },
  { name: 'InputRange', slot: 'valueLabel', label: 'InputRangeValueLabel', ui: inputRange },
  { name: 'InputRange', slot: 'input', label: 'InputRangeInput', ui: inputRange },
  { name: 'NumberField', slot: 'root', label: 'NumberField', ui: numberField },
  { name: 'NumberField', slot: 'input', label: 'NumberFieldInput', ui: numberField },
  { name: 'NumberField', slot: 'spinButtons', label: 'NumberFieldSpinButtons', ui: numberField },
  { name: 'NumberField', slot: 'increment', label: 'NumberFieldIncrement', ui: numberField },
  { name: 'NumberField', slot: 'decrement', label: 'NumberFieldDecrement', ui: numberField },
  { name: 'Rating', slot: 'root', label: 'Rating', ui: rating },
  { name: 'Rating', slot: 'item', label: 'RatingItem', ui: rating },
  { name: 'Rating', slot: 'icon', label: 'RatingIcon', ui: rating },
  { name: 'Rating', slot: 'decimal', label: 'RatingDecimal', ui: rating },
  { name: 'Rating', slot: 'input', label: 'RatingInput', ui: rating },
  { name: 'Rating', slot: 'text', label: 'RatingText', ui: rating },
  { name: 'Rating', slot: 'emptyLabel', label: 'RatingEmptyLabel', ui: rating },
  { name: 'Breadcrumbs', slot: 'root', label: 'Breadcrumbs', ui: breadcrumbs },
  { name: 'Breadcrumbs', slot: 'list', label: 'BreadcrumbsList', ui: breadcrumbs },
  { name: 'Breadcrumbs', slot: 'item', label: 'BreadcrumbsItem', ui: breadcrumbs },
  { name: 'Breadcrumbs', slot: 'separator', label: 'BreadcrumbsSeparator', ui: breadcrumbs },
  { name: 'Breadcrumbs', slot: 'collapsed', label: 'BreadcrumbsCollapsed', ui: breadcrumbs },
  {
    name: 'Breadcrumbs',
    slot: 'collapsedIcon',
    label: 'BreadcrumbsCollapsedIcon',
    ui: breadcrumbs,
  },
  { name: 'Pagination', slot: 'list', label: 'Pagination', ui: <Pagination count={3} /> },
  {
    name: 'PaginationItem',
    slot: 'root',
    label: 'PaginationItem',
    ui: <Pagination count={3} />,
  },
  {
    name: 'PaginationItem',
    slot: 'ellipsis',
    label: 'PaginationEllipsis',
    ui: <Pagination count={20} />,
  },
  { name: 'Paper', slot: 'root', label: 'paper', ui: <Paper>x</Paper> },
  {
    name: 'Popover',
    slot: 'root',
    label: 'Popover',
    ui: (
      <Popover open anchorEl={makeAnchor()}>
        <p>P</p>
      </Popover>
    ),
  },
  { name: 'Pressable', slot: 'root', label: 'Pressable', ui: <Pressable>p</Pressable> },
  { name: 'Tabs', slot: 'root', label: 'Tabs', ui: tabs },
  { name: 'Tab', slot: 'root', label: 'Tab', ui: tabs },
  { name: 'TabPanel', slot: 'root', label: 'TabPanel', ui: tabPanel },
  { name: 'Quote', slot: 'root', label: 'Quote', ui: <Quote>q</Quote> },
  { name: 'Radio', slot: 'root', label: 'Radio', ui: <Radio /> },
  {
    name: 'Select',
    slot: 'root',
    label: 'Select',
    ui: (
      <Select defaultValue={1}>
        <MenuItem value={1}>One</MenuItem>
      </Select>
    ),
  },
  {
    name: 'Sidebar',
    slot: 'root',
    label: 'Sidebar',
    ui: (
      <Sidebar aria-label="Panels" isOpen>
        <SidebarItem icon="folder" label="Directory" />
      </Sidebar>
    ),
  },
  {
    name: 'SidebarItem',
    slot: 'root',
    label: 'SidebarItem',
    ui: (
      <Sidebar aria-label="Panels" isOpen>
        <SidebarItem icon="folder" label="Directory" />
      </Sidebar>
    ),
  },
  { name: 'Skeleton', slot: 'root', label: 'skeleton', ui: <Skeleton /> },
  { name: 'Switch', slot: 'root', label: 'Switch', ui: <Switch /> },
  { name: 'Table', slot: 'root', label: 'Table', ui: table },
  { name: 'TableBody', slot: 'root', label: 'TableBody', ui: table },
  { name: 'TableCell', slot: 'root', label: 'TableCell', ui: table },
  {
    name: 'TableContainer',
    slot: 'root',
    label: 'TableContainer',
    ui: <TableContainer>x</TableContainer>,
  },
  { name: 'TableFooter', slot: 'root', label: 'TableFooter', ui: table },
  { name: 'TableHead', slot: 'root', label: 'TableHead', ui: table },
  {
    name: 'TablePagination',
    slot: 'root',
    label: 'TablePaginationToolbar',
    ui: tablePagination,
  },
  {
    name: 'TablePaginationActions',
    slot: 'root',
    label: 'TablePaginationActions',
    ui: tablePagination,
  },
  { name: 'TableRow', slot: 'root', label: 'TableRow', ui: table },
  {
    name: 'TableSortLabel',
    slot: 'root',
    label: 'TableSortLabel',
    ui: <TableSortLabel>Name</TableSortLabel>,
  },
  { name: 'TextInput', slot: 'root', label: 'TextInput', ui: <TextInput /> },
  {
    name: 'ToggleButton',
    slot: 'root',
    label: 'ToggleButton',
    ui: <ToggleButton value="b">B</ToggleButton>,
  },
  {
    name: 'ToggleButtonGroup',
    slot: 'root',
    label: 'ToggleButtonGroup',
    ui: (
      <ToggleButtonGroup aria-label="g" value="b" onChange={() => {}}>
        <ToggleButton value="b">B</ToggleButton>
      </ToggleButtonGroup>
    ),
  },
  { name: 'TransferList', slot: 'root', label: 'TransferList', ui: transferList },
  { name: 'TransferList', slot: 'list', label: 'TransferListList', ui: transferList },
  { name: 'TransferList', slot: 'header', label: 'TransferListHeader', ui: transferList },
  { name: 'TransferList', slot: 'title', label: 'TransferListTitle', ui: transferList },
  { name: 'TransferList', slot: 'count', label: 'TransferListCount', ui: transferList },
  { name: 'TransferList', slot: 'items', label: 'TransferListItems', ui: transferList },
  { name: 'TransferList', slot: 'item', label: 'TransferListItem', ui: transferList },
  { name: 'TransferList', slot: 'controls', label: 'TransferListControls', ui: transferList },
  { name: 'TransferList', slot: 'icon', label: 'TransferListIcon', ui: transferList },
  { name: 'Accordion', slot: 'root', label: 'Accordion', ui: accordion },
  { name: 'Accordion', slot: 'region', label: 'AccordionRegion', ui: accordion },
  { name: 'AccordionSummary', slot: 'root', label: 'AccordionSummary', ui: accordion },
  { name: 'AccordionSummary', slot: 'button', label: 'AccordionSummaryButton', ui: accordion },
  { name: 'AccordionSummary', slot: 'content', label: 'AccordionSummaryContent', ui: accordion },
  { name: 'AccordionSummary', slot: 'icon', label: 'AccordionSummaryIcon', ui: accordion },
  { name: 'AccordionDetails', slot: 'root', label: 'AccordionDetails', ui: accordion },
  { name: 'AccordionActions', slot: 'root', label: 'AccordionActions', ui: accordion },
  { name: 'AccordionGroup', slot: 'root', label: 'AccordionGroup', ui: accordion },
  { name: 'Chip', slot: 'root', label: 'Chip', ui: chip },
  { name: 'Chip', slot: 'body', label: 'ChipBody', ui: chip },
  { name: 'Chip', slot: 'label', label: 'ChipLabel', ui: chip },
  { name: 'Chip', slot: 'icon', label: 'ChipIcon', ui: chip },
  { name: 'Chip', slot: 'avatar', label: 'ChipAvatar', ui: chip },
  { name: 'Chip', slot: 'deleteIcon', label: 'ChipDeleteIcon', ui: chip },
  { name: 'Badge', slot: 'root', label: 'Badge', ui: badge },
  { name: 'Badge', slot: 'badge', label: 'BadgeMark', ui: badge },
  { name: 'Badge', slot: 'label', label: 'BadgeLabel', ui: badge },
  { name: 'Alert', slot: 'root', label: 'Alert', ui: alert },
  { name: 'Alert', slot: 'icon', label: 'AlertIcon', ui: alert },
  { name: 'Alert', slot: 'message', label: 'AlertMessage', ui: alert },
  { name: 'Alert', slot: 'action', label: 'AlertAction', ui: alert },
  { name: 'Alert', slot: 'closeButton', label: 'AlertCloseButton', ui: alert },
  { name: 'AlertTitle', slot: 'root', label: 'AlertTitle', ui: alert },
  { name: 'Fab', slot: 'root', label: 'Fab', ui: fab },
  { name: 'Snackbar', slot: 'root', label: 'Snackbar', ui: snackbar },
  { name: 'Snackbar', slot: 'content', label: 'SnackbarContent', ui: snackbar },
  { name: 'Snackbar', slot: 'message', label: 'SnackbarMessage', ui: snackbar },
  { name: 'Snackbar', slot: 'action', label: 'SnackbarAction', ui: snackbar },
  { name: 'Collapse', slot: 'root', label: 'Collapse', ui: collapse },
  { name: 'Collapse', slot: 'wrapper', label: 'CollapseWrapper', ui: collapse },
  { name: 'Collapse', slot: 'inner', label: 'CollapseInner', ui: collapse },
  { name: 'Typography', slot: 'root', label: 'Typography', ui: <Typography>t</Typography> },
  { name: 'View', slot: 'root', label: 'View', ui: <View>v</View> },
  { name: 'Flex', slot: 'root', label: 'flex', ui: <Flex>f</Flex> },
  { name: 'Grid', slot: 'root', label: 'grid', ui: <Grid>g</Grid> },
  { name: 'Avatar', slot: 'img', label: 'AvatarImg', ui: <Avatar src="p.jpg" alt="a" /> },
  {
    name: 'Button',
    slot: 'loader',
    label: 'ButtonLoader',
    ui: (
      <Button loading loadingPosition="center">
        x
      </Button>
    ),
  },
  { name: 'Checkbox', slot: 'input', label: 'CheckboxInput', ui: <Checkbox /> },
  { name: 'Checkbox', slot: 'icon', label: 'CheckboxIcon', ui: <Checkbox /> },
  {
    name: 'CircularProgress',
    slot: 'track',
    label: 'CircularProgressTrack',
    ui: <CircularProgress showTrack />,
  },
  {
    name: 'CircularProgress',
    slot: 'circle',
    label: 'CircularProgressCircle',
    ui: <CircularProgress />,
  },
  {
    name: 'LinearProgress',
    slot: 'track',
    label: 'LinearProgressTrack',
    ui: <LinearProgress />,
  },
  {
    name: 'LinearProgress',
    slot: 'dash',
    label: 'LinearProgressDash',
    ui: <LinearProgress variant="determinate" buffer value={30} valueBuffer={50} />,
  },
  {
    name: 'LinearProgress',
    slot: 'bar',
    label: 'LinearProgressBar',
    ui: <LinearProgress variant="determinate" value={40} />,
  },
  {
    name: 'LinearProgress',
    slot: 'traveler',
    label: 'LinearProgressTraveler',
    ui: <LinearProgress variant="determinate" value={40} spinning />,
  },
  {
    name: 'LinearProgress',
    slot: 'segment',
    label: 'LinearProgressSegment',
    ui: <LinearProgress variant="determinate" value={40} spinning />,
  },
  {
    name: 'LinearProgress',
    slot: 'secondaryBar',
    label: 'LinearProgressBarSecondary',
    ui: <LinearProgress />,
  },
  {
    name: 'MenuItem',
    slot: 'check',
    label: 'MenuItemCheck',
    ui: (
      <MenuItem multiple value="a">
        A
      </MenuItem>
    ),
  },
  {
    name: 'MenuItem',
    slot: 'startIcon',
    label: 'MenuItemStartIcon',
    ui: (
      <MenuList>
        <MenuItem shortcut="F2">A</MenuItem>
      </MenuList>
    ),
  },
  {
    name: 'MenuItem',
    slot: 'label',
    label: 'MenuItemLabel',
    ui: (
      <MenuList>
        <MenuItem shortcut="F2">A</MenuItem>
      </MenuList>
    ),
  },
  {
    name: 'MenuItem',
    slot: 'shortcut',
    label: 'MenuItemShortcut',
    ui: (
      <MenuList>
        <MenuItem shortcut="F2">A</MenuItem>
      </MenuList>
    ),
  },
  {
    name: 'MenuItem',
    slot: 'submenuIcon',
    label: 'MenuItemSubmenuIcon',
    ui: (
      <MenuList>
        <MenuItem submenu={null}>A</MenuItem>
      </MenuList>
    ),
  },
  {
    name: 'MenuItem',
    slot: 'secondaryAction',
    label: 'MenuItemSecondaryAction',
    ui: (
      <MenuList>
        <MenuItem secondaryAction={<span>x</span>}>A</MenuItem>
      </MenuList>
    ),
  },
  {
    name: 'MenuItem',
    slot: 'entry',
    label: 'MenuItemEntry',
    ui: (
      <MenuList>
        <MenuItem submenu={null}>A</MenuItem>
      </MenuList>
    ),
  },
  {
    name: 'Menu',
    slot: 'paper',
    label: 'MenuPaper',
    ui: <Menu trigger={<button type="button">m</button>} defaultOpen />,
  },
  {
    name: 'ContextMenu',
    slot: 'paper',
    label: 'ContextMenuPaper',
    ui: <ContextMenu target={<div>t</div>} />,
    open: () => fireEvent.contextMenu(screen.getByText('t')),
  },
  {
    name: 'NativeSelect',
    slot: 'select',
    label: 'NativeSelectSelect',
    ui: <NativeSelect options={[{ label: 'Ten', value: 10 }]} defaultValue={10} />,
  },
  {
    name: 'NativeSelect',
    slot: 'icon',
    label: 'NativeSelectIcon',
    ui: <NativeSelect options={[{ label: 'Ten', value: 10 }]} defaultValue={10} />,
  },
  {
    name: 'Popover',
    slot: 'positioner',
    label: 'PopoverPositioner',
    ui: (
      <Popover open anchorEl={makeAnchor()}>
        <p>P</p>
      </Popover>
    ),
  },
  { name: 'Radio', slot: 'input', label: 'RadioInput', ui: <Radio /> },
  { name: 'Radio', slot: 'icon', label: 'RadioIcon', ui: <Radio /> },
  {
    name: 'Select',
    slot: 'value',
    label: 'SelectValue',
    ui: (
      <Select defaultValue={1}>
        <MenuItem value={1}>One</MenuItem>
      </Select>
    ),
  },
  {
    name: 'Select',
    slot: 'valueArea',
    label: 'SelectValueArea',
    ui: (
      <Select defaultValue={1}>
        <MenuItem value={1}>One</MenuItem>
      </Select>
    ),
  },
  {
    name: 'Select',
    slot: 'valueGhost',
    label: 'SelectValueGhost',
    ui: (
      <Select defaultValue={1}>
        <MenuItem value={1}>One</MenuItem>
      </Select>
    ),
  },
  {
    name: 'Select',
    slot: 'listbox',
    label: 'SelectListbox',
    ui: (
      <Select defaultValue={1}>
        <MenuItem value={1}>One</MenuItem>
      </Select>
    ),
    open: () => fireEvent.click(screen.getByRole('combobox')),
  },
  { name: 'Skeleton', slot: 'content', label: 'SkeletonContent', ui: <Skeleton>t</Skeleton> },
  { name: 'Switch', slot: 'input', label: 'SwitchInput', ui: <Switch /> },
  { name: 'Switch', slot: 'track', label: 'SwitchTrack', ui: <Switch /> },
  { name: 'Switch', slot: 'thumb', label: 'SwitchThumb', ui: <Switch /> },
  {
    name: 'TableSortLabel',
    slot: 'icon',
    label: 'TableSortLabelIcon',
    ui: <TableSortLabel>Name</TableSortLabel>,
  },
  { name: 'TextInput', slot: 'input', label: 'TextInputInput', ui: <TextInput /> },
  { name: 'Tabs', slot: 'list', label: 'TabsList', ui: tabs },
  { name: 'Tabs', slot: 'indicator', label: 'TabsIndicator', ui: tabs },
  { name: 'Tabs', slot: 'startContent', label: 'TabsStart', ui: tabs },
  { name: 'Tabs', slot: 'endContent', label: 'TabsEnd', ui: tabs },
  {
    name: 'Tabs',
    slot: 'scrollButton',
    label: 'TabsScrollButton',
    ui: (
      <Tabs overflowBehavior="scroll" scrollButtons="always">
        <Tab label="t" />
      </Tabs>
    ),
  },
  {
    name: 'Tabs',
    slot: 'overflowButton',
    label: 'TabsOverflowButton',
    ui: overflowingTabs,
    open: overflow,
  },
  {
    name: 'Tabs',
    slot: 'overflowClose',
    label: 'TabsOverflowClose',
    ui: overflowingTabs,
    open: () => {
      overflow()
      fireEvent.click(screen.getByRole('button', { name: 'More' }))
    },
  },
  { name: 'Tab', slot: 'label', label: 'TabLabel', ui: tabs },
  { name: 'Tab', slot: 'icon', label: 'TabIcon', ui: tabs },
  { name: 'Tab', slot: 'secondaryAction', label: 'TabSecondaryAction', ui: tabs },
  { name: 'Tab', slot: 'close', label: 'TabClose', ui: tabs },
]

describe('theme.components styleOverrides', () => {
  it.each(cases)('$name applies styleOverrides.$slot', ({ name, slot, label, ui, open }) => {
    const theme = createTheme(baseTheme, {
      components: { [name]: { styleOverrides: { [slot]: MARKER } } },
    })
    render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
    open?.()
    expect(byLabel(label)).toHaveStyle(MARKER)
  })
})
