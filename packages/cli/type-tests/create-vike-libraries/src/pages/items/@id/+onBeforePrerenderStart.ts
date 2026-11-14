import { items } from '../../../data/items'

/** The URLs of this route the build prerenders: one per item. https://vike.dev/onBeforePrerenderStart */
export function onBeforePrerenderStart() {
  return items.map(({ id }) => `/items/${id}`)
}
