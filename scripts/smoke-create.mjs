// Proves that an app `create` starts works, on this checkout's code rather than npm's:
//
// 1. builds and packs the design system and the workspace packages it depends on (the cli among
//    them);
// 2. runs the built cli's `create` in a temp folder, through its own `main`, with an Io whose
//    install first points the new app at those tarballs;
// 3. typechecks (TypeScript) and builds the app, serves the build, and checks the server's HTML:
//    the design system's styles and the starter's content on `/` and `/about`, and the 404 page.
//
//   node scripts/smoke-create.mjs [--lang ts|js] [--pm npm|pnpm] [--framework vike]
//
// The temp folder is removed when every check passes, and kept, with its path printed, when one
// fails.
import { spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { parseArgs } from 'node:util'
import { fileURLToPath, pathToFileURL } from 'node:url'

const DESIGN_SYSTEM = '@soroush.tech/design-system'
const APP = 'smoke-app'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const { values } = parseArgs({
  options: {
    lang: { type: 'string', default: 'ts' },
    pm: { type: 'string', default: 'npm' },
    framework: { type: 'string', default: 'vike' },
  },
})
const { lang, pm, framework } = values
if (!['ts', 'js'].includes(lang) || !['npm', 'pnpm'].includes(pm)) {
  console.error('--lang is ts or js, and --pm is npm or pnpm.')
  process.exit(1)
}

/** Runs a command, showing its output, and throws when it fails. */
function run(command, args, cwd) {
  console.log(`
$ ${[command, ...args].join(' ')}   (in ${cwd})`)
  // Windows starts a package manager's .cmd shim only through the shell, so it gets one command
  // line, each argument quoted. The arguments are this script's own constants and paths.
  const result =
    process.platform === 'win32'
      ? spawnSync([command, ...args.map((arg) => `"${arg}"`)].join(' '), {
          cwd,
          stdio: 'inherit',
          shell: true,
        })
      : spawnSync(command, args, { cwd, stdio: 'inherit' })
  if (result.status !== 0) throw new Error(`${command} ${args.join(' ')} failed`)
}

/** Every workspace package by its name: its folder and its manifest. */
function readWorkspacePackages() {
  const packages = new Map()
  for (const entry of readdirSync(join(repoRoot, 'packages'), { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const dir = join(repoRoot, 'packages', entry.name)
    try {
      const manifest = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8'))
      packages.set(manifest.name, { dir, manifest })
    } catch {
      // a folder with no package.json is no package
    }
  }
  return packages
}

/** The design system and every workspace package it depends on, however deep. */
function collectShipped(packages) {
  const names = new Set()
  const visit = (name) => {
    if (names.has(name)) return
    names.add(name)
    const { dependencies = {} } = packages.get(name).manifest
    for (const [dependency, range] of Object.entries(dependencies)) {
      if (range.startsWith('workspace:')) visit(dependency)
    }
  }
  visit(DESIGN_SYSTEM)
  return [...names]
}

/** Packs each package, as it publishes, into `destination`. Returns each tarball by its name. */
function pack(names, packages, destination) {
  const tarballs = {}
  for (const name of names) {
    const before = new Set(readdirSync(destination))
    run('pnpm', ['pack', '--pack-destination', destination], packages.get(name).dir)
    const [file] = readdirSync(destination).filter((entry) => !before.has(entry))
    tarballs[name] = join(destination, file)
  }
  return tarballs
}

/**
 * Points the new app at the tarballs: the design system as its dependency, and the packages the
 * design system depends on as overrides, the way each package manager reads them.
 */
function useTarballs(appDir, tarballs) {
  const path = join(appDir, 'package.json')
  const manifest = JSON.parse(readFileSync(path, 'utf8'))
  const toSpec = (name) => `file:${tarballs[name].replaceAll('\\', '/')}`
  manifest.dependencies[DESIGN_SYSTEM] = toSpec(DESIGN_SYSTEM)
  const overrides = Object.fromEntries(Object.keys(tarballs).map((name) => [name, toSpec(name)]))
  if (pm === 'pnpm') manifest.pnpm = { overrides }
  else manifest.overrides = overrides
  writeFileSync(path, `${JSON.stringify(manifest, null, 2)}\n`)
}

/** Throws unless `condition` holds. */
function check(condition, message) {
  if (!condition) throw new Error(message)
  console.log(`  ok  ${message}`)
}

/** Serves the app's build with its own Vite, and checks the HTML of its pages. */
async function checkServedPages(appDir) {
  const require = createRequire(join(appDir, 'package.json'))
  const { preview } = await import(pathToFileURL(require.resolve('vite')).href)
  // Vike takes the folder it runs in for the app's root.
  const cwd = process.cwd()
  process.chdir(appDir)
  const server = await preview({ root: appDir, logLevel: 'warn', preview: { port: 0 } })
  try {
    const base = server.resolvedUrls.local[0]
    const fetchPage = async (path) => {
      const response = await fetch(new URL(path, base))
      return { status: response.status, html: await response.text() }
    }
    console.log(`\nChecking the pages ${base} serves:`)
    const home = await fetchPage('/')
    check(home.status === 200, '/ answers 200')
    check(
      home.html.includes('<style data-emotion="soroush-global'),
      "/ carries the page's base styles"
    )
    check(/<style data-emotion="soroush [^"]/.test(home.html), "/ carries its components' styles")
    check(home.html.includes(`>${APP}</h2>`), "/ has the starter's heading")
    const about = await fetchPage('/about')
    check(
      about.status === 200 && about.html.includes('>About</h2>'),
      '/about answers with its page'
    )
    const missing = await fetchPage('/no-such-page')
    check(missing.status === 404, '/no-such-page answers 404')
    check(missing.html.includes('Page not found'), '/no-such-page shows the 404 page')
  } finally {
    await server.close()
    process.chdir(cwd)
  }
}

const workDir = mkdtempSync(join(tmpdir(), 'smoke-create-'))
let isPassed = false
try {
  const packages = readWorkspacePackages()
  const shipped = collectShipped(packages)
  run('pnpm', [...shipped.flatMap((name) => ['--filter', name]), 'build'], repoRoot)
  const packDir = join(workDir, 'packs')
  mkdirSync(packDir)
  const tarballs = pack(shipped, packages, packDir)

  const cli = await import(
    pathToFileURL(join(packages.get('@soroush.design/cli').dir, 'dist/index.mjs')).href
  )
  // create reads the package manager that ran it from here.
  process.env.npm_config_user_agent = `${pm}/10.0.0 node/${process.version}`
  const nodeIo = cli.createNodeIo({ cwd: workDir })
  const io = {
    ...nodeIo,
    run: (command, args, options) => {
      if (command === pm && args[0] === 'install') useTarballs(options.cwd, tarballs)
      return nodeIo.run(command, args, options)
    },
  }
  const { name, version, peerDependencies } = packages.get(DESIGN_SYSTEM).manifest
  const argv = ['create', APP, '--yes', `--${lang}`, '--framework', framework, '--no-git']
  console.log(`\n$ create ${argv.slice(1).join(' ')}   (with ${pm})`)
  const code = await cli.default(argv, io, { name, version, peerDependencies })
  if (code !== 0) throw new Error(`create exited with ${code}`)

  const appDir = join(workDir, APP)
  if (lang === 'ts') run(pm, ['run', 'typecheck'], appDir)
  run(pm, ['run', 'build'], appDir)
  await checkServedPages(appDir)
  isPassed = true
} finally {
  if (isPassed) {
    try {
      rmSync(workDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 500 })
    } catch {
      // Windows can hold a file of the served build a moment longer: the folder is only temp.
      console.warn(`Could not remove ${workDir}; it is a temp folder, so it can stay.`)
    }
    console.log(
      `\nThe ${framework} app in ${lang === 'ts' ? 'TypeScript' : 'JavaScript'}, with ${pm}, works.`
    )
  } else {
    console.error(`\nThe smoke test failed. Its files are in ${workDir}`)
  }
}
