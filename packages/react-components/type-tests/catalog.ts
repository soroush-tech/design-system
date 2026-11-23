// Type-level test: core's catalog entries hold to each React component's props. Core is
// framework-free, so it cannot type an entry against a component; this does, against the built
// declarations, and runs via `pnpm test:types`.
//
// For every entry: each option and content key, the two-way prop and event, and each DOM event
// is a prop; each option's listed values, and each example's and variant's prop values, fit the
// prop's type. An entry with no row in `PropsOf` fails too.
import type { JsonValue } from '@soroush.design/core/catalog'
import type * as entries from '@soroush.design/core/catalog/entries'
import type {
  AccordionActionsProps,
  AccordionDetailsProps,
  AccordionGroupProps,
  AccordionProps,
  AccordionSummaryProps,
} from '@soroush.design/react-components/Accordion'
import type { AlertProps, AlertTitleProps } from '@soroush.design/react-components/Alert'
import type { AppBarProps } from '@soroush.design/react-components/AppBar'
import type { AutocompleteProps } from '@soroush.design/react-components/Autocomplete'
import type { AvatarProps } from '@soroush.design/react-components/Avatar'
import type { BackdropProps } from '@soroush.design/react-components/Backdrop'
import type { BadgeProps } from '@soroush.design/react-components/Badge'
import type { BreadcrumbsProps } from '@soroush.design/react-components/Breadcrumbs'
import type { ButtonProps } from '@soroush.design/react-components/Button'
import type { ButtonGroupProps } from '@soroush.design/react-components/ButtonGroup'
import type { CardProps } from '@soroush.design/react-components/Card'
import type { CheckboxProps } from '@soroush.design/react-components/Checkbox'
import type { ChipProps } from '@soroush.design/react-components/Chip'
import type { CircularProgressProps } from '@soroush.design/react-components/CircularProgress'
import type { CollapseProps } from '@soroush.design/react-components/Collapse'
import type { DrawerProps, DrawerToggleProps } from '@soroush.design/react-components/Drawer'
import type { FabProps } from '@soroush.design/react-components/Fab'
import type { FabMenuItemProps, FabMenuProps } from '@soroush.design/react-components/FabMenu'
import type { FadeProps } from '@soroush.design/react-components/Fade'
import type { FlexProps } from '@soroush.design/react-components/Flex'
import type { FocusTrapProps } from '@soroush.design/react-components/FocusTrap'
import type { FormProps } from '@soroush.design/react-components/Form'
import type { FormControlProps } from '@soroush.design/react-components/FormControl'
import type { FormHelperTextProps } from '@soroush.design/react-components/FormHelperText'
import type { FormLabelProps } from '@soroush.design/react-components/FormLabel'
import type { GridProps } from '@soroush.design/react-components/Grid'
import type { GrowProps } from '@soroush.design/react-components/Grow'
import type { IconProps } from '@soroush.design/react-components/Icon'
import type { ImageProps } from '@soroush.design/react-components/Image'
import type { LinearProgressProps } from '@soroush.design/react-components/LinearProgress'
import type { LinkProps } from '@soroush.design/react-components/Link'
import type {
  ContextMenuProps,
  MenuDividerProps,
  MenuItemsProps,
  MenuListProps,
  MenuProps,
} from '@soroush.design/react-components/Menu'
import type { MenuItemProps } from '@soroush.design/react-components/MenuItem'
import type { ModalProps } from '@soroush.design/react-components/Modal'
import type { NativeSelectProps } from '@soroush.design/react-components/NativeSelect'
import type {
  NavGroupProps,
  NavLinkProps,
  NavTreeProps,
} from '@soroush.design/react-components/NavTree'
import type { NumberInputProps } from '@soroush.design/react-components/NumberInput'
import type {
  PaginationItemProps,
  PaginationProps,
} from '@soroush.design/react-components/Pagination'
import type { PaperProps } from '@soroush.design/react-components/Paper'
import type { PopoverProps } from '@soroush.design/react-components/Popover'
import type { PortalProps } from '@soroush.design/react-components/Portal'
import type { PressableProps } from '@soroush.design/react-components/Pressable'
import type { QuoteProps } from '@soroush.design/react-components/Quote'
import type { RadioProps } from '@soroush.design/react-components/Radio'
import type { RangeInputProps } from '@soroush.design/react-components/RangeInput'
import type { RatingProps } from '@soroush.design/react-components/Rating'
import type { ScrollAreaProps } from '@soroush.design/react-components/ScrollArea'
import type { SelectProps } from '@soroush.design/react-components/Select'
import type { SidebarItemProps, SidebarProps } from '@soroush.design/react-components/Sidebar'
import type { SkeletonProps } from '@soroush.design/react-components/Skeleton'
import type { SlideProps } from '@soroush.design/react-components/Slide'
import type { SnackbarProps } from '@soroush.design/react-components/Snackbar'
import type { SwitchProps } from '@soroush.design/react-components/Switch'
import type {
  TableBodyProps,
  TableCellProps,
  TableContainerProps,
  TableControlProps,
  TableFooterProps,
  TableHeadProps,
  TablePaginationActionsProps,
  TablePaginationProps,
  TableProps,
  TableRowProps,
  TableSortLabelProps,
} from '@soroush.design/react-components/Table'
import type {
  TabContextProps,
  TabListProps,
  TabPanelProps,
  TabProps,
  TabScrollButtonProps,
  TabsProps,
} from '@soroush.design/react-components/Tabs'
import type { TextInputProps } from '@soroush.design/react-components/TextInput'
import type {
  ToggleButtonGroupProps,
  ToggleButtonProps,
} from '@soroush.design/react-components/ToggleButton'
import type { TooltipProps } from '@soroush.design/react-components/Tooltip'
import type { TransferListProps } from '@soroush.design/react-components/TransferList'
import type { TypographyProps } from '@soroush.design/react-components/Typography'
import type { ViewProps } from '@soroush.design/react-components/View'
import type { ZoomProps } from '@soroush.design/react-components/Zoom'

