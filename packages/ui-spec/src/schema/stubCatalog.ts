import { aliasCatalog } from './schemaSet'

/**
 * A stand-in for the active catalog that accepts any component and any function call by shape.
 *
 * The A2UI schemas reach "the catalog" at one fixed address, which holds a single catalog, while a
 * surface may mix several. So the envelope is checked against this stand-in for its own shape, and
 * each component and each function call is then checked against the catalog it resolves to
 * (`validateSurface.ts`).
 *
 * A call named with a leading `@` is left to the protocol's own `@index`: catalogs may not define
 * one, and accepting it here would make `@index` match both branches of the `FunctionCall` union.
 */
export const STUB_CATALOG = aliasCatalog({
  catalogId: 'stub',
  $defs: {
    anyComponent: {
      type: 'object',
      properties: { component: { type: 'string' } },
      required: ['component'],
      additionalProperties: true,
    },
    anyFunction: {
      type: 'object',
      properties: { '@call': { type: 'string', pattern: '^[^@]' } },
      required: ['@call'],
      additionalProperties: true,
    },
  },
})
