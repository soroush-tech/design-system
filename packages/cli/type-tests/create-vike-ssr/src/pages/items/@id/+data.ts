import { render } from 'vike/abort'
import type { PageContextServer } from 'vike/types'
import { items } from '../../../data/items'

/**
 * One item's data, by the id in the URL, or the 404 page for an id with no item. It runs on the
 * server, on each request. https://vike.dev/data
 */
export function data(pageContext: PageContextServer) {
  const item = items.find(({ id }) => id === pageContext.routeParams.id)
  if (!item) throw render(404)
  return item
}

export type Data = ReturnType<typeof data>
