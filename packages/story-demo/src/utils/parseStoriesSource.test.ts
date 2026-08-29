import { describe, it, expect } from 'vitest'
import sampleRaw from './__fixtures__/Sample.stories.tsx?raw'
import { parseStoriesSource } from './parseStoriesSource'

describe('parseStoriesSource', () => {
  const parsed = parseStoriesSource(sampleRaw)

  it('reads the imports with their bindings', () => {
    expect(parsed.imports.map((entry) => entry.specifier)).toEqual([
      '@storybook/react-vite',
      './storiesOptions',
      './Stack',
      './Sample',
    ])
    expect(parsed.imports[0].typeOnly).toBe(true)
    expect(parsed.imports[0].bindings).toEqual(['Meta', 'StoryObj'])
    expect(parsed.imports[1].namedBindings).toEqual([
      { imported: 'sampleSizeTokens', local: 'sampleSizeTokens' },
    ])
  })

  it('reads the component name from the meta type annotation', () => {
    expect(parsed.componentName).toBe('Sample')
  })

  it('collects top-level helper declarations with their leading comments', () => {
    expect(parsed.declarations.map((declaration) => declaration.names)).toEqual([
      ['items'],
      ['noun'],
      ['label'],
    ])
    expect(parsed.declarations[0].text).toContain('// Shared children')
    expect(parsed.declarations[0].text).toContain('const items = [')
  })

  it('collects every story export', () => {
    expect([...parsed.stories.keys()]).toEqual([
      'Default',
      'Grouped',
      'Sizes',
      'Destructured',
      'Block',
      'Decorated',
      'Composed',
    ])
  })

  it('reads an args-driven story as having no render body', () => {
    const story = parsed.stories.get('Default')!
    expect(story.renderBody).toBeUndefined()
    expect(story.renderParamKind).toBe('none')
    expect(story.hasDecorators).toBe(false)
    expect(story.text).toContain("size: 'md'")
  })

  it('reads a render(args) story as an expression body with the param name', () => {
    const story = parsed.stories.get('Grouped')!
    expect(story.renderBody).toBe('<Sample {...args}>{items}</Sample>')
    expect(story.renderParamKind).toBe('args')
    expect(story.renderParamText).toBe('args')
    expect(story.isBlockBody).toBe(false)
  })

  it('reads a parenthesized render body dedented, apostrophes intact', () => {
    const story = parsed.stories.get('Sizes')!
    expect(story.renderParamKind).toBe('none')
    expect(story.renderBody).toContain("Don't stop, {size}")
    expect(story.renderBody!.startsWith('<Stack aria-label={label}>')).toBe(true)
    expect(story.renderBody!.endsWith('</Stack>')).toBe(true)
  })

  it('reads a destructured render param as a pattern', () => {
    const story = parsed.stories.get('Destructured')!
    expect(story.renderParamKind).toBe('pattern')
    expect(story.renderParamText).toBe('{ disabled }')
  })

  it('reads a block render body', () => {
    const story = parsed.stories.get('Block')!
    expect(story.isBlockBody).toBe(true)
    expect(story.renderBody).toBe("const heading = 'block'\nreturn <Sample>{heading}</Sample>")
  })

  it('flags stories with decorators', () => {
    expect(parsed.stories.get('Decorated')!.hasDecorators).toBe(true)
  })

  it('parses default, namespace, renamed, inline-type, and side-effect imports', () => {
    const module = [
      "import './globals.css'",
      "import React from 'react'",
      "import * as tokens from './tokens'",
      "import { a as b, type Skipped, c, } from './helpers'",
      'const meta: Meta<typeof Sample> = { component: Sample }',
      'export default meta',
    ].join('\n')
    const { imports } = parseStoriesSource(module)
    expect(imports[0]).toMatchObject({ specifier: './globals.css', bindings: [] })
    expect(imports[1]).toMatchObject({ specifier: 'react', defaultBinding: 'React' })
    expect(imports[2]).toMatchObject({ specifier: './tokens', namespaceBinding: 'tokens' })
    expect(imports[3].namedBindings).toEqual([
      { imported: 'a', local: 'b' },
      { imported: 'Skipped', local: 'Skipped' },
      { imported: 'c', local: 'c' },
    ])
  })

  it('falls back to the meta component property without a Meta annotation', () => {
    const module = 'const meta = { component: Widget }\nexport default meta'
    expect(parseStoriesSource(module).componentName).toBe('Widget')
  })

  it('throws when the meta declaration is missing or unreadable', () => {
    expect(() => parseStoriesSource('export default {}')).toThrow(/could not find the CSF meta/)
    expect(() => parseStoriesSource('const meta = { title: 1 }')).toThrow(
      /could not determine the component/
    )
  })

  it('throws on an unreadable import statement', () => {
    expect(() => parseStoriesSource('import !!\nconst meta = { component: X }')).toThrow(
      /import specifier/
    )
  })

  it('keeps commas inside unparenthesized JSX text out of the property scan', () => {
    const module = [
      'const meta: Meta<typeof I> = { component: I }',
      'export const S: Story = {',
      '  render: () => <i>a, b</i>,',
      '  parameters: { layout: 1 },',
      '}',
    ].join('\n')
    expect(parseStoriesSource(module).stories.get('S')!.renderBody).toBe('<i>a, b</i>')
  })

  it('reads quoted property keys in a story initializer', () => {
    const module = [
      'const meta: Meta<typeof I> = { component: I }',
      "export const S: Story = { 'name': 'Fancy name', render: () => <i /> }",
    ].join('\n')
    expect(parseStoriesSource(module).stories.get('S')!.renderBody).toBe('<i />')
  })

  it('strips type annotations from render params and reads bare params', () => {
    const module = [
      'const meta: Meta<typeof I> = { component: I }',
      'export const Typed: Story = { render: (args: SomeProps) => <i {...args} /> }',
      'export const Bare: Story = { render: args => <i {...args} /> }',
    ].join('\n')
    const { stories } = parseStoriesSource(module)
    expect(stories.get('Typed')!).toMatchObject({
      renderParamKind: 'args',
      renderParamText: 'args',
    })
    expect(stories.get('Bare')!).toMatchObject({ renderParamKind: 'args', renderParamText: 'args' })
  })

  it('throws when a render value is not an arrow function', () => {
    const module = [
      'const meta: Meta<typeof I> = { component: I }',
      'export const S: Story = { render: sharedRender }',
    ].join('\n')
    expect(() => parseStoriesSource(module)).toThrow(/expected an arrow function/)
  })

  it('throws on an unreadable property key', () => {
    const module = [
      'const meta: Meta<typeof I> = { component: I }',
      'export const S: Story = { 1 + 1 }',
    ].join('\n')
    expect(() => parseStoriesSource(module)).toThrow(/property key/)
  })

  it('inherits the render of a story composed by spread', () => {
    const composed = parsed.stories.get('Composed')!
    const base = parsed.stories.get('Grouped')!
    expect(composed.renderBody).toBe(base.renderBody)
    expect(composed.renderParamKind).toBe('args')
    expect(composed.renderParamText).toBe('args')
  })

  it('lets an own render win over the spread base, and carries its decorators', () => {
    const module = [
      'const meta: Meta<typeof I> = { component: I }',
      'export const Base: Story = { decorators: [d], render: () => <i>base</i> }',
      'export const Own: Story = { ...Base, render: () => <i>own</i> }',
      'export const Inherited: Story = { ...Base, args: { a: 1 } }',
      // An unknown spread target leaves the story render-less rather than throwing.
      'export const Unknown: Story = { ...Elsewhere }',
    ].join('\n')
    const { stories } = parseStoriesSource(module)
    expect(stories.get('Own')!.renderBody).toBe('<i>own</i>')
    expect(stories.get('Inherited')!.renderBody).toBe('<i>base</i>')
    expect(stories.get('Inherited')!.hasDecorators).toBe(true)
    expect(stories.get('Unknown')!.renderBody).toBeUndefined()
    expect(stories.get('Unknown')!.hasDecorators).toBe(false)
  })

  it('reads back-to-back spreads, the last resolvable one winning', () => {
    const module = [
      'const meta: Meta<typeof I> = { component: I }',
      'export const Base: Story = { render: () => <i>base</i> }',
      'export const Two: Story = { ...Other, ...Base }',
    ].join('\n')
    expect(parseStoriesSource(module).stories.get('Two')!.renderBody).toBe('<i>base</i>')
  })

  it('throws on an unbalanced story initializer', () => {
    const module = [
      'const meta: Meta<typeof I> = { component: I }',
      'export const S: Story = { render: () => <i />',
    ].join('\n')
    expect(() => parseStoriesSource(module)).toThrow(/Unbalanced/)
  })

  it('treats indented and column-zero continuations as one statement', () => {
    const module = [
      'const joined =',
      "'a' +",
      '  1',
      'const meta: Meta<typeof I> = { component: I }',
    ].join('\n')
    const { declarations } = parseStoriesSource(module)
    expect(declarations).toHaveLength(1)
    expect(declarations[0].text).toBe("const joined =\n'a' +\n  1")
  })

  it('collects function declarations and ignores loose statements', () => {
    const module = [
      "console.log('ignored')",
      'function makeLabel() {',
      "  return 'label'",
      '}',
      'const meta: Meta<typeof I> = { component: I }',
    ].join('\n')
    const { declarations } = parseStoriesSource(module)
    expect(declarations.map((declaration) => declaration.names)).toEqual([['makeLabel']])
  })

  it('normalizes CRLF sources', () => {
    const module = 'const meta: Meta<typeof I> = { component: I }\r\nexport const S: Story = {}\r\n'
    expect([...parseStoriesSource(module).stories.keys()]).toEqual(['S'])
  })

  it('reads the default binding when the specifier itself contains "from"', () => {
    const source = [
      "import Sample from './fromNow'",
      '',
      'const meta: Meta<typeof Sample> = {',
      "  title: 'Fixtures/Sample',",
      '  component: Sample,',
      '}',
      'export default meta',
      '',
      'export const Default: StoryObj<typeof Sample> = { args: {} }',
    ].join('\n')
    const module_ = parseStoriesSource(source)
    expect(module_.imports[0].specifier).toBe('./fromNow')
    expect(module_.imports[0].defaultBinding).toBe('Sample')
    expect(module_.imports[0].bindings).toEqual(['Sample'])
  })

  it('finds the render arrow past a comment that looks like one', () => {
    const source = sampleRaw.replace('render: (args) =>', 'render: (args) /* => */ =>')
    const story = parseStoriesSource(source).stories.get('Grouped')!
    expect(story.renderBody).toBe('<Sample {...args}>{items}</Sample>')
    expect(story.renderParamKind).toBe('args')
  })

  it('parses a module whose top-level helper holds a regex literal', () => {
    const source = sampleRaw.replace('const items = ', 'const brace = /}/\nconst items = ')
    const parsed = parseStoriesSource(source)
    expect(parsed.componentName).toBe('Sample')
    expect([...parsed.stories.keys()]).toContain('Grouped')
  })
})
