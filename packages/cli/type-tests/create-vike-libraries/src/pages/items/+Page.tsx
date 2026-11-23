import { Flex } from '@soroush.design/react/Flex'
import { Link } from '@soroush.design/react/Link'
import { Typography } from '@soroush.design/react/Typography'
import { useQuery } from '@tanstack/react-query'
import { fetchItems } from '../../data/api'
import { useData } from '../usePageContext'
import type { Data } from './+data'
import { StatusChip } from './StatusChip'

export default function Page() {
  const { data: items } = useQuery({
    queryKey: ['items'],
    queryFn: fetchItems,
    initialData: useData<Data>(),
  })
  return (
    <Flex gap={2}>
      <Typography variant="h2">Items</Typography>
      <Typography color="secondary">
        Sample data from src/data/items.ts, which this page's +data reads at build time.
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
