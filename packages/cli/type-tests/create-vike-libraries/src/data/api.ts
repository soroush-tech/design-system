import type { Item } from './items'

/** What the API says to the app. */
export interface Greeting {
  message: string
}

/** A greeting, from the API: while VITE_MSW is true, the mock API of src/mocks answers. */
export async function fetchGreeting(): Promise<Greeting> {
  const response = await fetch('/api/greeting')
  if (!response.ok) throw new Error(`GET /api/greeting answered ${response.status}`)
  return response.json()
}

/** The items, from the API: while VITE_MSW is true, the mock API of src/mocks answers. */
export async function fetchItems(): Promise<Pick<Item, 'id' | 'title' | 'status'>[]> {
  const response = await fetch('/api/items')
  if (!response.ok) throw new Error(`GET /api/items answered ${response.status}`)
  return response.json()
}

/** One item, from the API. */
export async function fetchItem(id: string): Promise<Item> {
  const response = await fetch(`/api/items/${id}`)
  if (!response.ok) throw new Error(`GET /api/items/${id} answered ${response.status}`)
  return response.json()
}
