import type { CatalogOption, ExampleNode } from '../catalog/types'

/** The easings a transition names - the keys of `theme.transitions.easing`. */
export const transitionEasingValues = ['standard', 'enter', 'exit'] satisfies string[]

/** What every transition around one child offers a picker. */
export const transitionOptions = {
  isShown: { values: [true, false], default: false },
  shouldAppear: { values: [true, false], default: true },
  shouldMountOnEnter: { values: [true, false], default: false },
  shouldUnmountOnExit: { values: [true, false], default: false },
  timeout: { values: [150, 250, 375], default: 250 },
  easing: { values: transitionEasingValues, default: 'standard' },
} satisfies Record<string, CatalogOption>

/** The child a freshly placed transition holds. */
export const transitionExampleChild: ExampleNode = {
  component: 'Paper',
  props: { p: 3, width: '12rem' },
  children: ['Content that moves'],
}
