import { allDocComponents } from 'src/common/nav'
import { Readme } from 'src/common/Readme/Readme'
import { splitReadme } from '@soroush.tech/docs-content'
import { readmeForSlug } from './readmeSources'

export interface MdxReadmeProps {
  /** Component name as in the design system: `ButtonGroup`. */
  of: string
  /** Which README section to render. Default: `full`. */
  part?: 'full' | 'intro' | 'api' | 'examples'
}

/** MDX-facing Readme: renders a component README (or one section of it) by name. */
export function MdxReadme({ of, part = 'full' }: Readonly<MdxReadmeProps>) {
  const item = allDocComponents.find((component) => component.name === of)
  if (!item) throw new Error(`Unknown component "${of}" - register it in src/common/nav.ts`)
  const source = readmeForSlug(item.slug)
  if (part === 'full') return <Readme source={source} />
  const sections = splitReadme(source)
  // The MDX page owns its own heading, so section renders drop the README chrome.
  return <Readme source={sections[part]} stripChrome={part === 'intro'} />
}
