// @if tanstack-query || (!zustand && !jotai && !redux-toolkit)
import { useState } from 'react'
// @endif
import { View } from '@soroush.design/react-components/View'
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
import { Header } from '../components/Header'
import { SchemeSwitch } from '../components/SchemeSwitch'
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
  // @if tanstack-query
  return (
    <QueryClientProvider client={queryClient}>
      <Providers scheme={scheme}>
        <Header>
          <SchemeSwitch scheme={scheme} onSchemeChange={setScheme} />
        </Header>
        <View as="main" px={3} py={4}>
          <Outlet />
        </View>
      </Providers>
    </QueryClientProvider>
  )
  // @else
  return (
    <Providers scheme={scheme}>
      <Header>
        <SchemeSwitch scheme={scheme} onSchemeChange={setScheme} />
      </Header>
      <View as="main" px={3} py={4}>
        <Outlet />
      </View>
    </Providers>
  )
  // @endif
}
