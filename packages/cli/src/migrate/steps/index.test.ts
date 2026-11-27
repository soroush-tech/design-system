import { describe, expect, it } from 'vitest'
import { orderSteps } from '../chain'
import { STEPS } from './index'

describe('the registry', () => {
  it('lists steps with an id of their own, each ending on a version no other does', () => {
    const ids = STEPS.map((step) => step.id)
    const versions = STEPS.map((step) => `${step.to.package}@${step.to.version}`)
    expect(new Set(ids).size).toBe(ids.length)
    expect(new Set(versions).size).toBe(versions.length)
    expect(orderSteps(STEPS)).toHaveLength(STEPS.length)
  })
})
