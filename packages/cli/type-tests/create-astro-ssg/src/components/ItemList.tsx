import { Flex } from '@soroush.tech/design-system/Flex'
import { Link } from '@soroush.tech/design-system/Link'
import { Typography } from '@soroush.tech/design-system/Typography'
import type { Item } from '../data/items'
import { Theme } from '../theme/Theme'
import { StatusChip } from './StatusChip'

/** The list of items, as src/pages/items/index.astro reads it at build time. */
export default function ItemList({
  items,
}: {
  readonly items: readonly Pick<Item, 'id' | 'title' | 'status'>[]
}) {
  return (
    <Theme>
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
    </Theme>
  )
}
