import type { PageContext } from 'vike/types'
import { docBySlug, docSlugFromParam } from './docSources'

const WILDCARD = '*'

export default (pageContext: PageContext): string => {
  const rest = pageContext.routeParams[WILDCARD] ?? ''
  return docBySlug.get(docSlugFromParam(rest))?.label ?? 'Docs'
}
