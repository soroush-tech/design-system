// The bundle is generated from repo sources at build time and inlined by the bundler,
// so the server never touches a filesystem at runtime - the same content ships to the
// Cloudflare Worker and to the npm package.
import { bundle } from './generated/content'
import type { ContentBundle } from './types'

export const content: ContentBundle = bundle

// Both lookups take the bundle to search rather than closing over `content`, so a server
// built with `createMcpServer(customBundle)` resolves names against the same content its
// listings render. They default to the shipped bundle for the ordinary case.

/** Case-insensitive component lookup by name or slug. */
export const findComponent = (
  query: string,
  source: ContentBundle = content
): ContentBundle['components'][number] | undefined => {
  const needle = query.trim().toLowerCase()
  return source.components.find(
    (component) => component.name.toLowerCase() === needle || component.slug === needle
  )
}

/** Doc lookup by exact id, case-insensitive. */
export const findDoc = (
  id: string,
  source: ContentBundle = content
): ContentBundle['docs'][number] | undefined => {
  const needle = id.trim().toLowerCase()
  return source.docs.find((doc) => doc.id.toLowerCase() === needle)
}
