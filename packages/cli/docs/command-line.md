# Command line

`@soroush.design/cli` is the command line of the [`@soroush.tech`](https://docs.soroush.tech)
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
4. The rendering: isomorphic, SPA or SSG - see below.
5. The libraries, toggled with space - see below. An SSG app is offered none.
6. The default color scheme: light or dark.
7. Whether to add the sample data pages.

Then it shows every file and the install, and writes nothing before a yes. It installs with no
scripts, and runs `git init` with no commit, unless the folder is already in a repository. When a
write or the install fails, it takes the new app away. Ctrl+C at a question stops it with nothing
written.

| Option               | What it does                                                      |
| -------------------- | ----------------------------------------------------------------- |
| `-y`, `--yes`        | Create without asking: TypeScript, a workspace, isomorphic, light |
| `--dry-run`          | Show the files and exit                                           |
| `--title <text>`     | What the app's pages call it: the name when not given             |
| `--framework <name>` | The app's framework: `vike`, the default and only one yet         |
| `--ts`, `--js`       | TypeScript (the default) or JavaScript                            |
| `--pm <name>`        | `npm`, `pnpm`, `yarn` or `bun`: the one that ran it, if not given |
| `--layout <name>`    | `workspace` (the default) or `standalone`                         |
| `--render <name>`    | `isomorphic` (the default), `spa` or `ssg`                        |
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
- **SPA**: every page is an empty HTML shell from the build, and the browser renders it, with its
  styles. It moves between pages without a reload.
- **SSG**: every page is prerendered to HTML with its styles, and ships no JavaScript: a link loads
  the next page. It has no light and dark switch, since that needs JavaScript.

All three build to static files that any static host serves.

### Libraries

Each library comes installed, wired in, and with an example of its use:

- **TanStack Query** (`tanstack-query`): the query client lives in `+Layout`. With the sample data
  pages, each page starts on its build-time data, then its query fetches it again in the browser,
  from `src/data/api`, and keeps it in the cache.
- **msw** (`msw`): a mock API in the browser. `src/mocks/handlers` says what it answers - the
  sample items, with the sample data pages - and it starts before the first page while `VITE_MSW`
  in `.env` is true, in development and in the build. Set it to false once your own API answers.
- **SWR** (`swr`): fetches and caches data, the other way to TanStack Query - an app takes one
  of the two. With the sample data pages, it fetches the items the way the query does.
- **zustand** (`zustand`), **Jotai** (`jotai`) or **Redux Toolkit** (`redux-toolkit`): the color
  scheme moves out of `+Layout` into a store or an atom any component can read -
  `src/state/scheme`, or with Redux Toolkit a slice of `src/state/store`, whose provider wraps
  every page in `PageShell`. An app takes one of the three.
- **React Hook Form + Zod** (`react-hook-form`): a `/form` page, linked from the header, whose two
  fields - the design system's `TextInput` - a Zod schema checks before the form is sent.
- **Vitest + Testing Library** (`vitest`): `npm run test` runs `src/pages/index/Page.test`, which
  renders the home page in jsdom, inside the app's providers.

### The Vike app

- `src/pages/` holds the pages - a home page, a second page and a 404 page - built from the design
  system's components and theme tokens only.
- `src/pages/+Layout` is the frame every page renders in. It renders `<Providers>`, and holds a
  light and dark switch.
- `src/theme/themes` holds a `light` and a `dark` theme, as `init` writes them: make them your own.
- `src/pages/+onRenderHtml` and `+onRenderClient` render the pages with the design system's
  Emotion cache. There is no renderer package to install.
- `npm run dev` starts it, `npm run build` builds it, and `npm run preview` serves the build.

With sample data pages, it also shows how data gets onto a page, with no data library:

- `src/data/items` holds six sample items.
- `/items` lists them, and `/items/<id>` shows one. Each page's `+data` reads the items at build
  time, and the build prerenders one page per item. Moving between them in the browser loads only
  their data, with no reload.
- A page reads its data with `useData()`, from `src/pages/usePageContext`. Make the `+data` hooks
  fetch your own data, and remove `src/data/items`.

The switch does not remember the scheme across a reload, and the theme's fonts are not loaded: see
the [fonts guide](https://docs.soroush.tech/design-system/getting-started/installation/#fonts).

## Set up an existing app: `init`

Run it in your app's folder, or in a workspace's root that holds one app:

```sh
npx @soroush.design/cli init
```

It installs the design system version the command line was released next to.
`npx @soroush.tech/design-system init` does the same with the design system version you ask for.

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
- It installs `@soroush.tech/design-system` with your own package manager.

It is careful with your app:

- It shows every change first - the files, each edit as a diff, the install - and writes nothing
  before a yes.
- It runs only in a git repository with no uncommitted change, unless `--force`.
- It never overwrites a file, and edits the root only when it has the standard shape: one
  `createRoot(...).render(` or `ReactDOM.render(` call. Otherwise it prints the lines to add.
- When a write fails, it takes back every change it made. The install runs last, with no scripts.
- A second run finds its own files and changes nothing.
- It checks your React against the design system's peer range, and never upgrades React.
- It reaches no network but the install.

Next.js, Vike and React Router apps are refused for now, with a pointer to the
[setup guide](https://docs.soroush.tech/design-system/getting-started/installation/).
