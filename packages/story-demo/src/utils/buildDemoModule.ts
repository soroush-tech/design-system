import { indent } from './indentation'
import type { ParsedImport, ParsedStoriesSource, ParsedStory } from './parseStoriesSource'
import { serializeArgsLiteral, serializeJsxProps } from './serializeJsxProps'

export interface DemoModule {
  /** The essential example - what the collapsed code panel shows. */
  preview: string
  /**
   * The preview's independently parseable sections (the args const, then the JSX
   * body). Joined bare they are display-only: without a separating semicolon a
   * trailing object literal and a leading `<` would parse as one relational
   * expression, so transforms must run per section.
   */
  previewParts: string[]
  /** The used-import lines - prepended when a collapsed buffer becomes a module. */
  importsText: string
  /** The helper declarations the body references, hidden in the collapsed view. */
  helpersText: string
  /** The complete standalone module - imports, helpers, and the Demo wrapper. */
  full: string
}

export interface BuildDemoModuleOptions {
  parsed: ParsedStoriesSource
  storyName: string
  /** The story's merged args (composed defaults plus any control overrides). */
  args: Record<string, unknown>
  /** The story's controls include list - the args worth writing out. */
  include?: readonly string[]
  /** The npm package that relative imports in the stories source resolve to. */
  packageName: string
}

/**
 * Relative story imports become package subpaths: sibling component folders map to the
 * per-component export (`../Flex` -> `<pkg>/Flex`, `../theme/themes` -> `<pkg>/theme`),
 * while `utils/` paths keep their full subpath (they are exported as-is).
 */
const rewriteSpecifier = (specifier: string, packageName: string): string => {
  if (!specifier.startsWith('.')) return specifier
  // A directory-relative import ('.', './', '..') is the package root itself. Appending
  // the empty subpath would emit `<pkg>/` or `<pkg>/.`, which export maps reject.
  if (specifier === '.' || specifier === '..') return packageName
  const rest = specifier.replace(/^(\.\.?\/)+/, '')
  if (rest === '') return packageName
  const segments = rest.split('/')
  const subpath = segments[0] === 'utils' ? rest : segments[0]
  return `${packageName}/${subpath}`
}

