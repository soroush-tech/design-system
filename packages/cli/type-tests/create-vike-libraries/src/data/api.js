/** A greeting, from the API: while VITE_MSW is true, the mock API of src/mocks answers. */
export async function fetchGreeting() {
  const response = await fetch('/api/greeting')
  if (!response.ok) throw new Error(`GET /api/greeting answered ${response.status}`)
  return response.json()
}
/** The items, from the API: while VITE_MSW is true, the mock API of src/mocks answers. */
export async function fetchItems() {
  const response = await fetch('/api/items')
  if (!response.ok) throw new Error(`GET /api/items answered ${response.status}`)
  return response.json()
}
/** One item, from the API. */
export async function fetchItem(id) {
  const response = await fetch(`/api/items/${id}`)
  if (!response.ok) throw new Error(`GET /api/items/${id} answered ${response.status}`)
  return response.json()
}
