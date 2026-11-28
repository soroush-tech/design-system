import { describe, it, expect, vi } from 'vitest'
import { createRef } from 'react'
import { assignRef } from './assignRef'

describe('assignRef', () => {
  it('calls a callback ref, fills an object ref, and ignores no ref', () => {
    const callback = vi.fn()
    assignRef(callback, 'a')
    expect(callback).toHaveBeenCalledWith('a')

    const object = createRef<string>()
    assignRef(object, 'b')
    expect(object.current).toBe('b')

    expect(() => assignRef(undefined, 'c')).not.toThrow()
    expect(() => assignRef(null, 'c')).not.toThrow()
  })
})
