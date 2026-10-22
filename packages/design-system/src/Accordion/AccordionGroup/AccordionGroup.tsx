import { useMemo, useState, type KeyboardEvent, type ReactNode } from 'react'
import type { SpaceProps } from '@soroush.tech/styled-system'
import { createShouldForwardProp, props, space, styled, type Theme } from '../../index'
import { useDefaultProps } from '../../theme'
import { AccordionGroupContext } from '../AccordionContext'

export interface AccordionGroupProps extends SpaceProps<Theme> {
  /** The accordions. */
  children?: ReactNode
  /** Opening one closes the others. Default: `false`. */
  isExclusive?: boolean
  className?: string
  'data-testid'?: string
}

const GroupRoot = styled('div', {
  name: 'AccordionGroup',
  label: 'AccordionGroup',
  shouldForwardProp: createShouldForwardProp([...props]),
  systemProps: [space],
})(({ theme }) => ({ display: 'flex', flexDirection: 'column', gap: theme.space[1] }))

const SUMMARIES = 'button[data-accordion-summary]:not(:disabled)'
const KEYS = new Set(['ArrowDown', 'ArrowUp', 'Home', 'End'])

// The summary a key goes to from the one focused: round the ends for the arrows.
const getTarget = (summaries: HTMLElement[], from: number, key: string) => {
  if (key === 'Home') return summaries[0]
  if (key === 'End') return summaries[summaries.length - 1]
  const step = key === 'ArrowDown' ? 1 : -1
  return summaries[(from + step + summaries.length) % summaries.length]
}

/**
 * @description A column of accordions that move by the keys - ArrowDown and ArrowUp step between
 * their summaries (round the ends), Home and End go to the first and last - and, with
 * `isExclusive`, keep one open at a time. A summary that is off is skipped. An accordion given
 * `isExpanded` is its owner's, and the group leaves it alone.
 */
export function AccordionGroup({
  children,
  isExclusive: isExclusiveProp,
  className,
  'data-testid': dataTestid,
  ...spaceProps
}: Readonly<AccordionGroupProps>) {
  const dp = useDefaultProps('AccordionGroup')
  const isExclusive = isExclusiveProp ?? dp.isExclusive ?? false
  const [openId, setOpenId] = useState<string | null | undefined>(undefined)
  const context = useMemo(() => ({ isExclusive, openId, setOpenId }), [isExclusive, openId])

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!KEYS.has(event.key)) return
    const summaries = [...event.currentTarget.querySelectorAll<HTMLElement>(SUMMARIES)]
    const from = summaries.indexOf(event.target as HTMLElement)
    // A key on anything but a summary - a button in a region - is that control's own.
    if (from === -1) return
    event.preventDefault()
    getTarget(summaries, from, event.key).focus()
  }

  return (
    <AccordionGroupContext.Provider value={context}>
      <GroupRoot
        className={className}
        data-testid={dataTestid}
        onKeyDown={handleKeyDown}
        {...spaceProps}
      >
        {children}
      </GroupRoot>
    </AccordionGroupContext.Provider>
  )
}
