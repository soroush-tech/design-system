// The packages in the root package.json's `lockstep` list share one version and are published
// together (see packages/packages.md). This fails, naming each package and its version, when their
// versions differ or one's dependency or peer range on a sibling does not cover the shared version.
// Run `pnpm check:lockstep`; the pre-commit hook and the CI lint job do. An optional argument is
// another repository root to check (the logic, and its tests, are packages/contract/src/lockstep.ts).
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { checkLockstep } from '../packages/contract/src/lockstep.ts'

const root = resolve(process.argv[2] ?? join(dirname(fileURLToPath(import.meta.url)), '..'))
const read = (file) => JSON.parse(readFileSync(join(root, file), 'utf8'))
const manifests = readdirSync(join(root, 'packages'), { withFileTypes: true })
  .filter(
    (entry) => entry.isDirectory() && existsSync(join(root, 'packages', entry.name, 'package.json'))
  )
  .map((entry) => read(`packages/${entry.name}/package.json`))

const problems = checkLockstep(manifests, read('package.json').lockstep)
if (problems.length > 0) {
  console.error(problems.map((problem) => `lockstep: ${problem}`).join('\n'))
  process.exit(1)
}
console.log('The lockstep packages share one version.')
