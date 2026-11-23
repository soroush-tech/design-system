import { accordionCatalog } from './entries/Accordion'
import { accordionActionsCatalog } from './entries/AccordionActions'
import { accordionDetailsCatalog } from './entries/AccordionDetails'
import { accordionGroupCatalog } from './entries/AccordionGroup'
import { accordionSummaryCatalog } from './entries/AccordionSummary'
import { chipCatalog } from './entries/Chip'
import { badgeCatalog } from './entries/Badge'
import { alertCatalog } from './entries/Alert'
import { alertTitleCatalog } from './entries/AlertTitle'
import { fabCatalog } from './entries/Fab'
import { snackbarCatalog } from './entries/Snackbar'
import { tooltipCatalog } from './entries/Tooltip'
import { autocompleteCatalog } from './entries/Autocomplete'
import { scrollAreaCatalog } from './entries/ScrollArea'
import { fabMenuCatalog } from './entries/FabMenu'
import { fabMenuItemCatalog } from './entries/FabMenuItem'
import { navTreeCatalog } from './entries/NavTree'
import { navGroupCatalog } from './entries/NavGroup'
import { navLinkCatalog } from './entries/NavLink'
import { appBarCatalog } from './entries/AppBar'
import { avatarCatalog } from './entries/Avatar'
import { backdropCatalog } from './entries/Backdrop'
import { breadcrumbsCatalog } from './entries/Breadcrumbs'
import { buttonCatalog } from './entries/Button'
import { buttonGroupCatalog } from './entries/ButtonGroup'
import { cardCatalog } from './entries/Card'
import { checkboxCatalog } from './entries/Checkbox'
import { collapseCatalog } from './entries/Collapse'
import { fadeCatalog } from './entries/Fade'
import { growCatalog } from './entries/Grow'
import { slideCatalog } from './entries/Slide'
import { zoomCatalog } from './entries/Zoom'
import { contextMenuCatalog } from './entries/ContextMenu'
import { circularProgressCatalog } from './entries/CircularProgress'
import { drawerCatalog } from './entries/Drawer'
import { drawerToggleCatalog } from './entries/DrawerToggle'
import { flexCatalog } from './entries/Flex'
import { focusTrapCatalog } from './entries/FocusTrap'
import { formCatalog } from './entries/Form'
import { formControlCatalog } from './entries/FormControl'
import { formHelperTextCatalog } from './entries/FormHelperText'
import { formLabelCatalog } from './entries/FormLabel'
import { gridCatalog } from './entries/Grid'
import { iconCatalog } from './entries/Icon'
import { imageCatalog } from './entries/Image'
import { rangeInputCatalog } from './entries/RangeInput'
import { linearProgressCatalog } from './entries/LinearProgress'
import { linkCatalog } from './entries/Link'
import { menuCatalog } from './entries/Menu'
import { menuDividerCatalog } from './entries/MenuDivider'
import { menuItemCatalog } from './entries/MenuItem'
import { menuItemsCatalog } from './entries/MenuItems'
import { menuListCatalog } from './entries/MenuList'
import { modalCatalog } from './entries/Modal'
import { nativeSelectCatalog } from './entries/NativeSelect'
import { numberInputCatalog } from './entries/NumberInput'
import { paginationCatalog } from './entries/Pagination'
import { paginationItemCatalog } from './entries/PaginationItem'
import { paperCatalog } from './entries/Paper'
import { popoverCatalog } from './entries/Popover'
import { portalCatalog } from './entries/Portal'
import { pressableCatalog } from './entries/Pressable'
import { quoteCatalog } from './entries/Quote'
import { radioCatalog } from './entries/Radio'
import { ratingCatalog } from './entries/Rating'
import { selectCatalog } from './entries/Select'
import { sidebarCatalog } from './entries/Sidebar'
import { sidebarItemCatalog } from './entries/SidebarItem'
import { skeletonCatalog } from './entries/Skeleton'
import { switchCatalog } from './entries/Switch'
import { tabCatalog } from './entries/Tab'
import { tabPanelCatalog } from './entries/TabPanel'
import { tabsCatalog } from './entries/Tabs'
import { tabContextCatalog } from './entries/TabContext'
import { tabListCatalog } from './entries/TabList'
import { tabScrollButtonCatalog } from './entries/TabScrollButton'
import { tableCatalog } from './entries/Table'
import { tableBodyCatalog } from './entries/TableBody'
import { tableCellCatalog } from './entries/TableCell'
import { tableContainerCatalog } from './entries/TableContainer'
import { tableControlCatalog } from './entries/TableControl'
import { tableFooterCatalog } from './entries/TableFooter'
import { tableHeadCatalog } from './entries/TableHead'
import { tablePaginationCatalog } from './entries/TablePagination'
import { tablePaginationActionsCatalog } from './entries/TablePaginationActions'
import { tableRowCatalog } from './entries/TableRow'
import { tableSortLabelCatalog } from './entries/TableSortLabel'
import { textInputCatalog } from './entries/TextInput'
import { toggleButtonCatalog } from './entries/ToggleButton'
import { toggleButtonGroupCatalog } from './entries/ToggleButtonGroup'
import { transferListCatalog } from './entries/TransferList'
import { typographyCatalog } from './entries/Typography'
import { viewCatalog } from './entries/View'
import type { CatalogEntrySource } from './defineCatalogEntry'

