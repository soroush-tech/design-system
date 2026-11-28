import { getStyleRules } from './getStyleRules'

// The style rules whose selector names one of the element's classes and contains `suffix` (`''`
// matches them all), in sheet order. jsdom never enters `:active` or `:focus-visible`, and it
// resolves keywords like `inherit` away in `getComputedStyle`, so the generated style sheet is the
// only place those declarations can be observed. Read them from `rule.style` and `rule.parentRule`,
// not from `rule.cssText`, whose formatting is the browser's.
export const getStyleRulesFor = (element: Element, suffix = ''): CSSStyleRule[] => {
  const classes = [...element.classList]
  return getStyleRules().filter(
    (rule): rule is CSSStyleRule =>
      rule instanceof CSSStyleRule &&
      rule.selectorText.includes(suffix) &&
      classes.some((name) => rule.selectorText.includes(`.${name}`))
  )
}
