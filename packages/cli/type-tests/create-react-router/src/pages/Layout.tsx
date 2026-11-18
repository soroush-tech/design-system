import { useState } from 'react'
import { Button } from '@soroush.tech/design-system/Button'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Typography } from '@soroush.tech/design-system/Typography'
import { View } from '@soroush.tech/design-system/View'
import { Outlet } from 'react-router'
import { RouterLink } from '../components/RouterLink'
import { Providers } from '../theme/Providers'

/**
 * The frame every page renders in: the router draws the page in its Outlet. The app's providers
 * live here, in the app itself, so the scheme it holds can switch the theme.
 */
export function Layout() {
  const [scheme, setScheme] = useState<'light' | 'dark'>('light')
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
          My App
        </Typography>
        <Flex as="nav" flexDirection="row" alignItems="center" gap={2}>
          <RouterLink to="/" underline="hover">
            Home
          </RouterLink>
          <RouterLink to="/about" underline="hover">
            About
          </RouterLink>
          <RouterLink to="/items" underline="hover">
            Items
          </RouterLink>
          <Button size="sm" variant="outlined" onClick={() => setScheme(otherScheme)}>
            {otherScheme}
          </Button>
        </Flex>
      </Flex>
      <View as="main" px={3} py={4}>
        <Outlet />
      </View>
    </Providers>
  )
}
