import type { PageContext } from 'vike/types'
import { componentBySlug } from 'src/common/nav'

const title = (pageContext: PageContext): string =>
  componentBySlug.get(pageContext.routeParams.name)?.name ?? 'Component'

export default title
