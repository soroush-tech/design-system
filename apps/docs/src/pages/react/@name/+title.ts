import type { PageContext } from 'vike/types'
import { entryGuides } from 'src/common/nav'
import { componentOfRoute } from 'src/common/componentPage'

const title = ({ routeParams }: PageContext): string =>
  routeParams.name in entryGuides
    ? routeParams.name[0].toUpperCase() + routeParams.name.slice(1)
    : componentOfRoute(routeParams).name

export default title
