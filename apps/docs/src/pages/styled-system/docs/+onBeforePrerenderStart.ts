import { styledSystemDocs, styledSystemGuides, styledSystemDocSlug } from 'src/common/nav'
import { sectionRoute } from 'src/common/sectionRoute'

export function onBeforePrerenderStart(): string[] {
  return [...styledSystemDocs, ...styledSystemGuides].map(({ file }) =>
    sectionRoute('styled-system', `/docs/${styledSystemDocSlug(file)}`)
  )
}
