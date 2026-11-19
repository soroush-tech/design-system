// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { formatAnswer, formatChoice, getAnswer, readChoiceKey, updateChoice } from './prompt'

const CHOICES = [
  { value: 'npm', label: 'npm' },
  { value: 'pnpm', label: 'pnpm' },
  { value: 'yarn', label: 'yarn' },
]

describe('readChoiceKey', () => {
  it('reads the keys a choice answers to', () => {
    expect(readChoiceKey({ name: 'up' })).toBe('up')
    expect(readChoiceKey({ name: 'k' })).toBe('up')
    expect(readChoiceKey({ name: 'down' })).toBe('down')
    expect(readChoiceKey({ name: 'j' })).toBe('down')
    expect(readChoiceKey({ name: 'space' })).toBe('toggle')
    expect(readChoiceKey({ name: 'return' })).toBe('submit')
    expect(readChoiceKey({ name: 'enter' })).toBe('submit')
    expect(readChoiceKey({ name: 'c', ctrl: true })).toBe('cancel')
    expect(readChoiceKey({ name: 'escape' })).toBe('cancel')
    expect(readChoiceKey({ name: 'c' })).toBe('none')
    expect(readChoiceKey(undefined)).toBe('none')
  })
})

describe('updateChoice', () => {
  it('moves the pointer, round the ends', () => {
    const start = { cursor: 0, picked: undefined }
    expect(updateChoice(start, 'up', CHOICES).cursor).toBe(2)
    expect(updateChoice({ ...start, cursor: 2 }, 'down', CHOICES).cursor).toBe(0)
    expect(updateChoice(start, 'down', CHOICES).cursor).toBe(1)
  })

  it('picks and unpicks with space in a choice of several, in the choices order', () => {
    const many = { cursor: 2, picked: ['npm'] }
    const picked = updateChoice(many, 'toggle', CHOICES)
    expect(picked.picked).toEqual(['npm', 'yarn'])
    expect(updateChoice(picked, 'toggle', CHOICES).picked).toEqual(['npm'])
    const one = { cursor: 1, picked: undefined }
    expect(updateChoice(one, 'toggle', CHOICES)).toBe(one)
  })
})

describe('getAnswer', () => {
  it('answers with the choice pointed at, or the ones picked', () => {
    expect(getAnswer({ cursor: 1, picked: undefined }, CHOICES)).toEqual(['pnpm'])
    expect(getAnswer({ cursor: 1, picked: ['yarn'] }, CHOICES)).toEqual(['yarn'])
  })
})

describe('formatChoice and formatAnswer', () => {
  it('draws the pointer, the boxes of a choice of several, and the answer', () => {
    expect(formatChoice('Package manager', { cursor: 1, picked: undefined }, CHOICES)).toBe(
      '? Package manager  (arrows to move, enter to pick)\n  npm\n> pnpm\n  yarn\n'
    )
    expect(formatChoice('Tools', { cursor: 0, picked: ['pnpm'] }, CHOICES)).toBe(
      '? Tools  (space to pick, enter when done)\n> [ ] npm\n  [x] pnpm\n  [ ] yarn\n'
    )
    expect(formatAnswer('Tools', ['yarn', 'npm'], CHOICES)).toBe('? Tools: npm, yarn\n')
    expect(formatAnswer('Tools', [], CHOICES)).toBe('? Tools: none\n')
  })
})
