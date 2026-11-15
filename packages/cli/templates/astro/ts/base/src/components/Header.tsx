// @if !ssg
import { Button } from '@soroush.tech/design-system/Button'
// @endif
import { Flex } from '@soroush.tech/design-system/Flex'
import { Link } from '@soroush.tech/design-system/Link'
import { Typography } from '@soroush.tech/design-system/Typography'
import { Providers } from '../theme/Providers'
// @if !ssg
import { setScheme, useScheme } from '../theme/scheme'
// @endif

/**
// @if ssg
 * The header of every page. Its Providers draw the base styles, once a
 * page.
// @else
 * The header of every page, an island of its own. Its Providers draw the base styles, once a
 * page, and its button switches the scheme of every island.
// @endif
 */
// @if ssg
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
          __TITLE__
        </Typography>
        <Flex as="nav" flexDirection="row" alignItems="center" gap={2}>
          <Link href="/" underline="hover">
            Home
          </Link>
          <Link href="/about" underline="hover">
            About
          </Link>
          {/* @if sample-data */}
          <Link href="/items" underline="hover">
            Items
          </Link>
          {/* @endif */}
        </Flex>
      </Flex>
    </Providers>
  )
}
// @else
export default function Header() {
  const scheme = useScheme()
  const otherScheme = scheme === 'light' ? 'dark' : 'light'
  return (
    <Providers scheme={scheme}>
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
          __TITLE__
        </Typography>
        <Flex as="nav" flexDirection="row" alignItems="center" gap={2}>
          <Link href="/" underline="hover">
            Home
          </Link>
          <Link href="/about" underline="hover">
            About
          </Link>
          {/* @if sample-data */}
          <Link href="/items" underline="hover">
            Items
          </Link>
          {/* @endif */}
          <Button size="sm" variant="outlined" onClick={() => setScheme(otherScheme)}>
            {otherScheme}
          </Button>
        </Flex>
      </Flex>
    </Providers>
  )
}
// @endif
