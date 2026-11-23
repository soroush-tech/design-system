import { getStyleRules } from './getStyleRules'

// The value a custom property is declared with on the root (`:root`, however the engine wraps it),
// or `undefined` when no rule declares it. The engine declares each theme variable a style uses
// there, so this is the theme's own value.
export const getCssVariable = (name: string): string | undefined => {
  const value = getStyleRules()
    .filter(
      (rule): rule is CSSStyleRule =>
        rule instanceof CSSStyleRule && rule.selectorText.includes(':root')
    )
    .map((rule) => rule.style.getPropertyValue(name).trim())
    .find(Boolean)
  return value
}
