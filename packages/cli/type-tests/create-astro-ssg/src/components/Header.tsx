import type { ReactNode } from 'react'
import { AppBar } from '@gild-ui/react/AppBar'
import { Flex } from '@gild-ui/react/Flex'
import { Link } from '@gild-ui/react/Link'
import { useTheme } from '@gild-ui/react'
import { Typography } from '@gild-ui/react/Typography'
import { alpha } from '@gild-ui/core/utils'
import { Providers } from '../theme/Providers'

/**
 * The app bar: the app's title, its links, and `children` at its end. It sticks to the top as the
 * page scrolls; on a phone, the links move to a row of their own.
 */
function Bar({ children }: { readonly children?: ReactNode }) {
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
      </Flex>
      {children}
    </AppBar>
  )
}

/**
 * The header of every page. Its Providers draw the base styles, once a page. A page has no
 * JavaScript, so it has no theme switch.
 */
export default function Header() {
  return (
    <Providers>
      <Bar />
    </Providers>
  )
}
