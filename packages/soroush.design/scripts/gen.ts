// `pnpm gen:umbrellas` writes the umbrella's entry points; `pnpm gen:umbrellas --check` fails when
// they no longer match the platforms. All the logic is in @soroush.design/umbrella-gen.
import { run } from '@soroush.design/umbrella-gen'
import { fileURLToPath } from 'node:url'
import { libraries } from '../libraries'

const { problems, summary } = run({
  root: fileURLToPath(new URL('..', import.meta.url)),
  libraries,
  check: process.argv.includes('--check'),
})

for (const line of problems) console.error(line)
console.log(summary)
process.exitCode = problems.length === 0 ? 0 : 1
