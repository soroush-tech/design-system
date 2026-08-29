import { listStoryNames, type StoriesModule } from '@soroush.tech/story-demo'
import designSystemPkg from 'packages/design-system/package.json'

// Every design-system stories module, resolved at build time - once as a namespace
// (rendered via portable stories) and once as raw text (parsed into the shown code),
// so the code shown is the code run.
const modules = import.meta.glob('packages/design-system/src/**/*.stories.tsx', {
  eager: true,
}) as Record<string, StoriesModule>
const sources = import.meta.glob('packages/design-system/src/**/*.stories.tsx', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export interface DemoEntry {
  /** Registry path: `<Component>/<StoryExport>`. */
  path: string
  /** Section heading - the story's own `name`, or its export de-camel-cased. */
  title: string
  stories: StoriesModule
  source: string
  storyName: string
}

/** A story's display name: its CSF `name` when set, else `WithIcons` -> `With Icons`. */
const storyTitle = (stories: StoriesModule, storyName: string): string => {
  const custom = (stories[storyName] as { name?: string } | undefined)?.name
  return custom ?? storyName.replaceAll(/([a-z0-9])([A-Z])/g, '$1 $2')
}

// Keyed by component name (the stories file's basename), each component's stories in
// the order the author wrote them.
const demosByComponent = new Map<string, DemoEntry[]>()
for (const [path, stories] of Object.entries(modules)) {
  const component = path.split('/').pop()!.replace('.stories.tsx', '')
  const source = sources[path]
  demosByComponent.set(
    component,
    listStoryNames(source).map((storyName) => ({
      path: `${component}/${storyName}`,
      title: storyTitle(stories, storyName),
      stories,
      source,
      storyName,
    }))
  )
}

/** Every story of a component, as demos, in file order. Empty when it has no stories. */
export const demosForComponent = (component: string): DemoEntry[] =>
  demosByComponent.get(component) ?? []

/** Lookup for a single demo: `<StoryDemo of="ButtonGroup/Default" />`. */
export const demoByPath = new Map(
  [...demosByComponent.values()].flat().map((entry) => [entry.path, entry])
)

/** Published versions for our own packages in sandbox exports; anything else rides at latest. */
export const demoVersions: Record<string, string> = {
  '@soroush.tech/design-system': `^${designSystemPkg.version}`,
}

/** The react / react-dom pin for sandbox exports. */
export const demoReactVersion = designSystemPkg.peerDependencies.react
