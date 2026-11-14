# @soroush.design/cli

The command line of the [`@soroush.tech`](https://docs.soroush.tech) design system. It has two
commands: `create` starts a new app on the design system, and `init` sets the design system up in
an existing React app.

## Start a new app: `create`

```sh
npx @soroush.tech/design-system create my-app
```

It makes the app in a new folder, `my-app`, or in an empty one, and never writes in a folder that
holds anything. It asks for what you did not give it - the name and the title typed, then the
language, the package manager, the default color scheme and the sample data pages picked with the
arrow keys - then shows every file and the install, and writes nothing before a yes. The package
manager starts on the one you ran it with (`npx`, `pnpm dlx`, `yarn dlx`, `bunx`). It installs with
no scripts, and runs `git init` with no commit, unless the folder is already in a repository. When
a write or the install fails, it takes the new app away.

| Option               | What it does                                                      |
| -------------------- | ----------------------------------------------------------------- |
| `-y`, `--yes`        | Create without asking: TypeScript and light, unless given         |
| `--dry-run`          | Show the files and exit                                           |
| `--title <text>`     | What the app's pages call it: the name when not given             |
| `--framework <name>` | The app's framework: `vike`, the default and only one yet         |
| `--ts`, `--js`       | TypeScript (the default) or JavaScript                            |
| `--pm <name>`        | `npm`, `pnpm`, `yarn` or `bun`: the one that ran it, if not given |
| `--scheme <name>`    | The default color scheme: `light` or `dark`                       |
| `--sample-data`      | Add the sample data pages                                         |
| `--no-git`           | Do not run `git init`                                             |
| `-h`, `--help`       | Show the options of `create`                                      |

### The Vike app

A [Vike](https://vike.dev) app, isomorphic: every page is prerendered to HTML at build time, with
the styles it uses, so it is drawn styled before any script runs. Then the app takes over in the
browser and moves between pages without a reload.

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
npx @soroush.tech/design-system init
```

The design system ships this command line, so that installs the version you ask for. Run on its
own, `npx @soroush.design/cli init` (or `create`) does the same with the design system version it
was released next to.

In PowerShell, quote the package name: `@` starts a splat there.

```powershell
npx '@soroush.tech/design-system' init
```

### Options of `init`

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

## License

MIT
