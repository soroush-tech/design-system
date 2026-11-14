# My App

A [Vike](https://vike.dev) app on the [@soroush.tech design system](https://docs.soroush.tech):
every page prerendered to HTML at build time, with its styles, and no JavaScript in the browser.

- `npm run dev` starts it, `npm run build` builds it, and `npm run preview` serves the build.
- `src/pages/` holds the pages: a folder per route, each with its `+Page`.
- `src/pages/+Layout.tsx` is the frame every page renders in, inside the app's providers.
- `src/theme/themes.ts` holds the light and the dark theme: make them your own.
- In `src/pages/`, `+onRenderHtml` renders the pages to HTML, with the styles each page uses.
- `src/pages/items/` lists the sample items of `src/data/items.ts`, with a page for each.
  Their `+data` hooks read the data at build time: make them fetch your own.

Fonts: the theme names Space Grotesk and JetBrains Mono, and does not load them. See
https://docs.soroush.tech/design-system/getting-started/installation/#fonts
