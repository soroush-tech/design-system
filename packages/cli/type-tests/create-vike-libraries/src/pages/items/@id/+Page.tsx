import { Flex } from '@soroush.design/react-components/Flex'
import { Link } from '@soroush.design/react-components/Link'
import { Typography } from '@soroush.design/react-components/Typography'
import { useQuery } from '@tanstack/react-query'
import { fetchItem } from '../../../data/api'
import { useData } from '../../usePageContext'
import { StatusChip } from '../StatusChip'
import type { Data } from './+data'

export default function Page() {
  const initialItem = useData<Data>()
  const { data: item } = useQuery({
    queryKey: ['items', initialItem.id],
    queryFn: () => fetchItem(initialItem.id),
    initialData: initialItem,
  })
  return (
    <Flex gap={2} alignItems="flex-start">
      <Typography variant="h2">{item.title}</Typography>
      <StatusChip status={item.status} />
      <Typography color="secondary">{item.summary}</Typography>
      <Link href="/items">All items</Link>
    </Flex>
  )
}
