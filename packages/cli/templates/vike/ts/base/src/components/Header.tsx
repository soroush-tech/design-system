import type { ReactNode } from 'react'
import { AppBar } from '@soroush.design/react/AppBar'
import { Flex } from '@soroush.design/react/Flex'
import { Link } from '@soroush.design/react/Link'
import { useTheme } from '@soroush.design/react'
import { Typography } from '@soroush.design/react/Typography'
import { alpha } from '@soroush.design/core/utils'

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
        __TITLE__
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
        {/* @if sample-data */}
        <Link href="/items" underline="hover">
          Items
        </Link>
        {/* @endif */}
        {/* @if react-hook-form */}
        <Link href="/form" underline="hover">
          Form
        </Link>
        {/* @endif */}
      </Flex>
      {children}
    </AppBar>
  )
}
