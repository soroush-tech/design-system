/** What the API says to the app. */
export interface Greeting {
  message: string
}

/** A greeting, as an API would answer: make it fetch from yours. */
export async function fetchGreeting(): Promise<Greeting> {
  return { message: 'Hello from src/data/api: make it fetch from your API.' }
}
