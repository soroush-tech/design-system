# `@soroush.tech/ui-spec`

Conventions for working in this package. Read [`packages.md`](../packages.md) first, and the
[README](./README.md) for what the package does.

## What this package may know

It validates catalogs, surfaces and behavior documents. It does not read component types and
does not depend on `@soroush.tech/design-system`. A catalog is generated elsewhere, per app,
against that app's theme, and handed in. Keep it that way: a dependency on the design system
would tie the spec to one release of it, and the tests would stop being about the spec.

The fixtures in `src/fixtures/` are small hand-written catalogs and two pages. They only have to
look like generated ones.

## The vendored A2UI files are not edited

`vendor/a2ui/v1_0/` is a byte-for-byte copy of files from the A2UI repository, under the Apache
License 2.0. `vendor/a2ui/v1_0/SOURCE.md` says where each came from and how to refresh them.
`src/schema/vendored.test.ts` fails when a file no longer matches its checksum, and the root
`.oxfmtrc.json` keeps the formatter out of the folder.

The license allows changing them. This package does not, so that what it validates stays valid
A2UI v1.0. When a test fails because of something in a vendored file, the fix is outside it.

## One module names the engine

`src/schema/schemaSet.ts` is the only file that imports `ajv`. Everything else asks it to check
a value and gets issues back.

`ajv` was chosen by measurement: it agrees with all 156 conformance cases the A2UI specification
ships, and `schemaSet.test.ts` runs them through the shipped module. `@cfworker/json-schema` was
measured too, because it runs on Cloudflare Workers where `ajv` cannot compile. It got 92 of
the 156 wrong, every one an unresolved `$ref`: 86 into `#/components/...` and `#/functions/...`,
which it does not index because they are not schema keywords, and 6 to the draft meta-schema it
does not bundle. It gave no wrong verdict where the reference resolved. Moving to it is a matter
of registering those references, in this one file.

## How a catalog is addressed

The A2UI schemas reach "the catalog" at one fixed address, `catalog.json` beside them, and a
catalog reaches the common types as `common_types.json`, both relative. So a catalog is
registered under an alias in the A2UI folder, not under its own `$id`.

That address holds one catalog while a surface may mix several. So the envelope is checked
against a stand-in that accepts any component and any call by shape (`stubCatalog.ts`), and each
component and each call is then checked against the catalog it resolves to: its own `catalogId`,
then the surface default.

## Findings

Validators return findings and never throw. `FindingCode` in `src/findings.ts` is a closed set:
a repair loop keys on the code. A new kind of mistake is a new member there, with a row in the
README table and a test that produces it.

A validator that fails its first check stops: a catalog that fails the meta-schema, a message
that fails the envelope, a document that fails the behavior schema. The later checks read shapes
the first one guarantees.

A finding should name the cause once. A component that cannot be read is reported for that, and
the components it would have led to are not reported as orphans on top.

## A name from a document is looked up as an own key

The documents validated here are JSON written by an agent, where `toString`, `constructor` and
`__proto__` are names like any other. Indexing an object, or asking with `in`, also answers for
what it inherits. That made `{"@call": "toString"}` a function the catalog seemed to have, and
let an `updateDataModel` at `/__proto__/polluted` write to `Object.prototype` for the whole
process.

So every lookup by a name that came from a document goes through `getOwn` or `Object.hasOwn`,
and every write through `setOwn` (`src/types.ts`). A fixed key the code itself names, such as
`schema.properties`, needs neither. `src/ownKeys.test.ts` holds one case per place this
mattered; a new lookup by a document's name gets a case there.

## Paths that cannot be checked

`lookUp` in `src/surface/pointer.ts` answers `found`, `missing` or `unknowable`. Below an empty
list or a `null` nothing can be known, because the data arrives later, and only `missing` is a
finding. A behavior document's promises are written into the data model as `null` before a
surface is checked (`src/behavior/dataModel.ts`).

## Coverage

`thresholds: { 100: true }` covers branches too. Write the test that produces each branch, or
remove the branch. No ignore pragmas.
