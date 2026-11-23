import { Flex } from '@soroush.design/react/Flex'
import { Typography } from '@soroush.design/react/Typography'
import useSWR from 'swr'
import { RouterLink } from '../../components/RouterLink'
import { fetchItems } from '../../data/api'
import { StatusChip } from './StatusChip'

export default function Page() {
  const { data: items = [] } = useSWR('items', fetchItems)
  return (
    <Flex gap={2}>
      <Typography variant="h2">Items</Typography>
      <Typography color="secondary">
        Sample data from src/data/items.ts, which this page reads through src/data/api.ts with SWR.
      </Typography>
      <Flex gap={1}>
        {items.map((item) => (
          <Flex key={item.id} flexDirection="row" alignItems="center" gap={2}>
            <RouterLink to={`/items/${item.id}`}>{item.title}</RouterLink>
            <StatusChip status={item.status} />
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}
