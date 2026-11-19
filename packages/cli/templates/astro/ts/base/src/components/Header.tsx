import type { ReactNode } from 'react'
import { AppBar } from '@soroush.tech/design-system/AppBar'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Link } from '@soroush.tech/design-system/Link'
import { useTheme } from '@soroush.tech/design-system/theme'
import { Typography } from '@soroush.tech/design-system/Typography'
import { alpha } from '@soroush.tech/design-system/utils'
import { Providers } from '../theme/Providers'
// @if !ssg
import { setScheme, useScheme } from '../theme/scheme'
import { SchemeSwitch } from './SchemeSwitch'
// @endif

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

/**
// @if ssg
 * The header of every page. Its Providers draw the base styles, once a page. A page has no
 * JavaScript, so it has no theme switch.
// @else
 * The header of every page, an island of its own. Its Providers draw the base styles, once a
 * page, and its switch changes the scheme of every island.
// @endif
 */
// @if ssg
export default function Header() {
  return (
    <Providers>
      <Bar />
    </Providers>
  )
}
// @else
export default function Header() {
  const scheme = useScheme()
  return (
    <Providers scheme={scheme}>
      <Bar>
        <SchemeSwitch scheme={scheme} onSchemeChange={setScheme} />
      </Bar>
    </Providers>
  )
}
// @endif
