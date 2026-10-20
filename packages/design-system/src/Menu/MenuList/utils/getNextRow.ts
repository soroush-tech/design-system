import { isRowEnabled } from './getOwnRows'

export type RowStep = 'next' | 'previous' | 'first' | 'last'

/**
 * The enabled row a key moves to from `current` (which may be absent from `rows`, as when
 * focus is still on the list itself). Disabled rows are skipped; `shouldWrap` carries
 * `next` past the last row to the first and `previous` before the first to the last.
 */
export function getNextRow(
  rows: HTMLElement[],
  current: Element | null,
  step: RowStep,
  shouldWrap: boolean
): HTMLElement | undefined {
  const enabled = rows.filter(isRowEnabled)
  if (step === 'first') return enabled[0]
  if (step === 'last') return enabled.at(-1)

  const index = enabled.indexOf(current as HTMLElement)
  if (index === -1) return step === 'next' ? enabled[0] : enabled.at(-1)

  const offset = step === 'next' ? 1 : -1
  const target = index + offset
  if (target >= 0 && target < enabled.length) return enabled[target]
  if (!shouldWrap) return undefined
  return target < 0 ? enabled.at(-1) : enabled[0]
}
