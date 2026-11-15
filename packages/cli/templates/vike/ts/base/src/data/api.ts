// @if tanstack-query || swr || msw
// @if ts && sample-data && msw && (tanstack-query || swr)
import type { Item } from './items'

// @elif sample-data && !msw && (tanstack-query || swr)
import { items } from './items'

// @endif
// @if ts
/** What the API says to the app. */
export interface Greeting {
  message: string
}
// @if react-hook-form

/** What the form sends. */
export interface Message {
  name: string
  email: string
}
// @endif

// @endif
// @if msw
/** A greeting, from the API: while VITE_MSW is true, the mock API of src/mocks answers. */
export async function fetchGreeting(): Promise<Greeting> {
  const response = await fetch('/api/greeting')
  if (!response.ok) throw new Error(`GET /api/greeting answered ${response.status}`)
  return response.json()
}
// @else
/** A greeting, as an API would answer: make it fetch from yours. */
export async function fetchGreeting(): Promise<Greeting> {
  return { message: 'Hello from src/data/api: make it fetch from your API.' }
}
// @endif
// @if react-hook-form && msw

/** Sends the form's values to the API, which answers what it made of them. */
export async function sendMessage(message: Message): Promise<Greeting> {
  const response = await fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message),
  })
  if (!response.ok) throw new Error(`POST /api/messages answered ${response.status}`)
  return response.json()
}
// @elif react-hook-form

/** Sends the form's values, as an API would take them: make it post to yours. */
export async function sendMessage(message: Message): Promise<Greeting> {
  return { message: `Thanks, ${message.name}: your message was sent.` }
}
// @endif
// @if sample-data && msw && (tanstack-query || swr)

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
// @elif sample-data && (tanstack-query || swr)

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
// @endif
// @endif
