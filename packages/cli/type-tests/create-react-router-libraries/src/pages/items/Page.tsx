import { Flex } from '@gild-ui/react/Flex'
import { Typography } from '@gild-ui/react/Typography'
import { useQuery } from '@tanstack/react-query'
import { RouterLink } from '../../components/RouterLink'
import { fetchItems } from '../../data/api'
import { StatusChip } from './StatusChip'

export default function Page() {
  const { data: items = [] } = useQuery({ queryKey: ['items'], queryFn: fetchItems })
  return (
    <Flex gap={2}>
      <Typography variant="h2">Items</Typography>
      <Typography color="secondary">
        Sample data from src/data/items.ts, which this page reads through src/data/api.ts with a
        query of TanStack Query.
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
