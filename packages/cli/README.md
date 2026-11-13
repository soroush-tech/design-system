# @soroush.design/cli

The command line of the [`@soroush.tech`](https://docs.soroush.tech) design system. Today it has
one command, `init`, which sets the design system up in an existing React app.

## Use it

Run it in your app's folder, or in a workspace's root that holds one app:

```sh
npx @soroush.tech/design-system init
```

The design system ships this command line, so that installs the version you ask for. Run on its
own, `npx @soroush.design/cli init` does the same with the design system version it was released
next to.

In PowerShell, quote the package name: `@` starts a splat there.

```powershell
npx '@soroush.tech/design-system' init
```

## Options

| Option            | What it does                                 |
| ----------------- | -------------------------------------------- |
| `-y`, `--yes`     | Apply without asking                         |
| `--dry-run`       | Show the changes and exit                    |
| `--force`         | Run outside git, or with uncommitted changes |
| `--scheme <name>` | The default color scheme: `light` or `dark`  |
| `-h`, `--help`    | Show the help                                |

## What `init` does

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
