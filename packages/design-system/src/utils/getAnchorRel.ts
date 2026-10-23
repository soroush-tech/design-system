/**
 * The `rel` of an anchor: as given, else `noopener noreferrer` when it opens a new tab, so the
 * page it opens can't reach back to this one through `window.opener`.
 */
export const getAnchorRel = (target: string | undefined, rel: string | undefined) =>
  target === '_blank' && rel === undefined ? 'noopener noreferrer' : rel