/** Each catalog entry's export name, and the props of the component it describes. */
interface PropsOf {
  accordionActionsCatalog: AccordionActionsProps
  accordionCatalog: AccordionProps
  accordionDetailsCatalog: AccordionDetailsProps
  accordionGroupCatalog: AccordionGroupProps
  accordionSummaryCatalog: AccordionSummaryProps
  alertCatalog: AlertProps
  alertTitleCatalog: AlertTitleProps
  appBarCatalog: AppBarProps
  autocompleteCatalog: AutocompleteProps<string, boolean>
  avatarCatalog: AvatarProps
  backdropCatalog: BackdropProps
  badgeCatalog: BadgeProps
  breadcrumbsCatalog: BreadcrumbsProps
  buttonCatalog: ButtonProps
  buttonGroupCatalog: ButtonGroupProps
  cardCatalog: CardProps
  checkboxCatalog: CheckboxProps
  chipCatalog: ChipProps
  circularProgressCatalog: CircularProgressProps
  collapseCatalog: CollapseProps
  contextMenuCatalog: ContextMenuProps
  drawerCatalog: DrawerProps
  drawerToggleCatalog: DrawerToggleProps
  fabCatalog: FabProps
  fabMenuCatalog: FabMenuProps
  fabMenuItemCatalog: FabMenuItemProps
  fadeCatalog: FadeProps
  flexCatalog: FlexProps
  focusTrapCatalog: FocusTrapProps
  formCatalog: FormProps
  formControlCatalog: FormControlProps
  formHelperTextCatalog: FormHelperTextProps
  formLabelCatalog: FormLabelProps
  gridCatalog: GridProps
  growCatalog: GrowProps
  iconCatalog: IconProps
  imageCatalog: ImageProps
  linearProgressCatalog: LinearProgressProps
  linkCatalog: LinkProps
  menuCatalog: MenuProps
  menuDividerCatalog: MenuDividerProps
  menuItemCatalog: MenuItemProps
  menuItemsCatalog: MenuItemsProps
  menuListCatalog: MenuListProps
  modalCatalog: ModalProps
  nativeSelectCatalog: NativeSelectProps
  navGroupCatalog: NavGroupProps
  navLinkCatalog: NavLinkProps
  navTreeCatalog: NavTreeProps
  numberInputCatalog: NumberInputProps
  paginationCatalog: PaginationProps
  paginationItemCatalog: PaginationItemProps
  paperCatalog: PaperProps
  popoverCatalog: PopoverProps
  portalCatalog: PortalProps
  pressableCatalog: PressableProps
  quoteCatalog: QuoteProps
  radioCatalog: RadioProps
  rangeInputCatalog: RangeInputProps
  ratingCatalog: RatingProps
  scrollAreaCatalog: ScrollAreaProps
  selectCatalog: SelectProps
  sidebarCatalog: SidebarProps
  sidebarItemCatalog: SidebarItemProps
  skeletonCatalog: SkeletonProps
  slideCatalog: SlideProps
  snackbarCatalog: SnackbarProps
  switchCatalog: SwitchProps
  tabCatalog: TabProps
  tabContextCatalog: TabContextProps
  tabListCatalog: TabListProps
  tabPanelCatalog: TabPanelProps
  tabScrollButtonCatalog: TabScrollButtonProps
  tableBodyCatalog: TableBodyProps
  tableCatalog: TableProps
  tableCellCatalog: TableCellProps
  tableContainerCatalog: TableContainerProps
  tableControlCatalog: TableControlProps<unknown>
  tableFooterCatalog: TableFooterProps
  tableHeadCatalog: TableHeadProps
  tablePaginationActionsCatalog: TablePaginationActionsProps
  tablePaginationCatalog: TablePaginationProps
  tableRowCatalog: TableRowProps
  tableSortLabelCatalog: TableSortLabelProps
  tabsCatalog: TabsProps
  textInputCatalog: TextInputProps
  toggleButtonCatalog: ToggleButtonProps
  toggleButtonGroupCatalog: ToggleButtonGroupProps
  tooltipCatalog: TooltipProps
  transferListCatalog: Omit<TransferListProps, 'items'> & { items?: Record<string, JsonValue>[] }
  typographyCatalog: TypographyProps
  viewCatalog: ViewProps
  zoomCatalog: ZoomProps
}

