# My App

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
- `src/pages/items/` lists the sample items of `src/data/items.ts`, and `src/pages/item/` shows one: both read them through `src/data/api.ts`.
- [TanStack Query](https://tanstack.com/query): the query client lives in `Layout`. The home page's `Greeting` and the items pages read `src/data/api.ts` with queries, and the form sends its values with a mutation.
- [msw](https://mswjs.io): `src/mocks/handlers.ts` is a mock API, which answers the greeting, the form, the sample items in the browser while `VITE_MSW` in `.env` is true.
- [zustand](https://zustand.docs.pmnd.rs): `src/state/scheme.ts` holds the color scheme and `src/state/counter.ts` the home page's count, in stores.
- [React Hook Form](https://react-hook-form.com) and [Zod](https://zod.dev): `/form` is a form whose values a Zod schema checks.
- [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com): `npm run test` runs `src/pages/index/Page.test.tsx`, which checks the title, the counter and the greeting, which msw's Node server, `src/mocks/server.ts`, answers.

Fonts: the theme names Space Grotesk and JetBrains Mono, and does not load them. See
https://gild-ui.soroush.design/react/installation/#fonts
