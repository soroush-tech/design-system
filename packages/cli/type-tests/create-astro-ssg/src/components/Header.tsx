import { Flex } from '@soroush.tech/design-system/Flex'
import { Link } from '@soroush.tech/design-system/Link'
import { Typography } from '@soroush.tech/design-system/Typography'
import { Providers } from '../theme/Providers'

/**
 * The header of every page. Its Providers draw the base styles, once a
 * page.
 */
export default function Header() {
  return (
    <Providers>
      <Flex
        as="header"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
        px={3}
        py={2}
        bg="paper"
      >
        <Typography variant="h6" as="span">
          My App
        </Typography>
        <Flex as="nav" flexDirection="row" alignItems="center" gap={2}>
          <Link href="/" underline="hover">
            Home
          </Link>
          <Link href="/about" underline="hover">
            About
          </Link>
          <Link href="/items" underline="hover">
            Items
          </Link>
        </Flex>
      </Flex>
    </Providers>
  )
}
