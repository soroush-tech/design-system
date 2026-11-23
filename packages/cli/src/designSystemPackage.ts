import { version } from '../../react/package.json'

/**
 * The npm name of the component library. `init` and `create` run from its `design-system` bin, and
 * check an app's React against the range it declares; an app never imports from it by this name.
 */
export const DESIGN_SYSTEM_PACKAGE = '@soroush.design/react-components'

/** The npm name of the platform umbrella: what `init` and `create` install, and an app imports from. */
export const APP_PACKAGE = '@soroush.design/react'

/**
 * The version of the umbrella the app gets. It is read from the workspace when this package is
 * built, so only this field ships; the version is a released one, so even an alpha cli installs
 * the stable umbrella.
 */
export const APP_PACKAGE_VERSION: string = version
