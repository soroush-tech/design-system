const ROW_SELECTOR = '[role="menuitem"], [role="menuitemradio"], [role="menuitemcheckbox"]'

/**
 * The rows that belong to `list` itself, in document order. A nested submenu is a
 * `role="menu"` of its own inside the list, so a row counts only when its nearest
 * `role="menu"` is `list` - no per-list index state is kept anywhere.
 */
export function getOwnRows(list: HTMLElement): HTMLElement[] {
  return Array.from(list.querySelectorAll<HTMLElement>(ROW_SELECTOR)).filter(
    (row) => row.closest('[role="menu"]') === list
  )
}

/** Whether a row can take focus and be chosen. */
export function isRowEnabled(row: HTMLElement): boolean {
  return row.getAttribute('aria-disabled') !== 'true'
}
