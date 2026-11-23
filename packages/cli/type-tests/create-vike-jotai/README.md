# My App

A [Vike](https://vike.dev) app on the [@soroush.tech design system](https://docs.soroush.design):
prerendered at build time with its styles in the HTML, then moving between pages with no reload.

- `npm run dev` starts it, `npm run build` builds it, and `npm run preview` serves the build.
- `src/pages/` holds the pages: a folder per route, each with its `+Page`.
- `src/pages/+Layout.tsx` is the frame every page renders in, inside the app's providers.
- `src/theme/themes.ts` holds the light and the dark theme: make them your own.
- In `src/pages/`, `+onRenderHtml` and `+onRenderClient` render the pages, with the styles each page uses in its HTML.
- [TanStack Query](https://tanstack.com/query): the query client lives in `+Layout`. The home page's `Greeting` reads `src/data/api.ts` with a query.
- [Jotai](https://jotai.org): `src/state/scheme.ts` holds the color scheme and `src/state/counter.ts` the home page's count, in atoms.
- [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com): `npm run test` runs `src/pages/index/Page.test.tsx`, which checks the title and the counter.

Fonts: the theme names Space Grotesk and JetBrains Mono, and does not load them. See
https://docs.soroush.design/design-system/getting-started/installation/#fonts
