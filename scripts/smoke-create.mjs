// Proves that an app `create` starts works, on this checkout's code rather than npm's:
//
// 1. builds and packs the design system and the workspace packages it depends on (the cli among
//    them);
// 2. runs the built cli's `create` in a temp folder, through its own `main`, with an Io whose
//    install first points the new app at those tarballs;
// 3. typechecks (TypeScript) and builds the app, checks that the build prerendered its pages,
//    serves the build, and checks the HTML: the design system's styles and the starter's content
//    on `/` and `/about`, and the 404 page. With `--sample-data`, the list of sample items and the
//    page of each, too. An SPA's HTML is the same shell on every path: its pages render in the
//    browser.
//
//   node scripts/smoke-create.mjs [--lang ts|js] [--pm npm|pnpm] [--framework vike|astro|react-router]
//     [--layout standalone|workspace] [--render isomorphic|spa|ssg] [--with <libraries>]
//     [--sample-data]
//
// In a workspace, the app is apps/web, and its scripts run from the workspace's root.
//
// The temp folder is removed when every check passes, and kept, with its path printed, when one
// fails.
import { spawn, spawnSync } from 'node:child_process'
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { parseArgs } from 'node:util'
import { fileURLToPath, pathToFileURL } from 'node:url'

const DESIGN_SYSTEM = '@soroush.tech/design-system'
const APP = 'smokeApp'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const { values } = parseArgs({
  options: {
    lang: { type: 'string', default: 'ts' },
    pm: { type: 'string', default: 'npm' },
    framework: { type: 'string', default: 'vike' },
    layout: { type: 'string', default: 'standalone' },
    render: { type: 'string', default: 'isomorphic' },
    with: { type: 'string', default: '' },
    'sample-data': { type: 'boolean', default: false },
  },
})
const { lang, pm, framework, layout, render, with: libraries } = values
const hasSampleData = values['sample-data']
if (
  !['ts', 'js'].includes(lang) ||
  !['npm', 'pnpm'].includes(pm) ||
  !['vike', 'astro', 'react-router'].includes(framework) ||
  !['standalone', 'workspace'].includes(layout) ||
  !['isomorphic', 'ssr', 'spa', 'ssg'].includes(render)
) {
  console.error(
    '--lang is ts or js, --pm is npm or pnpm, --framework is vike, astro or react-router, --layout is standalone or workspace, and --render is isomorphic, ssr, spa or ssg.'
  )
  process.exit(1)
}
const isSpa = render === 'spa'
const isWorkspace = layout === 'workspace'
const isAstro = framework === 'astro'
// An SSR app renders each page on its own server, which the build writes.
const isServer = render === 'ssr'
const SERVER_ENTRY = isAstro ? 'dist/server/entry.mjs' : 'dist/server/index.mjs'
// Where the build writes the pages and their files: Vike's client build, Astro's dist - its
// client folder, for a server - or Vite's dist, for an SPA.
const PAGES_DIR = (isAstro && !isServer) || isSpa ? 'dist' : 'dist/client'
// The key of the Emotion cache that draws the styles: the design system's, which Vike's renderer
// gives the page, or Emotion's own, which each Astro island makes as it renders.
const STYLE_KEY = isAstro ? 'css' : 'soroush'

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

