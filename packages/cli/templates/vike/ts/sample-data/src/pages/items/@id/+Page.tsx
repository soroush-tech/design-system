import { Flex } from '@soroush.tech/design-system/Flex'
import { Link } from '@soroush.tech/design-system/Link'
import { Typography } from '@soroush.tech/design-system/Typography'
// @if tanstack-query
import { useQuery } from '@tanstack/react-query'
import { fetchItem } from '../../../data/api'
// @elif swr
import useSWR from 'swr'
import { fetchItem } from '../../../data/api'
// @endif
import { useData } from '../../usePageContext'
import { StatusChip } from '../StatusChip'
import type { Data } from './+data'

export default function Page() {
  // @if tanstack-query
  const initialItem = useData<Data>()
  const { data: item } = useQuery({
    queryKey: ['items', initialItem.id],
    queryFn: () => fetchItem(initialItem.id),
    initialData: initialItem,
  })
  // @elif swr
  const initialItem = useData<Data>()
  const { data: item = initialItem } = useSWR(
    ['items', initialItem.id],
    () => fetchItem(initialItem.id),
    { fallbackData: initialItem }
  )
  // @else
  const item = useData<Data>()
  // @endif
  return (
    <Flex gap={2} alignItems="flex-start">
      <Typography variant="h2">{item.title}</Typography>
      <StatusChip status={item.status} />
      <Typography color="secondary">{item.summary}</Typography>
      <Link href="/items">All items</Link>
    </Flex>
  )
}
