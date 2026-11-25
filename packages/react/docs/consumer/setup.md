# New-app checklist

Reference wiring: a Next.js App Router app on React 19, with server components. The pages and the
root layout are server components; the design system's static components render on the server with
the app's theme, and its interactive components are client components that a server component can
import and render.

## 1. Install

```jsonc
// package.json
"dependencies": {
  "@soroush.design/core": "^0.1.0",
  "@soroush.design/react": "^0.1.0",
  "react": "^19.2.8",
  "react-dom": "^19.2.8"
}
```

The styling engine (UmberStyle, the `@umber-style/*` packages) comes in as a dependency
of the design system - don't add it directly. React 19.2 or later is required.

## 2. Theme

Copy `theme.ts` to the app root so it imports as `@/theme`.
It exports `light` and `dark`. The color ramps at the top (`carbonBlack`,
`cyberCyan`, `kineticGreen`, `forestGreen`, `solarAmber`, `neonRed`, `softGreen`,
`deepCrimson`, `lightSurface`, `kineticSurface`, `blackAlpha`) are the brand: every
app that copies them shares one color set. Change which ramp fills a palette slot if
the app needs to, never the ramp values.

Its last line, `registerBaseTheme(light)`, is what makes server components themed. A server
component has no provider above it to read, so `useTheme()` and every component's styles read the
theme registered once, at module level: its `components` (the looks of the components) and its
`defaults` are real values there, and its tokens are CSS variables, so which theme the page is in
(light or dark) decides their colors. Register the theme the app starts in. An app that registers
nothing renders server components with the library's built-in theme, so nothing fails, but the
app's own tokens and component styles reach server components only through the registration.

The module is evaluated on both sides, which is the point: the server (the root layout imports
it) and the browser (`providers.tsx` imports it) each hold their own copy of the registration.

## 3. Layout and provider

Copy `providers.tsx` to `app/providers.tsx`. It is a client component that does nothing but
import the theme, so the browser's bundle (and the server render of client components) registers
the base theme before any client component below it renders. `components` can hold functions, and a
function cannot cross from a server component to a client one.

Then in `app/layout.tsx`, a server component. It reads the page's theme from a cookie, so the
first HTML already has it, and gives it to `ThemeProvider`, which declares the theme's variables
on the page:

```tsx
import { Global } from '@soroush.design/react/Global'
import { ThemeProvider } from '@soroush.design/react/ThemeProvider'
import { cookies } from 'next/headers'
import Providers from './providers'
import { themes } from '@/theme'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const scheme = (await cookies()).get('scheme')?.value === 'dark' ? 'dark' : 'light'
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={themes[scheme]}>
          <Global
            styles={(theme) => ({
              '*, *::before, *::after': { boxSizing: 'border-box' },
              body: {
                margin: 0,
                backgroundColor: theme.background.primary,
                color: theme.text.initial,
                fontFamily: theme.fonts.body,
              },
            })}
          />
          <Providers>
            <TopBar />
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

`<ThemeProvider>` wraps everything including the chrome, and `Global` is the reset: `border-box`
everywhere, zero body margin, `background.primary` / `text.initial` / `fonts.body` on `<body>`.
Route groups then supply their own inner layout (rail + `Main`).

**Light and dark, with no client code.** A server action writes the cookie, and Next renders the
page again with the other theme. The switch is a form around a button:

```ts
// app/actions.ts
'use server'

import { cookies } from 'next/headers'

export async function switchScheme() {
  const jar = await cookies()
  jar.set('scheme', jar.get('scheme')?.value === 'dark' ? 'light' : 'dark')
}
```

```tsx
<form action={switchScheme}>
  <Button type="submit">Switch theme</Button>
</form>
```

**Server and client components.** Import every component from its subpath, in a server component
too. Each component's README says which it is. The static ones - `Typography`, `View`, `Flex`,
`Grid`, `Paper`, `Card`, `Skeleton`, `Icon`, `Link`, `Badge`, `AppBar`, `Quote`, the progress
indicators - are server components: they render on the server with the registered theme and send no
JavaScript of their own. The ones with state, effects, events or a family context - `Button`,
`Tabs`, `Menu`, `Table`, the form controls - are client components: their entry starts with
`'use client'`, so a server component renders them as it renders any client component, with props
that can cross (text, numbers, elements - not functions). A handler goes in a client component of
your own, as `Counter` does in `apps/next-fixture`.

**No style registry.** Under the App Router the engine sends the styles of client components with
the HTML too (each styled element renders its own `<style href precedence>`, which React moves to
the head), so a page is styled before any JavaScript runs. The `useServerInsertedHTML` registry of
the earlier set-up is not needed, and `CacheProvider` is not used.

This set-up is tested by `apps/next-fixture` on Next.js 16.4 with React 19.3, in a production
build, with JavaScript off (computed styles of the static and the client components, and the theme
from the cookie) and on (no console error, no hydration warning, a click, the switch).

**Limits.**

- A strict Content Security Policy whose `style-src` has a nonce and no `'unsafe-inline'` is not
  supported with server components yet: the style elements of the server build take their nonce
  from the engine's configuration, which is set once for the process, not for each request, so the
  browser blocks them. (The registry set-up this replaces could carry a request's nonce.)
- A `components` look written as a function is not plain data: a server `ThemeProvider` leaves it
  out of what it sends to client components, warns once in development with the path, and the
  client components take the function from the theme module of the browser's bundle - which is why
  `providers.tsx` imports it.

## 4. Fonts

`theme.fonts` names _Space Grotesk_ and _JetBrains Mono_, but the package does not
load them. An app that never loads them renders in the system sans and mono fonts.
To get the intended look, load them once in the root layout -
`@fontsource-variable/space-grotesk` + `@fontsource-variable/jetbrains-mono`, or
`next/font`. Leaving the system fonts is also a valid choice; just make it deliberately.

## 5. Layout scaffold

```
components/
  chrome/constants.ts   TOPBAR_HEIGHT = "3.5rem"
  chrome/TopBar.tsx     sticky AppBar, brand wordmark, breadcrumb, session cluster
  chrome/Main.tsx       1600px column, 20→40px gutters
  chrome/<Rail>.tsx     optional icon rail, bottom bar on mobile
  ui.tsx                NavLink, TokenCode, StatusBadge + STATUS_TONE map
  PageCard.tsx  PageHeader.tsx  SectionLabel.tsx  Pill.tsx
  StatStrip.tsx  TabNav.tsx  SettingCard.tsx  SearchInput.tsx  Skeletons.tsx
```

Sources in `layout-kit.md`.

## 6. tsconfig

`@/*` path alias to the app root - every import above assumes it.

## 7. Verify

`pnpm typecheck` (`tsc --noEmit`) catches the common mistakes: a `tone` string that
isn't a `PaletteColor`, a `theme.text.*` key that doesn't exist, a missing
`shouldForwardProp`. The theme is fully typed - lean on it instead of eyeballing.
