// @if tanstack-query || swr || msw
// @if tanstack-query
import { useQuery } from '@tanstack/react-query'
// @elif swr
import useSWR from 'swr'
// @else
import { useEffect, useState } from 'react'
// @endif
import { Typography } from '@soroush.design/react/Typography'
// @if !tanstack-query && !swr
import type { Greeting as Reply } from '../data/api'
// @endif
import { fetchGreeting } from '../data/api'
import { withIsland } from '../theme/Island'

// @if tanstack-query
/**
 * What the API says, read with a query of TanStack Query. An island of its own, which renders in
 * the browser only, where the query runs.
 */
function Greeting() {
  const { data } = useQuery({ queryKey: ['greeting'], queryFn: fetchGreeting })
  return (
    <Typography color="secondary">
      {data ? data.message : 'Asking the API for a greeting...'}
    </Typography>
  )
}
// @elif swr
/**
 * What the API says, read with SWR. An island of its own, which renders in the browser only,
 * where SWR runs.
 */
function Greeting() {
  const { data } = useSWR('greeting', fetchGreeting)
  return (
    <Typography color="secondary">
      {data ? data.message : 'Asking the API for a greeting...'}
    </Typography>
  )
}
// @else
/**
 * What the API says, read with fetch, as the island loads. An island of its own, which renders in
 * the browser only.
 */
function Greeting() {
  const [data, setData] = useState<Reply>()
  useEffect(() => {
    fetchGreeting().then(setData, () => setData({ message: 'The API did not answer.' }))
  }, [])
  return (
    <Typography color="secondary">
      {data ? data.message : 'Asking the API for a greeting...'}
    </Typography>
  )
}
// @endif

export default withIsland(Greeting)
// @endif
