import { validateBehavior } from '../behavior/validateBehavior'
import { validateCatalog } from '../catalog/validateCatalog'
import { validateSurface } from '../surface/validateSurface'
import { articlesBehavior, articlesSurface } from './articles'
import { appCatalog, CATALOGS, designSystemCatalog } from './catalogs'
import { contactBehavior, contactSurface } from './contact'

describe('the fixture catalogs', () => {
  it.each([
    ['design system', designSystemCatalog],
    ['app', appCatalog],
  ])('%s is a valid catalog', (_name, catalog) => {
    expect(validateCatalog(catalog)).toEqual([])
  })
})

describe.each([
  ['articles', articlesSurface, articlesBehavior],
  ['contact', contactSurface, contactBehavior],
])('the %s page', (_name, messages, behavior) => {
  it('is a valid surface, given the data its behavior promises', () => {
    expect(validateSurface(messages, { catalogs: CATALOGS, behavior })).toEqual([])
  })

  it('has a valid behavior document', () => {
    expect(validateBehavior(behavior, { messages, catalogs: CATALOGS })).toEqual([])
  })
})

describe('a surface without its behavior document', () => {
  it('reports the bindings that only the behavior makes good', () => {
    // The resource status, and the error the mutation writes, exist because the behavior says
    // so. Validated alone, the surface is bound to places its own data model does not have.
    const findings = validateSurface(contactSurface, { catalogs: CATALOGS })

    expect(findings.map(({ code, componentId }) => `${code} ${componentId}`)).toEqual([
      'unresolved-path submit_state',
      'unresolved-path failed',
    ])
  })
})
