import { Flex } from '@soroush.tech/design-system/Flex'
import { Link } from '@soroush.tech/design-system/Link'
import { Typography } from '@soroush.tech/design-system/Typography'
import { useQuery } from '@tanstack/react-query'
import { fetchItems } from '../data/api'
import type { Item } from '../data/items'
import { withIsland } from '../theme/Island'
import { StatusChip } from './StatusChip'

/** The list of items, as src/pages/items/index.astro reads it at build time. */
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
        Sample data from src/data/items.ts, which this page reads at build time.
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
