'use client'

import type { ReactNode } from 'react'
import { styled } from '../../style/styled'
import { mergeOverrides, type SlotProps, type StyleOverride } from '../../style/overrides'
import type { AccordionDetailsSlot } from './AccordionDetails.types'
import { createShouldForwardProp } from '@soroush.tech/styled-system/should-forward-prop'
import { useAccordion } from '../AccordionContext'

export interface AccordionDetailsProps {
  /** What the accordion opens. */
  children?: ReactNode
  className?: string
  /** Overrides the CSS of the root: an entry of `StyleSheet.create`, or a list of them. It wins over `slotProps.root.style`. */
  style?: StyleOverride
  /** Overrides for the slots a theme can style: `style`, `className`, `data-*` and `aria-*`. */
  slotProps?: SlotProps<AccordionDetailsSlot>
  'data-testid'?: string
}

const DetailsRoot = styled('div', {
  name: 'AccordionDetails',
  label: 'AccordionDetails',
  shouldForwardProp: createShouldForwardProp(['hasGutters']),
})<{ hasGutters: boolean }>(({ theme, hasGutters }) => ({
  padding: `${theme.space[1]} ${hasGutters ? theme.space[2] : '0'} ${theme.space[2]}`,
}))

/** @description What an `Accordion` opens: the padded body of its region. */
export function AccordionDetails({
  children,
  className,
  style,
  slotProps,
  'data-testid': dataTestid,
}: Readonly<AccordionDetailsProps>) {
  const { hasGutters } = useAccordion('AccordionDetails')
  return (
    <DetailsRoot
      hasGutters={hasGutters}
      {...mergeOverrides(slotProps?.root, { style, className })}
      data-testid={dataTestid}
    >
      {children}
    </DetailsRoot>
  )
}
