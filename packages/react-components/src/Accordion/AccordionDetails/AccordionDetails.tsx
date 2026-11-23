import type { ReactNode } from 'react'
import { createShouldForwardProp, styled } from '../../index'
import { useAccordion } from '../AccordionContext'

export interface AccordionDetailsProps {
  /** What the accordion opens. */
  children?: ReactNode
  className?: string
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
  'data-testid': dataTestid,
}: Readonly<AccordionDetailsProps>) {
  const { hasGutters } = useAccordion('AccordionDetails')
  return (
    <DetailsRoot hasGutters={hasGutters} className={className} data-testid={dataTestid}>
      {children}
    </DetailsRoot>
  )
}
