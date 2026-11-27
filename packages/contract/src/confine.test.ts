import { join, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { confine } from './confine'

const base = resolve('some', 'base')
const other = resolve('some', 'other')

describe('confine', () => {
  it('resolves a path inside a base, the base itself included', () => {
    expect(confine(base, [base])).toBe(base)
    expect(confine(join(base, 'a', '..', 'b'), [base])).toBe(join(base, 'b'))
    expect(confine(join(other, 'c'), [base, other])).toBe(join(other, 'c'))
  })

  it('keeps a folder whose name starts with two dots', () => {
    expect(confine(join(base, '..hidden'), [base])).toBe(join(base, '..hidden'))
  })

  it('refuses a path that leaves the base, by .., by a sibling folder or by another root', () => {
    expect(() => confine(join(base, '..', 'x'), [base])).toThrow('is outside')
    expect(() => confine(join(base, '..'), [base])).toThrow('is outside')
    expect(() => confine(`${base}-sibling`, [base])).toThrow('is outside')
    expect(() => confine(resolve('/'), [base])).toThrow('is outside')
  })

  it('refuses a path on another drive', () => {
    const elsewhere = process.platform === 'win32' ? 'Z:\\x' : '/definitely/elsewhere'
    expect(() => confine(elsewhere, [base])).toThrow('is outside')
  })
})
