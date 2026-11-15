# My App

A [Vike](https://vike.dev) app on the [@soroush.tech design system](https://docs.soroush.tech):
prerendered at build time with its styles in the HTML, then moving between pages with no reload.

- `npm run dev` starts it, `npm run build` builds it, and `npm run preview` serves the build.
- `src/pages/` holds the pages: a folder per route, each with its `+Page`.
- `src/pages/+Layout.tsx` is the frame every page renders in, inside the app's providers.
- `src/theme/themes.ts` holds the light and the dark theme: make them your own.
- In `src/pages/`, `+onRenderHtml` and `+onRenderClient` render the pages, with the styles each page uses in its HTML.
- `src/pages/items/` lists the sample items of `src/data/items.ts`, with a page for each.
  Their `+data` hooks read the data at build time: make them fetch your own.
- [TanStack Query](https://tanstack.com/query): the query client lives in `+Layout`. The home page's `Greeting` reads `src/data/api.ts` with a query. The items pages start on their build-time data, then query it in the browser.
- [msw](https://mswjs.io): `src/mocks/handlers.ts` is a mock API, which answers the greeting, the sample items in the browser while `VITE_MSW` in `.env` is true.
- [zustand](https://zustand.docs.pmnd.rs): `src/state/scheme.ts` holds the color scheme and `src/state/counter.ts` the home page's count, in stores.
- [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com): `npm run test` runs `src/pages/index/Page.test.tsx`, which checks the title, the counter and the greeting, which msw's Node server, `src/mocks/server.ts`, answers.

Fonts: the theme names Space Grotesk and JetBrains Mono, and does not load them. See
https://docs.soroush.tech/design-system/getting-started/installation/#fonts
