import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import basicCatalog from '../../vendor/a2ui/v1_0/catalogs/basic/catalog.json'
import testingCatalog from '../../vendor/a2ui/v1_0/test/testing_catalog.json'
import type { JsonObject } from '../types'
import { A2UI_BASE, aliasCatalog, createSchemaSet } from './schemaSet'

const CASES = fileURLToPath(new URL('../../vendor/a2ui/v1_0/test/cases/', import.meta.url))

interface Suite {
  schema: string
  catalog?: string
  tests: { description: string; valid: boolean; data: unknown }[]
}

const suites = readdirSync(CASES).map((file) => ({
  file,
  suite: JSON.parse(readFileSync(`${CASES}${file}`, 'utf8')) as Suite,
}))

describe("the specification's own conformance cases", () => {
  // The oracle for this module: the same cases, composed the same way, as the upstream runner
  // (specification/v1_0/test/run_tests.py). A suite names the catalog it runs against, or takes
  // the basic one.
  describe.each(suites)('$file', ({ suite }) => {
    const catalog = suite.catalog === undefined ? basicCatalog : testingCatalog
    const schemas = createSchemaSet(aliasCatalog(catalog as JsonObject))

    it.each(suite.tests)('$description', ({ valid, data }) => {
      const issues = schemas.check(`${A2UI_BASE}${suite.schema}`, data)

      expect(issues.length === 0).toBe(valid)
    })
  })

  it('runs every case there is', () => {
    expect(suites.flatMap(({ suite }) => suite.tests)).toHaveLength(156)
  })
})

describe('createSchemaSet', () => {
  const schemas = createSchemaSet(aliasCatalog(testingCatalog as JsonObject))
  const closed = {
    type: 'object',
    properties: { size: { enum: ['sm', 'md'] }, inner: { type: 'object', required: ['name'] } },
    required: ['size'],
    additionalProperties: false,
  }

  it('answers nothing for a value the schema accepts', () => {
    expect(schemas.check(closed, { size: 'sm' })).toEqual([])
  })

  it('names the property a required or closed-object keyword is about', () => {
    expect(schemas.check(closed, { extra: 1 })).toEqual([
      { path: '/size', message: "must have required property 'size'" },
      { path: '/extra', message: 'must NOT have additional properties' },
    ])
  })

  it('escapes a property name that holds a `/` or a `~`, so the path still leads to it', () => {
    expect(schemas.check(closed, { size: 'sm', 'a/b': 1, 'c~d': 2 })).toEqual([
      { path: '/a~1b', message: 'must NOT have additional properties' },
      { path: '/c~0d', message: 'must NOT have additional properties' },
    ])
  })

  it('lists the allowed values of an enumeration', () => {
    expect(schemas.check(closed, { size: 'xl' })).toEqual([
      { path: '/size', message: 'must be equal to one of the allowed values: sm, md' },
    ])
  })

  it('reports the deepest issue of a property, and one issue per property', () => {
    expect(schemas.check(closed, { size: 'xl', inner: {} })).toEqual([
      { path: '/size', message: 'must be equal to one of the allowed values: sm, md' },
      { path: '/inner/name', message: "must have required property 'name'" },
    ])
  })

  it('reports an issue with the value itself at the root', () => {
    expect(schemas.check(closed, 'text')).toEqual([{ path: '', message: 'must be object' }])
  })

  it('checks against a registered schema by address, compiled once', () => {
    schemas.add({ $id: 'https://example.test/size.json', enum: ['sm'] })

    expect(schemas.check('https://example.test/size.json', 'sm')).toEqual([])
    expect(schemas.check('https://example.test/size.json', 'lg')).toHaveLength(1)
  })
})
