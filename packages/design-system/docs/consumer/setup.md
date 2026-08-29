# New-app checklist

Reference wiring: `diffChroma/apps/dashboard` (Next.js 15 App Router, React 19, pnpm workspace).

## 1. Install

```jsonc
// package.json
"dependencies": {
  "@soroush.tech/design-system": "^1.3.1",
  "@emotion/cache": "^11.14.0",
  "react": "^19.2.8",
  "react-dom": "^19.2.8"
}
```

`@emotion/react` and `@emotion/styled` come in as transitive deps of the design
system - don't add them directly. `@emotion/cache` is direct, only because the
Next.js SSR registry needs `createCache`.

## 2. Theme

Copy `theme.ts` to the app root (`apps/<app>/theme.ts`) so it imports as `@/theme`.
It exports `light` and `dark`. The color ramps at the top (`carbonBlack`,
`cyberCyan`, `kineticGreen`, `forestGreen`, `solarAmber`, `neonRed`, `softGreen`,
`deepCrimson`, `lightSurface`, `kineticSurface`, `blackAlpha`) are mirrored from the
soroush.tech web app (`core` repo, `apps/web/src/theme/colors`) - that mirroring is
the whole point of the file. If a ramp changes upstream, change it in every app.

## 3. Provider

Copy `providers.tsx` to `app/providers.tsx`. Two things it does:

- **Emotion SSR registry** - collects styles inserted during the server render and
  re-injects them via `useServerInsertedHTML`, so server markup arrives styled.
  Without it you get an unstyled flash on every hard navigation.
- **Global reset** - `border-box` everywhere, zero body margin,
  `background.primary` / `text.initial` / `fonts.body` on `<body>`.

Change the cache key (`createCache({ key: "dc" })`) to a short app-specific prefix.

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

## 4. Fonts - known gap

`theme.fonts` names _Space Grotesk_ and _JetBrains Mono_, but DiffChroma never loads
them, so it silently renders in system sans/mono. If the new app should actually look
right, load them - `@fontsource-variable/space-grotesk` + `@fontsource-variable/jetbrains-mono`
imported once in the root layout, or `next/font` - and consider backporting the same
fix to DiffChroma. Skipping this and matching DiffChroma exactly is also a valid
choice; just make it deliberately.

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
