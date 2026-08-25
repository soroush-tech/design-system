// The bundle is generated from repo sources at build time and inlined by the bundler,
// so the server never touches a filesystem at runtime - the same content ships to the
// Cloudflare Worker and to the npm package.
import { bundle } from './generated/content'
import type { ContentBundle } from './types'

export const content: ContentBundle = bundle

/** Case-insensitive component lookup by name or slug. */
export const findComponent = (query: string): ContentBundle['components'][number] | undefined => {
  const needle = query.trim().toLowerCase()
  return content.components.find(
    (component) => component.name.toLowerCase() === needle || component.slug === needle
  )
}

/** Doc lookup by exact id, case-insensitive. */
export const findDoc = (id: string): ContentBundle['docs'][number] | undefined => {
  const needle = id.trim().toLowerCase()
  return content.docs.find((doc) => doc.id.toLowerCase() === needle)
}
