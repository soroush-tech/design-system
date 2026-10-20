import { defineCatalogEntry } from '../catalog/defineCatalogEntry'
import type { LinkProps, LinkUnderline } from './Link'

export const linkUnderlineValues = ['always', 'hover', 'none'] satisfies LinkUnderline[]
export const linkTargetValues = [
  '_self',
  '_blank',
  '_parent',
  '_top',
  '_unfencedTop',
] satisfies NonNullable<LinkProps['target']>[]

const underlineLabels: Record<LinkUnderline, string> = {
  always: 'Underlined',
  hover: 'Underline on hover',
  none: 'No underline',
}

const label = 'Visit the design system docs'

export const linkCatalog = defineCatalogEntry<LinkProps>()({
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
