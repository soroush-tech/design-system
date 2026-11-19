// @if !tanstack-query && !swr
import { data, type LoaderFunctionArgs } from 'react-router'
import { items } from '../../data/items'

/**
 * One item's data, by the id in the URL, or the error page for an id with no item. The router
 * runs it before it shows the page. https://reactrouter.com/start/data/data-loading
 */
export function loader({ params }: LoaderFunctionArgs) {
  const item = items.find(({ id }) => id === params.id)
  if (!item) throw data(`There is no item ${params.id}.`, { status: 404 })
  return item
}
// @endif
