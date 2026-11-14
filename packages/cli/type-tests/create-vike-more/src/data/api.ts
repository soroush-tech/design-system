import { items } from './items'

/** The items, as an API would answer: make it fetch from yours. */
export async function fetchItems() {
  return items.map(({ id, title, status }) => ({ id, title, status }))
}

/** One item, as an API would answer: make it fetch from yours. */
export async function fetchItem(id: string) {
  const item = items.find((candidate) => candidate.id === id)
  if (!item) throw new Error(`There is no item ${id}.`)
  return item
}
