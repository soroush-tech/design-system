# my-app

A [Vike](https://vike.dev) app on the [@soroush.tech design system](https://docs.soroush.tech),
rendered on the server with its styles in the HTML.

- `npm run dev` starts it, `npm run build` builds it, and `npm run preview` serves the build.
- `src/pages/` holds the pages: a folder per route, each with its `+Page`.
- `src/pages/+Layout.tsx` is the frame every page renders in, inside the app's providers.
- `src/theme/themes.ts` holds the light and the dark theme: make them your own.
- `src/pages/+onRenderHtml.tsx` and `+onRenderClient.tsx` render the pages, with the styles each
  page uses in its HTML.

Fonts: the theme names Space Grotesk and JetBrains Mono, and does not load them. See
https://docs.soroush.tech/design-system/getting-started/installation/#fonts
