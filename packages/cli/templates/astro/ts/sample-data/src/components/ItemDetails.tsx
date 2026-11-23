import { Flex } from '@soroush.design/react/Flex'
import { Link } from '@soroush.design/react/Link'
import { Typography } from '@soroush.design/react/Typography'
// @if tanstack-query
import { useQuery } from '@tanstack/react-query'
import { fetchItem } from '../data/api'
// @elif swr
import useSWR from 'swr'
import { fetchItem } from '../data/api'
// @endif
import type { Item } from '../data/items'
import { withIsland } from '../theme/Island'
import { StatusChip } from './StatusChip'

// @if ssr
/** One item, as src/pages/items/[id].astro reads it on each request. */
// @else
/** One item, as src/pages/items/[id].astro reads it at build time. */
// @endif
// @if tanstack-query
function ItemDetails({ item: initialItem }: { readonly item: Item }) {
  const { data: item } = useQuery({
    queryKey: ['items', initialItem.id],
    queryFn: () => fetchItem(initialItem.id),
    initialData: initialItem,
  })
  return (
    <Flex gap={2} alignItems="flex-start" px={3} py={4}>
      <Typography variant="h2">{item.title}</Typography>
      <StatusChip status={item.status} />
      <Typography color="secondary">{item.summary}</Typography>
      <Link href="/items">All items</Link>
    </Flex>
  )
}
// @elif swr
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
// @else
function ItemDetails({ item }: { readonly item: Item }) {
  return (
    <Flex gap={2} alignItems="flex-start" px={3} py={4}>
      <Typography variant="h2">{item.title}</Typography>
      <StatusChip status={item.status} />
      <Typography color="secondary">{item.summary}</Typography>
      <Link href="/items">All items</Link>
    </Flex>
  )
}
// @endif

export default withIsland(ItemDetails)
