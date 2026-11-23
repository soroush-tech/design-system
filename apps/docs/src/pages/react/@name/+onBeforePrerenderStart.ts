import { allComponents, componentPagePath, entryGuides } from 'src/common/nav'
import { sectionRoute } from 'src/common/sectionRoute'

// The concrete URLs the SSG emits for this parameterized route: a component's page, and the page
// of each entry point that is not a component. sectionRoute keeps them base-relative inside a
// react snapshot build.
export function onBeforePrerenderStart(): string[] {
  return [
    ...allComponents.map((item) => componentPagePath(item).slice(0, -1)),
    ...Object.keys(entryGuides).map((entry) => `/${entry}`),
  ].map((path) => sectionRoute('react', path))
}
