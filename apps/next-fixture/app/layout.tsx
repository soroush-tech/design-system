import { Global } from '@soroush.design/react/Global'
import { ThemeProvider } from '@soroush.design/react/ThemeProvider'
import { cookies } from 'next/headers'
import type { ReactNode } from 'react'
import { Providers } from './Providers'
import { cookieName, themes } from './theme'

export const metadata = { title: 'Server components', icons: { icon: 'data:,' } }

// A server component: the theme of the page is chosen from the cookie, so the first HTML has it.
export default async function RootLayout({ children }: { children: ReactNode }) {
  const scheme = (await cookies()).get(cookieName)?.value === 'dark' ? 'dark' : 'light'
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={themes[scheme]}>
          <Global
            styles={(theme) => ({ body: { margin: 0, background: theme.background.primary } })}
          />
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
