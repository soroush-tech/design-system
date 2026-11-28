# My App

An [Astro](https://astro.build) app on [Gild UI](https://gild-ui.soroush.design):
every page is HTML from the build, with its styles, and no JavaScript in the browser: its
React parts render at build time only.

- `npm run dev` starts it, `npm run build` builds it, and `npm run preview` serves the build.
- `src/pages/` holds the pages: an `.astro` file per route, which renders a component of
  `src/components/` in `src/layouts/Layout.astro`.
- `src/components/Header.tsx` draws the header, inside the app's providers, which draw the base
  styles once a page.
- Each React part of a page renders inside `Island`, at build time.
- `src/theme/themes.ts` holds the light and the dark theme: make them your own.
- `src/pages/items/` lists the sample items of `src/data/items.ts`, with a page for each,
  read at build time: make them fetch your own.
- [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com): `npm run test`
  runs `src/components/Home.test.tsx`, which checks the title.

Fonts: the theme names Space Grotesk and JetBrains Mono, and does not load them. See
https://gild-ui.soroush.design/react/installation/#fonts
