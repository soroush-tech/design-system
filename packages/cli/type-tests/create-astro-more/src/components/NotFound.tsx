import { Flex } from '@gild-ui/react/Flex'
import { Link } from '@gild-ui/react/Link'
import { Typography } from '@gild-ui/react/Typography'
import { withIsland } from '../theme/Island'

/** Shown for a page that does not exist. */
function NotFound() {
  return (
    <Flex gap={2} alignItems="flex-start" px={3} py={4}>
      <Typography variant="h2">Page not found</Typography>
      <Typography color="secondary">This page does not exist.</Typography>
      <Link href="/">Back home</Link>
    </Flex>
  )
}

export default withIsland(NotFound)
