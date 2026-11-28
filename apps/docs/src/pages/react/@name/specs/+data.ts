import type { PageContext } from 'vike/types'
import { componentOfRoute } from 'src/common/componentPage'
import { socialMeta, type HeadMeta } from 'src/renderer/head'

export function data(pageContext: PageContext): HeadMeta {
  const { name } = componentOfRoute(pageContext.routeParams)
  return {
    meta: socialMeta({
      title: `${name} API`,
      description: `API reference for the ${name} component: props, token values, and defaults.`,
    }),
  }
}
