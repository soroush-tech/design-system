import { Flex } from '@soroush.design/react/Flex'
import { Link } from '@soroush.design/react/Link'
import { Typography } from '@soroush.design/react/Typography'
import useSWR from 'swr'
import { fetchItem } from '../../../data/api'
import { useData } from '../../usePageContext'
import { StatusChip } from '../StatusChip'
import type { Data } from './+data'

export default function Page() {
  const initialItem = useData<Data>()
  const { data: item = initialItem } = useSWR(
    ['items', initialItem.id],
    () => fetchItem(initialItem.id),
    { fallbackData: initialItem }
  )
  return (
    <Flex gap={2} alignItems="flex-start">
      <Typography variant="h2">{item.title}</Typography>
      <StatusChip status={item.status} />
      <Typography color="secondary">{item.summary}</Typography>
      <Link href="/items">All items</Link>
    </Flex>
  )
}
