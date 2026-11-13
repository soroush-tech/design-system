import { parseArgs } from 'node:util'
import type { PackageJson } from './detect/detect'
import { runInit } from './init'
import type { Io } from './io'

export const USAGE = `Usage: npx @soroush.tech/design-system init [options]

Sets up @soroush.tech/design-system in the React app in this folder. It shows every change
first, and writes nothing until you say yes.

Options:
  -y, --yes             apply without asking
      --dry-run         show the changes and exit
      --force           run outside git, or with uncommitted changes
      --scheme <name>   the default color scheme: light or dark
  -h, --help            show this help
`

/** Reads the command line and runs the command. Returns the exit code. */
export async function main(
  argv: readonly string[],
  io: Io,
  ownPackage: PackageJson
): Promise<number> {
  let parsed
  try {
    parsed = parseArgs({
      args: [...argv],
      allowPositionals: true,
      options: {
        yes: { type: 'boolean', short: 'y' },
        'dry-run': { type: 'boolean' },
        force: { type: 'boolean' },
        scheme: { type: 'string' },
        help: { type: 'boolean', short: 'h' },
      },
    })
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
  if (command !== 'init' || extra.length > 0) {
    io.write(`${command ? `Unknown command: ${positionals.join(' ')}\n\n` : ''}${USAGE}`)
    return 1
  }
  const { scheme } = values
  if (scheme !== undefined && scheme !== 'light' && scheme !== 'dark') {
    io.write(`--scheme is light or dark, not ${scheme}.\n`)
    return 1
  }
  return runInit(
    {
      isConfirmed: Boolean(values.yes),
      isDryRun: Boolean(values['dry-run']),
      isForced: Boolean(values.force),
      scheme,
    },
    io,
    ownPackage
  )
}
