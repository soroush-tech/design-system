import type { Finding } from '../findings'
import { A2UI_BASE, createSchemaSet } from '../schema/schemaSet'
import { STUB_CATALOG } from '../schema/stubCatalog'
import { checkTheme } from '../theme/theme'
import { type Catalog, checkCatalogRules } from './catalogRules'

const schemas = createSchemaSet(STUB_CATALOG)

/** A catalog is addressed by its `catalogId`, and declares the protocol version it is written for. */
const checkIdentity = ({ $id, catalogId, protocolVersion }: Catalog): Finding[] => {
  const findings: Finding[] = []
  if ($id !== catalogId) {
    findings.push({
      code: 'catalog-id',
      path: '/$id',
      message: `\`$id\` must equal \`catalogId\` ("${catalogId}").`,
    })
  }
  if (protocolVersion !== '1.0') {
    findings.push({
      code: 'catalog-version',
      path: '/protocolVersion',
      message: '`protocolVersion` must be "1.0".',
    })
  }
  return findings
}

/**
 * Everything wrong with a catalog: first the A2UI meta-schema, then the rules it cannot express.
 *
 * A catalog that fails the meta-schema is reported for that alone. The rules read shapes the
 * meta-schema guarantees, and findings built on a broken shape would mislead.
 */
export const validateCatalog = (catalog: unknown): Finding[] => {
  const issues = schemas.check(`${A2UI_BASE}catalog_definition.json`, catalog)
  if (issues.length > 0) {
    return issues.map((issue) => ({ code: 'catalog-schema', ...issue }))
  }
  const document = catalog as Catalog
  return [
    ...checkIdentity(document),
    ...checkCatalogRules(document),
    ...checkTheme(document, schemas),
  ]
}
