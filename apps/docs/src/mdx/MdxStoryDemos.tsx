import { demosForComponent } from 'src/demos/registry'
import { MdxStoryDemo } from './MdxStoryDemo'

export interface MdxStoryDemosProps {
  /** Component name as in the design system: `Button`. */
  of: string
}

/**
 * MDX-facing StoryDemos: every story of a component as a live demo, in file order -
 * a component page's whole example section in one tag.
 */
export function MdxStoryDemos({ of }: Readonly<MdxStoryDemosProps>) {
  const entries = demosForComponent(of)
  if (entries.length === 0) {
    throw new Error(`No stories for component "${of}" - add ${of}.stories.tsx beside it`)
  }
  return entries.map((entry) => <MdxStoryDemo key={entry.path} of={entry.path} />)
}
