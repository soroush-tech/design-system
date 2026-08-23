import type { ThemeSyntax } from '@soroush.tech/markdown'

interface PrismStyleEntry {
  types: string[]
  style: { color?: string; fontStyle?: 'italic' }
}

export interface PrismThemeShape {
  plain: { color: string; backgroundColor: string; fontFamily: string }
  styles: PrismStyleEntry[]
}

/**
 * A prism-react-renderer theme derived from the active theme's `syntax` tokens, so the
 * live editor tracks light/dark alongside `CodeBlock`. Prism's token taxonomy differs
 * from highlight.js, so the grouping approximates the CodeBlock mapping.
 */
export const prismTheme = (syntax: ThemeSyntax): PrismThemeShape => ({
  plain: { color: syntax.base, backgroundColor: 'transparent', fontFamily: syntax.font },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: { color: syntax.comment, fontStyle: 'italic' },
    },
    { types: ['keyword', 'builtin', 'boolean', 'important'], style: { color: syntax.keyword } },
    { types: ['class-name', 'maybe-class-name'], style: { color: syntax.type } },
    {
      types: ['string', 'char', 'regex', 'inserted', 'attr-value'],
      style: { color: syntax.string },
    },
    { types: ['number', 'symbol', 'deleted'], style: { color: syntax.number } },
    { types: ['constant', 'property'], style: { color: syntax.constant } },
    { types: ['function', 'attr-name', 'selector'], style: { color: syntax.title } },
    { types: ['tag', 'variable'], style: { color: syntax.tag } },
  ],
})
