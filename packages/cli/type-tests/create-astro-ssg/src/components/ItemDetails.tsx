import { Flex } from '@soroush.design/react-components/Flex'
import { Link } from '@soroush.design/react-components/Link'
import { Typography } from '@soroush.design/react-components/Typography'
import type { Item } from '../data/items'
import { withIsland } from '../theme/Island'
import { StatusChip } from './StatusChip'

/** One item, as src/pages/items/[id].astro reads it at build time. */
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

export default withIsland(ItemDetails)
