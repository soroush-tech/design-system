import type { PageContext } from 'vike/types'
import { entryGuides } from 'src/common/nav'
import { componentOfRoute } from 'src/common/componentPage'
import { socialMeta, type HeadMeta } from 'src/renderer/head'

export function data({ routeParams }: PageContext): HeadMeta {
  if (routeParams.name in entryGuides) {
    return {
      meta: socialMeta({
        title: routeParams.name[0].toUpperCase() + routeParams.name.slice(1),
        description: `What @soroush.design/react/${routeParams.name} exports and how to use it.`,
      }),
    }
  }
  const { name } = componentOfRoute(routeParams)
  return {
    meta: socialMeta({
      title: name,
      description: `Props, tokens, and usage examples for the ${name} component.`,
    }),
  }
}