/** Where a component's entry is imported from and, for a family member, the family. */
export interface CatalogSource {
  entry: CatalogEntrySource
  /** The subpath a platform library serves it from: `'Select'`, `'Table'` for `TableRow`. */
  subpath: string
  /** For a member of a family (`TableRow`), the family the docs list (`Table`). */
  family?: string
}

/** Every component, keyed by its export name. */
export const catalogSources: Record<string, CatalogSource> = {
  Accordion: { entry: accordionCatalog, subpath: 'Accordion' },
  AccordionActions: { entry: accordionActionsCatalog, subpath: 'Accordion', family: 'Accordion' },
  AccordionDetails: { entry: accordionDetailsCatalog, subpath: 'Accordion', family: 'Accordion' },
  AccordionGroup: { entry: accordionGroupCatalog, subpath: 'Accordion', family: 'Accordion' },
  AccordionSummary: { entry: accordionSummaryCatalog, subpath: 'Accordion', family: 'Accordion' },
  Chip: { entry: chipCatalog, subpath: 'Chip' },
  Badge: { entry: badgeCatalog, subpath: 'Badge' },
  Alert: { entry: alertCatalog, subpath: 'Alert' },
  AlertTitle: { entry: alertTitleCatalog, subpath: 'Alert', family: 'Alert' },
  Fab: { entry: fabCatalog, subpath: 'Fab' },
  Snackbar: { entry: snackbarCatalog, subpath: 'Snackbar' },
  Tooltip: { entry: tooltipCatalog, subpath: 'Tooltip' },
  Autocomplete: { entry: autocompleteCatalog, subpath: 'Autocomplete' },
  ScrollArea: { entry: scrollAreaCatalog, subpath: 'ScrollArea' },
  FabMenu: { entry: fabMenuCatalog, subpath: 'FabMenu' },
  FabMenuItem: { entry: fabMenuItemCatalog, subpath: 'FabMenu', family: 'FabMenu' },
  NavTree: { entry: navTreeCatalog, subpath: 'NavTree' },
  NavGroup: { entry: navGroupCatalog, subpath: 'NavTree', family: 'NavTree' },
  NavLink: { entry: navLinkCatalog, subpath: 'NavTree', family: 'NavTree' },
  AppBar: { entry: appBarCatalog, subpath: 'AppBar' },
  Avatar: { entry: avatarCatalog, subpath: 'Avatar' },
  Backdrop: { entry: backdropCatalog, subpath: 'Backdrop' },
  Breadcrumbs: { entry: breadcrumbsCatalog, subpath: 'Breadcrumbs' },
  Button: { entry: buttonCatalog, subpath: 'Button' },
  ButtonGroup: { entry: buttonGroupCatalog, subpath: 'ButtonGroup' },
  Card: { entry: cardCatalog, subpath: 'Card' },
  Checkbox: { entry: checkboxCatalog, subpath: 'Checkbox' },
  Collapse: { entry: collapseCatalog, subpath: 'Collapse' },
  Fade: { entry: fadeCatalog, subpath: 'Fade' },
  Grow: { entry: growCatalog, subpath: 'Grow' },
  Slide: { entry: slideCatalog, subpath: 'Slide' },
  Zoom: { entry: zoomCatalog, subpath: 'Zoom' },
  ContextMenu: { entry: contextMenuCatalog, subpath: 'Menu', family: 'Menu' },
  CircularProgress: { entry: circularProgressCatalog, subpath: 'CircularProgress' },
  Drawer: { entry: drawerCatalog, subpath: 'Drawer' },
  DrawerToggle: { entry: drawerToggleCatalog, subpath: 'Drawer', family: 'Drawer' },
  Flex: { entry: flexCatalog, subpath: 'Flex' },
  FocusTrap: { entry: focusTrapCatalog, subpath: 'FocusTrap' },
  Form: { entry: formCatalog, subpath: 'Form' },
  FormControl: { entry: formControlCatalog, subpath: 'FormControl' },
  FormHelperText: { entry: formHelperTextCatalog, subpath: 'FormHelperText' },
  FormLabel: { entry: formLabelCatalog, subpath: 'FormLabel' },
  Grid: { entry: gridCatalog, subpath: 'Grid' },
  Icon: { entry: iconCatalog, subpath: 'Icon' },
  Image: { entry: imageCatalog, subpath: 'Image' },
  RangeInput: { entry: rangeInputCatalog, subpath: 'RangeInput' },
  LinearProgress: { entry: linearProgressCatalog, subpath: 'LinearProgress' },
  Link: { entry: linkCatalog, subpath: 'Link' },
  Menu: { entry: menuCatalog, subpath: 'Menu' },
  MenuDivider: { entry: menuDividerCatalog, subpath: 'Menu', family: 'Menu' },
  MenuItem: { entry: menuItemCatalog, subpath: 'MenuItem' },
  MenuItems: { entry: menuItemsCatalog, subpath: 'Menu', family: 'Menu' },
  MenuList: { entry: menuListCatalog, subpath: 'Menu', family: 'Menu' },
  Modal: { entry: modalCatalog, subpath: 'Modal' },
  NativeSelect: { entry: nativeSelectCatalog, subpath: 'NativeSelect' },
  NumberInput: { entry: numberInputCatalog, subpath: 'NumberInput' },
  Pagination: { entry: paginationCatalog, subpath: 'Pagination' },
  PaginationItem: { entry: paginationItemCatalog, subpath: 'Pagination', family: 'Pagination' },
  Paper: { entry: paperCatalog, subpath: 'Paper' },
  Popover: { entry: popoverCatalog, subpath: 'Popover' },
  Portal: { entry: portalCatalog, subpath: 'Portal' },
  Pressable: { entry: pressableCatalog, subpath: 'Pressable' },
  Quote: { entry: quoteCatalog, subpath: 'Quote' },
  Radio: { entry: radioCatalog, subpath: 'Radio' },
  Rating: { entry: ratingCatalog, subpath: 'Rating' },
  Select: { entry: selectCatalog, subpath: 'Select' },
  Sidebar: { entry: sidebarCatalog, subpath: 'Sidebar' },
  SidebarItem: { entry: sidebarItemCatalog, subpath: 'Sidebar', family: 'Sidebar' },
  Skeleton: { entry: skeletonCatalog, subpath: 'Skeleton' },
  Switch: { entry: switchCatalog, subpath: 'Switch' },
  Tab: { entry: tabCatalog, subpath: 'Tabs', family: 'Tabs' },
  TabPanel: { entry: tabPanelCatalog, subpath: 'Tabs', family: 'Tabs' },
  Tabs: { entry: tabsCatalog, subpath: 'Tabs' },
  TabContext: { entry: tabContextCatalog, subpath: 'Tabs', family: 'Tabs' },
  TabList: { entry: tabListCatalog, subpath: 'Tabs', family: 'Tabs' },
  TabScrollButton: { entry: tabScrollButtonCatalog, subpath: 'Tabs', family: 'Tabs' },
  Table: { entry: tableCatalog, subpath: 'Table' },
  TableBody: { entry: tableBodyCatalog, subpath: 'Table', family: 'Table' },
  TableCell: { entry: tableCellCatalog, subpath: 'Table', family: 'Table' },
  TableContainer: { entry: tableContainerCatalog, subpath: 'Table', family: 'Table' },
  TableControl: { entry: tableControlCatalog, subpath: 'Table', family: 'Table' },
  TableFooter: { entry: tableFooterCatalog, subpath: 'Table', family: 'Table' },
  TableHead: { entry: tableHeadCatalog, subpath: 'Table', family: 'Table' },
  TablePagination: { entry: tablePaginationCatalog, subpath: 'Table', family: 'Table' },
  TablePaginationActions: {
    entry: tablePaginationActionsCatalog,
    subpath: 'Table',
    family: 'Table',
  },
  TableRow: { entry: tableRowCatalog, subpath: 'Table', family: 'Table' },
  TableSortLabel: { entry: tableSortLabelCatalog, subpath: 'Table', family: 'Table' },
  TextInput: { entry: textInputCatalog, subpath: 'TextInput' },
  ToggleButton: { entry: toggleButtonCatalog, subpath: 'ToggleButton' },
  ToggleButtonGroup: {
    entry: toggleButtonGroupCatalog,
    subpath: 'ToggleButton',
    family: 'ToggleButton',
  },
  TransferList: { entry: transferListCatalog, subpath: 'TransferList' },
  Typography: { entry: typographyCatalog, subpath: 'Typography' },
  View: { entry: viewCatalog, subpath: 'View' },
}
