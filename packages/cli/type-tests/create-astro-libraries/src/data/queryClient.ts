import { QueryClient } from '@tanstack/react-query'

let browserClient: QueryClient | undefined

/**
 * The query client of an island. In the browser every island gets the same one, so they share its
 * cache; on the server each render gets its own, so no request sees another's data.
 */
export function getQueryClient() {
  if (typeof window === 'undefined') return new QueryClient()
  browserClient ??= new QueryClient()
  return browserClient
}
