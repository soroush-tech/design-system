// A breaking release of the Gild UI family ships the `migrate` step that moves apps to it. The
// family's shared version (the lockstep set) is compared with npm's `latest` of @gild-ui/react: a
// major bump, a minor bump below 1.0.0, or a first release (breaking for the design system 2.x it
// replaces) needs packages/cli/src/migrate/steps/gild-ui-<version>/, registered, with a fixture,
// and release notes whose Breaking items each say `migrate` or `by hand`. Offline, it warns and
// passes. Run `pnpm check:migrations`; the pre-commit hook and the CI lint job do (the logic, and
// its tests, are packages/contract/src/migrations.ts).
import { readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  checkMigrations,
  diskFiles,
  FAMILY_PACKAGE,
  latestPublished,
} from '../packages/contract/src/migrations.ts'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const { version } = JSON.parse(readFileSync(join(root, 'packages/react/package.json'), 'utf8'))
const published = await latestPublished(FAMILY_PACKAGE)

if (published === undefined) {
  console.warn(
    `Warning: could not reach the registry for ${FAMILY_PACKAGE} - migration check skipped.`
  )
} else {
  const problems = checkMigrations(diskFiles(root), version, published)
  if (problems.length > 0) {
    console.error(problems.map((problem) => `migrations: ${problem}`).join('\n'))
    process.exit(1)
  }
  console.log(`Migrations: ${version} has the steps it needs (npm has ${published ?? 'nothing'}).`)
}
