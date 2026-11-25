import { describe, expect, it } from 'vitest'
import { catalog } from '../catalog'
import { renderExample } from '../utils/test/renderExample'
import { renderWithTheme } from '../utils/test/renderWithTheme'

// The forms the engine's value repair used to rewrite: a hex alpha, a minus, or a unit glued after a
// token's reference. The engine is configured without repair, so each of them is an invalid
// declaration the browser drops. `alpha()`, `negate()` and the token's own value write them.
const REFERENCE = String.raw`var\(--[\w-]+(?:, [^)]*)?\)`
const REPAIRED_FORMS = {
  'a hex alpha after a reference': new RegExp(String.raw`${REFERENCE}[0-9a-fA-F]{2}(?![\w-])`),
  'a minus before a reference': new RegExp(String.raw`(?:^|[\s,(:])-var\(`),
  'a unit after a reference': new RegExp(
    String.raw`${REFERENCE}(?:ms|s|px|rem|em|%|vh|vw|deg)(?![\w-])`
  ),
}

const declarations = (): string[] =>
  [...document.querySelectorAll('style[data-style="soroush"]')]
    .flatMap((element) => (element.textContent ?? '').split(/[{};]/))
    .map((declaration) => declaration.trim())

describe('the forms value repair rewrote', () => {
  it.each([
    ['a hex alpha after a reference', 'color:var(--soroush-palette-primary-main)1F'],
    ['a minus before a reference', 'margin-left:-var(--soroush-border-widths-thin)'],
    ['a minus before a reference', 'box-shadow:inset 0 -var(--soroush-border-widths-thin) 0 red'],
    ['a unit after a reference', 'font-size:var(--soroush-font-sizes-0)px'],
  ] as const)('are found in %s: %s', (form, declaration) => {
    expect(declaration).toMatch(REPAIRED_FORMS[form])
  })

  it.each([
    'color:var(--soroush-palette-primary-main)',
    'background-color:color-mix(in srgb, var(--soroush-palette-primary-main) 12%, transparent)',
    'margin-left:calc(var(--soroush-border-widths-thin) * -1)',
    'border:var(--soroush-border-widths-thin) solid var(--soroush-border-light)',
  ])('are not found in %s', (declaration) => {
    for (const form of Object.values(REPAIRED_FORMS)) expect(declaration).not.toMatch(form)
  })

  // Every placeable component's example and variants, as the catalog gives them.
  const examples = Object.values(catalog.components)
    .filter((entry) => entry.isPlaceable)
    .flatMap((entry) => [entry.example, ...entry.variants.map((variant) => variant.example)])

  it('are in no rule of any catalog example', () => {
    for (const example of examples) renderWithTheme(<>{renderExample(example)}</>)
    const written = declarations()
    expect(written.length).toBeGreaterThan(1000)
    for (const [form, pattern] of Object.entries(REPAIRED_FORMS)) {
      expect(
        written.filter((declaration) => pattern.test(declaration)),
        form
      ).toEqual([])
    }
  })
})
