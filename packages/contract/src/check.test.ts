import { describe, expect, it } from 'vitest'
import { checkAll } from './check'

describe('the contract', () => {
  // The real run: the export lists against the built packages, and every type-test program.
  // It is met while the programs that fail are exactly those in expected-failures.json - the task
  // that makes one pass removes its entry (see the README).
  it('fails exactly where expected-failures.json says it does', async () => {
    const { report, met } = await checkAll()
    console.log(`\n${report}\n`)
    expect(met, report).toBe(true)
  })
})
