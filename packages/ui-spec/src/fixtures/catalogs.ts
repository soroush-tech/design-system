import basicCatalog from '../../vendor/a2ui/v1_0/catalogs/basic/catalog.json'
import type { Catalog } from '../catalog/catalogRules'
import { composeCatalog } from '../core/composeCatalog'
import type { JsonObject } from '../types'

// Small hand-written catalogs for the tests. The real ones are generated per app, outside this
// package; these only have to look like them: every prop takes its literal form, a binding or a
// function call, and token props are enumerations.

export const DESIGN_SYSTEM_ID = 'https://soroush.tech/ui-spec/fixtures/design-system.json'
export const APP_ID = 'https://soroush.tech/ui-spec/fixtures/app.json'
export const BASIC_ID = basicCatalog.catalogId

const common = (name: string): JsonObject => ({ $ref: `common_types.json#/$defs/${name}` })

/** A generated prop: its literal form, or one of the two ways to be dynamic. */
export const prop = (literal: JsonObject): JsonObject => ({
  anyOf: [literal, common('DataBinding'), common('FunctionCall')],
})

/** A token prop that also takes one value per breakpoint. */
const responsive = (values: unknown[]): JsonObject =>
  prop({ anyOf: [{ enum: values }, { type: 'array', items: { enum: values } }] })

const component = (
  name: string,
  properties: JsonObject,
  required: string[] = [],
  rest: JsonObject = {}
): JsonObject => ({
  type: 'object',
  properties: { component: { const: name }, ...properties },
  required: ['component', ...required],
  ...rest,
})

const SPACE = [0, 0.5, 1, 1.5, 2, 3, 4]
const PALETTE = ['default', 'primary', 'secondary', 'error']
const TEXT = ['primary', 'secondary', 'disabled']

export const designSystemCatalog = composeCatalog({
  catalogId: DESIGN_SYSTEM_ID,
  title: 'Design system (fixture)',
  components: {
    View: component('View', {
      children: common('ChildList'),
      as: prop({ type: 'string' }),
      maxWidth: prop({ type: 'string' }),
      p: responsive(SPACE),
      bg: prop({ enum: ['default', 'paper', 'primary'] }),
    }),
    Flex: component('Flex', {
      children: common('ChildList'),
      flexDirection: responsive(['row', 'column']),
      gap: responsive(SPACE),
    }),
    Card: component('Card', {
      children: common('ChildList'),
      variant: prop({ enum: ['outlined'] }),
    }),
    Typography: component(
      'Typography',
      {
        text: common('DynamicString'),
        variant: prop({ enum: ['h1', 'h3', 'body1', 'caption'] }),
        color: prop({ enum: TEXT }),
      },
      ['text']
    ),
    Link: component('Link', { href: prop({ type: 'string' }), child: common('Child') }, [
      'href',
      'child',
    ]),
    Avatar: component('Avatar', {
      src: prop({ type: 'string' }),
      alt: prop({ type: 'string' }),
      size: prop({ enum: ['sm', 'md', 'lg'] }),
    }),
    Icon: component('Icon', { name: prop({ type: 'string' }) }, ['name']),
    Skeleton: component('Skeleton', { height: prop({ type: 'number' }) }),
    Button: component(
      'Button',
      {
        child: common('Child'),
        variant: prop({ enum: ['contained', 'outlined', 'text'] }),
        color: prop({ enum: PALETTE }),
        disabled: prop({ type: 'boolean' }),
        onClick: common('Action'),
      },
      ['child'],
      {
        metadata: {
          extensions: {
            tech_soroush_theme: {
              props: { variant: { variants: 'Button' }, color: { scale: 'palette' } },
            },
          },
        },
      }
    ),
    Switch: component('Switch', { checked: prop({ type: 'boolean' }) }),
    TextInput: component('TextInput', {
      value: prop({ type: 'string' }),
      label: prop({ type: 'string' }),
      multiline: prop({ type: 'boolean' }),
    }),
    // The parts of a table only make sense inside each other: A2UI's composition constraints.
    Table: component('Table', { children: common('ChildList') }, [], {
      allowedChildren: ['TableRow'],
    }),
    TableRow: component('TableRow', { children: common('ChildList') }, [], {
      allowedParents: ['Table'],
    }),
  },
}) as Catalog

export const appCatalog = composeCatalog({
  catalogId: APP_ID,
  title: 'App (fixture)',
  components: {
    PageHeader: component('PageHeader', { title: common('DynamicString') }, ['title'], {
      allowedParents: ['Surface', 'View'],
    }),
  },
  functions: {
    initials: {
      type: 'object',
      description: 'The initials of a name.',
      returnType: 'string',
      properties: {
        '@call': { const: 'initials' },
        args: {
          type: 'object',
          properties: { name: common('DynamicString') },
          required: ['name'],
          unevaluatedProperties: false,
        },
      },
      required: ['@call', 'args'],
    },
  },
}) as Catalog

/** Every catalog the fixtures name, the way a caller would supply them. */
export const CATALOGS = [designSystemCatalog, appCatalog, basicCatalog as unknown as Catalog]
