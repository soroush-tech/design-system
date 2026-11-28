import { reactHooks } from 'src/common/nav'
import { sectionRoute } from 'src/common/sectionRoute'

// The concrete URLs the SSG emits for this parameterized route: a page for each hook.
export function onBeforePrerenderStart(): string[] {
  return reactHooks.map((hook) => sectionRoute('react', `/hooks/${hook}`))
}
