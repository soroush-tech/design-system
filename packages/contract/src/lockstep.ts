/** The part of a package.json the lockstep check reads. */
export interface Manifest {
  name: string
  version: string
  dependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
}

const parts = (version: string) => version.split('-')[0].split('.').map(Number)

/**
 * Whether `range` covers `version`: `workspace:*`, `workspace:^` and `workspace:~` always do
 * (pnpm publishes them as the sibling's own version); otherwise `*`, an exact version, `^` and `~`.
 * Any other form does not count as covering - the check asks for a range it can read.
 */
export const covers = (range: string, version: string): boolean => {
  if (['workspace:*', 'workspace:^', 'workspace:~'].includes(range)) return true
  const spec = range.replace(/^workspace:/, '')
  if (spec === '*') return true
  const [major, minor, patch] = parts(version)
  const match = /^([\^~]?)(\d+)\.(\d+)\.(\d+)$/.exec(spec)
  if (!match) return false
  const [, operator, ...floor] = match
  const [lowMajor, lowMinor, lowPatch] = floor.map(Number)
  if (operator === '') return [major, minor, patch].join() === [lowMajor, lowMinor, lowPatch].join()
  const atLeast =
    major > lowMajor ||
    (major === lowMajor && (minor > lowMinor || (minor === lowMinor && patch >= lowPatch)))
  if (!atLeast) return false
  if (operator === '~') return major === lowMajor && minor === lowMinor
  if (lowMajor > 0) return major === lowMajor
  return minor === lowMinor && (lowMinor > 0 || patch === lowPatch)
}

/**
 * The problems of a lockstep set: every package of `names` must exist, share one version, and
 * depend on a sibling through a range that covers that version. One message per problem, naming
 * the package and its version.
 */
export const checkLockstep = (manifests: Manifest[], names: string[]): string[] => {
  const byName = new Map(manifests.map((manifest) => [manifest.name, manifest]))
  const members = names.flatMap((name) => byName.get(name) ?? [])
  const problems = names
    .filter((name) => !byName.has(name))
    .map((name) => `${name} is in the lockstep set but is not a workspace package`)
  const versions = new Set(members.map(({ version }) => version))
  if (versions.size > 1) {
    const listed = members.map(({ name, version }) => `${name}@${version}`).join(', ')
    problems.push(`the lockstep packages must share one version: ${listed}`)
  }
  const [shared] = members.map(({ version }) => version)
  for (const { name, version, dependencies, peerDependencies } of members) {
    for (const [kind, ranges] of [
      ['dependency', dependencies],
      ['peer dependency', peerDependencies],
    ] as const) {
      for (const [sibling, range] of Object.entries(ranges ?? {})) {
        if (!names.includes(sibling) || covers(range, shared)) continue
        problems.push(
          `${name}@${version}: the ${kind} ${sibling} "${range}" does not cover ${shared}`
        )
      }
    }
  }
  return problems
}

/**
 * The problem with publishing `run` (package names) when only some of the lockstep set is in it:
 * the set publishes together or not at all. `undefined` when `run` holds none or all of it.
 */
export const lockstepRunProblem = (run: string[], names: string[]): string | undefined => {
  const inRun = names.filter((name) => run.includes(name))
  if (inRun.length === 0 || inRun.length === names.length) return undefined
  const missing = names.filter((name) => !run.includes(name))
  return `${inRun.join(', ')} publish with the whole lockstep set - missing: ${missing.join(', ')}`
}
