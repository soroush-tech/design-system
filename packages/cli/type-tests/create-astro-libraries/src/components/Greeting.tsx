import { useQuery } from '@tanstack/react-query'
import { Typography } from '@soroush.design/react-components/Typography'
import { fetchGreeting } from '../data/api'
import { withIsland } from '../theme/Island'

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

export default withIsland(Greeting)
