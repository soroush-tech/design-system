// Deprecates the alphas of every publishable package once their release is out: each
// `X.Y.Z-alpha.N` whose `X.Y.Z` is on npm gets `Prerelease - use <name>@^X.Y.Z`. An alpha whose
// release is not on npm yet is left alone and listed, as is a version already deprecated; any
// other prerelease (an rc, a `0.0.0-stage`) is never touched.
//
//   pnpm deprecate-alpha            lists them, then deprecates them with npm's one-time code
//   pnpm deprecate-alpha --dry-run  lists them only
//
// Run it after a stable release. A code lasts about 30 seconds: when npm refuses one, the script
// asks for another, and a second run picks up what the first left.
import { spawnSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { createInterface } from 'node:readline/promises'
import { fileURLToPath } from 'node:url'

const REGISTRY = 'https://registry.npmjs.org'
const ALPHA = /^(\d+\.\d+\.\d+)-alpha\.\d+$/
// Only these reach the shell: a scoped name, a version, and a one-time code.
const NAME = /^@[a-z0-9.-]+\/[a-z0-9.-]+$/
const OTP = /^\d{6,8}$/

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const packagesDir = join(repoRoot, 'packages')
const isDryRun = process.argv.includes('--dry-run')

/** The names of the packages this repo publishes. */
const publishableNames = () =>
  readdirSync(packagesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => join(packagesDir, entry.name, 'package.json'))
    .filter((manifest) => existsSync(manifest))
    .map((manifest) => JSON.parse(readFileSync(manifest, 'utf8')))
    .filter((pkg) => !pkg.private && NAME.test(pkg.name))
    .map((pkg) => pkg.name)

/** A package's registry document, or `null` when it was never published. */
const fetchPackument = async (name) => {
  const response = await fetch(`${REGISTRY}/${name.replace('/', '%2f')}`, {
    headers: { 'Cache-Control': 'no-cache' },
  })
  if (response.status === 404) return null
  if (!response.ok) throw new Error(`${name}: the registry answered ${response.status}`)
  return response.json()
}

const toDeprecate = []
const waiting = []
for (const name of publishableNames()) {
  const packument = await fetchPackument(name)
  for (const [version, meta] of Object.entries(packument?.versions ?? {})) {
    const release = ALPHA.exec(version)?.[1]
    if (!release || meta.deprecated) continue
    if (packument.versions[release]) {
      toDeprecate.push({
        spec: `${name}@${version}`,
        message: `Prerelease - use ${name}@^${release}`,
      })
    } else {
      waiting.push(`${name}@${version}`)
    }
  }
}

if (waiting.length > 0) {
  console.log('Left alone, their release is not on npm yet:')
  for (const spec of waiting) console.log(`  ${spec}`)
  console.log('')
}
if (toDeprecate.length === 0) {
  console.log('Nothing to deprecate.')
  process.exit(0)
}
console.log('To deprecate:')
for (const { spec, message } of toDeprecate) console.log(`  ${spec}  ->  ${message}`)
if (isDryRun) {
  console.log('\nDry run: nothing was changed.')
  process.exit(0)
}

/** Runs `npm deprecate` through the shell, which finds npm on every platform. */
const deprecate = ({ spec, message }, otp) =>
  spawnSync(`npm deprecate "${spec}" "${message}" --otp=${otp}`, {
    shell: true,
    stdio: ['ignore', 'ignore', 'inherit'],
  }).status === 0

const prompt = createInterface({ input: process.stdin, output: process.stdout })
const askCode = async (question) => {
  const answer = (await prompt.question(question)).trim()
  if (OTP.test(answer) || answer === '') return answer
  return askCode('That is not a one-time code. Try again (Enter to stop): ')
}

let otp = await askCode(
  `\nnpm one-time code to deprecate these ${toDeprecate.length} (Enter to stop): `
)
let done = 0
for (const item of toDeprecate) {
  while (otp && !deprecate(item, otp)) {
    otp = await askCode(
      `npm refused ${item.spec}; the code may have expired. New code (Enter to stop): `
    )
  }
  if (!otp) break
  console.log(`  done  ${item.spec}`)
  done += 1
}
prompt.close()

if (done < toDeprecate.length) {
  console.log(`\nStopped after ${done} of ${toDeprecate.length}. Run it again to finish.`)
  process.exit(1)
}
console.log(`\nDeprecated ${done}.`)
