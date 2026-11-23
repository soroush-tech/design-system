import { defineCatalogEntry, node } from '../../catalog/defineCatalogEntry'
import type { ExampleNode } from '../../catalog/types'
import type {
  TabsOrientation,
  TabsOverflowBehavior,
  TabsProps,
  TabsScrollButtons,
  TabsVariant,
} from './Tabs'

export const tabsVariantValues = ['underline', 'boxed', 'enclosed', 'tonal'] satisfies TabsVariant[]
export const tabsOrientationValues = ['horizontal', 'vertical'] satisfies TabsOrientation[]
export const tabsOverflowBehaviorValues = [
  'scroll',
  'menu',
  'none',
] satisfies TabsOverflowBehavior[]
export const tabsScrollButtonsValues = ['auto', 'always', 'never'] satisfies TabsScrollButtons[]

const variantLabels: Record<TabsVariant, string> = {
  underline: 'Underline',
  boxed: 'Boxed',
  enclosed: 'Enclosed',
  tonal: 'Tonal',
}

const views: ExampleNode[] = [
  node('Tab', { value: 'canvas', label: 'Canvas' }),
  node('Tab', { value: 'system', label: 'Design system' }),
  node('Tab', { value: 'common', label: 'Common components' }),
]

export const tabsCatalog = defineCatalogEntry<TabsProps>()({
  summary: 'A row of `Tab`s - a tablist, or with `as="nav"` a navigation.',
  isPlaceable: true,
  example: {
    component: 'Tabs',
    props: { defaultValue: 'canvas', 'aria-label': 'Views' },
    children: views,
  },
  variants: tabsVariantValues.map((variant) => ({
    name: variant,
    label: variantLabels[variant],
    example: {
      component: 'Tabs',
      props: { defaultValue: 'canvas', variant, 'aria-label': 'Views' },
      children: views,
    },
  })),
  options: {
    variant: { values: tabsVariantValues, default: 'underline' },
    orientation: { values: tabsOrientationValues, default: 'horizontal' },
    as: { values: ['div', 'nav'], default: 'div' },
    color: { scale: 'palette', default: 'primary' },
    textColor: { scale: 'text' },
    size: { scale: 'sizes', default: 'md' },
    fullWidth: { values: [true, false], default: false },
    isCentered: { values: [true, false], default: false },
    shouldSelectOnFocus: { values: [true, false], default: false },
    overflowBehavior: { values: tabsOverflowBehaviorValues, default: 'none' },
    scrollButtons: { values: tabsScrollButtonsValues, default: 'auto' },
    shouldShowScrollButtonsOnMobile: { values: [true, false], default: false },
    hasVisibleScrollbar: { values: [true, false], default: false },
    hasDivider: { values: [true, false] },
    bg: { scale: 'background' },
    selectedBg: { scale: 'background' },
  },
  content: {
    children: 'children',
    startContent: 'children',
    endContent: 'children',
    slots: 'none',
  },
  twoWay: { prop: 'value', event: 'onChange', read: 'argument' },
  domEvents: ['onTabClose'],
  preview: { width: 360 },
})
