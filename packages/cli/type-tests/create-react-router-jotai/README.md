# My App

A single-page app on [React Router](https://reactrouter.com) and the
[@soroush.tech design system](https://docs.soroush.design): the browser renders each page, and moves
between them with no reload.

- `npm run dev` starts it, `npm run build` builds it, and `npm run preview` serves the build.
- `dist/` is static files: any host serves it, once it answers every path with `index.html`, so the
  router shows the page a URL names.
- `src/routes.tsx` lists the pages by path, and `src/main.tsx` renders the router in `index.html`.
- `src/pages/` holds the pages, and `src/pages/Layout.tsx` is the frame every page renders in,
  inside the app's providers. `src/components/RouterLink.tsx` is the design system's `Link`, moving
  to a page with no reload.
- `src/theme/themes.ts` holds the light and the dark theme: make them your own.
- [Jotai](https://jotai.org): `src/state/scheme.ts` holds the color scheme and `src/state/counter.ts` the home page's count, in atoms.
- [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com): `npm run test` runs `src/pages/index/Page.test.tsx`, which checks the title and the counter.

Fonts: the theme names Space Grotesk and JetBrains Mono, and does not load them. See
https://docs.soroush.design/design-system/getting-started/installation/#fonts
