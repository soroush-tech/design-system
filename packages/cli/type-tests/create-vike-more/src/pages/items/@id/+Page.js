import { Flex } from '@soroush.tech/design-system/Flex'
import { Link } from '@soroush.tech/design-system/Link'
import { Typography } from '@soroush.tech/design-system/Typography'
import useSWR from 'swr'
import { fetchItem } from '../../../data/api'
import { useData } from '../../usePageContext'
import { StatusChip } from '../StatusChip'
export default function Page() {
  const initialItem = useData()
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
