# __TITLE__

An [Astro](https://astro.build) app on the [@soroush.tech design system](https://docs.soroush.tech):
<!-- @if isomorphic -->
every page is HTML from the build, with its styles, and its parts are React islands
that hydrate in the browser. Astro's client router moves between pages with no reload.
<!-- @elif ssr -->
every page is rendered on the server, on each request, with its styles, and its parts are
React islands that hydrate in the browser. Astro's client router moves between pages with no
reload.
<!-- @else -->
every page is HTML from the build, with its styles, and no JavaScript in the browser: its
React parts render at build time only.
<!-- @endif -->

- `npm run dev` starts it, `npm run build` builds it, and `npm run preview` serves the build.
<!-- @if ssr -->
- `npm start` runs the server the build wrote, on `HOST` and `PORT` (4321 by default), on any
  Node host.
<!-- @endif -->
- `src/pages/` holds the pages: an `.astro` file per route, which renders a component of
  `src/components/` in `src/layouts/Layout.astro`.
- `src/components/Header.tsx` draws the header, inside the app's providers, which draw the base
  styles once a page.
<!-- @if ssg -->
- Each React part of a page renders inside `Island`, at build time.
<!-- @else -->
- Each React part of a page is an island, a React root of its own: it renders inside
  `Island` (`src/theme/Island.tsx`), and the islands share the color scheme through
  `src/theme/scheme.ts`, not context.
- The home page's counter is an island of its own, which renders in the browser only
  (`client:only`), so the count it shows is the one in memory, not the build's.
- `src/layouts/Layout.astro` keeps the design system's styles as the client router moves
  between pages.
<!-- @endif -->
- `src/theme/themes.ts` holds the light and the dark theme: make them your own.
<!-- @if sample-data && ssr -->
- `src/pages/items/` lists the sample items of `src/data/items.ts`, with a page for each,
  read on each request: make them fetch your own.
<!-- @elif sample-data -->
- `src/pages/items/` lists the sample items of `src/data/items.ts`, with a page for each,
  read at build time: make them fetch your own.
<!-- @endif -->
<!-- @if tanstack-query && react-hook-form -->
- [TanStack Query](https://tanstack.com/query): every island's `Island` provides one query client,
  `src/data/queryClient.ts`. The home page's `Greeting` reads `src/data/api.ts` with a query,
  and the form sends its values with a mutation.
<!-- @elif tanstack-query -->
- [TanStack Query](https://tanstack.com/query): every island's `Island` provides one query client,
  `src/data/queryClient.ts`. The home page's `Greeting` reads `src/data/api.ts` with a query.
<!-- @endif -->
<!-- @if swr && react-hook-form -->
- [SWR](https://swr.vercel.app): the home page's `Greeting` reads `src/data/api.ts` with SWR,
  and the form sends its values with a mutation.
<!-- @elif swr -->
- [SWR](https://swr.vercel.app): the home page's `Greeting` reads `src/data/api.ts` with SWR.
<!-- @endif -->
<!-- @if (tanstack-query || swr) && sample-data -->
  The items pages start on the items they were rendered with, then fetch them again in the
  browser.
<!-- @endif -->
<!-- @if msw -->
- [msw](https://mswjs.io): `src/mocks/handlers.ts` is a mock API, which answers the requests of
  `src/data/api.ts` in the browser while `PUBLIC_MSW` in `.env` is true, and in the tests
  through msw's Node server, `src/mocks/server.ts`.
<!-- @endif -->
<!-- @if zustand -->
- [zustand](https://zustand.docs.pmnd.rs): `src/state/counter.ts` holds the home page's count, in
  a store every island shares.
<!-- @elif jotai -->
- [Jotai](https://jotai.org): `src/state/counter.ts` holds the home page's count, in an atom
  every island shares.
<!-- @elif redux-toolkit -->
- [Redux Toolkit](https://redux-toolkit.js.org): `src/state/store.ts` holds the home page's
  count, in a slice of the store every island's `Island` provides.
<!-- @endif -->
<!-- @if react-hook-form -->
- [React Hook Form](https://react-hook-form.com) and [Zod](https://zod.dev): `/form` is a form
  whose values a Zod schema checks.
<!-- @endif -->
<!-- @if ssg -->
- [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com): `npm run test`
  runs `src/components/Home.test.tsx`, which checks the title.
<!-- @elif msw -->
- [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com): `npm run test`
  runs `src/components/Home.test.tsx`, which checks the title, the counter and the greeting.
<!-- @else -->
- [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com): `npm run test`
  runs `src/components/Home.test.tsx`, which checks the title and the counter.
<!-- @endif -->

Fonts: the theme names Space Grotesk and JetBrains Mono, and does not load them. See
https://docs.soroush.tech/design-system/getting-started/installation/#fonts
