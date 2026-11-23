import type { ReactNode } from 'react'
import { View } from '@soroush.design/react/View'
import { useDispatch, useSelector } from 'react-redux'
import { schemeChanged, type RootState } from '../state/store'
import { Header } from '../components/Header'
import { SchemeSwitch } from '../components/SchemeSwitch'
import { Providers } from '../theme/Providers'

/**
 * The frame every page renders in. The app's providers live here, in the app itself, so the
 * scheme, held in src/state/store.ts, can switch the theme.
 */
export default function Layout({ children }: { readonly children: ReactNode }) {
  const scheme = useSelector((state: RootState) => state.scheme)
  const dispatch = useDispatch()
  const setScheme = (next: 'light' | 'dark') => dispatch(schemeChanged(next))
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
