# The Next.js entry

`@gild-ui/react/next` holds `StyleRegistry`, the style registry of the Next.js App Router, for an app with server components. Add it once, around the page, in the root layout. It collects the styles of each request, of the server components and of the client components, and writes them with the HTML, with the nonce of the request when the app has a strict style policy.

```tsx
import { StyleRegistry } from '@gild-ui/react/next'
```

`next` is an optional peer dependency of `@gild-ui/react`, `^16.3.0`: only an app that imports this entry needs it. The entry also makes sure the engine writes to the library's one cache, so nothing else is passed to `StyleRegistry`.

```tsx
// app/layout.tsx
import { StyleRegistry } from '@gild-ui/react/next'
import { ThemeProvider } from '@gild-ui/react/ThemeProvider'
import './nonce'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StyleRegistry>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </StyleRegistry>
      </body>
    </html>
  )
}
```

The `./nonce` module and the `proxy.ts` that sets the policy are in the setup guide of the package (`docs/consumer/setup.md`): the nonce source is `setNonceSource` from [`@gild-ui/react/engine`](./engine.md).
