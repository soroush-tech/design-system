import { http, HttpResponse } from 'msw'
// @if sample-data
import { items } from '../data/items'
// @endif

/** The mock API: what it answers, by method and path. Add a handler for each call the app makes. */
export const handlers = [
  http.get('/api/greeting', () => HttpResponse.json({ message: 'Hello from the mock API' })),
  // @if react-hook-form
  http.post<never, { name: string }>('/api/messages', async ({ request }) => {
    const { name } = await request.json()
    return HttpResponse.json({ message: `Thanks, ${name}: the mock API took your message.` })
  }),
  // @endif
  // @if sample-data
  http.get('/api/items', () =>
    HttpResponse.json(items.map(({ id, title, status }) => ({ id, title, status })))
  ),
  http.get('/api/items/:id', ({ params }) => {
    const item = items.find(({ id }) => id === params.id)
    return item ? HttpResponse.json(item) : new HttpResponse(null, { status: 404 })
  }),
  // @endif
]
