import { isRowEnabled } from './getOwnRows'

/** A row's label text, without its icon, shortcut or note. */
export function getRowText(row: HTMLElement): string {
  const label = row.querySelector('[data-menu-label]') ?? row
  // Only documents and doctypes have a null textContent; an element's is always a string.
  return (label.textContent as string).trim().toLowerCase()
}

/**
 * The row type-ahead moves to. One key typed again and again (`r`, `r`, `r`) cycles
 * through the rows starting with it; distinct keys typed together (`re`) build a prefix,
 * matched from the current row onward so typing on stays where it is while it matches.
 */
export function findRowByText(
  rows: HTMLElement[],
  current: Element | null,
  typed: string
): HTMLElement | undefined {
  const enabled = rows.filter(isRowEnabled)
  const query = typed.toLowerCase()
  const isRepeating = [...query].every((key) => key === query[0])
  const start = enabled.indexOf(current as HTMLElement)
  // A repeated key starts after the current row; a prefix includes it.
  const from = isRepeating ? start + 1 : Math.max(start, 0)
  const ordered = [...enabled.slice(from), ...enabled.slice(0, from)]
  const prefix = isRepeating ? query[0] : query
  return ordered.find((row) => getRowText(row).startsWith(prefix))
}
