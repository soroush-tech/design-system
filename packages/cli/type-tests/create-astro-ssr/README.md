# My App

An [Astro](https://astro.build) app on the [@soroush.tech design system](https://docs.soroush.tech):
every page is rendered on the server, on each request, with its styles, and its parts are
React islands that hydrate in the browser. Astro's client router moves between pages with no
reload.

- `npm run dev` starts it, `npm run build` builds it, and `npm run preview` serves the build.
- `npm start` runs the server the build wrote, on `HOST` and `PORT` (4321 by default), on any
  Node host.
- `src/pages/` holds the pages: an `.astro` file per route, which renders a component of
  `src/components/` in `src/layouts/Layout.astro`.
- `src/components/Header.tsx` draws the header, inside the app's providers, which draw the base
  styles once a page.
- Each React part of a page is an island, a React root of its own: it renders inside
  `Theme`, and the islands share the color scheme through `src/theme/scheme.ts`, not context.
- `src/layouts/Layout.astro` keeps the design system's styles as the client router moves
  between pages.
- `src/theme/themes.ts` holds the light and the dark theme: make them your own.
- `src/pages/items/` lists the sample items of `src/data/items.ts`, with a page for each,
  read on each request: make them fetch your own.

Fonts: the theme names Space Grotesk and JetBrains Mono, and does not load them. See
https://docs.soroush.tech/design-system/getting-started/installation/#fonts
