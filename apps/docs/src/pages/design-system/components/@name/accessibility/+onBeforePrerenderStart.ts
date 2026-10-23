import { allComponents } from 'src/common/nav'
import { componentPageParts } from 'src/common/componentPage'
import { sectionRoute } from 'src/common/sectionRoute'

// Only a component whose README has accessibility notes has the tab, so only it has the page.
export function onBeforePrerenderStart(): string[] {
  return allComponents
    .filter((item) => componentPageParts(item.slug).accessibility !== '')
    .map((item) => sectionRoute('design-system', `/components/${item.slug}/accessibility`))
}
