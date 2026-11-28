import type { AppVersion, MigrationStep } from './step'
import { compareVersions, matchesRange } from './versions'

/** The steps to run, in order; or why there are none, with the exit code that goes with it. */
export type ChainResult = { chain: MigrationStep[] } | { message: string; code: number }

/** The steps by the version they end on, the earliest first. */
export const orderSteps = (steps: readonly MigrationStep[]): MigrationStep[] =>
  [...steps].sort((a, b) => compareVersions(a.to.version, b.to.version))

/**
 * The steps that take an app from `from` to `target` (the latest step's version when not given):
 * from the app's package and version, the step whose `from` matches, then from where that step
 * ends, until the target. Returns the steps in order, or why there are none: the app is already
 * there (code 0), or no step starts from where it is, or none ends at the target (code 1).
 */
export function buildChain(
  steps: readonly MigrationStep[],
  from: AppVersion,
  target?: string
): ChainResult {
  const ordered = orderSteps(steps)
  const goal = target ?? ordered.at(-1)!.to.version
  const goalStep = ordered.find((step) => step.to.version === goal)
  if (!goalStep) {
    const versions = ordered.map((step) => step.to.version).join(', ')
    return {
      message: `migrate has no step that ends at ${goal}. Versions it moves to: ${versions}.`,
      code: 1,
    }
  }
  const isThere = (current: { package: string; version: string }) =>
    current.package === goalStep.to.package && compareVersions(current.version, goal) >= 0
  let current: { package: string; version: string } = from
  const chain: MigrationStep[] = []
  while (!isThere(current)) {
    const { package: name, version } = current
    const next = ordered.find(
      (step) =>
        !chain.includes(step) &&
        step.from.package === name &&
        matchesRange(version, step.from.range) &&
        compareVersions(step.to.version, goal) <= 0
    )
    if (!next) {
      return { message: describeNoStep(ordered, current, chain.length > 0, goal), code: 1 }
    }
    chain.push(next)
    current = next.to
  }
  if (chain.length === 0) {
    return {
      message: `Already on ${from.package} ${from.version}: migrate has nothing to do.`,
      code: 0,
    }
  }
  return { chain }
}

function describeNoStep(
  ordered: readonly MigrationStep[],
  { package: name, version }: { package: string; version: string },
  isMidChain: boolean,
  goal: string
): string {
  if (isMidChain) {
    return `migrate cannot reach ${goal}: no step moves on from ${name} ${version}.`
  }
  const starts = ordered.map((step) => `${step.from.package} ${step.from.range}`).join(', ')
  return `migrate has no step for ${name} ${version}. It moves apps on: ${starts}. Move the app to one of those by hand first, then run migrate again.`
}
