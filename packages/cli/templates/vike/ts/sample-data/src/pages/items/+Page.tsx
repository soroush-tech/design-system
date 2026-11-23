import { Flex } from '@soroush.design/react-components/Flex'
import { Link } from '@soroush.design/react-components/Link'
import { Typography } from '@soroush.design/react-components/Typography'
// @if tanstack-query
import { useQuery } from '@tanstack/react-query'
import { fetchItems } from '../../data/api'
// @elif swr
import useSWR from 'swr'
import { fetchItems } from '../../data/api'
// @endif
import { useData } from '../usePageContext'
import type { Data } from './+data'
import { StatusChip } from './StatusChip'

export default function Page() {
  // @if tanstack-query
  const { data: items } = useQuery({
    queryKey: ['items'],
    queryFn: fetchItems,
    initialData: useData<Data>(),
  })
  // @elif swr
  const initialItems = useData<Data>()
  const { data: items = initialItems } = useSWR('items', fetchItems, {
    fallbackData: initialItems,
  })
  // @else
  const items = useData<Data>()
  // @endif
  return (
    <Flex gap={2}>
      <Typography variant="h2">Items</Typography>
      <Typography color="secondary">
        {/* @if ssr */}
        Sample data from src/data/items.ts, which this page's +data reads on each request.
        {/* @else */}
        Sample data from src/data/items.ts, which this page's +data reads at build time.
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
