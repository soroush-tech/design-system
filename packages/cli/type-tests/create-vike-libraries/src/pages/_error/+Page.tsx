import { Flex } from '@gild-ui/react/Flex'
import { Link } from '@gild-ui/react/Link'
import { Typography } from '@gild-ui/react/Typography'

/** Shown for a page that does not exist, and when a page fails to render. */
export default function Page() {
  return (
    <Flex gap={2} alignItems="flex-start">
      <Typography variant="h2">Page not found</Typography>
      <Typography color="secondary">This page does not exist, or it could not be shown.</Typography>
      <Link href="/">Back home</Link>
    </Flex>
  )
}
