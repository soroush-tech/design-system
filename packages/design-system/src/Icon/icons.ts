import AccountTreeIcon from './icons/AccountTree'
import AddIcon from './icons/Add'
import AdsClickIcon from './icons/AdsClick'
import AnalyticsIcon from './icons/Analytics'
import ArchitectureIcon from './icons/Architecture'
import ArrowBackIcon from './icons/ArrowBack'
import ArrowForwardIcon from './icons/ArrowForward'
import ArrowUpwardIcon from './icons/ArrowUpward'
import CheckIcon from './icons/Check'
import CheckCircleIcon from './icons/CheckCircle'
import ChevronLeftIcon from './icons/ChevronLeft'
import ChevronRightIcon from './icons/ChevronRight'
import ChecklistIcon from './icons/Checklist'
import CloudDoneIcon from './icons/CloudDone'
import CloseIcon from './icons/Close'
import CodeIcon from './icons/Code'
import ContentCopyIcon from './icons/ContentCopy'
import CookieIcon from './icons/Cookie'
import DatabaseIcon from './icons/Database'
import DesktopWindowsIcon from './icons/DesktopWindows'
import DnsIcon from './icons/Dns'
import EditNoteIcon from './icons/EditNote'
import ErrorCircleIcon from './icons/ErrorCircle'
import ExpandLessIcon from './icons/ExpandLess'
import ExpandMoreIcon from './icons/ExpandMore'
import ExternalLinkIcon from './icons/ExternalLink'
import FirstPageIcon from './icons/FirstPage'
import FolderIcon from './icons/Folder'
import FormatListBulletedIcon from './icons/FormatListBulleted'
import FormatListNumberedIcon from './icons/FormatListNumbered'
import FormatQuoteIcon from './icons/FormatQuote'
import FullscreenIcon from './icons/Fullscreen'
import GridViewIcon from './icons/GridView'
import GroupsIcon from './icons/Groups'
import HistoryIcon from './icons/History'
import HubIcon from './icons/Hub'
import ImageIcon from './icons/Image'
import InfoIcon from './icons/Info'
import LanguageIcon from './icons/Language'
import LastPageIcon from './icons/LastPage'
import LinkIcon from './icons/Link'
import LockIcon from './icons/Lock'
import MenuIcon from './icons/Menu'
import MoreHorizIcon from './icons/MoreHoriz'
import NeurologyIcon from './icons/Neurology'
import PsychologyIcon from './icons/Psychology'
import RebaseEditIcon from './icons/RebaseEdit'
import RefreshIcon from './icons/Refresh'
import RemoveIcon from './icons/Remove'
import SchemaIcon from './icons/Schema'
import SecurityIcon from './icons/Security'
import SettingsInputComponentIcon from './icons/SettingsInputComponent'
import SmartToyIcon from './icons/SmartToy'
import SmartphoneIcon from './icons/Smartphone'
import SpeedIcon from './icons/Speed'
import StacksIcon from './icons/Stacks'
import StarIcon from './icons/Star'
import StarBorderIcon from './icons/StarBorder'
import TableIcon from './icons/Table'
import TerminalIcon from './icons/Terminal'
import VisibilityIcon from './icons/Visibility'
import WarningIcon from './icons/Warning'
import WebAssetIcon from './icons/WebAsset'
import ZoomInIcon from './icons/ZoomIn'
import ZoomOutIcon from './icons/ZoomOut'

/** Registry of available icons, keyed by their asset file name. */
export const icons = {
  account_tree: AccountTreeIcon,
  add: AddIcon,
  ads_click: AdsClickIcon,
  analytics: AnalyticsIcon,
  architecture: ArchitectureIcon,
  arrow_back: ArrowBackIcon,
  arrow_forward: ArrowForwardIcon,
  arrow_upward: ArrowUpwardIcon,
  check: CheckIcon,
  check_circle: CheckCircleIcon,
  chevron_left: ChevronLeftIcon,
  chevron_right: ChevronRightIcon,
  checklist: ChecklistIcon,
  cloud_done: CloudDoneIcon,
  close: CloseIcon,
  code: CodeIcon,
  content_copy: ContentCopyIcon,
  cookie: CookieIcon,
  database: DatabaseIcon,
  desktop_windows: DesktopWindowsIcon,
  dns: DnsIcon,
  edit_note: EditNoteIcon,
  error: ErrorCircleIcon,
  expand_less: ExpandLessIcon,
  expand_more: ExpandMoreIcon,
  external_link: ExternalLinkIcon,
  first_page: FirstPageIcon,
  folder: FolderIcon,
  format_list_bulleted: FormatListBulletedIcon,
  format_list_numbered: FormatListNumberedIcon,
  format_quote: FormatQuoteIcon,
  fullscreen: FullscreenIcon,
  grid_view: GridViewIcon,
  groups: GroupsIcon,
  history: HistoryIcon,
  hub: HubIcon,
  image: ImageIcon,
  info: InfoIcon,
  language: LanguageIcon,
  last_page: LastPageIcon,
  link: LinkIcon,
  lock: LockIcon,
  menu: MenuIcon,
  more_horiz: MoreHorizIcon,
  neurology: NeurologyIcon,
  psychology: PsychologyIcon,
  rebase_edit: RebaseEditIcon,
  refresh: RefreshIcon,
  remove: RemoveIcon,
  schema: SchemaIcon,
  security: SecurityIcon,
  settings_input_component: SettingsInputComponentIcon,
  smart_toy: SmartToyIcon,
  smartphone: SmartphoneIcon,
  speed: SpeedIcon,
  stacks: StacksIcon,
  star: StarIcon,
  star_border: StarBorderIcon,
  table: TableIcon,
  terminal: TerminalIcon,
  visibility: VisibilityIcon,
  warning: WarningIcon,
  web_asset: WebAssetIcon,
  zoom_in: ZoomInIcon,
  zoom_out: ZoomOutIcon,
} as const

/** Valid values for the Icon `name` prop - derived from the registry keys. */
export type IconName = keyof typeof icons
