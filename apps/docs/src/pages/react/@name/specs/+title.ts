import type { PageContext } from 'vike/types'
import { componentOfRoute } from 'src/common/componentPage'

const title = (pageContext: PageContext): string =>
  `${componentOfRoute(pageContext.routeParams).name} API`

export default title
