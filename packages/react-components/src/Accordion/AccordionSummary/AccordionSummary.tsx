import type { ReactNode } from 'react'
import { createShouldForwardProp, get, styled } from '../../index'
import { useDefaultProps } from '../../theme'
import { Icon } from '../../Icon'
import { getRegionId, getSummaryId, useAccordion } from '../AccordionContext'

export type AccordionHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

export interface AccordionSummaryProps {
  /** What the header says. */
  children?: ReactNode
  /** The icon that turns as it opens. Default: the `expand_more` icon. */
  expandIcon?: ReactNode
  /** The level of the heading the button sits in. Default: `3`. */
  headingLevel?: AccordionHeadingLevel
  className?: string
  'data-testid'?: string
}

const SummaryHeading = styled('div', {
  name: 'AccordionSummary',
  label: 'AccordionSummary',
})({ margin: 0, font: 'inherit' })

const SummaryButton = styled('button', {
  name: 'AccordionSummary',
  slot: 'button',
  label: 'AccordionSummaryButton',
  shouldForwardProp: createShouldForwardProp(['hasGutters']),
})<{ hasGutters: boolean }>(({ theme, hasGutters }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.space[2],
  width: '100%',
  boxSizing: 'border-box',
  padding: `${theme.space[2]} ${hasGutters ? theme.space[2] : '0'}`,
  border: 0,
  background: 'none',
  color: 'inherit',
  font: 'inherit',
  textAlign: 'start',
  cursor: 'pointer',
  '&:disabled': { opacity: 0.5, cursor: 'not-allowed' },
  '&:focus-visible': {
    outline: `${theme.borderWidths.base} solid ${get(theme, 'palette.primary.main')}`,
    outlineOffset: `-${theme.borderWidths.base}`,
  },
}))

const SummaryContent = styled('span', {
  name: 'AccordionSummary',
  slot: 'content',
  label: 'AccordionSummaryContent',
})({ flex: 1, minWidth: 0 })

const SummaryIcon = styled('span', {
  name: 'AccordionSummary',
  slot: 'icon',
  label: 'AccordionSummaryIcon',
  shouldForwardProp: createShouldForwardProp(['isExpanded']),
})<{ isExpanded: boolean }>(({ theme, isExpanded }) => ({
  display: 'inline-flex',
  flexShrink: 0,
  transition: `transform ${theme.transitions.duration.short}ms`,
  transform: isExpanded ? 'rotate(180deg)' : 'none',
  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
}))

/**
 * @description The header of an `Accordion`: a button in a heading that opens and closes it, with
 * `aria-expanded` and `aria-controls` for its region. Enter and Space press it, as they press any
 * button; in an `AccordionGroup` the arrows, Home and End move between summaries.
 */
export function AccordionSummary({
  children,
  expandIcon,
  headingLevel: headingLevelProp,
  className,
  'data-testid': dataTestid,
}: Readonly<AccordionSummaryProps>) {
  const dp = useDefaultProps('AccordionSummary')
  const headingLevel = headingLevelProp ?? dp.headingLevel ?? 3
  const { baseId, isExpanded, disabled, hasGutters, toggle } = useAccordion('AccordionSummary')
  return (
    <SummaryHeading as={`h${headingLevel}`} className={className} data-testid={dataTestid}>
      <SummaryButton
        type="button"
        id={getSummaryId(baseId)}
        aria-expanded={isExpanded}
        aria-controls={getRegionId(baseId)}
        disabled={disabled}
        hasGutters={hasGutters}
        data-accordion-summary=""
        onClick={toggle}
      >
        <SummaryContent>{children}</SummaryContent>
        <SummaryIcon isExpanded={isExpanded} aria-hidden="true">
          {expandIcon ?? <Icon name="expand_more" size="1em" color="inherit" />}
        </SummaryIcon>
      </SummaryButton>
    </SummaryHeading>
  )
}
