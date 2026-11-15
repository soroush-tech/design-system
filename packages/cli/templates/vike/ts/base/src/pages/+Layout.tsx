// @if !ssg && (tanstack-query || (!zustand && !jotai && !redux-toolkit))
import { useState, type ReactNode } from 'react'
// @else
import type { ReactNode } from 'react'
// @endif
// @if !ssg
import { Button } from '@soroush.tech/design-system/Button'
// @endif
import { Flex } from '@soroush.tech/design-system/Flex'
import { Link } from '@soroush.tech/design-system/Link'
import { Typography } from '@soroush.tech/design-system/Typography'
import { View } from '@soroush.tech/design-system/View'
// @if tanstack-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// @endif
// @if zustand
import { useScheme } from '../state/scheme'
// @elif jotai
import { useAtom } from 'jotai'
import { schemeAtom } from '../state/scheme'
// @elif redux-toolkit
import { useDispatch, useSelector } from 'react-redux'
import { schemeChanged, type RootState } from '../state/store'
// @endif
import { Providers } from '../theme/Providers'

/**
// @if ssg
 * The frame every page renders in, inside the app's providers. A page has no JavaScript in the
 * browser, so it is drawn in the default scheme, which src/theme/Providers.ts sets.
// @elif zustand || jotai
 * The frame every page renders in. The app's providers live here, in the app itself, so the
 * scheme, held in src/state/scheme.ts, can switch the theme.
// @elif redux-toolkit
 * The frame every page renders in. The app's providers live here, in the app itself, so the
 * scheme, held in src/state/store.ts, can switch the theme.
// @else
 * The frame every page renders in. The app's providers live here, in the app itself, so the
 * scheme it holds can switch the theme.
// @endif
 */
export default function Layout({ children }: { readonly children: ReactNode }) {
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
  // @elif !ssg
  const [scheme, setScheme] = useState<'light' | 'dark'>('__SCHEME__')
  // @endif
  // @if !ssg
  const otherScheme = scheme === 'light' ? 'dark' : 'light'
  // @endif
  // @if ssg
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
      <View as="main" px={3} py={4}>
        {children}
      </View>
    </Providers>
  )
  // @elif tanstack-query
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
            <Button size="sm" variant="outlined" onClick={() => setScheme(otherScheme)}>
              {otherScheme}
            </Button>
          </Flex>
        </Flex>
        <View as="main" px={3} py={4}>
          {children}
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
          <Button size="sm" variant="outlined" onClick={() => setScheme(otherScheme)}>
            {otherScheme}
          </Button>
        </Flex>
      </Flex>
      <View as="main" px={3} py={4}>
        {children}
      </View>
    </Providers>
  )
  // @endif
}
