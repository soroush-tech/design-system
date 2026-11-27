import { Global } from '@gild-ui/react/Global'
import { StyleRegistry } from '@gild-ui/react/next'
import { ThemeProvider } from '@gild-ui/react/ThemeProvider'
import { cookies } from 'next/headers'
import type { ReactNode } from 'react'
import './nonce'
import { Providers } from './Providers'
import { cookieName, themes } from './theme'

export const metadata = { title: 'Server components', icons: { icon: 'data:,' } }

// A server component: the theme of the page is chosen from the cookie, so the first HTML has it.
// `StyleRegistry` writes the styles of each request with the nonce proxy.ts gave it.
export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const scheme = (await cookies()).get(cookieName)?.value === 'dark' ? 'dark' : 'light'
  return (
    <html lang="en">
      <body>
        <StyleRegistry>
          <ThemeProvider theme={themes[scheme]}>
            <Global
              styles={(theme) => ({ body: { margin: 0, background: theme.background.primary } })}
            />
            <Providers>{children}</Providers>
          </ThemeProvider>
        </StyleRegistry>
      </body>
    </html>
  )
}
