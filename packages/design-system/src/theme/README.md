# ThemeProvider

Provides exactly **one** theme to the tree - a thin wrapper over Emotion's provider plus the optional `defaults` merge. It has no opinion about how many themes you have or how you switch between them: mode toggling is app state, not the provider's (see [`docs/theming.md`](../../docs/theming.md)).

```tsx
import { ThemeProvider } from '@soroush.tech/design-system/theme'

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

## Mode switching

Owned by the consumer - hold the state and pass the active theme:

```tsx
const [isDark, setIsDark] = useState(true)
<ThemeProvider theme={isDark ? dark : light}>{app}</ThemeProvider>
```

The web app's reference implementation is `apps/web/src/theme/ThemeModeProvider.tsx` (context + `useThemeMode()` + the brand theme pair).

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
