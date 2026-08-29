import { StoryDemo } from '@soroush.tech/story-demo/StoryDemo'
import { demoByPath, demoReactVersion, demoVersions } from 'src/demos/registry'
import { loadDemoScope } from 'src/demos/scopeLoader'

export interface MdxStoryDemoProps {
  /** Registry path of the demo's story: `ButtonGroup/Default`. */
  of: string
  /** Overrides the story's derived heading. */
  title?: string
  /** Prose under the heading - the stories carry none. */
  description?: string
}

/** MDX-facing StoryDemo: looks the story up in the registry so content files import nothing. */
export function MdxStoryDemo({ of, title, description }: Readonly<MdxStoryDemoProps>) {
  const entry = demoByPath.get(of)
  if (!entry) throw new Error(`Unknown demo "${of}" - no such story in the design system`)
  return (
    <StoryDemo
      stories={entry.stories}
      source={entry.source}
      storyName={entry.storyName}
      title={title ?? entry.title}
      description={description}
      scope={loadDemoScope}
      versions={demoVersions}
      reactVersion={demoReactVersion}
    />
  )
}
