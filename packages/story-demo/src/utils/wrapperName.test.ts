import { describe, expect, it } from 'vitest'
import { pickWrapperName } from './wrapperName'

describe('pickWrapperName', () => {
  it('is Demo when the code declares no Demo', () => {
    expect(pickWrapperName('function Card() {}\nconst DemoCard = 1')).toBe('Demo')
  })

  it('is Example when the code declares its own Demo, in any form', () => {
    expect(pickWrapperName('function Demo(args) {}')).toBe('Example')
    expect(pickWrapperName('const Demo = () => null')).toBe('Example')
    expect(pickWrapperName('class Demo {}')).toBe('Example')
  })

  it('counts on from Demo2 when Demo and Example are both taken', () => {
    expect(pickWrapperName('function Demo() {}\nfunction Example() {}')).toBe('Demo2')
    expect(
      pickWrapperName('function Demo() {}\nlet Example = 1\nvar Demo2 = 2\nconst Demo3 = 3')
    ).toBe('Demo4')
  })

  it('reads no declaration in a comment or a string', () => {
    expect(pickWrapperName("// function Demo() {}\nconst text = 'function Demo'")).toBe('Demo')
  })
})
