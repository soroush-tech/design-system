// Measures what the packages cost an APP, so a change to them can be compared in numbers:
//
// 1. typecheck - the app's own `tsc --noEmit --extendedDiagnostics`: wall time, and the compiler's
//    files, types, instantiations, memory and check time;
// 2. dev - the app's Vite dev server: time until it accepts connections, until it has answered
//    `GET /` in full, and, in headless Chromium, until the page's `load` event and until its first
//    component is visible. COLD clears Vite's dependency pre-bundle (node_modules/.vite/deps*)
//    before each run; WARM keeps it;
// 3. build - wall time of the app's `vite build`;
// 4. render - the time to render, on the server, one page that holds every component of the catalog
//    (each component's catalog `example`) in a fresh Node process: the modules' load through Vite's
//    SSR loader, the first render, and the median of warm renders. With --bench, the same page also
//    runs in @soroush.tech/bench's Docker sandbox.
//
// Each measure runs --runs times (5 by default); the result holds every run, and their median, min
// and max. It needs the built workspace (`pnpm build`), a Playwright Chromium, and an idle machine.
// It is not part of `pnpm test` or the commit hook.
//
//   node scripts/measure-app-cost.mjs --docs --standalone <dir of a created app> [--runs 5]
//     [--only typecheck,dev,build,render] [--bench] [--out result.json]
//
// A standalone app is made, and kept, by `node scripts/smoke-create.mjs --keep`. The JSON goes to
// --out (or stdout), and a table to stderr.
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
import net from 'node:net'
import os from 'node:os'
import { dirname, join } from 'node:path'
import { performance } from 'node:perf_hooks'
import { parseArgs } from 'node:util'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { confine } from '../packages/contract/src/confine.ts'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const { values } = parseArgs({
  options: {
    docs: { type: 'boolean', default: false },
    standalone: { type: 'string' },
    runs: { type: 'string', default: '5' },
    only: { type: 'string', default: 'typecheck,dev,build,render' },
    bench: { type: 'boolean', default: false },
    out: { type: 'string' },
  },
})
// What the arguments name must lie in the repository or in the temp folder, where
// `smoke-create --keep` leaves its apps: nothing else is read or written.
const confined = (path) => {
  try {
    return confine(path, [repoRoot, os.tmpdir()])
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
}
const outFile = values.out && confined(values.out)
const runs = Number(values.runs)
const only = new Set(values.only.split(','))
const apps = []
if (values.docs) {
  apps.push({
    name: 'docs',
    dir: join(repoRoot, 'apps/docs'),
    tsc: ['-p', 'tsconfig.app.json'],
    // The app's own build also writes apps/docs/build, which a preview server may be serving: the
    // bundle goes to a folder of its own, and the scripts that run after it are left out.
    build: ['--outDir', '.measure-build', '--emptyOutDir'],
    cleanBuild: '.measure-build',
    selector: 'h1',
    port: 3011,
  })
}
if (values.standalone) {
  apps.push({
    name: 'standalone',
    dir: confined(values.standalone),
    tsc: [],
    build: [],
    cleanBuild: 'dist',
    selector: 'main h2',
    port: 3012,
  })
}
if (apps.length === 0) {
  console.error('Pass --docs and/or --standalone <dir>.')
  process.exit(1)
}

const round = (number) => Math.round(number * 100) / 100
const median = (numbers) => {
  const sorted = [...numbers].sort((a, b) => a - b)
  const middle = sorted.length >> 1
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2
}
const summarize = (numbers) => ({
  median: round(median(numbers)),
  min: round(Math.min(...numbers)),
  max: round(Math.max(...numbers)),
  runs: numbers.map(round),
})
/** Summarizes each key that is a number in every run. */
const summarizeKeys = (list) =>
  Object.fromEntries(
    Object.keys(list[0])
      .filter((key) => list.every((item) => typeof item[key] === 'number'))
      .map((key) => [key, summarize(list.map((item) => item[key]))])
  )
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Runs `task(run)` for each run from 0 to `times` - 1, each only after the one before it has
 * finished, and returns the results in order. A measurement never overlaps another one: runs that
 * overlap compete for the CPU and the port, and distort each other's timings.
 */
const inSequence = (times, task) =>
  Array.from({ length: times }).reduce(
    async (done, _, run) => [...(await done), await task(run)],
    Promise.resolve([])
  )

/** Calls `step` every `ms` until it returns something but `undefined`, and returns that. */
const poll = async (ms, step) => {
  const value = await step()
  if (value !== undefined) return value
  await sleep(ms)
  return poll(ms, step)
}

/** How idle the machine is over one second, in percent. */
async function idlePercent() {
  const total = () =>
    os.cpus().reduce(
      (sum, { times }) => ({
        idle: sum.idle + times.idle,
        all: sum.all + Object.values(times).reduce((a, b) => a + b, 0),
      }),
      { idle: 0, all: 0 }
    )
  const before = total()
  await sleep(1000)
  const after = total()
  return round((100 * (after.idle - before.idle)) / (after.all - before.all))
}

/** A package's file, as the app resolves the package (the workspace's links included). */
const fromApp = (dir, specifier) => createRequire(join(dir, 'package.json')).resolve(specifier)
const packageFile = (dir, packageName, file) =>
  join(dirname(fromApp(dir, `${packageName}/package.json`)), file)

const killTree = (child) => {
  if (child.exitCode !== null) return
  if (process.platform === 'win32') {
    const taskkill = join(process.env.SystemRoot ?? 'C:\\Windows', 'System32', 'taskkill.exe')
    spawnSync(taskkill, ['/PID', String(child.pid), '/T', '/F'])
  } else child.kill('SIGKILL')
}

/** Runs a node script to its end, and returns how long it took, with its output. */
function timeNode(args, cwd, env = {}) {
  const start = performance.now()
  const result = spawnSync(process.execPath, args, {
    cwd,
    encoding: 'utf8',
    env: { ...process.env, ...env },
    maxBuffer: 1 << 28,
  })
  const ms = performance.now() - start
  if (result.status !== 0) {
    throw new Error(`${args.join(' ')} failed:\n${result.stdout}\n${result.stderr}`)
  }
  return { ms, stdout: result.stdout }
}

/** The compiler's `--extendedDiagnostics` lines, as numbers: seconds, or kilobytes for memory. */
function parseDiagnostics(text) {
  const result = {}
  for (const line of text.split(/\r?\n/)) {
    const match = /^([A-Za-z][A-Za-z ]*?):\s+([\d.]+)[sK]?\s*$/.exec(line)
    if (match) result[match[1].replaceAll(' ', '_')] = Number(match[2])
  }
  return result
}

function typecheck(app) {
  const tsc = packageFile(app.dir, 'typescript', 'bin/tsc')
  const version = timeNode([tsc, '-v'], app.dir).stdout.trim()
  const list = []
  for (let run = 0; run < runs; run++) {
    const { ms, stdout } = timeNode([tsc, ...app.tsc, '--noEmit', '--extendedDiagnostics'], app.dir)
    const d = parseDiagnostics(stdout)
    list.push({
      wallMs: ms,
      checkTimeS: d.Check_time,
      totalTimeS: d.Total_time,
      files: d.Files,
      types: d.Types,
      instantiations: d.Instantiations,
      memoryKb: d.Memory_used,
    })
  }
  return { tool: version, ...summarizeKeys(list) }
}

const canConnect = (port) =>
  new Promise((resolve) => {
    const socket = net.connect(port, '127.0.0.1')
    socket.once('connect', () => {
      socket.destroy()
      resolve(true)
    })
    socket.once('error', () => resolve(false))
  })

/** Starts the dev server, and times it until it accepts connections. */
async function startDev(app) {
  const vite = packageFile(app.dir, 'vite', 'bin/vite.js')
  const start = performance.now()
  const child = spawn(
    process.execPath,
    [vite, '--port', String(app.port), '--strictPort', '--host', '127.0.0.1'],
    { cwd: app.dir, stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, NO_COLOR: '1' } }
  )
  let log = ''
  child.stdout.on('data', (chunk) => (log += chunk))
  child.stderr.on('data', (chunk) => (log += chunk))
  await poll(5, async () => {
    if (await canConnect(app.port)) return true
    if (child.exitCode !== null) throw new Error(`the dev server exited:\n${log}`)
    if (performance.now() - start > 120_000) throw new Error('the dev server never listened')
  })
  return {
    child,
    start,
    listenMs: performance.now() - start,
    viteReadyMs: () => /ready in (\d+) ms/.exec(log)?.[1],
  }
}

