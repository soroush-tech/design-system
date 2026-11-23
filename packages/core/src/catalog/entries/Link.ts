import { defineCatalogEntry } from '../defineCatalogEntry'

export const linkUnderlineValues = ['always', 'hover', 'none'] as const
export const linkTargetValues = ['_self', '_blank', '_parent', '_top', '_unfencedTop'] as const

const underlineLabels: Record<string, string> = {
  always: 'Underlined',
  hover: 'Underline on hover',
  none: 'No underline',
}

const label = 'Visit the design system docs'

export const linkCatalog = defineCatalogEntry({
  summary: 'A text link to a URL, underlined always, on hover or never.',
  isPlaceable: true,
  example: { component: 'Link', props: { href: '#' }, children: [label] },
  variants: linkUnderlineValues.map((underline) => ({
    name: underline,
    label: underlineLabels[underline],
    example: { component: 'Link', props: { href: '#', underline }, children: [label] },
  })),
  options: {
    underline: { values: linkUnderlineValues, default: 'always' },
    color: { scale: 'text', default: 'primary' },
    variant: { scale: 'typography', default: 'inherit' },
    target: { values: linkTargetValues, default: '_self' },
  },
  content: { children: 'children' },
  domEvents: ['onClick'],
})
