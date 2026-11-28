'use client'

import type { ReactNode } from 'react'
import { styled } from '../../style/styled'
import { createShouldForwardProp } from '@soroush.tech/styled-system/should-forward-prop'
import { mergeOverrides, type SlotProps, type StyleOverride } from '../../style/overrides'
import { useAccordion } from '../AccordionContext'
import type { AccordionActionsSlot } from './AccordionActions.types'

export interface AccordionActionsProps {
  /** The buttons at the foot of the region. */
  children?: ReactNode
  className?: string
  /** Overrides the CSS of the root: an entry of `StyleSheet.create`, or a list of them. It wins over `slotProps.root.style`. */
  style?: StyleOverride
  /** Overrides for the slots a theme can style: `style`, `className`, `data-*` and `aria-*`. */
  slotProps?: SlotProps<AccordionActionsSlot>
  'data-testid'?: string
}

const ActionsRoot = styled('div', {
  name: 'AccordionActions',
  label: 'AccordionActions',
  shouldForwardProp: createShouldForwardProp(['hasGutters']),
})<{ hasGutters: boolean }>(({ theme, hasGutters }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: theme.space[1],
  padding: `${theme.space[1]} ${hasGutters ? theme.space[2] : '0'}`,
}))

/** @description The foot of an `Accordion` region: its buttons, at the end of a row. */
export function AccordionActions({
  children,
  className,
  style,
  slotProps,
  'data-testid': dataTestid,
}: Readonly<AccordionActionsProps>) {
  const { hasGutters } = useAccordion('AccordionActions')
  return (
    <ActionsRoot
      hasGutters={hasGutters}
      {...mergeOverrides(slotProps?.root, { style, className })}
      data-testid={dataTestid}
    >
      {children}
    </ActionsRoot>
  )
}
