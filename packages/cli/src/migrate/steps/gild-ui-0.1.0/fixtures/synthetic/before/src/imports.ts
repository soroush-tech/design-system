import type { ThemeOverride, ThemePalette } from '@soroush.tech/design-system/theme'
import { withBreakpointHelpers, type BreakpointHelpers, up } from '@soroush.tech/design-system/theme'
import type { ButtonOwnerState, TabOwnerState } from '@soroush.tech/design-system/theme'
import { installPopover } from '@soroush.tech/design-system/testing'
import { catalog, type CatalogEntry } from '@soroush.tech/design-system/catalog'
import { useStyle, type StyleFactory } from '@soroush.tech/design-system/style'
import { Button as PrimaryButton, type ButtonProps } from '@soroush.tech/design-system/Button'
import { MarkdownContext, useMarkdownContext } from '@soroush.tech/markdown/MarkdownContext'
import { Preview } from '@soroush.tech/markdown'
import { useCopyToClipboard } from '@soroush.tech/hooks/useCopyToClipboard'
import type { ThemeCustomizationOptions } from '@soroush.tech/design-system'
import type { ComponentStyle, CardSlotIconProps } from '@soroush.tech/design-system/theme'
import { space, layout, type SpaceProps } from '@soroush.tech/design-system'
import { createShouldForwardProp, props } from '@soroush.tech/design-system'
import Tooltip from '@soroush.tech/design-system/Tooltip'
import * as Table from '@soroush.tech/design-system/Table'
import * as engine from '@soroush.tech/design-system/engine'
import { Mystery } from '@soroush.tech/design-system/theme'
import '@soroush.tech/design-system/fancy'
import { Global, globalStyles } from '@soroush.tech/design-system/engine'

export { Chip } from '@soroush.tech/design-system/Chip'
export type { TabsOwnerState } from '@soroush.tech/design-system/theme'
export * from '@soroush.tech/design-system/Select'
export * from '@soroush.tech/design-system/theme'

export const lazyModal = () => import('@soroush.tech/design-system/Modal')
export const lazyNamed = (name: string) => import(`@soroush.tech/design-system/${name}`)
export const editor = require('@soroush.tech/markdown/Editor')
export type PopoverProps = import('@soroush.tech/design-system/Popover').PopoverProps
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