/**
 * Retries `ask` until it answers: a dev server can restart as it starts (Vite does, on newly found
 * dependencies), and refuses connections for a moment.
 */
async function untilAnswered(ask, start) {
  const { answer } = await poll(20, async () => {
    try {
      return { answer: await ask() }
    } catch (error) {
      if (performance.now() - start > 120_000) throw new Error(`no answer: ${error}`)
    }
  })
  return answer
}

async function stopDev(child, app) {
  killTree(child)
  await poll(50, async () => ((await canConnect(app.port)) ? undefined : true))
}

/** Vite's dependency pre-bundle only: not the folders other tools keep in `.vite`. */
function clearPreBundle(app) {
  const cache = join(app.dir, 'node_modules/.vite')
  if (!existsSync(cache)) return
  for (const entry of readdirSync(cache)) {
    if (entry.startsWith('deps')) rmSync(join(cache, entry), { recursive: true, force: true })
  }
}

/**
 * Each run starts the dev server. Two kinds, so that neither warms the other: one asks for `GET /`
 * with a plain HTTP client, and one asks with a fresh headless browser, and times the page's `load`
 * event and its first component. All of it counts from launching the server.
 */
async function devRuns(app, browser, isCold) {
  const url = `http://127.0.0.1:${app.port}/`
  // A warm run needs a pre-bundle to keep: one start, with a page load, makes it.
  if (!isCold) {
    const primer = await startDev(app)
    const page = await browser.newPage()
    await untilAnswered(() => page.goto(url, { waitUntil: 'load' }), primer.start)
    await page.close()
    await stopDev(primer.child, app)
  }
  const http = await inSequence(runs, async () => {
    if (isCold) clearPreBundle(app)
    const dev = await startDev(app)
    const response = await untilAnswered(async () => {
      const attempt = await fetch(url)
      await attempt.text()
      return attempt
    }, dev.start)
    if (response.status !== 200) throw new Error(`GET / answered ${response.status}`)
    const timing = {
      listenMs: dev.listenMs,
      firstResponseMs: performance.now() - dev.start,
      viteReadyMs: Number(dev.viteReadyMs()),
    }
    await stopDev(dev.child, app)
    return timing
  })
  const inBrowser = await inSequence(runs, async () => {
    if (isCold) clearPreBundle(app)
    const dev = await startDev(app)
    const context = await browser.newContext()
    const page = await context.newPage()
    await untilAnswered(() => page.goto(url, { waitUntil: 'load' }), dev.start)
    const browserLoadMs = performance.now() - dev.start
    await page.locator(app.selector).first().waitFor({ state: 'visible', timeout: 60_000 })
    const timing = {
      browserLoadMs,
      browserFirstComponentVisibleMs: performance.now() - dev.start,
    }
    await context.close()
    await stopDev(dev.child, app)
    return timing
  })
  return { ...summarizeKeys(http), ...summarizeKeys(inBrowser) }
}

