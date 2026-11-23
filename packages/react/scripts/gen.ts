// `pnpm gen:react` writes the umbrella's entry points; `pnpm gen:react --check` fails when
// they no longer match the libraries. All the logic is in ./generate.ts.
import { fileURLToPath } from 'node:url'
import { libraries } from '../libraries'
import { run } from './generate'

const { problems, summary } = run({
  root: fileURLToPath(new URL('..', import.meta.url)),
  libraries,
  check: process.argv.includes('--check'),
})

for (const line of problems) console.error(line)
console.log(summary)
process.exitCode = problems.length === 0 ? 0 : 1
