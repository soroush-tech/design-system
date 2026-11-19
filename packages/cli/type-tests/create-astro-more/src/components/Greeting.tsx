import useSWR from 'swr'
import { Typography } from '@soroush.tech/design-system/Typography'
import { fetchGreeting } from '../data/api'
import { withIsland } from '../theme/Island'

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

export default withIsland(Greeting)
