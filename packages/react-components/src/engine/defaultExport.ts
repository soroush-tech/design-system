// Goes away with the engine's named exports (#144).
/**
 * The function behind a default import of an engine package. In the CommonJS build the bundler loads
 * the package with Node's interop, which makes the default the whole `module.exports`; the engine's
 * CommonJS files hold the function in its `default` member.
 */
export const defaultExport = <F extends (...args: never[]) => unknown>(
  imported: F | { default: F }
): F => (typeof imported === 'function' ? imported : imported.default)
