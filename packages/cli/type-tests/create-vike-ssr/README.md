# My App

A [Vike](https://vike.dev) app on [Gild UI](https://gild-ui.soroush.design):
every page rendered on the server, on each request, with its styles in the HTML, then moving between pages with no reload.

- `npm run dev` starts it, `npm run build` builds it, and `npm run preview` serves the build.
- `npm start` runs the server the build wrote, on `PORT` (3000 by default), on any Node host.
- `src/pages/` holds the pages: a folder per route, each with its `+Page`.
- `src/pages/+Layout.tsx` is the frame every page renders in, inside the app's providers.
- `src/theme/themes.ts` holds the light and the dark theme: make them your own.
- In `src/pages/`, `+onRenderHtml` renders each page on the server and `+onRenderClient` takes it over in the browser, with the styles each page uses in its HTML.
- `src/pages/items/` lists the sample items of `src/data/items.ts`, with a page for each.
  Their `+data` hooks read the data on each request: make them fetch your own.
- `src/pages/index/Counter.tsx` counts the presses of its button, in its own state.
- [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com): `npm run test` runs `src/pages/index/Page.test.tsx`, which checks the title and the counter.

Fonts: the theme names Space Grotesk and JetBrains Mono, and does not load them. See
https://gild-ui.soroush.design/react/installation/#fonts
