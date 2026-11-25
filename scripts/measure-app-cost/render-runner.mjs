// Child of scripts/measure-app-cost.mjs: renders one page that holds EVERY component of the
// catalog on the server, the way an app does (renderToString, then the styles it used), and
// prints one JSON line.
//
//   node render-runner.mjs <appDir> <catalog.json> <iterations> [--bundle <file>]
//
// The page module is written into the app (so the app's own `@soroush.design/react/*`, react
// and `@umber-style/server` resolve) and loaded through Vite's SSR loader, which transforms the
// workspace's TypeScript sources too. With --bundle, one self-contained ESM file of that module
// is built instead - for a sandboxed benchmark, whose Linux container cannot run the host's
// node_modules.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { basename, join, resolve } from 'node:path'
import { performance } from 'node:perf_hooks'
import { pathToFileURL } from 'node:url'

const [appDir, catalogPath, iterations, flag, bundleFile] = process.argv.slice(2)
const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'))
const require = createRequire(join(appDir, 'package.json'))
const { build, createServer } = await import(pathToFileURL(require.resolve('vite')).href)

const entries = Object.values(catalog.components)
const subpaths = [...new Set(entries.map((entry) => entry.subpath))]

// The generated page module: a static import per subpath, so a bundler sees them all.
const source = `
import { createElement, Fragment } from 'react'
import { renderToString } from 'react-dom/server'
import { createInstance } from '@umber-style/server/create-instance'
import { CacheProvider, Global, globalStyles, styleCache } from '@soroush.design/react/engine'
import { ThemeProvider, baseTheme } from '@soroush.design/react/theme'
${subpaths.map((subpath, index) => `import * as m${index} from '@soroush.design/react/${subpath}'`).join('\n')}
const modules = { ${subpaths.map((subpath, index) => `${JSON.stringify(subpath)}: m${index}`).join(', ')} }
const entries = ${JSON.stringify(entries.map(({ name, subpath, example }) => ({ name, subpath, example })))}

const toElement = (node, modulesByName, key) => {
  if (typeof node === 'string') return node
  const Component = modulesByName[node.component]
  if (!Component) throw new Error('no export ' + node.component)
  return createElement(Component, { key, ...node.props }, ...node.children.map((child, index) => toElement(child, modulesByName, index)))
}
const exportsByName = Object.assign({}, ...Object.values(modules))
// Under a CacheProvider the components write to the style cache, the one the extraction reads.
const wrap = (children) =>
  createElement(
    CacheProvider,
    { value: styleCache },
    createElement(ThemeProvider, { theme: baseTheme }, createElement(Global, { styles: globalStyles }), ...children)
  )

/** The full server path of a page: its HTML, then the styles it used. */
const renderPage = (elements) => {
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createInstance(styleCache)
  const html = renderToString(wrap(elements))
  const styles = constructStyleTagsFromChunks(extractCriticalToChunks(html))
  return { html, styles }
}

// An example that cannot render alone (it needs a parent's context, say) is left out and counted.
export const rendered = []
export const failed = []
for (const entry of entries) {
  try {
    const element = toElement(entry.example, exportsByName, entry.name)
    renderPage([element])
    rendered.push({ name: entry.name, element })
  } catch (error) {
    failed.push({ name: entry.name, error: String(error.message).slice(0, 120) })
  }
}
const everyElements = rendered.map((item) => item.element)
const homeElements = ['Flex', 'Typography', 'Button']
  .map((name) => rendered.find((item) => item.name === name)?.element)
  .filter(Boolean)

/** A page that holds every component that renders alone. */
export const render = () => renderPage(everyElements)
/** The starter's home page, as a reference: a few of the most common components. */
export const renderHome = () => renderPage(homeElements)
`

const workDir = join(appDir, '.measure-render')
rmSync(workDir, { recursive: true, force: true })
mkdirSync(workDir)
const pageFile = join(workDir, 'page.mjs')
writeFileSync(pageFile, source)

try {
  if (flag === '--bundle') {
    await build({
      root: appDir,
      configFile: false,
      logLevel: 'error',
      mode: 'production',
      ssr: { noExternal: true },
      build: {
        ssr: pageFile,
        outDir: resolve(bundleFile, '..'),
        emptyOutDir: false,
        minify: false,
        rollupOptions: { output: { entryFileNames: basename(bundleFile) } },
      },
    })
    console.log(JSON.stringify({ bundle: resolve(bundleFile) }))
  } else {
    const server = await createServer({
      root: appDir,
      configFile: false,
      logLevel: 'error',
      appType: 'custom',
      server: { middlewareMode: true, hmr: false, watch: null },
      optimizeDeps: { noDiscovery: true, include: [] },
    })
    try {
      const t0 = performance.now()
      const page = await server.ssrLoadModule(pageFile)
      const loadMs = performance.now() - t0
      const t1 = performance.now()
      const first = page.render()
      const firstRenderMs = performance.now() - t1
      const samples = []
      for (let index = 0; index < Number(iterations); index++) {
        const start = performance.now()
        page.render()
        samples.push(performance.now() - start)
      }
      samples.sort((a, b) => a - b)
      const home = []
      for (let index = 0; index < Number(iterations); index++) {
        const start = performance.now()
        page.renderHome()
        home.push(performance.now() - start)
      }
      home.sort((a, b) => a - b)
      console.log(
        JSON.stringify({
          loadMs,
          firstRenderMs,
          warmMedianMs: samples[samples.length >> 1],
          warmMinMs: samples[0],
          homeWarmMedianMs: home[home.length >> 1],
          htmlBytes: Buffer.byteLength(first.html),
          styleBytes: Buffer.byteLength(first.styles),
          rendered: page.rendered.length,
          failed: page.failed,
        })
      )
    } finally {
      await server.close()
    }
  }
} finally {
  rmSync(workDir, { recursive: true, force: true })
}
