import { Flex } from '@soroush.tech/design-system/Flex'
import { Link } from '@soroush.tech/design-system/Link'
import { Typography } from '@soroush.tech/design-system/Typography'
import type { Item } from '../data/items'
import { Theme } from '../theme/Theme'
import { StatusChip } from './StatusChip'

// @if ssr
/** One item, as src/pages/items/[id].astro reads it on each request. */
// @else
/** One item, as src/pages/items/[id].astro reads it at build time. */
// @endif
export default function ItemDetails({ item }: { readonly item: Item }) {
  return (
    <Theme>
      <Flex gap={2} alignItems="flex-start" px={3} py={4}>
        <Typography variant="h2">{item.title}</Typography>
        <StatusChip status={item.status} />
        <Typography color="secondary">{item.summary}</Typography>
        <Link href="/items">All items</Link>
      </Flex>
    </Theme>
  )
}
