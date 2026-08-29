import { allComponents } from 'src/common/nav'
import { sectionRoute } from 'src/common/sectionRoute'

// The concrete URLs the SSG emits for this parameterized route. sectionPath keeps
// them base-relative inside a design-system snapshot build.
export function onBeforePrerenderStart(): string[] {
  return allComponents.map((item) => sectionRoute('design-system', `/api/${item.slug}`))
}
