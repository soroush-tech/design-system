import { useState, type ReactNode } from 'react'
import { View } from '@soroush.design/react-components/View'
import { Header } from '../components/Header'
import { SchemeSwitch } from '../components/SchemeSwitch'
import { Providers } from '../theme/Providers'

/**
 * The frame every page renders in. The app's providers live here, in the app itself, so the
 * scheme it holds can switch the theme.
 */
export default function Layout({ children }: { readonly children: ReactNode }) {
  const [scheme, setScheme] = useState<'light' | 'dark'>('light')
  return (
    <Providers scheme={scheme}>
      <Header>
        <SchemeSwitch scheme={scheme} onSchemeChange={setScheme} />
      </Header>
      <View as="main" px={3} py={4}>
        {children}
      </View>
    </Providers>
  )
}
