import { useState } from 'react'
import { View } from '@gild-ui/react/View'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Outlet } from 'react-router'
import { useScheme } from '../state/scheme'
import { Header } from '../components/Header'
import { SchemeSwitch } from '../components/SchemeSwitch'
import { Providers } from '../theme/Providers'

/**
 * The frame every page renders in: the router draws the page in its Outlet. The app's providers
 * live here, in the app itself, so the scheme, held in src/state/scheme.ts, can switch the theme.
 */
export function Layout() {
  const [queryClient] = useState(() => new QueryClient())
  const { scheme, setScheme } = useScheme()
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
}
