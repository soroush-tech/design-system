import { parseArgs } from 'node:util'
import { runCreate } from './create/create'
import type { PackageJson } from './detect/detect'
import { runInit } from './init'
import type { Io } from './io'

export const USAGE = `Usage: npx @soroush.tech/design-system <command> [options]

Commands:
  init            set up @soroush.tech/design-system in the React app in this folder
  create [name]   start a new app on the design system, in a new folder

Each shows every change first, and writes nothing until you say yes.

Options:
  -y, --yes             apply without asking
      --dry-run         show the changes and exit
      --scheme <name>   the default color scheme: light or dark
  -h, --help            show this help

Options of init:
      --force           run outside git, or with uncommitted changes

Options of create:
      --framework <name>  the app's framework
      --ts, --js          TypeScript (the default) or JavaScript
      --sample-data       add pages that read sample data
      --no-git            do not run git init
`

const OPTIONS = {
  yes: { type: 'boolean', short: 'y' },
  'dry-run': { type: 'boolean' },
  scheme: { type: 'string' },
  help: { type: 'boolean', short: 'h' },
  force: { type: 'boolean' },
  framework: { type: 'string' },
  ts: { type: 'boolean' },
  js: { type: 'boolean' },
  'sample-data': { type: 'boolean' },
  'no-git': { type: 'boolean' },
} as const

/** The options only one command takes. */
const OWN_OPTIONS: Record<string, readonly string[]> = {
  init: ['force'],
  create: ['framework', 'ts', 'js', 'sample-data', 'no-git'],
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
 * `@soroush.tech/design-system` the command installs. Returns the exit code.
 */
export async function main(
  argv: readonly string[],
  io: Io,
  designSystem: PackageJson
): Promise<number> {
  let parsed
  try {
    parsed = parseArgs({ args: [...argv], allowPositionals: true, options: OPTIONS })
  } catch (error) {
    io.write(`${(error as Error).message}\n\n${USAGE}`)
    return 1
  }
  const { values, positionals } = parsed
  if (values.help) {
    io.write(USAGE)
    return 0
  }
  const [command, ...extra] = positionals
  if (!command || !Object.hasOwn(OWN_OPTIONS, command)) {
    const unknown = command ? `Unknown command: ${positionals.join(' ')}\n\n` : ''
    io.write(unknown + USAGE)
    return 1
  }
  const misuse = findMisuse(command, extra, Object.keys(values))
  if (misuse) {
    io.write(`${misuse}\n\n${USAGE}`)
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
  const isConfirmed = Boolean(values.yes)
  const isDryRun = Boolean(values['dry-run'])
  if (command === 'create') {
    const isTypeScript = values.ts || values.js ? Boolean(values.ts) : undefined
    return runCreate(
      {
        name: extra[0],
        framework: values.framework,
        isTypeScript,
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
