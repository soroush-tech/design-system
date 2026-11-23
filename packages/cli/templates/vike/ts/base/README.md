# __TITLE__

A [Vike](https://vike.dev) app on the [@soroush.tech design system](https://docs.soroush.design):
<!-- @if isomorphic -->
prerendered at build time with its styles in the HTML, then moving between pages with no reload.
<!-- @elif ssr -->
every page rendered on the server, on each request, with its styles in the HTML, then moving between pages with no reload.
<!-- @else -->
every page prerendered to HTML at build time, with its styles, and no JavaScript in the browser.
<!-- @endif -->

- `npm run dev` starts it, `npm run build` builds it, and `npm run preview` serves the build.
<!-- @if ssr -->
- `npm start` runs the server the build wrote, on `PORT` (3000 by default), on any Node host.
<!-- @endif -->
- `src/pages/` holds the pages: a folder per route, each with its `+Page`.
- `src/pages/+Layout.tsx` is the frame every page renders in, inside the app's providers.
- `src/theme/themes.ts` holds the light and the dark theme: make them your own.
<!-- @if isomorphic -->
- In `src/pages/`, `+onRenderHtml` and `+onRenderClient` render the pages, with the styles each page uses in its HTML.
<!-- @elif ssr -->
- In `src/pages/`, `+onRenderHtml` renders each page on the server and `+onRenderClient` takes it over in the browser, with the styles each page uses in its HTML.
<!-- @else -->
- In `src/pages/`, `+onRenderHtml` renders the pages to HTML, with the styles each page uses.
<!-- @endif -->
<!-- @if sample-data -->
- `src/pages/items/` lists the sample items of `src/data/items.ts`, with a page for each.
<!-- @if ssr -->
  Their `+data` hooks read the data on each request: make them fetch your own.
<!-- @else -->
  Their `+data` hooks read the data at build time: make them fetch your own.
<!-- @endif -->
<!-- @endif -->
<!-- @if !ssg && !zustand && !jotai && !redux-toolkit -->
- `src/pages/index/Counter.tsx` counts the presses of its button, in its own state.
<!-- @endif -->
<!-- @if tanstack-query && react-hook-form && sample-data -->
- [TanStack Query](https://tanstack.com/query): the query client lives in `+Layout`. The home page's `Greeting` reads `src/data/api.ts` with a query, and the form sends its values with a mutation. The items pages start on their build-time data, then query it in the browser.
<!-- @elif tanstack-query && react-hook-form -->
- [TanStack Query](https://tanstack.com/query): the query client lives in `+Layout`. The home page's `Greeting` reads `src/data/api.ts` with a query, and the form sends its values with a mutation.
<!-- @elif tanstack-query && sample-data -->
- [TanStack Query](https://tanstack.com/query): the query client lives in `+Layout`. The home page's `Greeting` reads `src/data/api.ts` with a query. The items pages start on their build-time data, then query it in the browser.
<!-- @elif tanstack-query -->
- [TanStack Query](https://tanstack.com/query): the query client lives in `+Layout`. The home page's `Greeting` reads `src/data/api.ts` with a query.
<!-- @endif -->
<!-- @if swr && react-hook-form && sample-data -->
- [SWR](https://swr.vercel.app): the home page's `Greeting` reads `src/data/api.ts` with SWR, and the form sends its values with a mutation. The items pages start on their build-time data, then fetch it in the browser.
<!-- @elif swr && react-hook-form -->
- [SWR](https://swr.vercel.app): the home page's `Greeting` reads `src/data/api.ts` with SWR, and the form sends its values with a mutation.
<!-- @elif swr && sample-data -->
- [SWR](https://swr.vercel.app): the home page's `Greeting` reads `src/data/api.ts` with SWR. The items pages start on their build-time data, then fetch it in the browser.
<!-- @elif swr -->
- [SWR](https://swr.vercel.app): the home page's `Greeting` reads `src/data/api.ts` with SWR.
<!-- @endif -->
<!-- @if msw && react-hook-form && sample-data -->
- [msw](https://mswjs.io): `src/mocks/handlers.ts` is a mock API, which answers the greeting, the form, the sample items in the browser while `VITE_MSW` in `.env` is true.
<!-- @elif msw && react-hook-form -->
- [msw](https://mswjs.io): `src/mocks/handlers.ts` is a mock API, which answers the greeting, the form in the browser while `VITE_MSW` in `.env` is true.
<!-- @elif msw && sample-data -->
- [msw](https://mswjs.io): `src/mocks/handlers.ts` is a mock API, which answers the greeting, the sample items in the browser while `VITE_MSW` in `.env` is true.
<!-- @elif msw -->
- [msw](https://mswjs.io): `src/mocks/handlers.ts` is a mock API, which answers the greeting in the browser while `VITE_MSW` in `.env` is true.
<!-- @endif -->
<!-- @if zustand -->
- [zustand](https://zustand.docs.pmnd.rs): `src/state/scheme.ts` holds the color scheme and `src/state/counter.ts` the home page's count, in stores.
<!-- @elif jotai -->
- [Jotai](https://jotai.org): `src/state/scheme.ts` holds the color scheme and `src/state/counter.ts` the home page's count, in atoms.
<!-- @elif redux-toolkit -->
- [Redux Toolkit](https://redux-toolkit.js.org): `src/state/store.ts` holds the color scheme and the home page's count, in slices of the store `PageShell` provides.
<!-- @endif -->
<!-- @if react-hook-form -->
- [React Hook Form](https://react-hook-form.com) and [Zod](https://zod.dev): `/form` is a form whose values a Zod schema checks.
<!-- @endif -->
<!-- @if ssg -->
- [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com): `npm run test` runs `src/pages/index/Page.test.tsx`, which checks the title.
<!-- @elif msw -->
- [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com): `npm run test` runs `src/pages/index/Page.test.tsx`, which checks the title, the counter and the greeting, which msw's Node server, `src/mocks/server.ts`, answers.
<!-- @else -->
- [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com): `npm run test` runs `src/pages/index/Page.test.tsx`, which checks the title and the counter.
<!-- @endif -->

Fonts: the theme names Space Grotesk and JetBrains Mono, and does not load them. See
https://docs.soroush.design/design-system/getting-started/installation/#fonts
