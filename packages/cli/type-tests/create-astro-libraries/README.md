# My App

An [Astro](https://astro.build) app on the [@soroush.tech design system](https://docs.soroush.design):
every page is rendered on the server, on each request, with its styles, and its parts are
React islands that hydrate in the browser. Astro's client router moves between pages with no
reload: it fetches the next page's HTML from the server and swaps it in.

- `npm run dev` starts it, `npm run build` builds it, and `npm run preview` serves the build.
- `npm start` runs the server the build wrote, on `HOST` and `PORT` (4321 by default), on any
  Node host.
- `src/pages/` holds the pages: an `.astro` file per route, which renders a component of
  `src/components/` in `src/layouts/Layout.astro`.
- `src/components/Header.tsx` draws the header, inside the app's providers, which draw the base
  styles once a page.
- Each React part of a page is an island, a React root of its own: it renders inside
  `Island` (`src/theme/Island.tsx`), and the islands share the color scheme through
  `src/theme/scheme.ts`, not context.
- The home page's counter is an island of its own, which renders in the browser only
  (`client:only`), so the count it shows is the one in memory, not the build's.
- `src/layouts/Layout.astro` keeps the design system's styles as the client router moves
  between pages.
- `src/theme/themes.ts` holds the light and the dark theme: make them your own.
- `src/pages/items/` lists the sample items of `src/data/items.ts`, with a page for each,
  read on each request: make them fetch your own.
- [TanStack Query](https://tanstack.com/query): every island's `Island` provides one query client,
  `src/data/queryClient.ts`. The home page's `Greeting` reads `src/data/api.ts` with a query,
  and the form sends its values with a mutation.
  The items pages start on the items they were rendered with, then fetch them again in the
  browser.
- [msw](https://mswjs.io): `src/mocks/handlers.ts` is a mock API, which answers the requests of
  `src/data/api.ts` in the browser while `PUBLIC_MSW` in `.env` is true, and in the tests
  through msw's Node server, `src/mocks/server.ts`.
- [zustand](https://zustand.docs.pmnd.rs): `src/state/counter.ts` holds the home page's count, in
  a store every island shares.
- [React Hook Form](https://react-hook-form.com) and [Zod](https://zod.dev): `/form` is a form
  whose values a Zod schema checks.
- [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com): `npm run test`
  runs `src/components/Home.test.tsx`, which checks the title, the counter and the greeting.

Fonts: the theme names Space Grotesk and JetBrains Mono, and does not load them. See
https://docs.soroush.design/react/installation/#fonts
