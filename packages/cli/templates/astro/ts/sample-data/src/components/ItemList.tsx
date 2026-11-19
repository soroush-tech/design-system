import { Flex } from '@soroush.tech/design-system/Flex'
import { Link } from '@soroush.tech/design-system/Link'
import { Typography } from '@soroush.tech/design-system/Typography'
// @if tanstack-query
import { useQuery } from '@tanstack/react-query'
import { fetchItems } from '../data/api'
// @elif swr
import useSWR from 'swr'
import { fetchItems } from '../data/api'
// @endif
import type { Item } from '../data/items'
import { withIsland } from '../theme/Island'
import { StatusChip } from './StatusChip'

// @if ssr
/** The list of items, as src/pages/items/index.astro reads it on each request. */
// @else
/** The list of items, as src/pages/items/index.astro reads it at build time. */
// @endif
// @if tanstack-query
function ItemList({
  items: initialItems,
}: {
  readonly items: Pick<Item, 'id' | 'title' | 'status'>[]
}) {
  // It starts on the items read with the page, then queries them again in the browser.
  const { data: items } = useQuery({
    queryKey: ['items'],
    queryFn: fetchItems,
    initialData: initialItems,
  })
  return (
    <Flex gap={2} px={3} py={4}>
      <Typography variant="h2">Items</Typography>
      <Typography color="secondary">
        {/* @if ssr */}
        Sample data from src/data/items.ts, which this page reads on each request.
        {/* @else */}
        Sample data from src/data/items.ts, which this page reads at build time.
        {/* @endif */}
      </Typography>
      <Flex gap={1}>
        {items.map((item) => (
          <Flex key={item.id} flexDirection="row" alignItems="center" gap={2}>
            <Link href={`/items/${item.id}`}>{item.title}</Link>
            <StatusChip status={item.status} />
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}
// @elif swr
function ItemList({
  items: initialItems,
}: {
  readonly items: Pick<Item, 'id' | 'title' | 'status'>[]
}) {
  // It starts on the items read with the page, then fetches them again in the browser.
  const { data: items = initialItems } = useSWR('items', fetchItems, {
    fallbackData: initialItems,
  })
  return (
    <Flex gap={2} px={3} py={4}>
      <Typography variant="h2">Items</Typography>
      <Typography color="secondary">
        {/* @if ssr */}
        Sample data from src/data/items.ts, which this page reads on each request.
        {/* @else */}
        Sample data from src/data/items.ts, which this page reads at build time.
        {/* @endif */}
      </Typography>
      <Flex gap={1}>
        {items.map((item) => (
          <Flex key={item.id} flexDirection="row" alignItems="center" gap={2}>
            <Link href={`/items/${item.id}`}>{item.title}</Link>
            <StatusChip status={item.status} />
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}
// @else
function ItemList({ items }: { readonly items: Pick<Item, 'id' | 'title' | 'status'>[] }) {
  return (
    <Flex gap={2} px={3} py={4}>
      <Typography variant="h2">Items</Typography>
      <Typography color="secondary">
        {/* @if ssr */}
        Sample data from src/data/items.ts, which this page reads on each request.
        {/* @else */}
        Sample data from src/data/items.ts, which this page reads at build time.
        {/* @endif */}
      </Typography>
      <Flex gap={1}>
        {items.map((item) => (
          <Flex key={item.id} flexDirection="row" alignItems="center" gap={2}>
            <Link href={`/items/${item.id}`}>{item.title}</Link>
            <StatusChip status={item.status} />
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}
// @endif

export default withIsland(ItemList)
