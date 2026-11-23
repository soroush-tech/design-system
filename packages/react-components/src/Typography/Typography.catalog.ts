import { defineCatalogEntry } from '../catalog/defineCatalogEntry'
import type { TypographyAlign, TypographyProps, TypographyVariant } from './Typography'

export const typographyAlignValues = [
  'left',
  'center',
  'right',
  'justify',
  'inherit',
] satisfies TypographyAlign[]

// The variants its pictures show - `variant` takes any `theme.typography` key.
const pictured = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'subtitle1',
  'subtitle2',
  'body1',
  'body2',
  'caption',
  'overline',
  'button',
] satisfies TypographyVariant[]

const variantLabels: Record<(typeof pictured)[number], string> = {
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  h4: 'Heading 4',
  h5: 'Heading 5',
  h6: 'Heading 6',
  subtitle1: 'Subtitle 1',
  subtitle2: 'Subtitle 2',
  body1: 'Body 1',
  body2: 'Body 2',
  caption: 'Caption',
  overline: 'Overline',
  button: 'Button',
}

export const typographyCatalog = defineCatalogEntry<TypographyProps>()({
  summary: 'Text in one of the theme typography variants, rendered as its semantic element.',
  isPlaceable: true,
  example: {
    component: 'Typography',
    props: { variant: 'body1' },
    children: ['Great products are built through clarity, consistency, and attention to detail.'],
  },
  variants: pictured.map((variant) => ({
    name: variant,
    label: variantLabels[variant],
    example: { component: 'Typography', props: { variant }, children: ['The quick brown fox'] },
  })),
  options: {
    variant: { scale: 'typography', default: 'body1' },
    color: { scale: 'text' },
    bg: { scale: 'background' },
    align: { values: typographyAlignValues },
    gutterBottom: { values: [true, false], default: false },
    noWrap: { values: [true, false], default: false },
  },
  content: { children: 'children' },
})
