import { defineCatalogEntry } from '../catalog/defineCatalogEntry'
import type { PressableFeedback, PressableProps } from './Pressable'

export const pressableFeedbackValues = [
  'none',
  'opacity',
  'highlight',
] satisfies PressableFeedback[]
export const pressableAsValues = ['div', 'button', 'span'] satisfies NonNullable<
  PressableProps['as']
>[]

export const pressableCatalog = defineCatalogEntry<PressableProps>()({
  summary:
    'An unstyled clickable surface - button semantics around any content, with no looks of its own.',
  isPlaceable: true,
  example: { component: 'Pressable', props: {}, children: ['Press me'] },
  // Its feedback shows only while it is held, so a still picture has no looks to tell apart.
  variants: [],
  options: {
    as: { values: pressableAsValues, default: 'div' },
    feedback: { values: pressableFeedbackValues, default: 'none' },
    color: { scale: 'palette', default: 'primary' },
    activeOpacity: { default: 0.7 },
    disabled: { values: [true, false], default: false },
    borderRadius: { scale: 'radii' },
  },
  content: { children: 'children' },
  domEvents: ['onClick'],
})
