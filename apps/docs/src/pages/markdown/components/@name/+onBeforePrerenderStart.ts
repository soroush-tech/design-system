import { markdownComponents } from 'src/common/nav'
import { sectionRoute } from 'src/common/sectionRoute'

// The concrete URLs the SSG emits for this parameterized route. sectionPath keeps
// them base-relative inside a markdown snapshot build.
export function onBeforePrerenderStart(): string[] {
  return markdownComponents.map((item) => sectionRoute('markdown', `/components/${item.slug}`))
}
