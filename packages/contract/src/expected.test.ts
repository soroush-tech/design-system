import { describe, expect, it } from 'vitest'
import { isMet, judge, summary } from './expected'

const expected = {
  'types/listed-fails': { task: '#1', reason: 'not yet' },
  'types/listed-passes': { task: '#2', reason: 'landed' },
  'types/no-such-check': { task: '#3', reason: 'stale' },
}
const results = [
  { name: 'types/listed-fails', ok: false, detail: 'error one\nmore' },
  { name: 'types/listed-passes', ok: true, detail: '' },
  { name: 'types/fine', ok: true, detail: '' },
  { name: 'types/broken', ok: false, detail: 'TS2307 first line\nsecond' },
]

describe('judge', () => {
  it('sorts every check against the list', () => {
    expect(judge(results, expected)).toEqual({
      expectedFailures: ['types/listed-fails'],
      passes: ['types/fine'],
      unexpectedFailures: ['types/broken'],
      unexpectedPasses: ['types/listed-passes'],
      unknown: ['types/no-such-check'],
    })
  })

  it('is met only when the failing set equals the list', () => {
    expect(isMet(judge(results, expected))).toBe(false)
    expect(
      isMet(
        judge([results[0], results[2]], { 'types/listed-fails': expected['types/listed-fails'] })
      )
    ).toBe(true)
  })
})

describe('summary', () => {
  it('prints each group with its task, and the first line of each unexpected failure', () => {
    const text = summary(judge(results, expected), expected, results)
    expect(text).toContain(
      'FAIL, not listed: fix it, or list it with its task (1)\n  types/broken\n      TS2307 first line'
    )
    expect(text).toContain(
      'PASS, but listed: remove it from expected-failures.json (1)\n  types/listed-passes (#2)'
    )
    expect(text).toContain('LISTED, but no such check (1)\n  types/no-such-check')
    expect(text).toContain(
      'expected failures, until their task lands (1)\n  types/listed-fails  #1  not yet'
    )
    expect(text).toContain('pass (1)\n  types/fine')
    expect(text).toContain('1 expected failures, 1 passes, 3 problems')
  })

  it('leaves out the groups that are empty', () => {
    const only = [results[2]]
    expect(summary(judge(only, {}), {}, only)).toBe(
      'pass (1)\n  types/fine\n0 expected failures, 1 passes, 0 problems'
    )
  })
})
