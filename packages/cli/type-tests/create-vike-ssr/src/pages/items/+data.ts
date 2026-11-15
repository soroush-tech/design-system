import { items } from '../../data/items'

/**
 * The list page's data: what it shows of each item. It runs on the server, on each request. https://vike.dev/data
 */
export function data() {
  return items.map(({ id, title, status }) => ({ id, title, status }))
}

export type Data = ReturnType<typeof data>
