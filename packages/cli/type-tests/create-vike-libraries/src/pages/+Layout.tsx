import { useState, type ReactNode } from 'react'
import { View } from '@gild-ui/react/View'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useScheme } from '../state/scheme'
import { Header } from '../components/Header'
import { SchemeSwitch } from '../components/SchemeSwitch'
import { Providers } from '../theme/Providers'

/**
 * The frame every page renders in. The app's providers live here, in the app itself, so the
 * scheme, held in src/state/scheme.ts, can switch the theme.
 */
export default function Layout({ children }: { readonly children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  const { scheme, setScheme } = useScheme()
  return (
    <QueryClientProvider client={queryClient}>
      <Providers scheme={scheme}>
        <Header>
          <SchemeSwitch scheme={scheme} onSchemeChange={setScheme} />
        </Header>
        <View as="main" px={3} py={4}>
          {children}
        </View>
      </Providers>
    </QueryClientProvider>
  )
}
