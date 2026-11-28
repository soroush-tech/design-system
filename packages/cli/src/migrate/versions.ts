// The small part of semver the migrations need: reading a version, ordering two, and matching
// the `x` ranges a step starts from.

interface Version {
  core: [number, number, number]
  pre: string[]
}

function parseVersion(version: string): Version {
  const match = /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?(?:\+.*)?$/.exec(version)
  if (!match) throw new Error(`migrate cannot read the version ${version}`)
  return {
    core: [Number(match[1]), Number(match[2]), Number(match[3])],
    pre: match[4] ? match[4].split('.') : [],
  }
}

function comparePreIdentifiers(a: string, b: string): number {
  const isNumericA = /^\d+$/.test(a)
  const isNumericB = /^\d+$/.test(b)
  if (isNumericA && isNumericB) return Math.sign(Number(a) - Number(b))
  // A number sorts before text.
  if (isNumericA !== isNumericB) return isNumericA ? -1 : 1
  return a.localeCompare(b)
}

/** Negative when `a` is before `b`, positive when after, 0 when equal; a prerelease is before its release. */
export function compareVersions(a: string, b: string): number {
  const left = parseVersion(a)
  const right = parseVersion(b)
  for (let index = 0; index < 3; index += 1) {
    const difference = left.core[index] - right.core[index]
    if (difference !== 0) return Math.sign(difference)
  }
  if (left.pre.length === 0 || right.pre.length === 0) {
    return Math.sign(right.pre.length - left.pre.length)
  }
  const shared = Math.min(left.pre.length, right.pre.length)
  for (let index = 0; index < shared; index += 1) {
    const result = comparePreIdentifiers(left.pre[index], right.pre[index])
    if (result !== 0) return Math.sign(result)
  }
  return Math.sign(left.pre.length - right.pre.length)
}

/**
 * Whether `version` is in `range`: a version with `x` in the places that may vary - `2.x`,
 * `0.1.x` - or one exact version. A prerelease is matched by its release's numbers. Any other
 * shape throws.
 */
export function matchesRange(version: string, range: string): boolean {
  if (!/^(\d+|x)(\.(\d+|x)){0,2}$/.test(range)) {
    throw new Error(`migrate cannot read the range ${range}`)
  }
  const { core } = parseVersion(version)
  return range.split('.').every((part, index) => part === 'x' || Number(part) === core[index])
}

/**
 * The lowest version a declared range names, from its first version: `^2.1.0` is `2.1.0`,
 * `~0.1.0-alpha.2` is `0.1.0-alpha.2`. A range with no version in it - `latest`, `workspace:*` -
 * gives `undefined`.
 */
export function readRangeMinimum(range: string): string | undefined {
  const match = /^[\^~>=<v\s]*(\d+)(?:\.(\d+))?(?:\.(\d+))?(?:-([0-9A-Za-z.-]+))?/.exec(range)
  if (!match) return undefined
  const pre = match[4] && match[3] !== undefined ? `-${match[4]}` : ''
  return `${match[1]}.${match[2] ?? 0}.${match[3] ?? 0}${pre}`
}

/** The range an app declares for `version`: a prerelease exactly, a release as `^version`. */
export const toDeclaredRange = (version: string): string =>
  version.includes('-') ? version : `^${version}`
