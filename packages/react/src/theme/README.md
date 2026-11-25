# ThemeProvider

Provides exactly **one** theme to the tree - a thin wrapper over the engine's provider plus the optional `defaults` merge. It has no opinion about how many themes you have or how you switch between them: mode toggling is app state, not the provider's (see [`docs/theming.md`](../../docs/theming.md)).

```tsx
import { ThemeProvider } from '@soroush.design/react'

// Zero-config: the built-in dark theme.
<ThemeProvider>{app}</ThemeProvider>

// Your theme - written from scratch or extended from a built-in via createTheme.
<ThemeProvider theme={brandDark}>{app}</ThemeProvider>
```

---

## Props

| Prop       | Type            | Default         | Description                                                                               |
| ---------- | --------------- | --------------- | ----------------------------------------------------------------------------------------- |
| `children` | `ReactNode`     | -               | Required child tree                                                                       |
| `theme`    | `Theme`         | built-in `dark` | The active theme. Bring one, or many managed by your own state.                           |
| `defaults` | `ThemeDefaults` | -               | Component default token/variant keys, merged into the theme (e.g. `{ size: 'compact' }`). |

When `defaults` is provided, the provider merges it into the theme via `createTheme(theme, { defaults })` (memoized). Otherwise the theme passes through untouched.

Server component: it renders in a React Server Component, with no client code.

## Mode switching

Owned by the consumer - hold the state and pass the active theme:

```tsx
const [isDark, setIsDark] = useState(true)
<ThemeProvider theme={isDark ? dark : light}>{app}</ThemeProvider>
```

The web app's reference implementation is `apps/web/src/theme/ThemeModeProvider.tsx` (context + `useThemeMode()` + the brand theme pair).

## registerBaseTheme - the theme of server components

A server component has no provider above it to read. `registerBaseTheme(theme)` (from
`@soroush.design/react/ThemeProvider`) gives the engine the app's base theme once, at module level, and
`useTheme()`, `useDefaultProps` and every component's styles read it there: `components` and `defaults`
as real values, the tokens as CSS variables, so the page's theme (light or dark) decides their
colors. Call it in the module that defines the app's themes, which the root layout and a client
`Providers` component both import (the server and the browser each register it). A client component
with no provider above it reads it too. See [`docs/consumer/setup.md`](../../docs/consumer/setup.md).

The engine's base theme is the library's built-in `baseTheme` until an app registers its own, so an
app that never calls `registerBaseTheme` still renders server components, with the built-in theme.
Registration is still how the app's own tokens and component styles reach them.

```tsx
export const themes = defineThemes({ light, dark }, components)
registerBaseTheme(themes.light)
```

## LayoutProvider - a page's own layout

An app has one `theme.layout`; a page that needs its own frame - a wider max width, other
margins, other panels - wraps itself in a `LayoutProvider`:

```tsx
// Defined outside the component: a new object on every render re-derives the theme.
const designSystemPage: ThemeLayout = { lg: { content: { maxWidth: '1376px', margin: 6 } } }

<LayoutProvider layout={designSystemPage}>...the page...</LayoutProvider>
```

Inside it, `View`, `Flex` and `Grid` with `layout`, and `useTheme().layout`, see the theme's layout
with the page's values merged on top, field by field. It derives the theme from the one around it
and changes nothing else - colours, typography, breakpoints and light/dark switching stay the
app's. A value holds from its breakpoint up, until the page sets it again (the page's `lg` max
width also covers `xl`, where the theme would change it). Providers nest: an inner one builds on
the outer. Without a `ThemeProvider`, it builds on `baseTheme`.

| Scope              | Where                          |
| ------------------ | ------------------------------ |
| The app            | `theme.layout` (`createTheme`) |
| A page or a region | `<LayoutProvider layout>`      |
| One section        | the element's `layout` prop    |

## Related

- `createTheme(base, overrides)` - deep-merge primitive for building themes ([`docs/theming.md`](../../docs/theming.md)).
- `theme.components` - per-component customization the provider carries along ([`docs/customization.md`](../../docs/customization.md)).
