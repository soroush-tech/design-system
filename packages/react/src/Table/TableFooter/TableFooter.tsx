'use client'

import { type ElementType, type HTMLAttributes } from 'react'
import { TableSectionContext } from '../TableSectionContext'
import type { SpaceProps, BorderProps } from '@soroush.tech/styled-system'
import { styled } from '../../style/styled'
import { mergeOverrides, type SlotProps, type StyleOverride } from '../../style/overrides'
import type { TableFooterSlot } from './TableFooter.types'
import { type Theme } from '../../theme/themes'
import { createShouldForwardProp, props } from '@soroush.tech/styled-system/should-forward-prop'
import { space, border, system } from '@soroush.tech/styled-system'

/** Valid values for the color prop - derived from theme.text keys. */
export type TableFooterColorToken = keyof Theme['text']

/** Valid values for the bg prop - derived from theme.background keys. */
export type TableFooterBackgroundToken = keyof Theme['background']

/** Valid values for the borderColor prop - derived from theme.border keys. */
export type TableFooterBorderColorToken = keyof Theme['border']

export interface TableFooterProps
  extends
    Omit<HTMLAttributes<HTMLTableSectionElement>, 'color' | 'style'>,
    SpaceProps<Theme>,
    Omit<BorderProps<Theme>, 'borderColor' | 'borderRadius'> {
  /** Resolves against theme.text */
  color?: TableFooterColorToken
  /** Resolves against theme.background */
  bg?: TableFooterBackgroundToken
  /** Resolves against theme.border - light · primary · dark */
  borderColor?: TableFooterBorderColorToken
  /** Overrides the CSS of the root: an entry of `StyleSheet.create`, or a list of them. It wins over `slotProps.root.style`. */
  style?: StyleOverride
  /** Overrides for the slots a theme can style: `style`, `className`, `data-*` and `aria-*`. */
  slotProps?: SlotProps<TableFooterSlot>
  as?: ElementType
}

const shouldForwardProp = createShouldForwardProp([...props])

const colorSystem = system({
  color: { property: 'color', scale: 'text' },
  bg: { property: 'backgroundColor', scale: 'background' },
  borderColor: { property: 'borderColor', scale: 'border' },
})

const TableFooterBase = styled('tfoot', {
  name: 'TableFooter',
  label: 'TableFooter',
  shouldForwardProp,
  systemProps: [space, border, colorSystem],
})<TableFooterProps>()

export function TableFooter({
  as,
  children,
  style,
  className,
  slotProps,
  ...rest
}: Readonly<TableFooterProps>) {
  return (
    <TableSectionContext.Provider value="footer">
      <TableFooterBase as={as} {...mergeOverrides(slotProps?.root, { style, className })} {...rest}>
        {children}
      </TableFooterBase>
    </TableSectionContext.Provider>
  )
}
