import type { NextConfig } from 'next'

const config: NextConfig = {
  // The workspace packages export TypeScript source: Next compiles them with the app.
  transpilePackages: [
    '@soroush.design/core',
    '@soroush.design/react',
    '@soroush.design/react-hooks',
    '@soroush.design/styled-system',
  ],
  reactStrictMode: true,
  // Next writes an AGENTS.md of its own into the app in development.
  agentRules: false,
  // The types are checked against the built declarations, as an app sees them (`test:types`): a
  // theme that adds a palette color widens types that the library's source is not compiled for.
  typescript: { ignoreBuildErrors: true },
}

export default config
