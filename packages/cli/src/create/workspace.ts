import type { PackageManagerName } from '../plan/planInit'
import type { StarterFile } from './starters'

/**
 * How the repository holds the app: `workspace`, as `apps/web` of a workspace that has room for
 * more apps and services; `standalone`, the app alone at the root.
 */
export type Layout = 'workspace' | 'standalone'

/** The layouts, in the order create offers them. The first is the default. */
export const LAYOUTS: readonly Layout[] = ['workspace', 'standalone']

/** Where a workspace keeps the app, from its root. */
export const APP_FOLDER = 'apps/web'

/** The package name of the app in the workspace named `packageName`. */
export const toAppPackageName = (packageName: string) => `@${packageName}/web`

/** What the workspace knows of the app it holds. */
export interface WorkspaceFacts {
  packageName: string
  title: string
  packageManager: PackageManagerName
}

/** The command that runs `script` of the app's package, from the workspace's root. */
function runInApp(packageManager: PackageManagerName, app: string, script: string): string {
  switch (packageManager) {
    case 'npm':
      return `npm run ${script} --workspace=${app}`
    case 'pnpm':
      return `pnpm --filter ${app} ${script}`
    case 'yarn':
      return `yarn workspace ${app} ${script}`
    case 'bun':
      return `bun run --filter ${app} ${script}`
  }
}

const WORKSPACES = ['apps/*', 'services/*']

const GITIGNORE = `node_modules/
*.log
.DS_Store
`

/** The names of the scripts in the app's package.json, which the root runs by the same names. */
function readAppScripts(appFiles: readonly StarterFile[]): string[] {
  const packageJson = appFiles.find((file) => file.path === 'package.json')
  return Object.keys(JSON.parse(packageJson?.content ?? '{}').scripts ?? {})
}

function createRootFiles(facts: WorkspaceFacts, scripts: readonly string[]): StarterFile[] {
  const { packageName, title, packageManager } = facts
  const app = toAppPackageName(packageName)
  const isPnpm = packageManager === 'pnpm'
  const packageJson = {
    name: packageName,
    private: true,
    ...(isPnpm ? {} : { workspaces: WORKSPACES }),
    scripts: Object.fromEntries(
      scripts.map((script) => [script, runInApp(packageManager, app, script)])
    ),
  }
  const run = (script: string) =>
    packageManager === 'npm' || packageManager === 'bun'
      ? `${packageManager} run ${script}`
      : `${packageManager} ${script}`
  return [
    { path: 'package.json', content: `${JSON.stringify(packageJson, null, 2)}\n` },
    ...(isPnpm
      ? [
          {
            path: 'pnpm-workspace.yaml',
            content: ['packages:', ...WORKSPACES.map((glob) => `  - ${glob}`), ''].join('\n'),
          },
        ]
      : []),
    { path: '.gitignore', content: GITIGNORE },
    {
      path: 'README.md',
      content: `# ${title}

A workspace: each app and service is a package of its own, installed together from here.

- \`${APP_FOLDER}/\` is the web app, \`${app}\`: its README says how it is built.
- \`services/\` is for back-end services, such as an API: add one as a folder with its own
  \`package.json\`.

From here, \`${run('dev')}\` starts the web app, \`${run('build')}\` builds it, and \`${run('preview')}\`
serves the build.
`,
    },
    { path: 'services/.gitkeep', content: '' },
  ]
}

/** The files of a workspace holding the app whose files are `appFiles`, in `apps/web`. */
export function createWorkspaceFiles(
  appFiles: readonly StarterFile[],
  facts: WorkspaceFacts
): StarterFile[] {
  return [
    ...createRootFiles(facts, readAppScripts(appFiles)),
    ...appFiles.map((file) => ({ ...file, path: `${APP_FOLDER}/${file.path}` })),
  ]
}
