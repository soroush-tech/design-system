'use client'

import type { ReactNode } from 'react'
import { styled } from '../../style/styled'
import { mergeOverrides, type SlotProps, type StyleOverride } from '../../style/overrides'
import type { AlertTitleSlot } from './AlertTitle.types'
import { get } from '@soroush.tech/styled-system'

export interface AlertTitleProps {
  /** The title. */
  children?: ReactNode
  className?: string
  /** Overrides the CSS of the root: an entry of `StyleSheet.create`, or a list of them. It wins over `slotProps.root.style`. */
  style?: StyleOverride
  /** Overrides for the slots a theme can style: `style`, `className`, `data-*` and `aria-*`. */
  slotProps?: SlotProps<AlertTitleSlot>
  'data-testid'?: string
}

const AlertTitleRoot = styled('div', {
  name: 'AlertTitle',
  label: 'AlertTitle',
})(({ theme }) => ({
  marginBottom: theme.space[0.25],
  fontWeight: get(theme, 'fontWeights.semiBold'),
}))

/** @description The title of an `Alert`: its first line of the message, in a heavier weight. */
export function AlertTitle({
  children,
  className,
  style,
  slotProps,
  'data-testid': dataTestid,
}: Readonly<AlertTitleProps>) {
  return (
    <AlertTitleRoot
      {...mergeOverrides(slotProps?.root, { style, className })}
      data-testid={dataTestid}
    >
      {children}
    </AlertTitleRoot>
  )
}
