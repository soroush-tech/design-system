import type { PageContext } from 'vike/types'
import { componentOfRoute } from 'src/common/componentPage'
import { socialMeta, type HeadMeta } from 'src/renderer/head'

export function data(pageContext: PageContext): HeadMeta {
  const { name } = componentOfRoute(pageContext.routeParams)
  return {
    meta: socialMeta({
      title: `${name} accessibility`,
      description: `Keyboard use, focus and assistive technology support of the ${name} component.`,
    }),
  }
}
