import type { PageContext } from 'vike/types'

const title = (pageContext: PageContext): string => pageContext.routeParams.name

export default title
