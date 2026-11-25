# Command line

`@soroush.design/cli` is the command line of the [`@soroush.tech`](https://docs.soroush.design)
design system. It has two commands: `create` starts a new app on the design system - a working
boilerplate with the theme, the providers and a few pages in place - and `init` sets the design
system up in an existing React app.

```sh
npx @soroush.design/cli create my-app
npx @soroush.design/cli init
```

Each shows every change first, and writes nothing until you say yes. `--help` after a command
lists its options. In PowerShell, quote the package name, since `@` starts a splat there:
`npx '@soroush.design/cli' create my-app`.

## Start a new app: `create`

```sh
npx @soroush.design/cli create my-app
```

It makes the app in a new folder, `my-app`, or in an empty one, and never writes in a folder that
holds anything. The folder keeps the name as you typed it, and the package name is its lowercase
form: `testApp` is the package `test-app`.

It asks for what you did not give it. You type the name and the title; the rest you pick with the
arrow keys:

1. The language: TypeScript (recommended) or JavaScript.
2. The package manager: npm, pnpm, yarn or bun, starting on the one you ran it with (`npx`,
   `pnpm dlx`, `yarn dlx`, `bunx`). One you pick must be installed.
3. The repository: a workspace (recommended) or the app alone - see below.
4. The rendering: isomorphic, SSR, SSG or SPA - see below.
5. The framework: Vike (recommended) or Astro, of the ones that render as picked; an SPA is
   React Router's, so it asks nothing - see below.
6. The libraries, by job - see below: one for data fetching, one for state management (each, or
   none), then the rest, toggled with space. An SSG app is offered none.
7. The default color scheme: light or dark.
8. Whether to add the sample data pages.

Then it shows every choice, one a line - the ones you picked and the defaults - then every file
and the install, and writes nothing before a yes. It installs with no scripts, and runs `git init`
with no commit, unless the folder is already in a repository. When a write or the install fails,
it takes the new app away. Ctrl+C at a question stops it with nothing written.

| Option               | What it does                                                      |
| -------------------- | ----------------------------------------------------------------- |
| `-y`, `--yes`        | Create without asking: TypeScript, a workspace, isomorphic, light |
| `--dry-run`          | Show the files and exit                                           |
| `--title <text>`     | What the app's pages call it: the name when not given             |
| `--framework <name>` | `vike` (the default), `astro` or `react-router`                   |
| `--ts`, `--js`       | TypeScript (the default) or JavaScript                            |
| `--pm <name>`        | `npm`, `pnpm`, `yarn` or `bun`: the one that ran it, if not given |
| `--layout <name>`    | `workspace` (the default) or `standalone`                         |
| `--render <name>`    | `isomorphic` (the default), `ssr`, `spa` or `ssg`                 |
| `--with <names>`     | The libraries, by comma: `--with tanstack-query,msw,zustand`      |
| `--scheme <name>`    | The default color scheme: `light` or `dark`                       |
| `--sample-data`      | Add the sample data pages                                         |
| `--no-git`           | Do not run `git init`                                             |
| `-h`, `--help`       | Show the options of `create`                                      |

### Repository

- **Workspace** (the default): the app is `apps/web` of a workspace, with room for more apps
  beside it and for back-end services in `services/`. The root's `package.json` lists the
  workspaces (pnpm's are in `pnpm-workspace.yaml`), and its `dev`, `build` and `preview` scripts
  run the app's with your package manager's own workspace command. The app's package is named after
  the workspace's: `testApp` holds `@test-app/web`. It installs once, at the root.
- **Standalone**: the app alone, at the folder's root.

```
testApp/
  package.json
  apps/web/      the app
  services/      empty, for your services
```

### Rendering

- **Isomorphic** (the default): every page is prerendered to HTML at build time, with the styles
  it uses, so it is drawn styled before any script runs. Then the app takes over in the browser
  and moves between pages without a reload.
- **SSR**: every page is rendered to HTML on a server, on each request, with its styles - its data
  read as it is asked for. Then the app takes over in the browser, as in an isomorphic app. The
  build writes a Node server, which `npm start` runs on `PORT`: Vike's own server
  (`node dist/server/index.mjs`, port 3000 by default) or Astro's Node adapter, standalone
  (`node dist/server/entry.mjs`, `HOST` and `PORT`, port 4321 by default).
- **SPA**: a React Router app. The build is one empty HTML shell, and the browser renders every
  page in it, with its styles, and moves between them without a reload.
- **SSG**: every page is prerendered to HTML with its styles, and ships no JavaScript: a link loads
  the next page. It has no light and dark switch, since that needs JavaScript.

Isomorphic, SPA and SSG build to static files that any static host serves - an SPA's, once the host
answers every path with `index.html`; SSR needs a Node host. Vike renders isomorphic, SSR or
SSG, Astro SSR (its default) or SSG, and React Router an SPA. Astro has no isomorphic rendering:
its pages render on the server or at build time only, so moving between them always fetches the
next page's HTML. For pages that render in the browser after the first, pick Vike.

### Framework

- **Vike** (the default): React pages, rendered as you pick - see the Vike app below.
- **Astro**: HTML pages whose React parts are islands - see the Astro app below.
- **React Router**: a single-page app, in React Router's data mode on Vite - see the React Router
  app below.

### Libraries

The libraries are asked by job, as each app takes one library per job:

| Question         | The choices                                 |
| ---------------- | ------------------------------------------- |
| Data fetching    | None, TanStack Query or SWR                 |
| State management | None, zustand, Jotai or Redux Toolkit       |
| More             | msw, React Hook Form + Zod: either, or both |

`--with` takes the same names, by comma, and refuses two of one job. Each library comes
installed, wired in, and with an example of its use - and each choice shows in the app:

- **A counter** on the home page, in any app with JavaScript in the browser: its count lives in
  the component's own state, or in the state library picked.
- **TanStack Query** (`tanstack-query`): the query client lives in the layout. The home page's
  `Greeting` reads `src/data/api` with a query, and the form, if there is one, sends its values
  with a mutation. With the sample data pages, each page starts on its build-time data, then its
  query fetches it again in the browser and keeps it in the cache; in a React Router app, the
  items pages read them with queries alone.
- **SWR** (`swr`): the same examples, with `useSWR` and `useSWRMutation`.
- **msw** (`msw`): a mock API in the browser. `src/mocks/handlers` answers each call
  `src/data/api` makes - the greeting, the form's values, the sample items - while `VITE_MSW` in
  `.env` is true, in development and in the build. Set it to false once your own API answers.
  With no data library, the greeting is read with `fetch`.
- **zustand** (`zustand`), **Jotai** (`jotai`) or **Redux Toolkit** (`redux-toolkit`): the color
  scheme and the count move into stores or atoms any component can read - `src/state/scheme` and
  `src/state/counter`, or with Redux Toolkit two slices of `src/state/store`, whose provider wraps
  every page - in `PageShell` in a Vike app, in `src/main` in a React Router one.
- **React Hook Form + Zod** (`react-hook-form`): a `/form` page, linked from the header, whose two
  fields - the design system's `TextInput` - a Zod schema checks. Once they pass, it sends them
  through the data library, or to `src/data/api` with msw alone, and shows what came back.

Every app has its tests, whatever it is asked: **Vitest + Testing Library** on jsdom, and
`npm run test`, which checks the home page's title and its counter. With msw, msw's Node server
(`src/mocks/server`) answers the tests' requests, as the worker answers the app's in the browser,
and a test checks the greeting it gives.

### The Vike app

- `src/pages/` holds the pages - a home page, a second page and a 404 page - built from the design
  system's components and theme tokens only.
- `src/pages/+Layout` is the frame every page renders in. It renders `<Providers>` and
  `src/components/Header`, an app bar that sticks to the top: the title, the links, and the light
  and dark switch (`src/components/SchemeSwitch`). On a phone, the links take a row of their own.
- `src/theme/themes` holds a `light` and a `dark` theme, as `init` writes them: make them your own.
- `src/pages/+onRenderHtml` and `+onRenderClient` render the pages with the design system's
  style cache. There is no renderer package to install.
- `npm run dev` starts it, `npm run build` builds it, and `npm run preview` serves the build.

With sample data pages, it also shows how data gets onto a page, with no data library:

- `src/data/items` holds six sample items.
- `/items` lists them, and `/items/<id>` shows one. Each page's `+data` reads the items at build
  time, and the build prerenders one page per item. Moving between them in the browser loads only
  their data, with no reload.
- A page reads its data with `useData()`, from `src/pages/usePageContext`. Make the `+data` hooks
  fetch your own data, and remove `src/data/items`.

### The Astro app

- `src/pages/` holds the pages, an `.astro` file per route: each renders a React component of
  `src/components/` - a home page, a second page and a 404 page - in `src/layouts/Layout.astro`.
- Each React part of a page is an island, a React root of its own, so no context crosses from one
  to another:
  - each island is exported inside `withIsland` (`src/theme/Island`), which renders it inside
    the theme, and the query client and the Redux store when the app has them;
  - the header, an app bar that sticks to the top, renders `<Providers>`, which draws the base
    styles once a page, and holds the light and dark switch (`src/components/SchemeSwitch`);
  - the islands share the scheme through `src/theme/scheme`.
- SSR (the default), the server renders each page on each request, and the islands hydrate in
  the browser. Astro's client router moves between pages with no reload: it fetches the next
  page's HTML and swaps it in, keeping the header, the scheme and the state. The layout keeps the
  design system's styles as it does. `npm start` runs the server, on any Node host.
- SSG, the React parts render at build time only, and a page ships no JavaScript.
- With sample data pages, `/items` and `/items/<id>` read `src/data/items`: on each request
  with SSR, or at build time with SSG, with one page written per item.
- The home page's counter and greeting are islands of their own, which render in the browser
  only (`client:only`): what they show is in memory - a count in the state library, a greeting in
  the query cache - not in the HTML, so moving back to the page cannot hydrate on a stale copy.
- The libraries work as in the Vike app, island by island: in the browser, every island shares one
  query client and one store, and the scheme stays in `src/theme/scheme`. With msw, the mock
  API's switch is `PUBLIC_MSW` in `.env`, as Astro hands the browser only `PUBLIC_` variables,
  and each request waits for it to start. The form is an island on its own `/form` page.

### The React Router app

- `src/routes` lists the pages by path, each inside `src/pages/Layout`, which renders
  `<Providers>` and `src/components/Header` - an app bar with the title, the links, and the light
  and dark switch - and draws the page in its `<Outlet />`. A path
  with no page, and a page that fails, show `src/pages/ErrorPage` in the layout.
- `src/main` creates the router with `createBrowserRouter` and renders it in `index.html`'s
  `#root`. With msw, it starts the mock API first.
- `src/components/RouterLink` is the design system's `Link` for a page of the app: a click moves
  to it with no reload, and a click that opens a new tab still does.
- With sample data pages, `/items` and `/items/<id>` read `src/data/items` in their route's
  `loader`, which the router runs before it shows the page - an unknown id shows the error page.
  With a data library, they read `src/data/api` with queries instead.
- `npm run dev` starts it, `npm run build` writes it to `dist/`, and `npm run preview` serves the
  build. A host serves `dist/` once it answers every path with `index.html`.

The switch does not remember the scheme across a reload, and the theme's fonts are not loaded: see
the [fonts guide](https://docs.soroush.design/react/installation/#fonts).

## Set up an existing app: `init`

Run it in your app's folder, or in a workspace's root that holds one app:

```sh
npx @soroush.design/cli init
```

It installs `@soroush.design/react`, the version the command line was released next to, and checks
your React against its range.

| Option            | What it does                                 |
| ----------------- | -------------------------------------------- |
| `-y`, `--yes`     | Apply without asking                         |
| `--dry-run`       | Show the changes and exit                    |
| `--force`         | Run outside git, or with uncommitted changes |
| `--scheme <name>` | The default color scheme: `light` or `dark`  |
| `-h`, `--help`    | Show the options of `init`                   |

### What `init` does

In a client-rendered React app, whatever builds it (Vite, webpack, Rspack, Parcel, Create React
App), in TypeScript or JavaScript:

- It writes `src/theme/themes` (a `light` and a `dark` theme, each a `createTheme(baseTheme,
  {...})` call you edit) and `src/theme/Providers` (`ThemeProvider` with the base page styles).
- It wraps what your root renders in `<Providers>`.
- It installs `@soroush.design/react` with your own package manager.

It is careful with your app:

- It shows every change first - the files, each edit as a diff, the install - and writes nothing
  before a yes.
- It runs only in a git repository with no uncommitted change, unless `--force`.
- It never overwrites a file, and edits the root only when it has the standard shape: one
  `createRoot(...).render(` or `ReactDOM.render(` call. Otherwise it prints the lines to add.
- When a write fails, it takes back every change it made. The install runs last, with no scripts.
- A second run finds its own files and changes nothing, and an app that already has
  `@soroush.design/react` gets no install.
- It checks your React against the design system's peer range, and never upgrades React.
- It reaches no network but the install.

Next.js, Vike and React Router apps are refused for now, with a pointer to the
[setup guide](https://docs.soroush.design/react/installation/).