const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'))
const writeJson = (path, value) => writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`)

/**
 * Points the new app at the tarballs: the design system as the app's dependency, and the packages
 * the design system depends on as overrides, in the root's package.json, where each package
 * manager reads them. `rootDir` is where the install runs; `appDir` is the app's own folder.
 */
function useTarballs(rootDir, appDir, tarballs) {
  const toSpec = (name) => `file:${tarballs[name].replaceAll('\\', '/')}`
  const appManifest = readJson(join(appDir, 'package.json'))
  appManifest.dependencies[DESIGN_SYSTEM] = toSpec(DESIGN_SYSTEM)
  writeJson(join(appDir, 'package.json'), appManifest)
  const rootManifest = readJson(join(rootDir, 'package.json'))
  const overrides = Object.fromEntries(Object.keys(tarballs).map((name) => [name, toSpec(name)]))
  if (pm === 'pnpm') rootManifest.pnpm = { overrides }
  else rootManifest.overrides = overrides
  writeJson(join(rootDir, 'package.json'), rootManifest)
}

/** Throws unless `condition` holds. */
function check(condition, message) {
  if (!condition) throw new Error(message)
  console.log(`  ok  ${message}`)
}

/**
 * Checks the sample data pages: the list, built from its +data, and the page of each item it
 * links to, prerendered and served.
 */
async function checkSampleDataPages(appDir, fetchPage) {
  const list = await fetchPage('/items')
  if (isSpa) {
    // An SPA's HTML holds no page: its items are the folders the build wrote.
    check(list.status === 200, '/items answers 200')
  } else {
    check(list.status === 200 && list.html.includes('>Items</h2>'), '/items answers with its page')
  }
  // An SPA's HTML holds no link: its items are the ones its sample data holds.
  const ids = isSpa
    ? [...readSampleData(appDir).matchAll(/^ {4}id: '([^']+)',$/gm)].map(([, id]) => id)
    : [...list.html.matchAll(/href="\/items\/([^"]+)"/g)].map(([, id]) => id)
  check(ids.length > 0, `/items lists the sample items: ${ids.join(', ')}`)
  for (const id of ids) {
    // A server renders each item as it is asked for, and an SPA in the browser; a build writes
    // them all.
    if (!isServer && !isSpa) {
      check(
        existsSync(join(appDir, PAGES_DIR, 'items', id, 'index.html')),
        `the build prerendered items/${id}/index.html`
      )
    }
    const item = await fetchPage(`/items/${id}`)
    check(
      item.status === 200 && (isSpa || item.html.includes('>All items</a>')),
      `/items/${id} answers with its page`
    )
  }
  if (!isSpa) {
    const unknown = await fetchPage('/items/no-such-item')
    check(
      unknown.status === 404 && unknown.html.includes('Page not found'),
      '/items/no-such-item answers 404, with the 404 page'
    )
  }
}

/** The source of the app's sample data, in TypeScript or JavaScript. */
function readSampleData(appDir) {
  const path = join(appDir, `src/data/items.${lang}`)
  return readFileSync(path, 'utf8')
}

/**
 * Starts the server an SSR build wrote, as `npm start` does, on a free port, and waits until it
 * answers.
 */
async function startBuiltServer(appDir) {
  const port = 4500 + Math.floor(Math.random() * 400)
  const server = spawn(process.execPath, [SERVER_ENTRY], {
    cwd: appDir,
    env: { ...process.env, NODE_ENV: 'production', HOST: 'localhost', PORT: String(port) },
    stdio: 'inherit',
  })
  const base = `http://localhost:${port}/`
  for (let attempt = 0; ; attempt += 1) {
    try {
      await fetch(base)
      break
    } catch (error) {
      if (attempt === 60 || server.exitCode !== null) {
        server.kill()
        throw new Error(`The server at ${SERVER_ENTRY} did not answer: ${error}`)
      }
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
  }
  const stop = () =>
    new Promise((resolve) => {
      server.once('exit', resolve)
      server.kill()
    })
  return { base, stop }
}

/** Checks `/`: its page and styles in the HTML, or an SPA's empty shell and its script. */
function checkHome(home) {
  check(home.status === 200, '/ answers 200')
  if (isSpa) {
    check(home.html.includes('<div id="root"></div>'), "/ is the SPA's empty shell")
    check(/<script[^>]* type="module"/.test(home.html), '/ loads the script that renders it')
    return
  }
  check(
    home.html.includes(`<style data-emotion="${STYLE_KEY}-global`),
    "/ carries the page's base styles"
  )
  check(
    new RegExp(`<style data-emotion="${STYLE_KEY} [^"]`).test(home.html),
    "/ carries its components' styles"
  )
  check(home.html.includes(`>${APP}</h2>`), "/ has the starter's heading")
  const hasGreeting = /tanstack-query|swr|msw/.test(libraries)
  if (isAstro) {
    // Astro's counter and greeting are islands that render in the browser only: the HTML holds
    // where each one goes.
    const island = (name) => new RegExp(`<astro-island[^>]*component-url="[^"]*/${name}\\.`)
    if (render !== 'ssg') {
      check(home.html.includes('<astro-island'), "/ hydrates its parts as Astro's islands")
      check(island('Counter').test(home.html), '/ has the island of its counter')
    }
    if (hasGreeting) check(island('Greeting').test(home.html), '/ has the island of its greeting')
  } else {
    // React's server HTML puts a comment between the text and the number.
    if (render !== 'ssg') check(/Count: (<!-- -->)?0/.test(home.html), '/ has its counter, at 0')
    if (hasGreeting) {
      check(
        home.html.includes('Asking the API for a greeting'),
        '/ has the greeting, which the browser asks the API for'
      )
    }
  }
  if (render === 'ssg') check(!home.html.includes('<script'), '/ ships no script')
}

/**
 * Serves the app's build with its own server - Vite's preview for Vike, Astro's own for Astro -
 * and returns its address and how to stop it.
 */
