/** Why a check is expected to fail, and the task that makes it pass. */
export interface Expected {
  task: string
  reason: string
}

/** What one check did: `name` is `exports/<package>` or `types/<program>`. */
export interface Result {
  name: string
  ok: boolean
  detail: string
}

export interface Verdict {
  /** Failing and listed. */
  expectedFailures: string[]
  /** Passing and not listed. */
  passes: string[]
  /** Failing and not listed: a regression, or a new check nobody listed. */
  unexpectedFailures: string[]
  /** Listed and passing: the task landed, so the entry must be removed. */
  unexpectedPasses: string[]
  /** Listed, but no check has that name. */
  unknown: string[]
}

/** Holds the failing set to the list. */
export const judge = (results: Result[], expected: Record<string, Expected>): Verdict => {
  const verdict: Verdict = {
    expectedFailures: [],
    passes: [],
    unexpectedFailures: [],
    unexpectedPasses: [],
    unknown: Object.keys(expected).filter(
      (name) => !results.some((result) => result.name === name)
    ),
  }
  for (const { name, ok } of results) {
    if (ok) (name in expected ? verdict.unexpectedPasses : verdict.passes).push(name)
    else (name in expected ? verdict.expectedFailures : verdict.unexpectedFailures).push(name)
  }
  return verdict
}

/** True when the failing set equals the list. */
export const isMet = (verdict: Verdict): boolean =>
  !verdict.unexpectedFailures.length && !verdict.unexpectedPasses.length && !verdict.unknown.length

const section = (title: string, names: string[], note: (name: string) => string) =>
  names.length
    ? [`${title} (${names.length})`, ...names.map((name) => `  ${name}${note(name)}`)]
    : []

/** A readable report: what fails as expected and which task fixes it, what passes, and what breaks the contract. */
export const summary = (
  verdict: Verdict,
  expected: Record<string, Expected>,
  results: Result[]
): string => {
  const details = Object.fromEntries(results.map((result) => [result.name, result.detail]))
  const firstLine = (name: string) => '\n      ' + details[name].split('\n')[0]
  const problems =
    verdict.unexpectedFailures.length + verdict.unexpectedPasses.length + verdict.unknown.length
  return [
    ...section(
      'FAIL, not listed: fix it, or list it with its task',
      verdict.unexpectedFailures,
      firstLine
    ),
    ...section(
      'PASS, but listed: remove it from expected-failures.json',
      verdict.unexpectedPasses,
      (name) => ` (${expected[name].task})`
    ),
    ...section('LISTED, but no such check', verdict.unknown, () => ''),
    ...section(
      'expected failures, until their task lands',
      verdict.expectedFailures,
      (name) => `  ${expected[name].task}  ${expected[name].reason}`
    ),
    ...section('pass', verdict.passes, () => ''),
    `${verdict.expectedFailures.length} expected failures, ${verdict.passes.length} passes, ${problems} problems`,
  ].join('\n')
}
