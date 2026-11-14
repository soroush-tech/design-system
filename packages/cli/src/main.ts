import { parseArgs } from 'node:util'
import { runCreate } from './create/create'
import { PACKAGE_MANAGERS } from './create/packageManager'
import { STARTERS } from './create/starters'
import type { PackageJson } from './detect/detect'
import { runInit } from './init'
import type { Io } from './io'
import type { PackageManagerName } from './plan/planInit'
import { CancelledError } from './prompt'

const BIN = 'npx @soroush.design/cli'

/** The help with no command: the commands, and how to get each one's own help. */
export const USAGE = `Usage: ${BIN} <command> [options]

Commands:
  init            set up @soroush.tech/design-system in the React app in this folder
  create [name]   start a new app on the design system, in a new folder

Each shows every change first, and writes nothing until you say yes.
For a command's options, run it with --help: ${BIN} create --help
`

const [defaultFramework, ...otherFrameworks] = Object.keys(STARTERS)

/** Each command's own help, by its name. */
export const HELP: Readonly<Record<string, string>> = {
  init: `Usage: ${BIN} init [options]

Sets the design system up in the React app in this folder, or in a workspace's root that holds
one app. It shows every change first, and writes nothing until you say yes.

Options:
  -y, --yes               apply without asking
      --dry-run           show the changes and exit
      --force             run outside git, or with uncommitted changes
      --scheme <name>     the default color scheme: light (the default) or dark
  -h, --help              show this help

Example:
  ${BIN} init --scheme dark
`,
  create: `Usage: ${BIN} create [name] [options]

Starts a new app on the design system in ./<name>, my-app when it is not given: a new folder, or
an empty one. Its package.json takes the name in lowercase: testApp is test-app. It asks for what
the options do not say, shows every file first, and writes nothing until you say yes.

Options:
  -y, --yes               create without asking: TypeScript, light, no sample data
      --dry-run           show the files and exit
      --title <text>      what the app's pages call it: the name when not given
      --framework <name>  the app's framework: ${[`${defaultFramework} (the default)`, ...otherFrameworks].join(', ')}
      --ts, --js          TypeScript (the default) or JavaScript
      --pm <name>         the package manager: npm, pnpm, yarn or bun; the one that ran create
                          when not given
      --scheme <name>     the default color scheme: light (the default) or dark
      --sample-data       add a list of sample items, and a page for each
      --no-git            do not run git init
  -h, --help              show this help

Examples:
  ${BIN} create my-app
  ${BIN} create my-app --yes --js --sample-data
`,
}

/** The help of `command`, or the one with no command. */
const getHelp = (command: string | undefined) =>
  command && Object.hasOwn(HELP, command) ? HELP[command] : USAGE

const OPTIONS = {
  yes: { type: 'boolean', short: 'y' },
  'dry-run': { type: 'boolean' },
  scheme: { type: 'string' },
  help: { type: 'boolean', short: 'h' },
  force: { type: 'boolean' },
  framework: { type: 'string' },
  title: { type: 'string' },
  ts: { type: 'boolean' },
  js: { type: 'boolean' },
  pm: { type: 'string' },
  'sample-data': { type: 'boolean' },
  'no-git': { type: 'boolean' },
} as const

/** The options only one command takes. */
const OWN_OPTIONS: Record<string, readonly string[]> = {
  init: ['force'],
  create: ['framework', 'title', 'ts', 'js', 'pm', 'sample-data', 'no-git'],
}

/** Why the command line is wrong for `command`, or `undefined` when it is right. */
function findMisuse(command: string, extra: string[], used: string[]): string | undefined {
  const others = Object.entries(OWN_OPTIONS).filter(([name]) => name !== command)
  for (const [other, options] of others) {
    const option = used.find((name) => options.includes(name))
    if (option) return `--${option} is an option of ${other}, not of ${command}.`
  }
  const maxPositionals = command === 'create' ? 1 : 0
  return extra.length > maxPositionals
    ? `Unknown command: ${command} ${extra.join(' ')}`
    : undefined
}

/**
 * Reads the command line and runs the command, for `designSystem`: the package of
 * `@soroush.tech/design-system` the command installs. Returns the exit code: 130 when the person
 * stops it at a question, which is before anything is written.
 */
export async function main(
  argv: readonly string[],
  io: Io,
  designSystem: PackageJson
): Promise<number> {
  try {
    return await runCommandLine(argv, io, designSystem)
  } catch (error) {
    if (!(error instanceof CancelledError)) throw error
    io.write('Stopped: nothing was written.\n')
    return 130
  }
}

async function runCommandLine(
  argv: readonly string[],
  io: Io,
  designSystem: PackageJson
): Promise<number> {
  let parsed
  try {
    parsed = parseArgs({ args: [...argv], allowPositionals: true, options: OPTIONS })
  } catch (error) {
    // The command line did not parse, so the command is the first word that names one.
    const command = argv.find((arg) => Object.hasOwn(HELP, arg))
    io.write(`${(error as Error).message}\n\n${getHelp(command)}`)
    return 1
  }
  const { values, positionals } = parsed
  const [command, ...extra] = positionals
  if (values.help) {
    io.write(getHelp(command))
    return 0
  }
  if (!command || !Object.hasOwn(OWN_OPTIONS, command)) {
    const unknown = command ? `Unknown command: ${positionals.join(' ')}\n\n` : ''
    io.write(unknown + USAGE)
    return 1
  }
  const misuse = findMisuse(command, extra, Object.keys(values))
  if (misuse) {
    io.write(`${misuse}\n\n${getHelp(command)}`)
    return 1
  }
  const { scheme } = values
  if (scheme !== undefined && scheme !== 'light' && scheme !== 'dark') {
    io.write(`--scheme is light or dark, not ${scheme}.\n`)
    return 1
  }
  if (values.ts && values.js) {
    io.write('--ts and --js do not go together: give one.\n')
    return 1
  }
  const { pm } = values
  if (pm !== undefined && !PACKAGE_MANAGERS.includes(pm as PackageManagerName)) {
    io.write(`--pm is ${PACKAGE_MANAGERS.join(', ')}, not ${pm}.\n`)
    return 1
  }
  const isConfirmed = Boolean(values.yes)
  const isDryRun = Boolean(values['dry-run'])
  if (command === 'create') {
    const isTypeScript = values.ts || values.js ? Boolean(values.ts) : undefined
    return runCreate(
      {
        name: extra[0],
        title: values.title,
        framework: values.framework,
        isTypeScript,
        packageManager: pm as PackageManagerName | undefined,
        scheme,
        hasSampleData: values['sample-data'],
        isConfirmed,
        isDryRun,
        isGit: !values['no-git'],
      },
      io,
      designSystem
    )
  }
  return runInit(
    { isConfirmed, isDryRun, isForced: Boolean(values.force), scheme },
    io,
    designSystem
  )
}
