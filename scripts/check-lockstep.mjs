// The packages in the root package.json's `lockstep` list share one version and are published
// together (see packages/packages.md). This fails, naming each package and its version, when their
// versions differ or one's dependency or peer range on a sibling does not cover the shared version.
// Run `pnpm check:lockstep`; the pre-commit hook and the CI lint job do. An optional argument is
// another repository root to check, which must lie inside this repository (the logic, and its tests,
// are packages/contract/src/lockstep.ts).
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { confine } from '../packages/contract/src/confine.ts'
import { checkLockstep } from '../packages/contract/src/lockstep.ts'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
let root
try {
  root = confine(process.argv[2] ?? repoRoot, [repoRoot])
} catch (error) {
  console.error(`lockstep: ${error.message}`)
  process.exit(1)
}
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
