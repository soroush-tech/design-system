// @vitest-environment node
import { describe, expect, it } from 'vitest'
import main, { createNodeIo } from './index'
import { createNodeIo as ioCreateNodeIo } from './io'
import { main as mainMain } from './main'

describe('the package entry', () => {
  it('exports the command line, and what a bin of its own needs to run it', () => {
    expect(main).toBe(mainMain)
    expect(createNodeIo).toBe(ioCreateNodeIo)
  })
})
