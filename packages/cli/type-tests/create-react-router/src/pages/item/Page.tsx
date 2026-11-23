import { Flex } from '@soroush.design/react-components/Flex'
import { Typography } from '@soroush.design/react-components/Typography'
import { useLoaderData } from 'react-router'
import { RouterLink } from '../../components/RouterLink'
import { StatusChip } from '../items/StatusChip'
import type { loader } from './loader'

export default function Page() {
  const item = useLoaderData<typeof loader>()
  return (
    <Flex gap={2} alignItems="flex-start">
      <Typography variant="h2">{item.title}</Typography>
      <StatusChip status={item.status} />
      <Typography color="secondary">{item.summary}</Typography>
      <RouterLink to="/items">All items</RouterLink>
    </Flex>
  )
}
