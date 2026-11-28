import { memberComponents, componentPagePath } from 'src/common/nav'
import { sectionRoute } from 'src/common/sectionRoute'

export function onBeforePrerenderStart(): string[] {
  return memberComponents.map((item) => sectionRoute('react', componentPagePath(item).slice(0, -1)))
}
