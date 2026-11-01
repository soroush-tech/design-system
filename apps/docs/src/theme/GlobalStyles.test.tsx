import { describe, it, expect } from 'vitest'
import { renderWithTheme } from 'src/test/utils/wrapper'
import { GlobalStyles } from './GlobalStyles'

describe('GlobalStyles', () => {
  it('injects the global stylesheet with the brand fonts', () => {
    renderWithTheme(<GlobalStyles />)
    const globalCss = Array.from(document.head.querySelectorAll('style'))
      .map((style) => style.textContent)
      .join('\n')
    expect(globalCss).toContain('Space Grotesk')
    expect(globalCss).toContain('box-sizing')
  })

  it('leaves room above a section a link brings to the top, for the sticky bars', () => {
    renderWithTheme(<GlobalStyles />)
    const globalCss = Array.from(document.head.querySelectorAll('style'))
      .map((style) => style.textContent)
      .join('\n')
    expect(globalCss).toMatch(/main \[id\]\s*\{\s*scroll-margin-top:\s*9rem/)
    expect(globalCss).toMatch(/main \[id\]\s*\{\s*scroll-margin-top:\s*5rem/)
  })
})
