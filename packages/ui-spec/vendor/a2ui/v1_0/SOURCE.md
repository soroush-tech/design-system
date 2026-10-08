# Vendored A2UI v1.0 files

Everything in this folder except this file and `checksums.json` is copied byte-for-byte from the
[A2UI repository](https://github.com/a2ui-project/a2ui), commit
`46ecc2d04793c0b8b1c77f8acd9d7ab4e34746c2` (2026-10-06), and is licensed under the Apache License,
Version 2.0. The full license text is in `LICENSE` beside this file.

| here                         | upstream path                                |
| ---------------------------- | -------------------------------------------- |
| `json/*.json`                | `specification/v1_0/json/`                   |
| `catalogs/basic/catalog.json`| `catalogs/basic/v1/catalog.json`             |
| `test/cases/*.json`          | `specification/v1_0/test/cases/`             |
| `test/testing_catalog.json`  | `specification/v1_0/test/testing_catalog.json` |
| `LICENSE`                    | `LICENSE`                                    |

## These files are not modified

The license permits modification (a changed file must carry a notice saying so, section 4(b)).
This package does not use that permission, by choice: whatever is validated here stays valid
A2UI v1.0, and a refresh from upstream is a copy.

`checksums.json` records the SHA-256 of every vendored file, and `src/schema/vendored.test.ts`
fails when a file no longer matches. To refresh from upstream, copy the files again, regenerate
`checksums.json`, and update the commit above. Do not edit a vendored file to make a test pass;
extend from outside it.

The formatter is told to skip this folder (`.oxfmtrc.json` at the repository root) for the same
reason.

## What ships

Only `LICENSE` and this file are published with the package, next to `dist`. The schemas and the
basic catalog are bundled into `dist` as data. The test cases never ship.
