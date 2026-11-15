# My App

A [Vike](https://vike.dev) app on the [@soroush.tech design system](https://docs.soroush.tech):
a single-page app: each page is an HTML shell from the build, rendered in the browser, which moves between pages with no reload.

- `npm run dev` starts it, `npm run build` builds it, and `npm run preview` serves the build.
- `src/pages/` holds the pages: a folder per route, each with its `+Page`.
- `src/pages/+Layout.tsx` is the frame every page renders in, inside the app's providers.
- `src/theme/themes.ts` holds the light and the dark theme: make them your own.
- In `src/pages/`, `+onRenderHtml` writes the HTML shell of each page, and `+onRenderClient` renders the page in it.
- [Jotai](https://jotai.org): `src/state/scheme.ts` holds the color scheme and `src/state/counter.ts` the home page's count, in atoms.
- [TanStack Query](https://tanstack.com/query): the query client lives in `+Layout`. The home page's `Greeting` reads `src/data/api.ts` with a query.

Fonts: the theme names Space Grotesk and JetBrains Mono, and does not load them. See
https://docs.soroush.tech/design-system/getting-started/installation/#fonts
