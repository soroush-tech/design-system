import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterAll, describe, expect, it } from 'vitest'
import { judgeProgram, listPrograms, runProgram } from './programs'

const dir = mkdtempSync(join(tmpdir(), 'contract-programs-'))
afterAll(() => rmSync(dir, { recursive: true, force: true }))

const program = (name: string, source: string, expectErrors?: string) => {
  mkdirSync(join(dir, name), { recursive: true })
  writeFileSync(
    join(dir, name, 'tsconfig.json'),
    JSON.stringify({ compilerOptions: { strict: true, noEmit: true, types: [] }, include: ['.'] })
  )
  writeFileSync(join(dir, name, 'index.ts'), source)
  if (expectErrors !== undefined) writeFileSync(join(dir, name, 'expect-errors.txt'), expectErrors)
}

describe('judgeProgram', () => {
  it('passes a clean program, and fails one that errors', () => {
    expect(judgeProgram(true, '', undefined)).toBe(true)
    expect(judgeProgram(false, 'error', undefined)).toBe(false)
  })

  it('passes a program that must fail only when its output holds every expected line', () => {
    expect(judgeProgram(false, 'a missing palette.brand b', 'missing palette.brand\n\n')).toBe(true)
    expect(judgeProgram(false, 'another error', 'missing palette.brand\n')).toBe(false)
    expect(judgeProgram(true, '', 'missing palette.brand\n')).toBe(false)
  })
})

describe('programs', () => {
  it('lists the folders that hold a tsconfig, and type-checks each with tsc', async () => {
    program('clean', 'export const a: number = 1\n')
    program('broken', "export const a: number = 'x'\n")
    program('message', "export const a: number = 'x'\n", 'is not assignable to type')
    mkdirSync(join(dir, 'shared'))
    writeFileSync(join(dir, 'tsconfig.base.json'), '{}')
    expect(listPrograms(dir)).toEqual(['broken', 'clean', 'message'])
    const results = await Promise.all(listPrograms(dir).map((name) => runProgram(dir, name)))
    expect(results.map(({ name, ok }) => [name, ok])).toEqual([
      ['broken', false],
      ['clean', true],
      ['message', true],
    ])
    expect(results[0].detail).toContain("Type 'string' is not assignable to type 'number'")
  })
})
