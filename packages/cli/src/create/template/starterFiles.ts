import { join } from 'node:path'
import { LIBRARY_NAMES } from '../libraries'
import type { StarterFacts, StarterFile } from '../starters'
import { findTemplatesRoot, readLayers, renderTemplate } from './template'

/** The names that hold for the app `facts` describe, as the templates' markers read them. */
export function getFlags({ isTypeScript, rendering, libraries, hasSampleData }: StarterFacts) {
  return new Set<string>([
    isTypeScript ? 'ts' : 'js',
    rendering,
    ...libraries,
    ...(hasSampleData ? ['sample-data'] : []),
  ])
}

/**
 * The layers of a framework's template for the app `facts` describe, in the order they are laid:
 * the base, the rendering's own files, the sample data pages, then each library's, in the order
 * create offers them, whatever order they were given in.
 */
export function getLayers({ rendering, libraries, hasSampleData }: StarterFacts): string[] {
  return [
    'base',
    ...(rendering === 'isomorphic' ? [] : [rendering]),
    ...(hasSampleData ? ['sample-data'] : []),
    ...LIBRARY_NAMES.filter((name) => libraries.includes(name)).map((name) => `with/${name}`),
  ]
}

/**
 * The files the template of `framework` writes for the app `facts` describe: its layers, laid
 * one over the other, each file with the lines its markers keep and its placeholders filled.
 */
export function createTemplateFiles(
  framework: string,
  facts: StarterFacts,
  root = findTemplatesRoot()
): StarterFile[] {
  const folder = join(root, framework, facts.isTypeScript ? 'ts' : 'js')
  const flags = getFlags(facts)
  const values = {
    __TITLE_STRING__: facts.title.replaceAll("'", String.raw`\'`),
    __TITLE__: facts.title,
    __SCHEME__: facts.scheme,
  }
  const files: StarterFile[] = []
  for (const [path, source] of readLayers(folder, getLayers(facts))) {
    const content = renderTemplate(source, flags, values, `${framework}/${path}`)
    if (content !== undefined) files.push({ path, content })
  }
  return files
}
