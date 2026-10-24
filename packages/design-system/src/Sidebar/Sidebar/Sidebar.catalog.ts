import { defineCatalogEntry, node } from '../../catalog/defineCatalogEntry'
import type { SidebarAnchor, SidebarItemVariant, SidebarLayout } from '../SidebarContext'
import type { SidebarProps } from './Sidebar'

export const sidebarAnchorValues = ['left', 'right'] satisfies SidebarAnchor[]
export const sidebarLayoutValues = ['inline', 'stacked'] satisfies SidebarLayout[]
export const sidebarVariantValues = ['text', 'outlined', 'plain'] satisfies SidebarItemVariant[]

const variantLabels: Record<SidebarItemVariant, string> = {
  text: 'Text',
  outlined: 'Outlined',
  plain: 'Plain',
}

const items = [
  node('SidebarItem', { icon: 'folder', label: 'Directory', isSelected: true }),
  node('SidebarItem', { icon: 'history', label: 'Gist history' }),
  node('SidebarItem', { icon: 'edit_note', label: 'Drafts' }),
  node('SidebarItem', { icon: 'terminal', label: 'Terminal console' }),
]

const content = { isOpen: false, anchor: 'left' as const, 'aria-label': 'Editor panels' }

export const sidebarCatalog = defineCatalogEntry<SidebarProps>()({
  summary:
    'A collapsible navigation rail of `SidebarItem`s - icons only when closed, icons and labels when open.',
  isPlaceable: true,
  example: { component: 'Sidebar', props: content, children: items },
  variants: sidebarVariantValues.map((variant) => ({
    name: variant,
    label: variantLabels[variant],
    example: { component: 'Sidebar', props: { ...content, variant }, children: items },
  })),
  options: {
    isOpen: { values: [true, false] },
    anchor: { values: sidebarAnchorValues, default: 'left' },
    variant: { values: sidebarVariantValues, default: 'text' },
    layout: { values: sidebarLayoutValues, default: 'inline' },
    expandedWidth: { default: '14rem' },
    collapsedWidth: { default: '3.5rem' },
    stackedWidth: { default: '5.5rem' },
    hasPanel: { values: [true, false], default: false },
    panelWidth: { default: '18rem' },
    bg: { scale: 'background' },
  },
  content: { children: 'children' },
})
