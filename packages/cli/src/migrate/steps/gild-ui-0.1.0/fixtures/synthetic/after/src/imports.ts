import type { ThemeOverride, ThemePalette } from '@gild-ui/core/theme'
import { withBreakpointHelpers, type BreakpointHelpers } from '@gild-ui/core/breakpoints'
import { up } from '@gild-ui/core/theme'
import type { ButtonOwnerState } from '@gild-ui/react/Button'
import type { TabOwnerState } from '@gild-ui/react/Tabs'
import { installPopover } from '@gild-ui/react/testing'
import { catalog, type CatalogEntry } from '@gild-ui/react/catalog'
import { useStyle } from '@gild-ui/react/useStyle'
import { type StyleFactory } from '@gild-ui/react/withStyles'
import { Button as PrimaryButton, type ButtonProps } from '@gild-ui/react/Button'
import { MarkdownContext, useMarkdownContext } from '@gild-ui/react-markdown'
import { Preview } from '@gild-ui/react-markdown'
import { useCopyToClipboard } from '@gild-ui/hooks/useCopyToClipboard'
import { space, layout, type SpaceProps } from '@soroush.tech/styled-system'
import { createShouldForwardProp, props } from '@soroush.tech/styled-system/should-forward-prop'
import Tooltip from '@gild-ui/react/Tooltip'
import * as Table from '@gild-ui/react/Table'
import * as engine from '@soroush.tech/design-system/engine'
import { Mystery } from '@soroush.tech/design-system/theme'
import '@soroush.tech/design-system/fancy'
import { Global } from '@gild-ui/react/Global'
import { globalStyles } from '@gild-ui/react/engine'

export { Chip } from '@gild-ui/react/Chip'
export type { TabsOwnerState } from '@gild-ui/react/Tabs'
export * from '@gild-ui/react/Select'
export * from '@soroush.tech/design-system/theme'

export const lazyModal = () => import('@gild-ui/react/Modal')
export const lazyNamed = (name: string) => import(`@soroush.tech/design-system/${name}`)
export const editor = require('@gild-ui/react-markdown/Editor')
export type PopoverProps = import('@gild-ui/react/Popover').PopoverProps
export type Looks = import('@soroush.tech/design-system/theme').ThemeOverride

export const used = [
  ThemeOverride,
  ThemePalette,
  withBreakpointHelpers,
  up,
  installPopover,
  catalog,
  useStyle,
  PrimaryButton,
  MarkdownContext,
  useMarkdownContext,
  Preview,
  useCopyToClipboard,
  space,
  layout,
  createShouldForwardProp,
  props,
  Tooltip,
  Table,
  engine,
  Mystery,
  Global,
  globalStyles,
]
export type Types = [
  BreakpointHelpers,
  ButtonOwnerState,
  TabOwnerState,
  CatalogEntry,
  StyleFactory,
  ButtonProps,
  ThemeCustomizationOptions,
  ComponentStyle,
  CardSlotIconProps,
  SpaceProps,
]
