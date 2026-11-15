import { items } from './items'

/** What the API says to the app. */
export interface Greeting {
  message: string
}

/** What the form sends. */
export interface Message {
  name: string
  email: string
}

/** A greeting, as an API would answer: make it fetch from yours. */
export async function fetchGreeting(): Promise<Greeting> {
  return { message: 'Hello from src/data/api: make it fetch from your API.' }
}

/** Sends the form's values, as an API would take them: make it post to yours. */
export async function sendMessage(message: Message): Promise<Greeting> {
  return { message: `Thanks, ${message.name}: your message was sent.` }
}

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
