import { defineCatalogEntry } from '../../catalog/defineCatalogEntry'
import type { SidebarItemVariant } from '../SidebarContext'
import type { SidebarItemProps } from './SidebarItem'

export const sidebarItemVariantValues = ['text', 'outlined', 'plain'] satisfies SidebarItemVariant[]

const variantLabels: Record<SidebarItemVariant, string> = {
  text: 'Text',
  outlined: 'Outlined',
  plain: 'Plain',
}

const content = { icon: 'folder' as const, label: 'Directory' }

export const sidebarItemCatalog = defineCatalogEntry<SidebarItemProps>()({
  summary: 'One entry of a `Sidebar` - an icon, with its label shown while the rail is open.',
  isPlaceable: false,
  example: { component: 'SidebarItem', props: { ...content, variant: 'text' }, children: [] },
  variants: sidebarItemVariantValues.map((variant) => ({
    name: variant,
    label: variantLabels[variant],
    example: { component: 'SidebarItem', props: { ...content, variant }, children: [] },
  })),
  options: {
    variant: { values: sidebarItemVariantValues, default: 'text' },
    size: { scale: 'sizes', default: 'sm' },
    color: { scale: 'palette', default: 'primary' },
    isSelected: { values: [true, false], default: false },
    disabled: { values: [true, false], default: false },
  },
  content: { children: 'children', label: 'text' },
  domEvents: ['onSelect', 'onClick'],
})
