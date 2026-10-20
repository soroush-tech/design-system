/** Whether an element sits in a right-to-left context - its nearest `dir` says so. */
export function isRtl(element: Element): boolean {
  return element.closest('[dir]')?.getAttribute('dir') === 'rtl'
}
