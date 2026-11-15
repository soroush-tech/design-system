// @vitest-environment node
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { findTemplatesRoot, isConditionMet, readLayers, renderTemplate } from './template'

const FLAGS = new Set(['isomorphic', 'msw', 'tanstack-query', 'ts'])

describe('isConditionMet', () => {
  it('reads names, !, && and ||, with && before ||, and parentheses', () => {
    expect(isConditionMet('msw', FLAGS)).toBe(true)
    expect(isConditionMet('swr', FLAGS)).toBe(false)
    expect(isConditionMet('!swr', FLAGS)).toBe(true)
    expect(isConditionMet('!!msw', FLAGS)).toBe(true)
    expect(isConditionMet('msw && tanstack-query', FLAGS)).toBe(true)
    expect(isConditionMet('msw && swr', FLAGS)).toBe(false)
    expect(isConditionMet('swr || msw', FLAGS)).toBe(true)
    expect(isConditionMet('swr || ssg', FLAGS)).toBe(false)
    expect(isConditionMet('swr && ssg || msw', FLAGS)).toBe(true)
    expect(isConditionMet('!(swr || ssg) && ts', FLAGS)).toBe(true)
  })

  it('refuses a condition it cannot read', () => {
    expect(() => isConditionMet('msw + swr', FLAGS)).toThrow('holds something other than names')
    expect(() => isConditionMet('(msw', FLAGS)).toThrow('leaves a ( open')
    expect(() => isConditionMet('msw &&', FLAGS)).toThrow('lacks a name where it has none')
    expect(() => isConditionMet('&& msw', FLAGS)).toThrow('lacks a name where it has &&')
    expect(() => isConditionMet('msw swr', FLAGS)).toThrow('goes on after its end')
    expect(() => isConditionMet('', FLAGS)).toThrow('lacks a name')
  })
})

describe('renderTemplate', () => {
  it('keeps the lines whose condition holds, in each comment style, and drops the markers', () => {
    const source = [
      'first',
      '// @if msw',
      'msw',
      '// @elif swr',
      'swr',
      '// @else',
      'neither',
      '// @endif',
      '  {/* @if !msw */}',
      '  no msw',
      '  {/* @endif */}',
      '<!-- @if ts -->',
      'ts',
      '<!-- @endif -->',
      'last',
    ].join('\n')
    expect(renderTemplate(source, FLAGS, {})).toBe('first\nmsw\nts\nlast')
    expect(renderTemplate(source, new Set(['swr']), {})).toBe('first\nswr\n  no msw\nlast')
    expect(renderTemplate(source, new Set(), {})).toBe('first\nneither\n  no msw\nlast')
  })

  it('keeps a nested block only while every block around it is kept', () => {
    const source = '// @if msw\na\n// @if swr\nb\n// @else\nc\n// @endif\n// @endif\nd'
    expect(renderTemplate(source, FLAGS, {})).toBe('a\nc\nd')
    expect(renderTemplate(source, new Set(['swr']), {})).toBe('d')
  })

  it('takes the first branch that holds, and no later one', () => {
    const source = '// @if msw\na\n// @elif ts\nb\n// @else\nc\n// @endif'
    expect(renderTemplate(source, FLAGS, {})).toBe('a')
    expect(renderTemplate(source, new Set(['ts']), {})).toBe('b')
  })

  it('replaces every placeholder, and drops a file left empty', () => {
    expect(renderTemplate('# __TITLE__ (__TITLE__)', FLAGS, { __TITLE__: 'Shop' })).toBe(
      '# Shop (Shop)'
    )
    expect(renderTemplate('// @if swr\nonly with SWR\n// @endif\n', FLAGS, {})).toBeUndefined()
  })

  it('refuses markers that do not pair up', () => {
    expect(() => renderTemplate('// @endif', FLAGS, {}, 'a.ts')).toThrow(
      'a.ts has an @endif with no @if'
    )
    expect(() => renderTemplate('// @else', FLAGS, {})).toThrow('the template has an @else')
    expect(() => renderTemplate('// @if msw\na', FLAGS, {})).toThrow('leaves an @if open')
  })
})

describe('readLayers', () => {
  it('lays each layer over the ones before it, renames dotfiles, and skips a missing one', () => {
    const root = mkdtempSync(join(tmpdir(), 'templates-'))
    mkdirSync(join(root, 'base/src/pages'), { recursive: true })
    writeFileSync(join(root, 'base/_gitignore'), 'dist/\n')
    writeFileSync(join(root, 'base/src/pages/a.ts'), 'base a')
    writeFileSync(join(root, 'base/src/pages/b.ts'), 'base b')
    mkdirSync(join(root, 'with/msw/src/pages'), { recursive: true })
    writeFileSync(join(root, 'with/msw/_env'), 'VITE_MSW=true\n')
    writeFileSync(join(root, 'with/msw/src/pages/b.ts'), 'msw b')
    const files = readLayers(root, ['base', 'spa', 'with/msw'])
    expect(Object.fromEntries(files)).toEqual({
      '.gitignore': 'dist/\n',
      'src/pages/a.ts': 'base a',
      'src/pages/b.ts': 'msw b',
      '.env': 'VITE_MSW=true\n',
    })
  })
})

describe('findTemplatesRoot', () => {
  it('finds the templates folder of this package, from below it, and says when there is none', () => {
    expect(findTemplatesRoot().replaceAll('\\', '/')).toMatch(/\/packages\/cli\/templates$/)
    expect(() => findTemplatesRoot(tmpdir())).toThrow('No templates folder above')
  })
})
