import type { JsonObject } from '../types'

const getCommonRef = (name: string): JsonObject => ({ $ref: `common_types.json#/$defs/${name}` })

const DYNAMIC_STRING = getCommonRef('DynamicString')
const DYNAMIC_NUMBER = getCommonRef('DynamicNumber')
const DYNAMIC_BOOLEAN = getCommonRef('DynamicBoolean')
const DYNAMIC_VALUE = getCommonRef('DynamicValue')
const CHILD = getCommonRef('Child')

/**
 * Picks one child by a bound value. A2UI v1.0 has no conditional rendering of its own, so a
 * loading state, an empty list or a signed-out view is this component in the catalog.
 *
 * The first case whose `when` equals the resolved value renders. No match renders `otherwise`,
 * and with no `otherwise` nothing renders. The `cases` array follows the basic catalog's `Tabs`,
 * which also keeps child ids inside an array of objects.
 */
export const WHEN: JsonObject = {
  type: 'object',
  description:
    'Renders one child chosen by a value. The first case whose `when` equals the resolved `value` wins; when none does, `otherwise` renders, and without `otherwise` nothing does. Bind `value` to a resource status (`/resources/<name>/status`: idle, pending, error or ready) to show a skeleton, an error and the content.',
  properties: {
    component: { const: 'When' },
    value: { ...DYNAMIC_VALUE, description: 'The value the cases are compared with.' },
    cases: {
      type: 'array',
      description: 'The candidates, tried in order.',
      minItems: 1,
      items: {
        type: 'object',
        properties: {
          when: {
            type: ['string', 'number', 'boolean'],
            description: 'The literal `value` must equal for this case to render.',
          },
          child: { ...CHILD, description: 'The component this case renders.' },
        },
        required: ['when', 'child'],
        additionalProperties: false,
      },
    },
    otherwise: { ...CHILD, description: 'The component rendered when no case matches.' },
  },
  required: ['component', 'value', 'cases'],
}

const defineFunction = (
  name: string,
  description: string,
  returnType: string,
  args: JsonObject,
  required: string[]
): JsonObject => ({
  type: 'object',
  description,
  returnType,
  properties: {
    '@call': { const: name },
    args: { type: 'object', properties: args, required, unevaluatedProperties: false },
  },
  required: ['@call', 'args'],
})

/**
 * The functions every catalog composed here carries. `formatDate` and `formatString` are not
 * among them: they belong to the A2UI basic catalog and are called with its `catalogId`.
 */
export const CORE_FUNCTIONS: Record<string, JsonObject> = {
  setValue: defineFunction(
    'setValue',
    'Writes `value` to the data model at the JSON Pointer `path`.',
    'void',
    { path: { type: 'string' }, value: DYNAMIC_VALUE },
    ['path', 'value']
  ),
  lookup: defineFunction(
    'lookup',
    'Returns `map[key]`, or `fallback` when the key is absent.',
    'any',
    {
      key: DYNAMIC_STRING,
      map: { type: 'object', additionalProperties: DYNAMIC_VALUE },
      fallback: DYNAMIC_VALUE,
    },
    ['key', 'map']
  ),
  sumField: defineFunction(
    'sumField',
    'Sums `field` over the values of an object or the items of an array.',
    'number',
    { object: DYNAMIC_VALUE, field: { type: 'string' } },
    ['object', 'field']
  ),
  divide: defineFunction(
    'divide',
    'Returns `a` divided by `b`.',
    'number',
    { a: DYNAMIC_NUMBER, b: DYNAMIC_NUMBER },
    ['a', 'b']
  ),
  round: defineFunction(
    'round',
    'Rounds to the nearest integer.',
    'number',
    { value: DYNAMIC_NUMBER },
    ['value']
  ),
  ceil: defineFunction(
    'ceil',
    'Rounds up to the next integer.',
    'number',
    { value: DYNAMIC_NUMBER },
    ['value']
  ),
  max: defineFunction(
    'max',
    'Returns the larger of `a` and `b`.',
    'number',
    { a: DYNAMIC_NUMBER, b: DYNAMIC_NUMBER },
    ['a', 'b']
  ),
  select: defineFunction(
    'select',
    'Returns `ifTrue` when `condition` is true, otherwise `ifFalse`.',
    'any',
    { condition: DYNAMIC_BOOLEAN, ifTrue: DYNAMIC_VALUE, ifFalse: DYNAMIC_VALUE },
    ['condition', 'ifTrue', 'ifFalse']
  ),
}

/** The components every catalog composed here carries. */
export const CORE_COMPONENTS: Record<string, JsonObject> = { When: WHEN }
