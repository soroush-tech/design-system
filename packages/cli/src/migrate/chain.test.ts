import { describe, expect, it } from 'vitest'
import { buildChain, orderSteps } from './chain'
import type { MigrationStep } from './step'
import { STEP_THREE, STEP_TWO, TEST_STEPS } from './testSteps'

const at = (version: string, name = '@test/a') => ({ package: name, version })
const ids = (result: ReturnType<typeof buildChain>) =>
  'chain' in result ? result.chain.map((step) => step.id) : result

// A step that changes package: @test/a 3.x becomes @test/b 4.0.0.
const RENAME: MigrationStep = {
  id: 'test-b-4.0.0',
  from: { package: '@test/a', range: '3.x' },
  to: { package: '@test/b', version: '4.0.0' },
  summary: 'a is b',
  plan: () => [],
}

describe('orderSteps', () => {
  it('orders by the version a step ends on, without changing the list it is given', () => {
    const list = [STEP_THREE, STEP_TWO]
    expect(orderSteps(list)).toEqual([STEP_TWO, STEP_THREE])
    expect(list[0]).toBe(STEP_THREE)
  })
})

describe('buildChain', () => {
  it('takes one step when the app is on the version before the last', () => {
    expect(ids(buildChain(TEST_STEPS, at('2.1.0')))).toEqual(['test-a-3.0.0'])
  })

  it('chains the steps from the earliest version, whatever order they are listed in', () => {
    expect(ids(buildChain([STEP_THREE, STEP_TWO], at('1.2.0')))).toEqual([
      'test-a-2.0.0',
      'test-a-3.0.0',
    ])
  })

  it('stops at --to, mid-chain', () => {
    expect(ids(buildChain(TEST_STEPS, at('1.2.0'), '2.0.0'))).toEqual(['test-a-2.0.0'])
  })

  it('follows a step that changes the package', () => {
    expect(ids(buildChain([...TEST_STEPS, RENAME], at('1.0.0')))).toEqual([
      'test-a-2.0.0',
      'test-a-3.0.0',
      'test-b-4.0.0',
    ])
    expect(ids(buildChain([...TEST_STEPS, RENAME], at('0.5.0', '@test/b')))).toMatchObject({
      code: 1,
    })
  })

  it('has nothing to do for an app on the target or past it', () => {
    expect(buildChain(TEST_STEPS, at('3.0.0'))).toEqual({
      code: 0,
      message: 'Already on @test/a 3.0.0: migrate has nothing to do.',
    })
    expect(buildChain(TEST_STEPS, at('3.4.0'))).toMatchObject({ code: 0 })
    expect(buildChain(TEST_STEPS, at('3.0.0'), '2.0.0')).toMatchObject({ code: 0 })
  })

  it('says what it moves, for a version no step starts from', () => {
    expect(buildChain(TEST_STEPS, at('0.9.0'))).toEqual({
      code: 1,
      message:
        'migrate has no step for @test/a 0.9.0. It moves apps on: @test/a 1.x, @test/a 2.x. Move the app to one of those by hand first, then run migrate again.',
    })
    expect(buildChain(TEST_STEPS, at('1.0.0', '@test/z'))).toMatchObject({ code: 1 })
  })

  it('says where the chain stops when a step in the middle is missing', () => {
    const gap = { ...STEP_THREE, from: { package: '@test/a', range: '2.5.x' } }
    expect(buildChain([STEP_TWO, gap], at('1.0.0'))).toEqual({
      code: 1,
      message: 'migrate cannot reach 3.0.0: no step moves on from @test/a 2.0.0.',
    })
  })

  it('refuses a --to that no step ends at, naming the versions it has', () => {
    expect(buildChain(TEST_STEPS, at('1.0.0'), '2.5.0')).toEqual({
      code: 1,
      message: 'migrate has no step that ends at 2.5.0. Versions it moves to: 2.0.0, 3.0.0.',
    })
  })

  it('does not take a step twice', () => {
    const loop: MigrationStep = {
      ...STEP_TWO,
      id: 'loop',
      from: { package: '@test/a', range: 'x' },
      to: { package: '@test/a', version: '1.5.0' },
    }
    expect(ids(buildChain([loop, STEP_THREE], at('1.0.0'), '3.0.0'))).toMatchObject({ code: 1 })
  })
})