function build(app) {
  const vite = packageFile(app.dir, 'vite', 'bin/vite.js')
  const list = []
  for (let run = 0; run < runs; run++) {
    rmSync(join(app.dir, app.cleanBuild), { recursive: true, force: true })
    list.push({ wallMs: timeNode([vite, 'build', ...app.build], app.dir, { CI: '1' }).ms })
  }
  if (app.name === 'docs') rmSync(join(app.dir, app.cleanBuild), { recursive: true, force: true })
  return summarizeKeys(list)
}

/** The catalog as the app's own core resolves it - or, for the docs, the workspace's build. */
async function writeCatalog(app, workDir) {
  const built = join(repoRoot, 'packages/core/dist/catalog.mjs')
  let path
  try {
    path = fromApp(app.dir, '@gild-ui/core/catalog')
  } catch {
    path = built
  }
  // The docs app's core is the workspace's source, which Node cannot load: its build.
  if (path.endsWith('.ts')) path = built
  if (!existsSync(path)) throw new Error(`Build @gild-ui/core first: no catalog at ${path}`)
  const { catalog } = await import(pathToFileURL(path).href)
  const file = join(workDir, `catalog-${app.name}.json`)
  writeFileSync(file, JSON.stringify(catalog))
  return file
}

const RUNNER = join(repoRoot, 'scripts/measure-app-cost/render-runner.mjs')

