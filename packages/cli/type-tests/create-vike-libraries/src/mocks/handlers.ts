import { http, HttpResponse } from 'msw'
import { items } from '../data/items'

/** The mock API: what it answers, by method and path. Add a handler for each call the app makes. */
export const handlers = [
  http.get('/api/items', () =>
    HttpResponse.json(items.map(({ id, title, status }) => ({ id, title, status })))
  ),
  http.get('/api/items/:id', ({ params }) => {
    const item = items.find(({ id }) => id === params.id)
    return item ? HttpResponse.json(item) : new HttpResponse(null, { status: 404 })
  }),
]
