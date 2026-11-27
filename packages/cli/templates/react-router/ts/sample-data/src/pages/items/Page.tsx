import { Flex } from '@gild-ui/react/Flex'
import { Typography } from '@gild-ui/react/Typography'
// @if tanstack-query
import { useQuery } from '@tanstack/react-query'
// @elif swr
import useSWR from 'swr'
// @else
import { useLoaderData } from 'react-router'
// @endif
import { RouterLink } from '../../components/RouterLink'
// @if tanstack-query || swr
import { fetchItems } from '../../data/api'
// @else
import type { loader } from './loader'
// @endif
import { StatusChip } from './StatusChip'

export default function Page() {
  // @if tanstack-query
  const { data: items = [] } = useQuery({ queryKey: ['items'], queryFn: fetchItems })
  // @elif swr
  const { data: items = [] } = useSWR('items', fetchItems)
  // @else
  const items = useLoaderData<typeof loader>()
  // @endif
  return (
    <Flex gap={2}>
      <Typography variant="h2">Items</Typography>
      <Typography color="secondary">
        {/* @if tanstack-query */}
        Sample data from src/data/items.ts, which this page reads through src/data/api.ts with a
        query of TanStack Query.
        {/* @elif swr */}
        Sample data from src/data/items.ts, which this page reads through src/data/api.ts with SWR.
        {/* @else */}
        Sample data from src/data/items.ts, which this page's loader reads before it is shown.
        {/* @endif */}
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
