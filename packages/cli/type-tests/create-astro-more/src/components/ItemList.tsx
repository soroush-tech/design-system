import { Flex } from '@soroush.design/react/Flex'
import { Link } from '@soroush.design/react/Link'
import { Typography } from '@soroush.design/react/Typography'
import useSWR from 'swr'
import { fetchItems } from '../data/api'
import type { Item } from '../data/items'
import { withIsland } from '../theme/Island'
import { StatusChip } from './StatusChip'

/** The list of items, as src/pages/items/index.astro reads it on each request. */
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
        Sample data from src/data/items.ts, which this page reads on each request.
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

export default withIsland(ItemList)
