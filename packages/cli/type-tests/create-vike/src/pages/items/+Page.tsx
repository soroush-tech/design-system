import { Flex } from '@gild-ui/react/Flex'
import { Link } from '@gild-ui/react/Link'
import { Typography } from '@gild-ui/react/Typography'
import { useData } from '../usePageContext'
import type { Data } from './+data'
import { StatusChip } from './StatusChip'

export default function Page() {
  const items = useData<Data>()
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
