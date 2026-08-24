import { describe, it, expect } from 'vitest'
import sampleRaw from './__fixtures__/Sample.stories.tsx?raw'
import { buildDemoModule } from './buildDemoModule'
import { parseStoriesSource } from './parseStoriesSource'

const PKG = '@soroush.tech/design-system'
const parsed = parseStoriesSource(sampleRaw)

describe('buildDemoModule', () => {
  it('throws on an unknown story, listing the known ones', () => {
    expect(() =>
      buildDemoModule({ parsed, storyName: 'Nope', args: {}, packageName: PKG })
    ).toThrow(/Unknown story "Nope" - this module exports: Default, Grouped/)
  })

  it('synthesizes an args-driven story as a JSX element', () => {
    const demo = buildDemoModule({
      parsed,
      storyName: 'Default',
      args: { children: 'Sample', size: 'md', 'aria-label': 'A sample', onClick: () => {} },
      include: ['children', 'size', 'disabled'],
      packageName: PKG,
    })
    expect(demo.preview).toBe('<Sample size="md" aria-label="A sample">Sample</Sample>')
    expect(demo.full).toBe(
      [
        "import { Sample } from '@soroush.tech/design-system/Sample'",
        '',
        'export default function Demo() {',
        '  return (',
        '    <Sample size="md" aria-label="A sample">Sample</Sample>',
        '  )',
        '}',
        '',
      ].join('\n')
    )
  })

  it('keeps the render body and pulls the transitive helper closure', () => {
    const demo = buildDemoModule({ parsed, storyName: 'Sizes', args: {}, packageName: PKG })
    expect(demo.full).toBe(
      [
        "import { Stack } from '@soroush.tech/design-system/Stack'",
        "import { Sample } from '@soroush.tech/design-system/Sample'",
        '',
        "const noun = 'group'",
        '',
        'const label = `sample ${noun}`',
        '',
        'export default function Demo() {',
        '  return (',
        '    <Stack aria-label={label}>',
        "      {(['sm', 'md'] as const).map((size) => (",
        '        <Sample key={size} size={size}>',
        "          Don't stop, {size}",
        '        </Sample>',
        '      ))}',
        '    </Stack>',
        '  )',
        '}',
        '',
      ].join('\n')
    )
    expect(demo.preview.startsWith('<Stack aria-label={label}>')).toBe(true)
    expect(demo.preview).not.toContain('import')
    expect(demo.previewParts).toEqual([demo.preview])
  })

  it('writes a const for the render args param, keeping helper comments', () => {
    const demo = buildDemoModule({
      parsed,
      storyName: 'Grouped',
      args: { 'aria-label': 'A sample', size: 'sm' },
      include: ['size'],
      packageName: PKG,
    })
    expect(demo.preview).toBe(
      "const args: Partial<SampleProps> = { size: 'sm', 'aria-label': 'A sample' }\n\n<Sample {...args}>{items}</Sample>"
    )
    // Each part parses on its own - consumers transpile them separately.
    expect(demo.previewParts).toEqual([
      "const args: Partial<SampleProps> = { size: 'sm', 'aria-label': 'A sample' }",
      '<Sample {...args}>{items}</Sample>',
    ])
    expect(demo.full).toBe(
      [
        "import { Stack } from '@soroush.tech/design-system/Stack'",
        "import { Sample, type SampleProps } from '@soroush.tech/design-system/Sample'",
        '',
        '// Shared children - kept top-level so stories stay terse.',
        'const items = [<Stack key="one">One</Stack>, <Stack key="two">Two</Stack>]',
        '',
        'export default function Demo() {',
        "  const args: Partial<SampleProps> = { size: 'sm', 'aria-label': 'A sample' }",
        '  return (',
        '    <Sample {...args}>{items}</Sample>',
        '  )',
        '}',
        '',
      ].join('\n')
    )
  })

  it('destructures the serialized args for pattern params', () => {
    const demo = buildDemoModule({
      parsed,
      storyName: 'Destructured',
      args: { disabled: true },
      include: ['disabled'],
      packageName: PKG,
    })
    expect(demo.preview).toBe(
      'const { disabled }: Partial<SampleProps> = { disabled: true }\n\n<Sample disabled={disabled}>Pattern</Sample>'
    )
  })

  it('inlines a block render body without a synthetic return', () => {
    const demo = buildDemoModule({ parsed, storyName: 'Block', args: {}, packageName: PKG })
    expect(demo.full).toBe(
      [
        "import { Sample } from '@soroush.tech/design-system/Sample'",
        '',
        'export default function Demo() {',
        "  const heading = 'block'",
        '  return <Sample>{heading}</Sample>',
        '}',
        '',
      ].join('\n')
    )
  })

  it('rewrites utils and nested relative specifiers, keeping externals', () => {
    const module = [
      "import { css } from '@emotion/css'",
      "import { m } from '../utils/test/storiesArgs'",
      "import { baseTheme } from '../theme/themes'",
      "import { Chip } from './Chip'",
      'const meta: Meta<typeof Chip> = { component: Chip }',
      'export const S: Story = {',
      '  render: () => <Chip className={css({ color: baseTheme.x })} m={m} />,',
      '}',
    ].join('\n')
    const demo = buildDemoModule({
      parsed: parseStoriesSource(module),
      storyName: 'S',
      args: {},
      packageName: PKG,
    })
    expect(demo.full).toContain("import { css } from '@emotion/css'")
    expect(demo.full).toContain(
      "import { m } from '@soroush.tech/design-system/utils/test/storiesArgs'"
    )
    expect(demo.full).toContain("import { baseTheme } from '@soroush.tech/design-system/theme'")
    expect(demo.full).toContain("import { Chip } from '@soroush.tech/design-system/Chip'")
  })

  it('merges imports that rewrite to the same specifier', () => {
    const module = [
      "import { TableCell } from './TableCell'",
      "import TableRow from '../Table/TableRow'",
      "import * as tokens from '../Table/tokens'",
      'const meta: Meta<typeof TableCell> = { component: TableCell }',
      'export const S: Story = {',
      '  render: () => <TableRow>{tokens.x}<TableCell /></TableRow>,',
      '}',
    ].join('\n')
    const demo = buildDemoModule({
      parsed: parseStoriesSource(module),
      storyName: 'S',
      args: {},
      packageName: PKG,
    })
    expect(demo.full).toContain(
      "import TableRow, * as tokens from '@soroush.tech/design-system/Table'"
    )
    expect(demo.full).toContain("import { TableCell } from '@soroush.tech/design-system/TableCell'")
  })

  it('prints renamed imports and args consts inside block bodies', () => {
    const module = [
      "import { Chip as Tag } from './Chip'",
      'const meta: Meta<typeof Tag> = { component: Tag }',
      'export const S: Story = {',
      '  render: (args) => {',
      '    return <Tag {...args} />',
      '  },',
      '}',
    ].join('\n')
    const demo = buildDemoModule({
      parsed: parseStoriesSource(module),
      storyName: 'S',
      args: { size: 'sm' },
      include: ['size'],
      packageName: PKG,
    })
    expect(demo.full).toBe(
      [
        "import { Chip as Tag } from '@soroush.tech/design-system/Chip'",
        '',
        'export default function Demo() {',
        "  const args = { size: 'sm' }",
        '  return <Tag {...args} />',
        '}',
        '',
      ].join('\n')
    )
  })

  it('omits the import section when the body uses no imports', () => {
    const module = [
      'const meta: Meta<typeof Box> = { component: Box }',
      'export const Plain: Story = { render: () => <div>hi</div> }',
    ].join('\n')
    const demo = buildDemoModule({
      parsed: parseStoriesSource(module),
      storyName: 'Plain',
      args: {},
      packageName: PKG,
    })
    expect(demo.full).toBe(
      ['export default function Demo() {', '  return (', '    <div>hi</div>', '  )', '}', ''].join(
        '\n'
      )
    )
  })

  it('maps a directory-relative import to the package root', () => {
    // The repo's own barrel idiom: `from '.'` rather than `from './Sample'`.
    const demoImporting = (original: string, specifier: string, storyName: string) =>
      buildDemoModule({
        parsed: parseStoriesSource(sampleRaw.replace(`from '${original}'`, `from '${specifier}'`)),
        storyName,
        args: { children: 'Sample' },
        include: ['children'],
        packageName: PKG,
      }).full

    for (const specifier of ['.', '..']) {
      expect(demoImporting('./Sample', specifier, 'Default')).toContain(
        `import { Sample } from '${PKG}'`
      )
    }
    // './' strips to an empty subpath - a separate guard from the dot-only case.
    const sizes = demoImporting('./Stack', './', 'Sizes')
    expect(sizes).toContain(`import { Stack } from '${PKG}'`)
    expect(sizes).not.toContain(`${PKG}/'`)
    expect(sizes).not.toContain(`${PKG}/.`)
  })
})
