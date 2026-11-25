export type TabStep = 'next' | 'previous' | 'first' | 'last'

/** A tab the keys can reach: not disabled. */
export const isTabEnabled = (tab: HTMLElement): boolean =>
  tab.getAttribute('aria-disabled') !== 'true'

/**
 * The enabled tab a key moves focus to from `current`. Disabled tabs are skipped, and
 * `next` past the last tab comes round to the first (and `previous` the other way).
 */
export function getNextTab(
  tabs: HTMLElement[],
  current: Element | null,
  step: TabStep
): HTMLElement | undefined {
  const enabled = tabs.filter(isTabEnabled)
  if (step === 'first') return enabled[0]
  if (step === 'last') return enabled.at(-1)
  const index = enabled.indexOf(current as HTMLElement)
  if (index === -1) return step === 'next' ? enabled[0] : enabled.at(-1)
  const offset = step === 'next' ? 1 : -1
  return enabled.at((index + offset) % enabled.length)
}
