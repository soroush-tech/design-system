import type { ReactNode } from 'react'
import { AppBar } from '@soroush.tech/design-system/AppBar'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Link } from '@soroush.tech/design-system/Link'
import { useTheme } from '@soroush.tech/design-system/theme'
import { Typography } from '@soroush.tech/design-system/Typography'
import { alpha } from '@soroush.tech/design-system/utils'

/**
 * The app bar on every page: the app's title, its links, and `children` at its end. It sticks to
 * the top as the page scrolls; on a phone, the links move to a row of their own.
 */
export function Header({ children }: { readonly children?: ReactNode }) {
  const theme = useTheme()
  return (
    <AppBar
      position="sticky"
      top={0}
      elevation={0}
      color="appBar"
      blur
      flexDirection="row"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="space-between"
      gap={2}
      borderBottom={`1px solid ${alpha(theme.border.primary, 0.2)}`}
    >
      <Typography variant="h6" as="span">
        My App
      </Typography>
      <Flex
        as="nav"
        flexDirection="row"
        alignItems="center"
        gap={3}
        order={[1, 0]}
        width={['100%', 'auto']}
      >
        <Link href="/" underline="hover">
          Home
        </Link>
        <Link href="/about" underline="hover">
          About
        </Link>
        <Link href="/items" underline="hover">
          Items
        </Link>
        <Link href="/form" underline="hover">
          Form
        </Link>
      </Flex>
      {children}
    </AppBar>
  )
}
