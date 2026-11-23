# New-app checklist

Reference wiring: a Next.js App Router app on React 19.

## 1. Install

```jsonc
// package.json
"dependencies": {
  "@soroush.tech/design-system": "^3.0.0",
  "react": "^19.2.8",
  "react-dom": "^19.2.8"
}
```

The styling engine (UmberStyle, the `@umber-style/*` packages) comes in as a dependency
of the design system - don't add it directly. The registry in `providers.tsx` takes
`createCache` from `@soroush.tech/design-system/engine`. React 19.2 or later is required.

## 2. Theme

Copy `theme.ts` to the app root so it imports as `@/theme`.
It exports `light` and `dark`. The color ramps at the top (`carbonBlack`,
`cyberCyan`, `kineticGreen`, `forestGreen`, `solarAmber`, `neonRed`, `softGreen`,
`deepCrimson`, `lightSurface`, `kineticSurface`, `blackAlpha`) are the brand: every
app that copies them shares one color set. Change which ramp fills a palette slot if
the app needs to, never the ramp values.

## 3. Provider

Copy `providers.tsx` to `app/providers.tsx`. Two things it does:

- **Style registry** - collects the styles written during the server render and
  re-injects them via `useServerInsertedHTML`, so server markup arrives styled.
  Without it you get an unstyled flash on every hard navigation.
- **Global reset** - `border-box` everywhere, zero body margin,
  `background.primary` / `text.initial` / `fonts.body` on `<body>`.

The cache key is the prefix of the class names and the CSS variables under the registry. The
file uses `soroush`, the design system's own; an app that already has a key of its own may keep
it. The registry writes one `<style data-umber="<key> ...">` element per flush into the stream.

This set-up is tested on Next.js 16.4 with React 19.2, in development and in a production
build, with a page that streams through `Suspense`. Keep styled parts in client components:
the registry collects what client components render.

Under a strict Content Security Policy (a `style-src` with a nonce and no `unsafe-inline`), give
the cache the response's nonce, `createCache({ key: 'soroush', nonce })`, and put the same nonce
on the `<style>` element the registry returns, `nonce={cache.nonce}`: that element is the app's
own. Every style element the engine makes then carries it. Give React the same nonce for its
render; it keeps the rules of a style element only when the element's nonce is its own. This
registry has not been run under such a policy end to end, so test it in your app.

Then in `app/layout.tsx`:

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <TopBar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
```

`<Providers>` wraps everything including the chrome. Route groups then supply their
own inner layout (rail + `Main`).

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
