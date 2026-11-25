// Every style rule of the document's sheets, descending into at-rules (cascade layers, media
// queries), in sheet order. The engine writes class rules inside `@layer` blocks, so a walk of the
// top-level rules alone finds none of them.
const collect = (rules: CSSRuleList): CSSRule[] =>
  [...rules].flatMap((rule) =>
    rule instanceof CSSStyleRule || !('cssRules' in rule)
      ? [rule]
      : collect((rule as CSSGroupingRule).cssRules)
  )

export const getStyleRules = (): CSSRule[] =>
  [...document.styleSheets].flatMap((sheet) => collect(sheet.cssRules))
