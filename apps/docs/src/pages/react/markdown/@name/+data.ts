import type { PageContext } from 'vike/types'
import { socialMeta, type HeadMeta } from 'src/renderer/head'

export function data(pageContext: PageContext): HeadMeta {
  const { name } = pageContext.routeParams
  return {
    meta: socialMeta({
      title: name,
      description: `Props and usage for the ${name} markdown component.`,
    }),
  }
}
