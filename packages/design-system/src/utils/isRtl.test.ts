import { describe, it, expect } from 'vitest'
import { isRtl } from './isRtl'

describe('isRtl', () => {
  it('follows the nearest dir attribute', () => {
    const host = document.createElement('div')
    host.innerHTML =
      '<div dir="rtl"><div dir="ltr"><span id="ltr"></span></div><span id="rtl"></span></div>'
    expect(isRtl(host.querySelector('#rtl')!)).toBe(true)
    expect(isRtl(host.querySelector('#ltr')!)).toBe(false)
  })

  it('is false with no dir anywhere', () => {
    expect(isRtl(document.createElement('span'))).toBe(false)
  })
})
