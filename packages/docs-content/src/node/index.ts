// Filesystem-backed loading, kept off the isomorphic entry so a browser bundle never
// pulls `node:fs` in.
export * from './repoRoot'
export * from './loadReadme'
