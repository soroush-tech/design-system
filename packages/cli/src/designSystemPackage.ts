import { version } from '../../react/package.json'

/**
 * The npm name of the React package: what `init` and `create` install, and an app imports from. They
 * check an app's React against the range it declares.
 */
export const APP_PACKAGE = '@soroush.design/react'

/**
 * The package an app takes its theme from (`createTheme`, `baseTheme`): the React package depends on
 * it, and an app that imports it names it in its own dependencies, at the same version.
 */
export const CORE_PACKAGE = '@soroush.design/core'

/**
 * The version of the React package the app gets. It is read from the workspace when this package is
 * built, so only this field ships; the version is a released one, so even an alpha cli installs the
 * stable package.
 */
export const APP_PACKAGE_VERSION: string = version