async function render(app, workDir) {
  const catalog = await writeCatalog(app, workDir)
  const list = []
  let last
  for (let run = 0; run < runs; run++) {
    const { stdout } = timeNode([RUNNER, app.dir, catalog, '30'], app.dir, {
      NODE_ENV: 'production',
    })
    last = JSON.parse(stdout.trim().split('\n').pop())
    list.push(last)
  }
  return {
    page: `every catalog example that renders alone: ${last.rendered} of ${last.rendered + last.failed.length}`,
    notRendered: last.failed.map(({ name }) => name),
    ...summarizeKeys(list),
  }
}

/** The page, bundled and run in @soroush.tech/bench's sandbox, next to a small home page. */
async function bench(app, workDir) {
  const catalog = await writeCatalog(app, workDir)
  const outDir = join(workDir, `bench-${app.name}`)
  mkdirSync(outDir, { recursive: true })
  timeNode([RUNNER, app.dir, catalog, '1', '--bundle', join(outDir, 'page.mjs')], app.dir)
  writeFileSync(
    join(outDir, 'render.bench.mjs'),
    `import { render, renderHome } from './page.mjs'
export default {
  name: 'server render (${app.name})',
  cases: { 'every-component': () => render(), 'home-page': () => renderHome() },
  options: { rounds: ${runs} },
}
`
  )
  // The bench is a devDependency of the repository root.
  const cli = join(repoRoot, 'node_modules/@soroush.tech/bench/dist/bin.mjs')
  const result = spawnSync(
    process.execPath,
    [
      cli,
      join(outDir, 'render.bench.mjs'),
      '--rounds',
      String(runs),
      '--mount',
      `${outDir}:/out`,
      '--md-file',
      '/out/result.md',
    ],
    { cwd: outDir, encoding: 'utf8' }
  )
  if (result.status !== 0) return { error: `${result.stdout}\n${result.stderr}`.slice(-2000) }
  return { table: readFileSync(join(outDir, 'result.md'), 'utf8') }
}

// The versions come from files, not from running a program found on PATH: the pnpm the repository
// pins, and the npm that ships next to this node.
const pnpmVersion = () =>
  JSON.parse(readFileSync(join(repoRoot, 'package.json'), 'utf8')).packageManager.replace(
    /^pnpm@/,
    ''
  )
const npmVersion = () => {
  const node = dirname(process.execPath)
  const manifest = [
    join(node, 'node_modules/npm/package.json'),
    join(node, '../lib/node_modules/npm/package.json'),
  ].find((path) => existsSync(path))
  return manifest ? JSON.parse(readFileSync(manifest, 'utf8')).version : 'unknown'
}

