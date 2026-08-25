import { defineConfig } from 'vite'
import { createRequire } from 'node:module'
import path, { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import mdx from '@mdx-js/rollup'
import react from '@vitejs/plugin-react'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import vike from 'vike/plugin'
import sitemap from './vite/sitemapPlugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  // Versioned section snapshots are built with DOCS_BASE=/<pkg>/<version>/ so every
  // asset and route lives under that frozen path (see the versioning plan).
  base: process.env.DOCS_BASE ?? '/',
  define: {
    // '' on the live site; the package name during a versioned section snapshot build.
    'import.meta.env.PUBLIC_ENV__DOCS_SECTION': JSON.stringify(process.env.DOCS_SECTION ?? ''),
  },
  plugins: [
    {
      // Before react/vike so `.mdx` reaches them as compiled JS. The plugin pair and
      // options mirror the markdown package's Preview, so .mdx and runtime .md render
      // identically through the same element map.
      enforce: 'pre',
      ...mdx({
        // Only .mdx - plain .md files are runtime content (`?raw` + <Preview>), not modules.
        include: /\.mdx$/,
        providerImportSource: '@mdx-js/react',
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypeHighlight, { ignoreMissing: true }]],
      }),
    },
    react(),
    vike(),
    // The sitemap lists the live site only - snapshot builds are noindex by design.
    sitemap({ enable: !process.env.DOCS_SECTION }),
  ],
  resolve: {
    alias: {
      src: resolve(__dirname, './src'),
      content: resolve(__dirname, './content'),
      // Repo-root packages dir, so docs pages can import a package's README or
      // release notes as a raw string (`packages/<name>/README.md?raw`).
      packages: resolve(__dirname, '../../packages'),
      // Demoed stories only need an inert `fn` mock - the real module drags the whole
      // vitest expect/spy stack into the client bundle.
      'storybook/test': resolve(__dirname, './src/demos/storybookTestStub.ts'),
      // Component MDX pages live inside the design-system package (next to their
      // README), where the compiled provider import cannot resolve - pin it to ours.
      '@mdx-js/react': createRequire(import.meta.url).resolve('@mdx-js/react'),
    },
  },
  build: {
    outDir: './build',
  },
  server: {
    port: process.env.E2E_PORT ? Number(process.env.E2E_PORT) : 3001,
  },
})
