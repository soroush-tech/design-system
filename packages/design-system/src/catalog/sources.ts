import { appBarCatalog } from '../AppBar/AppBar.catalog'
import { avatarCatalog } from '../Avatar/Avatar.catalog'
import { backdropCatalog } from '../Backdrop/Backdrop.catalog'
import { breadcrumbsCatalog } from '../Breadcrumbs/Breadcrumbs.catalog'
import { buttonCatalog } from '../Button/Button.catalog'
import { buttonGroupCatalog } from '../ButtonGroup/ButtonGroup.catalog'
import { cardCatalog } from '../Card/Card.catalog'
import { checkboxCatalog } from '../Checkbox/Checkbox.catalog'
import { contextMenuCatalog } from '../Menu/ContextMenu/ContextMenu.catalog'
import { circularProgressCatalog } from '../CircularProgress/CircularProgress.catalog'
import { drawerCatalog } from '../Drawer/Drawer.catalog'
import { drawerToggleCatalog } from '../Drawer/DrawerToggle.catalog'
import { flexCatalog } from '../Flex/Flex.catalog'
import { focusTrapCatalog } from '../FocusTrap/FocusTrap.catalog'
import { formCatalog } from '../Form/Form.catalog'
import { formControlCatalog } from '../FormControl/FormControl.catalog'
import { formHelperTextCatalog } from '../FormHelperText/FormHelperText.catalog'
import { formLabelCatalog } from '../FormLabel/FormLabel.catalog'
import { gridCatalog } from '../Grid/Grid.catalog'
import { iconCatalog } from '../Icon/Icon.catalog'
import { imageCatalog } from '../Image/Image.catalog'
import { linearProgressCatalog } from '../LinearProgress/LinearProgress.catalog'
import { linkCatalog } from '../Link/Link.catalog'
import { menuCatalog } from '../Menu/Menu/Menu.catalog'
import { menuDividerCatalog } from '../Menu/MenuDivider/MenuDivider.catalog'
import { menuItemCatalog } from '../MenuItem/MenuItem.catalog'
import { menuItemsCatalog } from '../Menu/MenuItems/MenuItems.catalog'
import { menuListCatalog } from '../Menu/MenuList/MenuList.catalog'
import { modalCatalog } from '../Modal/Modal.catalog'
import { nativeSelectCatalog } from '../NativeSelect/NativeSelect.catalog'
import { paginationCatalog } from '../Pagination/Pagination.catalog'
import { paginationItemCatalog } from '../Pagination/PaginationItem/PaginationItem.catalog'
import { paperCatalog } from '../Paper/Paper.catalog'
import { popoverCatalog } from '../Popover/Popover.catalog'
import { portalCatalog } from '../Portal/Portal.catalog'
import { pressableCatalog } from '../Pressable/Pressable.catalog'
import { quoteCatalog } from '../Quote/Quote.catalog'
import { radioCatalog } from '../Radio/Radio.catalog'
import { selectCatalog } from '../Select/Select.catalog'
import { sidebarCatalog } from '../Sidebar/Sidebar/Sidebar.catalog'
import { sidebarItemCatalog } from '../Sidebar/SidebarItem/SidebarItem.catalog'
import { skeletonCatalog } from '../Skeleton/Skeleton.catalog'
import { switchCatalog } from '../Switch/Switch.catalog'
import { tabPanelCatalog } from '../Tabs/TabPanel/TabPanel.catalog'
import { tabCatalog } from '../Tabs/Tab/Tab.catalog'
import { tabsCatalog } from '../Tabs/Tabs/Tabs.catalog'
import { tabContextCatalog } from '../Tabs/TabContext/TabContext.catalog'
import { tabListCatalog } from '../Tabs/TabList/TabList.catalog'
import { tabScrollButtonCatalog } from '../Tabs/TabScrollButton/TabScrollButton.catalog'
import { tableCatalog } from '../Table/Table/Table.catalog'
import { tableBodyCatalog } from '../Table/TableBody/TableBody.catalog'
import { tableCellCatalog } from '../Table/TableCell/TableCell.catalog'
import { tableContainerCatalog } from '../Table/TableContainer/TableContainer.catalog'
import { tableControlCatalog } from '../Table/TableControl/TableControl.catalog'
import { tableFooterCatalog } from '../Table/TableFooter/TableFooter.catalog'
import { tableHeadCatalog } from '../Table/TableHead/TableHead.catalog'
import { tablePaginationCatalog } from '../Table/TablePagination/TablePagination.catalog'
import { tablePaginationActionsCatalog } from '../Table/TablePaginationActions/TablePaginationActions.catalog'
import { tableRowCatalog } from '../Table/TableRow/TableRow.catalog'
import { tableSortLabelCatalog } from '../Table/TableSortLabel/TableSortLabel.catalog'
import { textInputCatalog } from '../TextInput/TextInput.catalog'
import { toggleButtonCatalog } from '../ToggleButton/ToggleButton/ToggleButton.catalog'
import { toggleButtonGroupCatalog } from '../ToggleButton/ToggleButtonGroup/ToggleButtonGroup.catalog'
import { typographyCatalog } from '../Typography/Typography.catalog'
import { viewCatalog } from '../View/View.catalog'
import type { CatalogEntry } from './types'

export interface CatalogSource {
  /** What its folder's `*.catalog.ts` writes - the rest is filled in by the catalog. */
  entry: Omit<CatalogEntry, 'name' | 'module' | 'category'>
  /** The folder - and so the subpath - it is imported from. */
  folder: string
  /** For a member of a family (`TableRow`), the family the docs list (`Table`). */
  family?: string
}

