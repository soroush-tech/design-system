// The packages in the root package.json's `lockstep` list share one version and are published
// together (see packages/packages.md). This fails, naming each package and its version, when their
// versions differ or one's dependency or peer range on a sibling does not cover the shared version.
// Run `pnpm check:lockstep`; the pre-commit hook and the CI lint job do. It takes no argument: it
// checks this repository (the logic, and its tests, are packages/contract/src/lockstep.ts).
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { checkLockstepAt } from '../packages/contract/src/lockstep.ts'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const problems = checkLockstepAt(repoRoot)
if (problems.length > 0) {
  console.error(problems.map((problem) => `lockstep: ${problem}`).join('\n'))
  process.exit(1)
}
console.log('The lockstep packages share one version.')