type Entries = typeof entries
type EntryName = Extract<keyof Entries, `${string}Catalog`>

/** The keys that are not props, each as a message. */
type NotProps<Name extends string, What extends string, Keys, P> = Keys extends string
  ? Keys extends keyof P
    ? never
    : `${Name}: ${What} "${Keys}" is not a prop`
  : never

/** The props an example sets that the component lacks, or sets to a value it does not take. */
type BadExampleProps<Name extends string, Set, P> = {
  [K in keyof Set & string]: K extends keyof P
    ? [Set[K]] extends [P[K]]
      ? never
      : `${Name}: example prop "${K}" is set to a value the prop does not take`
    : `${Name}: example prop "${K}" is not a prop`
}[keyof Set & string]

/** The listed values of each option that the prop does not take. */
type BadValues<Name extends string, Options, P> = {
  [K in keyof Options & string]: K extends keyof P
    ? Options[K] extends { values: readonly (infer V)[] }
      ? [V] extends [NonNullable<P[K]>]
        ? never
        : `${Name}: option "${K}" lists a value the prop does not take`
      : never
    : never
}[keyof Options & string]

type Problems<Name extends string, E, P> = E extends {
  options: infer O
  content: infer C
  example: { props: infer X }
  variants: (infer V)[]
}
  ?
      | NotProps<Name, 'option', keyof O, P>
      | NotProps<Name, 'content', keyof C, P>
      | (E extends { twoWay: { prop: infer T; event: infer Ev } }
          ? NotProps<Name, 'two-way prop', T, P> | NotProps<Name, 'two-way event', Ev, P>
          : never)
      | (E extends { domEvents: readonly (infer D)[] } ? NotProps<Name, 'DOM event', D, P> : never)
      | BadValues<Name, O, P>
      | BadExampleProps<Name, X, P>
      | (V extends { example: { props: infer VX } } ? BadExampleProps<Name, VX, P> : never)
  : never

type EntriesWithoutProps = Exclude<EntryName, keyof PropsOf>
type AllProblems =
  | (EntriesWithoutProps extends never ? never : `${EntriesWithoutProps}: no row in PropsOf`)
  | {
      [N in keyof PropsOf & EntryName]: Problems<N, Entries[N], PropsOf[N]>
    }[keyof PropsOf & EntryName]

// Fails, naming a problem (tsc shows the first), unless there are none.
declare const problems: AllProblems
export const holds: never = problems
