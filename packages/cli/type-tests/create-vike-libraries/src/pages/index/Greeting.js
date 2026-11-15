import { useQuery } from '@tanstack/react-query'
import { Typography } from '@soroush.tech/design-system/Typography'
import { fetchGreeting } from '../../data/api'
/** What the API says, read with a query of TanStack Query. */
export function Greeting() {
  const { data } = useQuery({ queryKey: ['greeting'], queryFn: fetchGreeting })
  return (
    <Typography color="secondary">
      {data ? data.message : 'Asking the API for a greeting...'}
    </Typography>
  )
}
