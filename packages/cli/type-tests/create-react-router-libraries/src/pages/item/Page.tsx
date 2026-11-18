import { Flex } from '@soroush.tech/design-system/Flex'
import { Typography } from '@soroush.tech/design-system/Typography'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { RouterLink } from '../../components/RouterLink'
import { fetchItem } from '../../data/api'
import { StatusChip } from '../items/StatusChip'

export default function Page() {
  const id = useParams().id!
  const { data: item, error } = useQuery({
    queryKey: ['items', id],
    queryFn: () => fetchItem(id),
    // An id with no item has none on a second try either: the error page shows at once.
    retry: false,
  })
  // An id with no item: the error page shows in this page's place.
  if (error) throw error
  if (!item) return <Typography color="secondary">Asking the API for the item...</Typography>
  return (
    <Flex gap={2} alignItems="flex-start">
      <Typography variant="h2">{item.title}</Typography>
      <StatusChip status={item.status} />
      <Typography color="secondary">{item.summary}</Typography>
      <RouterLink to="/items">All items</RouterLink>
    </Flex>
  )
}
