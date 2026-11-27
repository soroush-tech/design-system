// Two steps for the tests, on a fake package: @test/a 1.x -> 2.0.0 -> 3.0.0. They are not in the
// registry. Step 1 renames a call, reports another and swaps a helper package; step 2 reads the
// file as step 1 left it, renames again, and creates a file.
import type { Change, MigrationStep } from './step'

const SOURCE = /^src\/.*\.ts$/

export const STEP_TWO: MigrationStep = {
  id: 'test-a-2.0.0',
  from: { package: '@test/a', range: '1.x' },
  to: { package: '@test/a', version: '2.0.0' },
  summary: 'oldName is newName',
  plan: (app) => {
    const changes: Change[] = []
    for (const path of app.listFiles().filter((file) => SOURCE.test(file))) {
      const text = app.readFile(path)!
      changes.push({ kind: 'edit', path, after: text.replaceAll('oldName', 'newName') })
      text.split('\n').forEach((line, index) => {
        if (line.includes('legacy(')) {
          const message = 'legacy() has no successor: decide'
          changes.push({ kind: 'report', path, line: index + 1, message })
        }
      })
    }
    changes.push({ kind: 'dependency', action: 'add', name: '@test/helper', range: '^1.0.0' })
    changes.push({ kind: 'dependency', action: 'remove', name: '@test/old' })
    return changes
  },
}

export const STEP_THREE: MigrationStep = {
  id: 'test-a-3.0.0',
  from: { package: '@test/a', range: '2.x' },
  to: { package: '@test/a', version: '3.0.0' },
  summary: 'newName is latestName',
  plan: (app) => [
    {
      kind: 'edit',
      path: 'src/main.ts',
      after: app.readFile('src/main.ts')!.replaceAll('newName', 'latestName'),
    },
    { kind: 'create', path: 'src/generated.ts', content: `// ${app.listFiles().length} files\n` },
    { kind: 'report', path: 'src/main.ts', message: 'check the build' },
  ],
}

export const TEST_STEPS = [STEP_TWO, STEP_THREE]

/** An app on @test/a 1.x: package.json and the source the steps work on. */
export const TEST_APP_FILES = {
  'package.json':
    JSON.stringify(
      {
        name: 'test-app',
        dependencies: { '@test/a': '^1.2.0', '@test/old': '^1.0.0', react: '^19.0.0' },
      },
      null,
      2
    ) + '\n',
  'src/main.ts': "import { oldName } from '@test/a'\noldName()\nlegacy()\n",
}
