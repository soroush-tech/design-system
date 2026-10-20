import { createElement, type ElementType, type ReactNode } from 'react'
import type { ExampleNode } from '../../catalog/types'
import { AppBar } from '../../AppBar'
import { Avatar } from '../../Avatar'
import { Backdrop } from '../../Backdrop'
import { Breadcrumbs } from '../../Breadcrumbs'
import { Button } from '../../Button'
import { ButtonGroup } from '../../ButtonGroup'
import { Card } from '../../Card'
import { Checkbox } from '../../Checkbox'
import { CircularProgress } from '../../CircularProgress'
import { ContextMenu } from '../../Menu/ContextMenu'
import { Drawer, DrawerToggle } from '../../Drawer'
import { Flex } from '../../Flex'
import { FocusTrap } from '../../FocusTrap'
import { Form } from '../../Form'
import { FormControl } from '../../FormControl'
import { FormHelperText } from '../../FormHelperText'
import { FormLabel } from '../../FormLabel'
import { Grid } from '../../Grid'
import { Icon } from '../../Icon'
import { Image } from '../../Image'
import { LinearProgress } from '../../LinearProgress'
import { Link } from '../../Link'
import { Menu } from '../../Menu/Menu'
import { MenuDivider } from '../../Menu/MenuDivider'
import { MenuItem } from '../../MenuItem'
import { MenuList } from '../../Menu/MenuList'
import { Modal } from '../../Modal'
import { NativeSelect } from '../../NativeSelect'
import { Pagination, PaginationItem } from '../../Pagination'
import { Paper } from '../../Paper'
import { Popover } from '../../Popover'
import { Portal } from '../../Portal'
import { Pressable } from '../../Pressable'
import { Quote } from '../../Quote'
import { Radio } from '../../Radio'
import { Select } from '../../Select'
import { Sidebar, SidebarItem } from '../../Sidebar'
import { Skeleton } from '../../Skeleton'
import { Switch } from '../../Switch'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableControl,
  TableFooter,
  TableHead,
  TablePagination,
  TablePaginationActions,
  TableRow,
  TableSortLabel,
} from '../../Table'
import { TabPanel } from '../../Tabs/TabPanel'
import { Tab, TabContext, TabList, TabScrollButton, Tabs } from '../../Tabs'
import { TextInput } from '../../TextInput'
import { ToggleButton, ToggleButtonGroup } from '../../ToggleButton'
import { Typography } from '../../Typography'
import { View } from '../../View'

// Every component a catalog example may name.
const COMPONENTS: Record<string, ElementType> = {
  AppBar,
  Avatar,
  Backdrop,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  CircularProgress,
  ContextMenu,
  Drawer,
  DrawerToggle,
  Flex,
  FocusTrap,
  Form,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Icon,
  Image,
  LinearProgress,
  Link,
  Menu,
  MenuDivider,
  MenuItem,
  MenuList,
  Modal,
  NativeSelect,
  Pagination,
  PaginationItem,
  Paper,
  Popover,
  Portal,
  Pressable,
  Quote,
  Radio,
  Select,
  Sidebar,
  SidebarItem,
  Skeleton,
  Switch,
  Tab,
  TabPanel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableControl,
  TableFooter,
  TableHead,
  TablePagination,
  TablePaginationActions,
  TableRow,
  TableSortLabel,
  Tabs,
  TabContext,
  TabList,
  TabScrollButton,
  TextInput,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  View,
}

/** A catalog node as an element - text as itself. */
export function renderExample(example: ExampleNode | string, key?: number): ReactNode {
  if (typeof example === 'string') return example
  const component = COMPONENTS[example.component]
  if (!component) throw new Error(`renderExample: no component named ${example.component}`)
  return createElement(component, { key, ...example.props }, ...renderChildren(example.children))
}

const renderChildren = (children: ExampleNode['children']): ReactNode[] =>
  children.map((child, index) => renderExample(child, index))

/**
 * A story's `args` from a catalog example: its props, and its children rendered - one text
 * child as text, so a story's `children` control still edits it.
 */
export function exampleArgs(example: ExampleNode): Record<string, unknown> {
  const { props, children } = example
  if (children.length === 0) return { ...props }
  const isText = children.length === 1 && typeof children[0] === 'string'
  return { ...props, children: isText ? children[0] : renderChildren(children) }
}
