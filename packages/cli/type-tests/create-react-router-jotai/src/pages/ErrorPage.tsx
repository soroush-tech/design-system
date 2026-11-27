import { Flex } from '@gild-ui/react/Flex'
import { Typography } from '@gild-ui/react/Typography'
import { RouterLink } from '../components/RouterLink'

/** Shown for a path with no page, and when a page fails to load or to render. */
export function ErrorPage() {
  return (
    <Flex gap={2} alignItems="flex-start">
      <Typography variant="h2">Page not found</Typography>
      <Typography color="secondary">This page does not exist, or it could not be shown.</Typography>
      <RouterLink to="/">Back home</RouterLink>
    </Flex>
  )
}
