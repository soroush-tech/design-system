'use client'

import { type ElementType, type HTMLAttributes } from 'react'
import { TableSectionContext } from '../TableSectionContext'
import type { SpaceProps, BorderProps } from '@soroush.tech/styled-system'
import { styled } from '../../style/styled'
import { mergeOverrides, type SlotProps, type StyleOverride } from '../../style/overrides'
import type { TableHeadSlot } from './TableHead.types'
import { type Theme } from '../../theme/themes'
import { createShouldForwardProp, props } from '@soroush.tech/styled-system/should-forward-prop'
import { space, border, system } from '@soroush.tech/styled-system'

/** Valid values for the color prop - derived from theme.text keys. */
export type TableHeadColorToken = keyof Theme['text']

/** Valid values for the bg prop - derived from theme.background keys. */
export type TableHeadBackgroundToken = keyof Theme['background']

/** Valid values for the borderColor prop - derived from theme.border keys. */
export type TableHeadBorderColorToken = keyof Theme['border']

export interface TableHeadProps
  extends
    Omit<HTMLAttributes<HTMLTableSectionElement>, 'color' | 'style'>,
    SpaceProps<Theme>,
    Omit<BorderProps<Theme>, 'borderColor' | 'borderRadius'> {
  /** Resolves against theme.text */
  color?: TableHeadColorToken
  /** Resolves against theme.background */
  bg?: TableHeadBackgroundToken
  /** Resolves against theme.border - light · primary · dark */
  borderColor?: TableHeadBorderColorToken
  /** Overrides the CSS of the root: an entry of `StyleSheet.create`, or a list of them. It wins over `slotProps.root.style`. */
  style?: StyleOverride
  /** Overrides for the slots a theme can style: `style`, `className`, `data-*` and `aria-*`. */
  slotProps?: SlotProps<TableHeadSlot>
  as?: ElementType
}

const shouldForwardProp = createShouldForwardProp([...props])

const colorSystem = system({
  color: { property: 'color', scale: 'text' },
  bg: { property: 'backgroundColor', scale: 'background' },
  borderColor: { property: 'borderColor', scale: 'border' },
})

const TableHeadBase = styled('thead', {
  name: 'TableHead',
  label: 'TableHead',
  shouldForwardProp,
  systemProps: [space, border, colorSystem],
})<TableHeadProps>()

export function TableHead({
  as,
  children,
  style,
  className,
  slotProps,
  ...rest
}: Readonly<TableHeadProps>) {
  return (
    <TableSectionContext.Provider value="head">
      <TableHeadBase as={as} {...mergeOverrides(slotProps?.root, { style, className })} {...rest}>
        {children}
      </TableHeadBase>
    </TableSectionContext.Provider>
  )
}
