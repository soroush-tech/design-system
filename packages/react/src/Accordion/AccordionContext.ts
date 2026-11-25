import { createContext, useContext, type SyntheticEvent } from 'react'

/** What an `AccordionSummary` and the rest read from the `Accordion` they sit in. */
export interface AccordionContextValue {
  /** The base of the ids that tie the summary and the region together. */
  baseId: string
  isExpanded: boolean
  disabled: boolean
  hasGutters: boolean
  /** Opens a closed accordion and closes an open one. */
  toggle: (event: SyntheticEvent) => void
}

export const AccordionContext = createContext<AccordionContextValue | null>(null)

/** The accordion a part sits in - a part with none is a mistake, so it says so. */
export function useAccordion(part: string): AccordionContextValue {
  const accordion = useContext(AccordionContext)
  if (!accordion) throw new Error(`An ${part} must be inside an Accordion.`)
  return accordion
}

/** What an `Accordion` reads from the `AccordionGroup` it sits in. */
export interface AccordionGroupContextValue {
  /** Opening one closes the others. */
  isExclusive: boolean
  /** The accordion open now - `undefined` until one is first toggled, `null` with none open. */
  openId: string | null | undefined
  setOpenId: (id: string | null) => void
}

export const AccordionGroupContext = createContext<AccordionGroupContextValue | null>(null)

/** The ids of an accordion's two parts, from its base. */
export const getSummaryId = (baseId: string) => `${baseId}-summary`
export const getRegionId = (baseId: string) => `${baseId}-region`
