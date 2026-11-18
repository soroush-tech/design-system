// @if !tanstack-query && !swr
import { items } from '../../data/items'

/**
 * The list page's data: what it shows of each item. The router runs it before it shows the page.
 * https://reactrouter.com/start/data/data-loading
 */
export function loader() {
  return items.map(({ id, title, status }) => ({ id, title, status }))
}
// @endif
