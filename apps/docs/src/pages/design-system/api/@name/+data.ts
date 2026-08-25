import type { PageContext } from 'vike/types'
import { componentBySlug } from 'src/common/nav'
import { socialMeta, type HeadMeta } from 'src/renderer/head'

export function data(pageContext: PageContext): HeadMeta {
  const name = componentBySlug.get(pageContext.routeParams.name)?.name ?? 'Component'
  return {
    meta: socialMeta({
      title: `${name} API`,
      description: `API reference for the ${name} component: props, token values, and defaults.`,
    }),
  }
}
