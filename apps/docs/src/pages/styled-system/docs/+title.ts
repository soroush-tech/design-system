import type { PageContext } from 'vike/types'
import { docBySlug } from './docSources'

const WILDCARD = '*'

export default (pageContext: PageContext): string => {
  const rest = pageContext.routeParams[WILDCARD] ?? ''
  return docBySlug.get(rest.replace(/\/+$/, ''))?.label ?? 'Docs'
}
