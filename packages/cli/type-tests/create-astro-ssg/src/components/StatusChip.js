import { Chip } from '@soroush.tech/design-system/Chip'
const COLORS = { todo: 'default', doing: 'primary', done: 'success' }
/** An item's status, in its palette color. */
export function StatusChip({ status }) {
  return <Chip label={status} size="sm" variant="outlined" color={COLORS[status]} />
}
