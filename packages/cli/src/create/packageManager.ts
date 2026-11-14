import type { InstallCommand, PackageManager, PackageManagerName } from '../plan/planInit'

/**
 * The package manager that ran `create`, from the user agent it gives the commands it starts
 * (`pnpm/10.4.1 npm/? node/v24.1.0 ...`), else npm. A new app has no lockfile to read it from.
 */
export function readPackageManager(userAgent: string | undefined): PackageManager {
  const match = /^(npm|pnpm|yarn|bun)\/(\d+)/.exec(userAgent ?? '')
  if (!match) return { name: 'npm', isYarnBerry: false }
  const name = match[1] as PackageManagerName
  return { name, isYarnBerry: name === 'yarn' && Number(match[2]) >= 2 }
}

/** The command that installs a new app's dependencies, running no scripts. */
export function createAppInstallCommand({ name, isYarnBerry }: PackageManager): InstallCommand {
  if (name === 'yarn' && isYarnBerry) {
    return { command: 'yarn', args: ['install'], env: { YARN_ENABLE_SCRIPTS: 'false' } }
  }
  return { command: name, args: ['install', '--ignore-scripts'], env: {} }
}

/** The command that runs a package script, as the developer types it. */
export function formatRunScript({ name }: PackageManager, script: string): string {
  return name === 'npm' || name === 'bun' ? `${name} run ${script}` : `${name} ${script}`
}
