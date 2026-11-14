import type { ReactNode } from 'react'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Link } from '@soroush.tech/design-system/Link'
import { Typography } from '@soroush.tech/design-system/Typography'
import { View } from '@soroush.tech/design-system/View'
import { Providers } from '../theme/Providers'

/**
 * The frame every page renders in, inside the app's providers. A page has no JavaScript in the
 * browser, so it is drawn in the default scheme, which src/theme/Providers.ts sets.
 */
export default function Layout({ children }: { readonly children: ReactNode }) {
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
      <View as="main" px={3} py={4}>
        {children}
      </View>
    </Providers>
  )
}
