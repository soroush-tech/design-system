import { Chip } from '@soroush.tech/design-system/Chip'
import type { Item } from '../../data/items'

const COLORS = { todo: 'default', doing: 'primary', done: 'success' } as const

/** An item's status, in its palette color. */
export function StatusChip({ status }: { readonly status: Item['status'] }) {
  return <Chip label={status} size="sm" variant="outlined" color={COLORS[status]} />
}
