import type { PageContext } from 'vike/types'
import { componentBySlug } from 'src/common/nav'

export default (pageContext: PageContext): string =>
  componentBySlug.get(pageContext.routeParams.name)?.name ?? 'Component'
