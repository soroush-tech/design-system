'use client'

import { type ElementType, type HTMLAttributes } from 'react'
import { TableSectionContext } from '../TableSectionContext'
import type { SpaceProps, BorderProps } from '@soroush.design/styled-system'
import { styled } from '../../style/styled'
import { type Theme } from '../../theme/themes'
import { createShouldForwardProp, props } from '@soroush.design/styled-system/should-forward-prop'
import { space, border, system } from '@soroush.design/styled-system'

/** Valid values for the color prop - derived from theme.text keys. */
export type TableFooterColorToken = keyof Theme['text']

/** Valid values for the bg prop - derived from theme.background keys. */
export type TableFooterBackgroundToken = keyof Theme['background']

/** Valid values for the borderColor prop - derived from theme.border keys. */
export type TableFooterBorderColorToken = keyof Theme['border']

export interface TableFooterProps
  extends
    Omit<HTMLAttributes<HTMLTableSectionElement>, 'color'>,
    SpaceProps<Theme>,
    Omit<BorderProps<Theme>, 'borderColor' | 'borderRadius'> {
  /** Resolves against theme.text */
  color?: TableFooterColorToken
  /** Resolves against theme.background */
  bg?: TableFooterBackgroundToken
  /** Resolves against theme.border - light · primary · dark */
  borderColor?: TableFooterBorderColorToken
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

export function TableFooter({ as, children, ...rest }: Readonly<TableFooterProps>) {
  return (
    <TableSectionContext.Provider value="footer">
      <TableFooterBase as={as} {...rest}>
        {children}
      </TableFooterBase>
    </TableSectionContext.Provider>
  )
}