async function startServer(appDir) {
  if (isServer) return startBuiltServer(appDir)
  const require = createRequire(join(appDir, 'package.json'))
  if (isAstro) {
    const { preview } = await import(pathToFileURL(require.resolve('astro')).href)
    const server = await preview({ root: appDir, logLevel: 'warn', server: { port: 4400 } })
    return { base: `http://localhost:${server.port}/`, stop: () => server.stop() }
  }
  const { preview } = await import(pathToFileURL(require.resolve('vite')).href)
  // Vike takes the folder it runs in for the app's root.
  const cwd = process.cwd()
  process.chdir(appDir)
  const server = await preview({ root: appDir, logLevel: 'warn', preview: { port: 0 } })
  return {
    base: server.resolvedUrls.local[0],
    stop: async () => {
      await server.close()
      process.chdir(cwd)
    },
  }
}

/** Serves the app's build, and checks the HTML of its pages. */
async function checkServedPages(appDir) {
  const { base, stop } = await startServer(appDir)
  try {
    const fetchPage = async (path) => {
      const response = await fetch(new URL(path, base))
      return { status: response.status, html: await response.text() }
    }
    console.log(`\nChecking the pages ${base} serves:`)
    checkHome(await fetchPage('/'))
    const about = await fetchPage('/about')
    check(
      about.status === 200 && (isSpa || about.html.includes('>About</h2>')),
      '/about answers with its page'
    )
    const missing = await fetchPage('/no-such-page')
    if (isSpa) {
      // Every path answers with the shell, where the router shows the error page.
      check(
        missing.status === 200 && missing.html.includes('<div id="root"></div>'),
        "/no-such-page answers with the SPA's shell"
      )
    } else {
      check(missing.status === 404, '/no-such-page answers 404')
      check(missing.html.includes('Page not found'), '/no-such-page shows the 404 page')
    }
    if (hasSampleData) await checkSampleDataPages(appDir, fetchPage)
  } finally {
    await stop()
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
      if (command === pm && args[0] === 'install') {
        useTarballs(
          options.cwd,
          isWorkspace ? join(options.cwd, 'apps/web') : options.cwd,
          tarballs
        )
      }
      return nodeIo.run(command, args, options)
    },
  }
  const { name, version, peerDependencies } = packages.get(DESIGN_SYSTEM).manifest
  const argv = ['create', APP, '--yes', `--${lang}`, '--framework', framework, '--no-git']
  argv.push('--layout', layout, '--render', render, '--with', libraries)
  if (hasSampleData) argv.push('--sample-data')
  console.log(`\n$ create ${argv.slice(1).join(' ')}   (with ${pm})`)
  const code = await cli.default(argv, io, { name, version, peerDependencies })
  if (code !== 0) throw new Error(`create exited with ${code}`)

  const rootDir = join(workDir, APP)
  const appDir = isWorkspace ? join(rootDir, 'apps/web') : rootDir
  check(
    readJson(join(rootDir, 'package.json')).name === 'smoke-app',
    `${APP} is the package smoke-app`
  )
  if (isWorkspace) {
    check(
      readJson(join(appDir, 'package.json')).name === '@smoke-app/web',
      'apps/web is the package @smoke-app/web'
    )
    check(existsSync(join(rootDir, 'services/.gitkeep')), 'the workspace has its services folder')
  }
  // In a workspace, the root's scripts run the app's: running them from there checks both.
  if (lang === 'ts') run(pm, ['run', 'typecheck'], rootDir)
  // Every app has its own tests, which must pass in the app they were written into.
  run(pm, ['run', 'test'], rootDir)
  run(pm, ['run', 'build'], rootDir)
  console.log('\nChecking the build:')
  if (isServer) {
    check(existsSync(join(appDir, SERVER_ENTRY)), `the build wrote the server, ${SERVER_ENTRY}`)
    check(
      !existsSync(join(appDir, PAGES_DIR, 'index.html')),
      'the build prerendered no page: the server renders each one'
    )
  } else if (isSpa) {
    check(existsSync(join(appDir, PAGES_DIR, 'index.html')), "the build wrote the SPA's shell")
  } else {
    const pages = ['index.html', 'about/index.html', '404.html']
    if (hasSampleData) pages.push('items/index.html')
    for (const page of pages) {
      check(existsSync(join(appDir, PAGES_DIR, page)), `the build prerendered ${page}`)
    }
  }
  // msw's plugin ships the mock API's worker with the build.
  if (libraries.includes('msw')) {
    check(
      existsSync(join(appDir, PAGES_DIR, 'mockServiceWorker.js')),
      "the build ships msw's worker"
    )
  }
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
      `\nThe ${framework} app in ${lang === 'ts' ? 'TypeScript' : 'JavaScript'} (${layout}), with ${pm}, works.`
    )
  } else {
    console.error(`\nThe smoke test failed. Its files are in ${workDir}`)
  }
}
