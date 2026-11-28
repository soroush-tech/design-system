import { overrides } from './overrides'

/** The override a slot test gives: a class, an entry and two attributes, named after the slot. */
export const mark = (slot: string) => ({
  className: `c-${slot}`,
  style: overrides.first,
  'data-mark': slot,
  'aria-description': slot,
})
