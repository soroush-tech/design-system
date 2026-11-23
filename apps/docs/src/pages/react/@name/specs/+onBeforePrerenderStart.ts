import { allComponents, componentSpecsPath } from 'src/common/nav'
import { sectionRoute } from 'src/common/sectionRoute'

// The concrete URLs the SSG emits for this parameterized route. sectionRoute keeps
// them base-relative inside a react snapshot build.
export function onBeforePrerenderStart(): string[] {
  return allComponents.map((item) => sectionRoute('react', componentSpecsPath(item).slice(0, -1)))
}
