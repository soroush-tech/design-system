import { items } from './items'

/** What the API says to the app. */
export interface Greeting {
  message: string
}

/** A greeting, as an API would answer: make it fetch from yours. */
export function fetchGreeting(): Promise<Greeting> {
  return Promise.resolve({ message: 'Hello from src/data/api: make it fetch from your API.' })
}

/** The items, as an API would answer: make it fetch from yours. */
export function fetchItems() {
  return Promise.resolve(items.map(({ id, title, status }) => ({ id, title, status })))
}

/** One item, as an API would answer: make it fetch from yours. */
export function fetchItem(id: string) {
  const item = items.find((candidate) => candidate.id === id)
  return item ? Promise.resolve(item) : Promise.reject(new Error(`There is no item ${id}.`))
}
