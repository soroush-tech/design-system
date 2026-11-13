// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { planInit } from './plan/planInit'

// The root of the strict fixture app in type-tests/init, before init edits it: classic JSX, and
// imports that carry `.tsx`.
const ROOT_BEFORE = `import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
`

const FIXTURE = '../../type-tests/init/src'

describe('the strict fixture app', () => {
  // `pnpm test:types` typechecks these files under the app's strictest settings; this keeps them
  // what init writes. After a template change, update them with `vitest run -u`.
  it("holds init's own output", async () => {
    const plan = planInit({
      isTypeScript: true,
      hasSrcFolder: true,
      root: { path: 'src/main.tsx', source: ROOT_BEFORE },
      rootCandidates: ['src/main.tsx'],
      hasDesignSystem: true,
      needsParcelPackageExports: false,
      packageManager: { name: 'npm', isYarnBerry: false },
      version: '2.2.0',
      scheme: 'light',
      readFile: () => undefined,
    })
    expect(plan.creates.map((file) => file.path)).toEqual([
      'src/theme/themes.ts',
      'src/theme/Providers.ts',
    ])
    await expect(plan.creates[0].content).toMatchFileSnapshot(`${FIXTURE}/theme/themes.ts`)
    await expect(plan.creates[1].content).toMatchFileSnapshot(`${FIXTURE}/theme/Providers.ts`)
    await expect(plan.edits[0].after).toMatchFileSnapshot(`${FIXTURE}/main.tsx`)
  })
})
