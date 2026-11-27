// Type-level test: core's catalog entries hold to each React component's props. Core is
// framework-free, so it cannot type an entry against a component; this does, against the built
// declarations, and runs via `pnpm test:types`.
//
// For every entry: each option and content key, the two-way prop and event, and each DOM event
// is a prop; each option's listed values, and each example's and variant's prop values, fit the
// prop's type. An entry with no row in `PropsOf` fails too.
import type { JsonValue } from '@gild-ui/core/catalog'
import type * as entries from '@gild-ui/core/catalog/entries'
import type {
  AccordionActionsProps,
  AccordionDetailsProps,
  AccordionGroupProps,
  AccordionProps,
  AccordionSummaryProps,
} from '@gild-ui/react/Accordion'
import type { AlertProps, AlertTitleProps } from '@gild-ui/react/Alert'
import type { AppBarProps } from '@gild-ui/react/AppBar'
import type { AutocompleteProps } from '@gild-ui/react/Autocomplete'
import type { AvatarProps } from '@gild-ui/react/Avatar'
import type { BackdropProps } from '@gild-ui/react/Backdrop'
import type { BadgeProps } from '@gild-ui/react/Badge'
import type { BreadcrumbsProps } from '@gild-ui/react/Breadcrumbs'
import type { ButtonProps } from '@gild-ui/react/Button'
import type { ButtonGroupProps } from '@gild-ui/react/ButtonGroup'
import type { CardProps } from '@gild-ui/react/Card'
import type { CheckboxProps } from '@gild-ui/react/Checkbox'
import type { ChipProps } from '@gild-ui/react/Chip'
import type { CircularProgressProps } from '@gild-ui/react/CircularProgress'
import type { CollapseProps } from '@gild-ui/react/Collapse'
import type { DrawerProps, DrawerToggleProps } from '@gild-ui/react/Drawer'
import type { FabProps } from '@gild-ui/react/Fab'
import type { FabMenuItemProps, FabMenuProps } from '@gild-ui/react/FabMenu'
import type { FadeProps } from '@gild-ui/react/Fade'
import type { FlexProps } from '@gild-ui/react/Flex'
import type { FocusTrapProps } from '@gild-ui/react/FocusTrap'
import type { FormProps } from '@gild-ui/react/Form'
import type { FormControlProps } from '@gild-ui/react/FormControl'
import type { FormHelperTextProps } from '@gild-ui/react/FormHelperText'
import type { FormLabelProps } from '@gild-ui/react/FormLabel'
import type { GridProps } from '@gild-ui/react/Grid'
import type { GrowProps } from '@gild-ui/react/Grow'
import type { IconProps } from '@gild-ui/react/Icon'
import type { ImageProps } from '@gild-ui/react/Image'
import type { LinearProgressProps } from '@gild-ui/react/LinearProgress'
import type { LinkProps } from '@gild-ui/react/Link'
import type {
  ContextMenuProps,
  MenuDividerProps,
  MenuItemsProps,
  MenuListProps,
  MenuProps,
} from '@gild-ui/react/Menu'
import type { MenuItemProps } from '@gild-ui/react/MenuItem'
import type { ModalProps } from '@gild-ui/react/Modal'
import type { NativeSelectProps } from '@gild-ui/react/NativeSelect'
import type { NavGroupProps, NavLinkProps, NavTreeProps } from '@gild-ui/react/NavTree'
import type { NumberInputProps } from '@gild-ui/react/NumberInput'
import type { PaginationItemProps, PaginationProps } from '@gild-ui/react/Pagination'
import type { PaperProps } from '@gild-ui/react/Paper'
import type { PopoverProps } from '@gild-ui/react/Popover'
import type { PortalProps } from '@gild-ui/react/Portal'
import type { PressableProps } from '@gild-ui/react/Pressable'
import type { QuoteProps } from '@gild-ui/react/Quote'
import type { RadioProps } from '@gild-ui/react/Radio'
import type { RangeInputProps } from '@gild-ui/react/RangeInput'
import type { RatingProps } from '@gild-ui/react/Rating'
import type { ScrollAreaProps } from '@gild-ui/react/ScrollArea'
import type { SelectProps } from '@gild-ui/react/Select'
import type { SidebarItemProps, SidebarProps } from '@gild-ui/react/Sidebar'
import type { SkeletonProps } from '@gild-ui/react/Skeleton'
import type { SlideProps } from '@gild-ui/react/Slide'
import type { SnackbarProps } from '@gild-ui/react/Snackbar'
import type { SwitchProps } from '@gild-ui/react/Switch'
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
} from '@gild-ui/react/Table'
import type {
  TabContextProps,
  TabListProps,
  TabPanelProps,
  TabProps,
  TabScrollButtonProps,
  TabsProps,
} from '@gild-ui/react/Tabs'
import type { TextInputProps } from '@gild-ui/react/TextInput'
import type { ToggleButtonGroupProps, ToggleButtonProps } from '@gild-ui/react/ToggleButton'
import type { TooltipProps } from '@gild-ui/react/Tooltip'
import type { TransferListProps } from '@gild-ui/react/TransferList'
import type { TypographyProps } from '@gild-ui/react/Typography'
import type { ViewProps } from '@gild-ui/react/View'
import type { ZoomProps } from '@gild-ui/react/Zoom'

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
  | `${EntriesWithoutProps}: no row in PropsOf`
  | {
      [N in keyof PropsOf & EntryName]: Problems<N, Entries[N], PropsOf[N]>
    }[keyof PropsOf & EntryName]

// Fails, naming a problem (tsc shows the first), unless there are none.
declare const problems: AllProblems
export const holds: never = problems
