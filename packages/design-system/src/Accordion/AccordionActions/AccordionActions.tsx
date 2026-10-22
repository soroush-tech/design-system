import type { ReactNode } from 'react'
import { createShouldForwardProp, styled } from '../../index'
import { useAccordion } from '../AccordionContext'

export interface AccordionActionsProps {
  /** The buttons at the foot of the region. */
  children?: ReactNode
  className?: string
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
  'data-testid': dataTestid,
}: Readonly<AccordionActionsProps>) {
  const { hasGutters } = useAccordion('AccordionActions')
  return (
    <ActionsRoot hasGutters={hasGutters} className={className} data-testid={dataTestid}>
      {children}
    </ActionsRoot>
  )
}
