import type { PageContext } from 'vike/types'
import { docBySlug, docSlugFromParam } from './docSources'

const WILDCARD = '*'

const title = (pageContext: PageContext): string => {
  const rest = pageContext.routeParams[WILDCARD] ?? ''
  return docBySlug.get(docSlugFromParam(rest))?.label ?? 'Docs'
}

export default title