const workDir = mkdtempSync(join(os.tmpdir(), 'measure-app-cost-'))
const report = {
  date: new Date().toISOString(),
  machine: {
    cpu: os.cpus()[0].model,
    logicalCpus: os.cpus().length,
    memoryGb: round(os.totalmem() / 1e9),
    os: `${os.type()} ${os.release()}`,
    node: process.version,
    pnpm: pnpmVersion(),
    npm: npmVersion(),
    idleCpuPercentAtStart: await idlePercent(),
  },
  runs,
  apps: {},
}
let browser
if (only.has('dev')) {
  const { chromium } = createRequire(join(repoRoot, 'apps/docs/package.json'))('@playwright/test')
  browser = await chromium.launch()
}
try {
  // One app after the other: their measures must not overlap either.
  await inSequence(apps.length, async (index) => {
    const app = apps[index]
    const result = {
      dir: app.dir,
      vite: JSON.parse(readFileSync(packageFile(app.dir, 'vite', 'package.json'), 'utf8')).version,
    }
    console.error(`\n== ${app.name}`)
    if (only.has('typecheck')) {
      console.error('typecheck')
      result.typecheck = typecheck(app)
    }
    if (only.has('dev')) {
      console.error('dev, cold')
      result.devCold = await devRuns(app, browser, true)
      console.error('dev, warm')
      result.devWarm = await devRuns(app, browser, false)
    }
    if (only.has('build')) {
      console.error('build')
      result.build = build(app)
    }
    if (only.has('render')) {
      console.error('render')
      result.render = await render(app, workDir)
      if (values.bench) result.renderBench = await bench(app, workDir)
    }
    report.apps[app.name] = result
  })
  report.machine.idleCpuPercentAtEnd = await idlePercent()
} finally {
  await browser?.close()
  rmSync(workDir, { recursive: true, force: true })
}

const json = `${JSON.stringify(report, null, 2)}\n`
if (outFile) writeFileSync(outFile, json)
else process.stdout.write(json)

// The table: a row per measure, a column per app, each cell the median (min-max).
const cell = (stat) => (stat ? `${stat.median} (${stat.min}-${stat.max})` : '-')
const rows = [
  ['type check, wall ms', (r) => r.typecheck?.wallMs],
  ['type check, check time s', (r) => r.typecheck?.checkTimeS],
  ['type check, instantiations', (r) => r.typecheck?.instantiations],
  ['type check, types', (r) => r.typecheck?.types],
  ['type check, memory KB', (r) => r.typecheck?.memoryKb],
  ['dev cold, listening ms', (r) => r.devCold?.listenMs],
  ['dev cold, GET / answered ms', (r) => r.devCold?.firstResponseMs],
  ['dev cold, browser load ms', (r) => r.devCold?.browserLoadMs],
  ['dev cold, first component visible ms', (r) => r.devCold?.browserFirstComponentVisibleMs],
  ['dev warm, listening ms', (r) => r.devWarm?.listenMs],
  ['dev warm, GET / answered ms', (r) => r.devWarm?.firstResponseMs],
  ['dev warm, browser load ms', (r) => r.devWarm?.browserLoadMs],
  ['dev warm, first component visible ms', (r) => r.devWarm?.browserFirstComponentVisibleMs],
  ['build, wall ms', (r) => r.build?.wallMs],
  ['render, module load ms', (r) => r.render?.loadMs],
  ['render, first render ms', (r) => r.render?.firstRenderMs],
  ['render, warm median ms', (r) => r.render?.warmMedianMs],
]
const names = Object.keys(report.apps)
const rule = names.map(() => '---').join(' | ')
console.error(`\n| measure: median (min-max) | ${names.join(' | ')} |\n| --- | ${rule} |`)
for (const [label, pick] of rows) {
  console.error(`| ${label} | ${names.map((name) => cell(pick(report.apps[name]))).join(' | ')} |`)
}
