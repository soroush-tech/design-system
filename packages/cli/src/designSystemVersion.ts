/**
 * The design system version the cli run on its own installs: the one it was built next to, read
 * from the workspace at build time. That is the target version, which a prerelease cli is
 * published ahead of, so a prerelease cli asks for the design system prerelease of its own
 * channel instead: `2.3.0-alpha.0` from a `0.2.0-alpha.N` cli, which `^` takes to the newest
 * alpha, or to `2.3.0` once it is out.
 */
export function getDesignSystemVersion(designSystemVersion: string, cliVersion: string): string {
  const channel = /-([a-z]+)\.\d+$/.exec(cliVersion)?.[1]
  if (!channel || designSystemVersion.includes('-')) return designSystemVersion
  return `${designSystemVersion}-${channel}.0`
}
