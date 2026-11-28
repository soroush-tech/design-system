import type { ReactNode } from 'react'
import { View } from '@gild-ui/react/View'
import { Header } from '../components/Header'
import { Providers } from '../theme/Providers'

/**
 * The frame every page renders in, inside the app's providers. A page has no JavaScript in the
 * browser, so it is drawn in the default scheme, which src/theme/Providers.ts sets.
 */
export default function Layout({ children }: { readonly children: ReactNode }) {
  return (
    <Providers>
      <Header />
      <View as="main" px={3} py={4}>
        {children}
      </View>
    </Providers>
  )
}
