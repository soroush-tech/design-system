import { Flex } from '@soroush.design/react/Flex'
import { Link } from '@soroush.design/react/Link'
import { Typography } from '@soroush.design/react/Typography'
import useSWR from 'swr'
import { fetchItem } from '../data/api'
import type { Item } from '../data/items'
import { withIsland } from '../theme/Island'
import { StatusChip } from './StatusChip'

/** One item, as src/pages/items/[id].astro reads it on each request. */
function ItemDetails({ item: initialItem }: { readonly item: Item }) {
  const { data: item = initialItem } = useSWR(
    ['items', initialItem.id],
    () => fetchItem(initialItem.id),
    { fallbackData: initialItem }
  )
  return (
    <Flex gap={2} alignItems="flex-start" px={3} py={4}>
      <Typography variant="h2">{item.title}</Typography>
      <StatusChip status={item.status} />
      <Typography color="secondary">{item.summary}</Typography>
      <Link href="/items">All items</Link>
    </Flex>
  )
}

export default withIsland(ItemDetails)
