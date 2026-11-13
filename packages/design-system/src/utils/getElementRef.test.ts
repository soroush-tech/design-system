import { createElement, createRef, type ReactElement } from 'react'
import { describe, expect, it } from 'vitest'
import { getElementRef } from './getElementRef'

describe('getElementRef', () => {
  it('reads the ref from the props on React 19, which passes it as one', () => {
    const ref = createRef<HTMLButtonElement>()
    expect(getElementRef(createElement('button', { ref }))).toBe(ref)
    expect(getElementRef({ props: { ref }, ref: null } as unknown as ReactElement, '19.0.0')).toBe(
      ref
    )
  })

  it('reads the ref from the element on React 18, which keeps it out of the props', () => {
    const ref = createRef<HTMLButtonElement>()
    const element = { props: {}, ref } as unknown as ReactElement
    expect(getElementRef(element, '18.3.1')).toBe(ref)
  })

  it('is empty for an element given no ref: undefined on React 19, null on React 18', () => {
    expect(getElementRef(createElement('button')) ?? undefined).toBeUndefined()
  })

  it('is undefined for no element', () => {
    expect(getElementRef(undefined)).toBeUndefined()
    expect(getElementRef(null)).toBeUndefined()
  })
})
