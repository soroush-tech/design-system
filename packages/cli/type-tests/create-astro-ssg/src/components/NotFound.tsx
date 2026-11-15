import { Flex } from '@soroush.tech/design-system/Flex'
import { Link } from '@soroush.tech/design-system/Link'
import { Typography } from '@soroush.tech/design-system/Typography'
import { Theme } from '../theme/Theme'

/** Shown for a page that does not exist. */
export default function NotFound() {
  return (
    <Theme>
      <Flex gap={2} alignItems="flex-start" px={3} py={4}>
        <Typography variant="h2">Page not found</Typography>
        <Typography color="secondary">This page does not exist.</Typography>
        <Link href="/">Back home</Link>
      </Flex>
    </Theme>
  )
}
