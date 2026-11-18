import { Flex } from '@soroush.tech/design-system/Flex'
import { Typography } from '@soroush.tech/design-system/Typography'
import { useLoaderData } from 'react-router'
import { RouterLink } from '../../components/RouterLink'
import type { loader } from './loader'
import { StatusChip } from './StatusChip'

export default function Page() {
  const items = useLoaderData<typeof loader>()
  return (
    <Flex gap={2}>
      <Typography variant="h2">Items</Typography>
      <Typography color="secondary">
        Sample data from src/data/items.ts, which this page's loader reads before it is shown.
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
