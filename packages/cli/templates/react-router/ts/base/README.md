# __TITLE__

A single-page app on [React Router](https://reactrouter.com) and the
[Gild UI](https://gild-ui.soroush.design): the browser renders each page, and moves
between them with no reload.

- `npm run dev` starts it, `npm run build` builds it, and `npm run preview` serves the build.
- `dist/` is static files: any host serves it, once it answers every path with `index.html`, so the
  router shows the page a URL names.
- `src/routes.tsx` lists the pages by path, and `src/main.tsx` renders the router in `index.html`.
- `src/pages/` holds the pages, and `src/pages/Layout.tsx` is the frame every page renders in,
  inside the app's providers. `src/components/RouterLink.tsx` is Gild UI's `Link`, moving
  to a page with no reload.
- `src/theme/themes.ts` holds the light and the dark theme: make them your own.
<!-- @if sample-data && (tanstack-query || swr) -->
- `src/pages/items/` lists the sample items of `src/data/items.ts`, and `src/pages/item/` shows one: both read them through `src/data/api.ts`.
<!-- @elif sample-data -->
- `src/pages/items/` lists the sample items of `src/data/items.ts`, and `src/pages/item/` shows one: their loaders read the data before the router shows the page. Make them fetch your own.
<!-- @endif -->
<!-- @if !zustand && !jotai && !redux-toolkit -->
- `src/pages/index/Counter.tsx` counts the presses of its button, in its own state.
<!-- @endif -->
<!-- @if tanstack-query && react-hook-form && sample-data -->
- [TanStack Query](https://tanstack.com/query): the query client lives in `Layout`. The home page's `Greeting` and the items pages read `src/data/api.ts` with queries, and the form sends its values with a mutation.
<!-- @elif tanstack-query && react-hook-form -->
- [TanStack Query](https://tanstack.com/query): the query client lives in `Layout`. The home page's `Greeting` reads `src/data/api.ts` with a query, and the form sends its values with a mutation.
<!-- @elif tanstack-query && sample-data -->
- [TanStack Query](https://tanstack.com/query): the query client lives in `Layout`. The home page's `Greeting` and the items pages read `src/data/api.ts` with queries.
<!-- @elif tanstack-query -->
- [TanStack Query](https://tanstack.com/query): the query client lives in `Layout`. The home page's `Greeting` reads `src/data/api.ts` with a query.
<!-- @endif -->
<!-- @if swr && react-hook-form && sample-data -->
- [SWR](https://swr.vercel.app): the home page's `Greeting` and the items pages read `src/data/api.ts` with SWR, and the form sends its values with a mutation.
<!-- @elif swr && react-hook-form -->
- [SWR](https://swr.vercel.app): the home page's `Greeting` reads `src/data/api.ts` with SWR, and the form sends its values with a mutation.
<!-- @elif swr && sample-data -->
- [SWR](https://swr.vercel.app): the home page's `Greeting` and the items pages read `src/data/api.ts` with SWR.
<!-- @elif swr -->
- [SWR](https://swr.vercel.app): the home page's `Greeting` reads `src/data/api.ts` with SWR.
<!-- @endif -->
<!-- @if msw && react-hook-form && sample-data && (tanstack-query || swr) -->
- [msw](https://mswjs.io): `src/mocks/handlers.ts` is a mock API, which answers the greeting, the form, the sample items in the browser while `VITE_MSW` in `.env` is true.
<!-- @elif msw && react-hook-form -->
- [msw](https://mswjs.io): `src/mocks/handlers.ts` is a mock API, which answers the greeting, the form in the browser while `VITE_MSW` in `.env` is true.
<!-- @elif msw && sample-data && (tanstack-query || swr) -->
- [msw](https://mswjs.io): `src/mocks/handlers.ts` is a mock API, which answers the greeting, the sample items in the browser while `VITE_MSW` in `.env` is true.
<!-- @elif msw -->
- [msw](https://mswjs.io): `src/mocks/handlers.ts` is a mock API, which answers the greeting in the browser while `VITE_MSW` in `.env` is true.
<!-- @endif -->
<!-- @if zustand -->
- [zustand](https://zustand.docs.pmnd.rs): `src/state/scheme.ts` holds the color scheme and `src/state/counter.ts` the home page's count, in stores.
<!-- @elif jotai -->
- [Jotai](https://jotai.org): `src/state/scheme.ts` holds the color scheme and `src/state/counter.ts` the home page's count, in atoms.
<!-- @elif redux-toolkit -->
- [Redux Toolkit](https://redux-toolkit.js.org): `src/state/store.ts` holds the color scheme and the home page's count, in slices of the store `src/main.tsx` provides.
<!-- @endif -->
<!-- @if react-hook-form -->
- [React Hook Form](https://react-hook-form.com) and [Zod](https://zod.dev): `/form` is a form whose values a Zod schema checks.
<!-- @endif -->
<!-- @if msw -->
- [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com): `npm run test` runs `src/pages/index/Page.test.tsx`, which checks the title, the counter and the greeting, which msw's Node server, `src/mocks/server.ts`, answers.
<!-- @else -->
- [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com): `npm run test` runs `src/pages/index/Page.test.tsx`, which checks the title and the counter.
<!-- @endif -->

Fonts: the theme names Space Grotesk and JetBrains Mono, and does not load them. See
https://gild-ui.soroush.design/react/installation/#fonts
