import useSWR from 'swr'
import { Typography } from '@gild-ui/react/Typography'
import { fetchGreeting } from '../../data/api'

/** What the API says, read with SWR. */
export function Greeting() {
  const { data } = useSWR('greeting', fetchGreeting)
  return (
    <Typography color="secondary">
      {data ? data.message : 'Asking the API for a greeting...'}
    </Typography>
  )
}
