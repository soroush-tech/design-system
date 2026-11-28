import { describe, expect, it } from 'vitest'
import { formatChecklist, formatReport, formatStepPlans } from './formatMigration'
import { planChain } from './simulate'
import { TEST_APP_FILES, TEST_STEPS } from './testSteps'

const plans = planChain(
  TEST_STEPS,
  {
    readFile: (path) => (TEST_APP_FILES as Record<string, string>)[path],
    listFiles: () => Object.keys(TEST_APP_FILES),
  },
  { name: 'npm', isYarnBerry: false },
  { package: '@test/a', version: '1.2.0' }
)

describe('formatReport', () => {
  it('puts the file and line first, and the file alone when there is no line', () => {
    expect(formatReport({ path: 'src/a.ts', line: 3, code: 'C', message: 'm' })).toBe(
      'src/a.ts:3 m'
    )
    expect(formatReport({ path: 'src/a.ts', code: 'C', message: 'm' })).toBe('src/a.ts m')
  })
})

describe('formatStepPlans', () => {
  it('groups the plan by step: dependencies, creations, edits as diffs, and what is left to decide', () => {
    expect(formatStepPlans(plans)).toBe(`Step 1 of 2: test-a-2.0.0 - oldName is newName
  @test/a 1.2.0 -> @test/a 2.0.0

  Dependencies:
    + @test/helper ^1.0.0
    - @test/old ^1.0.0
    ~ @test/a ^1.2.0 -> ^2.0.0

  Edit src/main.ts:
      - import { oldName } from '@test/a'
      - oldName()
      + import { newName } from '@test/a'
      + newName()
        legacy()


  To decide by hand:
    - src/main.ts:3 legacy() has no successor: decide

Step 2 of 2: test-a-3.0.0 - newName is latestName
  @test/a 2.0.0 -> @test/a 3.0.0

  Dependencies:
    ~ @test/a ^2.0.0 -> ^3.0.0

  Create:
    src/generated.ts

  Edit src/main.ts:
      - import { newName } from '@test/a'
      - newName()
      + import { latestName } from '@test/a'
      + latestName()
        legacy()


  To decide by hand:
    - src/main.ts check the build
`)
  })
})

describe('formatChecklist', () => {
  it('lists every report of every step as a checkbox', () => {
    expect(formatChecklist(plans)).toBe(`Still left to you (2):
  [ ] src/main.ts:3 legacy() has no successor: decide
  [ ] src/main.ts check the build
`)
  })

  it('is empty when there is nothing to decide', () => {
    expect(formatChecklist([{ ...plans[0], reports: [] }])).toBe('')
  })

  it('formats a step with nothing to show but its move', () => {
    const bare = {
      ...plans[0],
      dependencies: [],
      reports: [],
      plan: { ...plans[0].plan, edits: [] },
    }
    expect(formatStepPlans([bare])).toBe(
      'Step 1 of 1: test-a-2.0.0 - oldName is newName\n  @test/a 1.2.0 -> @test/a 2.0.0\n'
    )
  })
})
