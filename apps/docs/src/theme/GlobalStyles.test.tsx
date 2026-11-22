import { describe, it, expect } from 'vitest'
import { renderWithTheme } from 'src/test/utils/wrapper'
import { GlobalStyles } from './GlobalStyles'

// The text of every style rule the engine wrote, descending into the cascade layers it wraps them in.
const collectRules = (rules: CSSRuleList): CSSRule[] =>
  Array.from(rules).flatMap((rule) =>
    rule instanceof CSSStyleRule || !('cssRules' in rule)
      ? [rule]
      : collectRules((rule as CSSGroupingRule).cssRules)
  )
const styleRulesText = () =>
  Array.from(document.styleSheets)
    .flatMap((sheet) => collectRules(sheet.cssRules))
    .map((rule) => rule.cssText)
    .join('\n')

describe('GlobalStyles', () => {
  it('injects the global stylesheet with the brand fonts', () => {
    renderWithTheme(<GlobalStyles />)
    const globalCss = styleRulesText()
    expect(globalCss).toContain('Space Grotesk')
    expect(globalCss).toContain('box-sizing')
  })

  it('leaves room above a section a link brings to the top, for the sticky bars', () => {
    renderWithTheme(<GlobalStyles />)
    const globalCss = styleRulesText()
    expect(globalCss).toMatch(/main \[id\]\s*\{\s*scroll-margin-top:\s*9rem/)
    expect(globalCss).toMatch(/main \[id\]\s*\{\s*scroll-margin-top:\s*5rem/)
  })
})
