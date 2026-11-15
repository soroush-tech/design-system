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
- [SWR](https://swr.vercel.app): the home page's `Greeting` reads `src/data/api.ts` with SWR, and the form sends its values with a mutation. The items pages start on their build-time data, then fetch it in the browser.
- [Redux Toolkit](https://redux-toolkit.js.org): `src/state/store.ts` holds the color scheme and the home page's count, in slices of the store `PageShell` provides.
- [React Hook Form](https://react-hook-form.com) and [Zod](https://zod.dev): `/form` is a form whose values a Zod schema checks.
- [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com): `npm run test` runs `src/pages/index/Page.test.tsx`, which checks the title and the counter.

Fonts: the theme names Space Grotesk and JetBrains Mono, and does not load them. See
https://docs.soroush.tech/design-system/getting-started/installation/#fonts
