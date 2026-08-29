import { describe, it, expect } from 'vitest'
import { kebabCase } from './kebabCase'

describe('kebabCase', () => {
  it('converts PascalCase', () => {
    expect(kebabCase('Button')).toBe('button')
    expect(kebabCase('TextInput')).toBe('text-input')
    expect(kebabCase('FormHelperText')).toBe('form-helper-text')
  })

  it('keeps digits attached to their word', () => {
    expect(kebabCase('H1Title')).toBe('h1-title')
  })
})
