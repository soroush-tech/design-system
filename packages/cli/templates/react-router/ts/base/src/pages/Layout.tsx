// @if tanstack-query || (!zustand && !jotai && !redux-toolkit)
import { useState } from 'react'
// @endif
import { Button } from '@soroush.tech/design-system/Button'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Typography } from '@soroush.tech/design-system/Typography'
import { View } from '@soroush.tech/design-system/View'
// @if tanstack-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// @endif
import { Outlet } from 'react-router'
// @if zustand
import { useScheme } from '../state/scheme'
// @elif jotai
import { useAtom } from 'jotai'
import { schemeAtom } from '../state/scheme'
// @elif redux-toolkit
import { useDispatch, useSelector } from 'react-redux'
import { schemeChanged, type RootState } from '../state/store'
// @endif
import { RouterLink } from '../components/RouterLink'
import { Providers } from '../theme/Providers'

/**
// @if zustand || jotai
 * The frame every page renders in: the router draws the page in its Outlet. The app's providers
 * live here, in the app itself, so the scheme, held in src/state/scheme.ts, can switch the theme.
// @elif redux-toolkit
 * The frame every page renders in: the router draws the page in its Outlet. The app's providers
 * live here, in the app itself, so the scheme, held in src/state/store.ts, can switch the theme.
// @else
 * The frame every page renders in: the router draws the page in its Outlet. The app's providers
 * live here, in the app itself, so the scheme it holds can switch the theme.
// @endif
 */
export function Layout() {
  // @if tanstack-query
  const [queryClient] = useState(() => new QueryClient())
  // @endif
  // @if zustand
  const { scheme, setScheme } = useScheme()
  // @elif jotai
  const [scheme, setScheme] = useAtom(schemeAtom)
  // @elif redux-toolkit
  const scheme = useSelector((state: RootState) => state.scheme)
  const dispatch = useDispatch()
  const setScheme = (next: 'light' | 'dark') => dispatch(schemeChanged(next))
  // @else
  const [scheme, setScheme] = useState<'light' | 'dark'>('__SCHEME__')
  // @endif
  const otherScheme = scheme === 'light' ? 'dark' : 'light'
  // @if tanstack-query
  return (
    <QueryClientProvider client={queryClient}>
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
            <RouterLink to="/" underline="hover">
              Home
            </RouterLink>
            <RouterLink to="/about" underline="hover">
              About
            </RouterLink>
            {/* @if sample-data */}
            <RouterLink to="/items" underline="hover">
              Items
            </RouterLink>
            {/* @endif */}
            {/* @if react-hook-form */}
            <RouterLink to="/form" underline="hover">
              Form
            </RouterLink>
            {/* @endif */}
            <Button size="sm" variant="outlined" onClick={() => setScheme(otherScheme)}>
              {otherScheme}
            </Button>
          </Flex>
        </Flex>
        <View as="main" px={3} py={4}>
          <Outlet />
        </View>
      </Providers>
    </QueryClientProvider>
  )
  // @else
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
          <RouterLink to="/" underline="hover">
            Home
          </RouterLink>
          <RouterLink to="/about" underline="hover">
            About
          </RouterLink>
          {/* @if sample-data */}
          <RouterLink to="/items" underline="hover">
            Items
          </RouterLink>
          {/* @endif */}
          {/* @if react-hook-form */}
          <RouterLink to="/form" underline="hover">
            Form
          </RouterLink>
          {/* @endif */}
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
  // @endif
}
