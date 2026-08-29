import { parseStoriesSource } from './parseStoriesSource'

/**
 * The story export names of a CSF module, in file order - ES module namespaces sort
 * their keys alphabetically, so the raw source is the only place the author's order
 * survives.
 */
export const listStoryNames = (source: string): string[] => [
  ...parseStoriesSource(source).stories.keys(),
]
