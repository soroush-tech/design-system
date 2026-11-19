// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { createTestIo } from './testApp'

const CHOICES = [
  { value: 'zustand', label: 'zustand' },
  { value: 'jotai', label: 'Jotai' },
]

describe('createTestIo', () => {
  it('answers a choice with the value given, where it starts when none is, and fails on another', async () => {
    const { io, getOutput } = createTestIo('.', { answers: ['jotai', '', 'redux'] })
    expect(await io.select('State', CHOICES)).toBe('jotai')
    expect(await io.select('State', CHOICES, 1)).toBe('jotai')
    await expect(io.select('State', CHOICES)).rejects.toThrow('State offers no redux')
    expect(getOutput()).toBe('? State\n? State\n? State\n')
  })

  it('answers a choice of several with the values given, the ones picked at the start, or fails', async () => {
    const { io } = createTestIo('.', { answers: ['zustand,jotai', '', '', 'redux'] })
    expect(await io.selectMany('State', CHOICES)).toEqual(['zustand', 'jotai'])
    expect(await io.selectMany('State', CHOICES, ['jotai'])).toEqual(['jotai'])
    expect(await io.selectMany('State', CHOICES)).toEqual([])
    await expect(io.selectMany('State', CHOICES)).rejects.toThrow('State offers no redux')
  })
})