/** Every component, keyed by its export name. */
export const catalogSources: Record<string, CatalogSource> = {
  AppBar: { entry: appBarCatalog, folder: 'AppBar' },
  Avatar: { entry: avatarCatalog, folder: 'Avatar' },
  Backdrop: { entry: backdropCatalog, folder: 'Backdrop' },
  Breadcrumbs: { entry: breadcrumbsCatalog, folder: 'Breadcrumbs' },
  Button: { entry: buttonCatalog, folder: 'Button' },
  ButtonGroup: { entry: buttonGroupCatalog, folder: 'ButtonGroup' },
  Card: { entry: cardCatalog, folder: 'Card' },
  Checkbox: { entry: checkboxCatalog, folder: 'Checkbox' },
  ContextMenu: { entry: contextMenuCatalog, folder: 'Menu', family: 'Menu' },
  CircularProgress: { entry: circularProgressCatalog, folder: 'CircularProgress' },
  Drawer: { entry: drawerCatalog, folder: 'Drawer' },
  DrawerToggle: { entry: drawerToggleCatalog, folder: 'Drawer', family: 'Drawer' },
  Flex: { entry: flexCatalog, folder: 'Flex' },
  FocusTrap: { entry: focusTrapCatalog, folder: 'FocusTrap' },
  Form: { entry: formCatalog, folder: 'Form' },
  FormControl: { entry: formControlCatalog, folder: 'FormControl' },
  FormHelperText: { entry: formHelperTextCatalog, folder: 'FormHelperText' },
  FormLabel: { entry: formLabelCatalog, folder: 'FormLabel' },
  Grid: { entry: gridCatalog, folder: 'Grid' },
  Icon: { entry: iconCatalog, folder: 'Icon' },
  Image: { entry: imageCatalog, folder: 'Image' },
  LinearProgress: { entry: linearProgressCatalog, folder: 'LinearProgress' },
  Link: { entry: linkCatalog, folder: 'Link' },
  Menu: { entry: menuCatalog, folder: 'Menu' },
  MenuDivider: { entry: menuDividerCatalog, folder: 'Menu', family: 'Menu' },
  MenuItem: { entry: menuItemCatalog, folder: 'MenuItem' },
  MenuItems: { entry: menuItemsCatalog, folder: 'Menu', family: 'Menu' },
  MenuList: { entry: menuListCatalog, folder: 'Menu', family: 'Menu' },
  Modal: { entry: modalCatalog, folder: 'Modal' },
  NativeSelect: { entry: nativeSelectCatalog, folder: 'NativeSelect' },
  Pagination: { entry: paginationCatalog, folder: 'Pagination' },
  PaginationItem: { entry: paginationItemCatalog, folder: 'Pagination', family: 'Pagination' },
  Paper: { entry: paperCatalog, folder: 'Paper' },
  Popover: { entry: popoverCatalog, folder: 'Popover' },
  Portal: { entry: portalCatalog, folder: 'Portal' },
  Pressable: { entry: pressableCatalog, folder: 'Pressable' },
  Quote: { entry: quoteCatalog, folder: 'Quote' },
  Radio: { entry: radioCatalog, folder: 'Radio' },
  Select: { entry: selectCatalog, folder: 'Select' },
  Sidebar: { entry: sidebarCatalog, folder: 'Sidebar' },
  SidebarItem: { entry: sidebarItemCatalog, folder: 'Sidebar', family: 'Sidebar' },
  Skeleton: { entry: skeletonCatalog, folder: 'Skeleton' },
  Switch: { entry: switchCatalog, folder: 'Switch' },
  Tab: { entry: tabCatalog, folder: 'Tabs', family: 'Tabs' },
  TabPanel: { entry: tabPanelCatalog, folder: 'Tabs', family: 'Tabs' },
  Tabs: { entry: tabsCatalog, folder: 'Tabs' },
  TabContext: { entry: tabContextCatalog, folder: 'Tabs', family: 'Tabs' },
  TabList: { entry: tabListCatalog, folder: 'Tabs', family: 'Tabs' },
  TabScrollButton: { entry: tabScrollButtonCatalog, folder: 'Tabs', family: 'Tabs' },
  Table: { entry: tableCatalog, folder: 'Table' },
  TableBody: { entry: tableBodyCatalog, folder: 'Table', family: 'Table' },
  TableCell: { entry: tableCellCatalog, folder: 'Table', family: 'Table' },
  TableContainer: { entry: tableContainerCatalog, folder: 'Table', family: 'Table' },
  TableControl: { entry: tableControlCatalog, folder: 'Table', family: 'Table' },
  TableFooter: { entry: tableFooterCatalog, folder: 'Table', family: 'Table' },
  TableHead: { entry: tableHeadCatalog, folder: 'Table', family: 'Table' },
  TablePagination: { entry: tablePaginationCatalog, folder: 'Table', family: 'Table' },
  TablePaginationActions: {
    entry: tablePaginationActionsCatalog,
    folder: 'Table',
    family: 'Table',
  },
  TableRow: { entry: tableRowCatalog, folder: 'Table', family: 'Table' },
  TableSortLabel: { entry: tableSortLabelCatalog, folder: 'Table', family: 'Table' },
  TextInput: { entry: textInputCatalog, folder: 'TextInput' },
  ToggleButton: { entry: toggleButtonCatalog, folder: 'ToggleButton' },
  ToggleButtonGroup: {
    entry: toggleButtonGroupCatalog,
    folder: 'ToggleButton',
    family: 'ToggleButton',
  },
  Typography: { entry: typographyCatalog, folder: 'Typography' },
  View: { entry: viewCatalog, folder: 'View' },
}