const referencesName = (name: string, texts: readonly string[]): boolean => {
  // Escaped first: a binding may legally contain a regex metacharacter, and an
  // unescaped `$Button` reads as an end anchor followed by `Button`, matching nothing.
  const escaped = name.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`)
  // `-` counts as a word character so `label` never matches inside `aria-label`.
  const usage = new RegExp(String.raw`(?<![\w$-])${escaped}(?![\w$-])`)
  return texts.some((text) => usage.test(text))
}

interface UsedImport {
  defaultBinding?: string
  namespaceBinding?: string
  namedBindings: { imported: string; local: string }[]
}

const collectUsedBindings = (
  parsedImport: ParsedImport,
  usedTexts: readonly string[]
): UsedImport => ({
  defaultBinding:
    parsedImport.defaultBinding && referencesName(parsedImport.defaultBinding, usedTexts)
      ? parsedImport.defaultBinding
      : undefined,
  namespaceBinding:
    parsedImport.namespaceBinding && referencesName(parsedImport.namespaceBinding, usedTexts)
      ? parsedImport.namespaceBinding
      : undefined,
  namedBindings: parsedImport.namedBindings.filter((binding) =>
    referencesName(binding.local, usedTexts)
  ),
})

const printImport = (specifier: string, used: UsedImport): string => {
  const namedText =
    used.namedBindings.length > 0
      ? `{ ${used.namedBindings
          .map((binding) =>
            binding.imported === binding.local
              ? binding.local
              : `${binding.imported} as ${binding.local}`
          )
          .join(', ')} }`
      : undefined
  const namespaceText = used.namespaceBinding ? `* as ${used.namespaceBinding}` : undefined
  const clause = [used.defaultBinding, namespaceText, namedText].filter(Boolean).join(', ')
  return `import ${clause} from '${specifier}'`
}

interface DemoBody {
  body: string
  /** The `const args = ...` line, for a story whose render takes a parameter. */
  argsConst?: string
}

/** The demo's body: the story's own render body, or a JSX element built from its args. */
const buildBody = (
  parsed: ParsedStoriesSource,
  story: ParsedStory,
  args: Record<string, unknown>,
  include: readonly string[]
): DemoBody => {
  if (story.renderBody === undefined) {
    return { body: serializeJsxProps(parsed.componentName, args, include) }
  }
  if (story.renderParamKind === 'none') return { body: story.renderBody }
  return {
    body: story.renderBody,
    argsConst: `const ${story.renderParamText} = ${serializeArgsLiteral(args, include)}`,
  }
}

/**
 * The top-level declarations the body transitively references, in source order. Each
 * pass adds the declarations the current set names, until a pass finds nothing new.
 */
const collectHelpers = (parsed: ParsedStoriesSource, body: string): string[] => {
  const helperTexts: string[] = []
  for (;;) {
    const referenced = [body, ...helperTexts]
    const missing = parsed.declarations.filter(
      (declaration) =>
        !helperTexts.includes(declaration.text) &&
        declaration.names.some((name) => referencesName(name, referenced))
    )
    if (missing.length === 0) break
    for (const declaration of missing) helperTexts.push(declaration.text)
  }
  return parsed.declarations
    .filter((declaration) => helperTexts.includes(declaration.text))
    .map((declaration) => declaration.text)
}

/** The imports the demo actually uses, keyed and merged by rewritten specifier. */
const collectImports = (
  parsed: ParsedStoriesSource,
  usedTexts: readonly string[],
  packageName: string
): Map<string, UsedImport> => {
  const importsBySpecifier = new Map<string, UsedImport>()
  for (const parsedImport of parsed.imports) {
    if (parsedImport.typeOnly) continue
    const used = collectUsedBindings(parsedImport, usedTexts)
    if (!used.defaultBinding && !used.namespaceBinding && used.namedBindings.length === 0) continue
    const specifier = rewriteSpecifier(parsedImport.specifier, packageName)
    const merged = importsBySpecifier.get(specifier) ?? { namedBindings: [] }
    merged.defaultBinding ??= used.defaultBinding
    merged.namespaceBinding ??= used.namespaceBinding
    merged.namedBindings.push(...used.namedBindings)
    importsBySpecifier.set(specifier, merged)
  }
  return importsBySpecifier
}

/** The `export default function Demo()` wrapper - a block body carries its own return. */
const demoWrapper = (
  body: string,
  argsConst: string | undefined,
  isBlockBody: boolean
): string[] => {
  const head = ['export default function Demo() {', ...(argsConst ? [indent(argsConst, 2)] : [])]
  return isBlockBody
    ? [...head, indent(body, 2), '}']
    : [...head, '  return (', indent(body, 4), '  )', '}']
}

/**
 * A standalone demo module synthesized from one story: the story's render body (or a
 * JSX element built from its args), the top-level helpers it references, and only the
 * imports that body actually uses - wrapped in `export default function Demo()`.
 */
export const buildDemoModule = (options: BuildDemoModuleOptions): DemoModule => {
  const { parsed, storyName, args, include = [], packageName } = options
  const story = parsed.stories.get(storyName)
  if (!story) {
    const known = [...parsed.stories.keys()].join(', ')
    throw new Error(`Unknown story "${storyName}" - this module exports: ${known}`)
  }
  const demoBody = buildBody(parsed, story, args, include)
  let { argsConst } = demoBody
  const { body } = demoBody
  const orderedHelpers = collectHelpers(parsed, body)
  const importsBySpecifier = collectImports(parsed, [body, ...orderedHelpers], packageName)
  // Type the args const with the component's exported props type - the convention
  // (`<Component>Props`) holds across the design system, and the JS view strips it.
  const componentImport = importsBySpecifier.get(`${packageName}/${parsed.componentName}`)
  if (argsConst && componentImport) {
    const propsType = `${parsed.componentName}Props`
    componentImport.namedBindings.push({
      imported: `type ${propsType}`,
      local: `type ${propsType}`,
    })
    argsConst = argsConst.replace(' = ', `: Partial<${propsType}> = `)
  }
  const importLines = [...importsBySpecifier].map(([specifier, used]) =>
    printImport(specifier, used)
  )
  const wrapperLines = demoWrapper(body, argsConst, story.isBlockBody)
  const importsText = importLines.join('\n')
  const helpersText = orderedHelpers.join('\n\n')
  const sections = [importsText, ...orderedHelpers, wrapperLines.join('\n')].filter(
    (section) => section !== ''
  )
  const previewParts = argsConst ? [argsConst, body] : [body]
  return {
    preview: previewParts.join('\n\n'),
    previewParts,
    importsText,
    helpersText,
    full: `${sections.join('\n\n')}\n`,
  }
}
