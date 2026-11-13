// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { VITE_ROOT } from '../testApp'
import { insertImport, isRootSource, wrapRoot } from './rootEdit'

const IMPORT = "import { Providers } from './theme/Providers'"

describe('isRootSource', () => {
  it('finds a root by its render call, whatever the file is named', () => {
    expect(isRootSource(VITE_ROOT)).toBe(true)
    expect(isRootSource('const root = ReactDOM.createRoot(el)\nroot.render(<App />)')).toBe(true)
    expect(isRootSource('ReactDOM.render(<App />, el)')).toBe(true)
  })

  it('passes over a file that renders no root', () => {
    expect(isRootSource('export const App = () => <div />')).toBe(false)
    expect(isRootSource('createRoot(el)')).toBe(false)
    expect(isRootSource('chart.render()')).toBe(false)
  })
})

describe('wrapRoot', () => {
  it('wraps a multi-line tree one step deeper, and adds the import after the last one', () => {
    expect(wrapRoot(VITE_ROOT, IMPORT)).toBe(`import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Providers } from './theme/Providers'

createRoot(document.getElementById('root')!).render(
  <Providers>
    <StrictMode>
      <App />
    </StrictMode>
  </Providers>,
)
`)
  })

  it('edits the Create React App root, with its semicolons', () => {
    const source = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`
    expect(wrapRoot(source, IMPORT)).toBe(`import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Providers } from './theme/Providers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Providers>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Providers>
);
`)
  })

  it('wraps the first argument of ReactDOM.render, and leaves the container alone', () => {
    const source =
      'import ReactDOM from "react-dom"\nReactDOM.render(<App />, document.getElementById("root"))\n'
    expect(wrapRoot(source, IMPORT)).toBe(
      'import ReactDOM from "react-dom"\nimport { Providers } from "./theme/Providers"\nReactDOM.render(<Providers><App /></Providers>, document.getElementById("root"))\n'
    )
  })

  it('indents with tabs in a file indented with tabs', () => {
    const source = 'root.render(\n\t<App\n\t\ttitle="x"\n\t/>\n)\n'
    expect(wrapRoot(source, IMPORT)).toBe(
      `${IMPORT}\nroot.render(\n\t<Providers>\n\t\t<App\n\t\t\ttitle="x"\n\t\t/>\n\t</Providers>\n)\n`
    )
  })

  it('reads past brackets, strings and comments inside the tree', () => {
    const source = [
      'root.render(',
      '  <App',
      '    items={[1, 2].map((item) => ({ item }))}',
      '    label=")"',
      '    hint={`a ${"}"} b`}',
      "    note={'it\\'s'}",
      '    // a comment with )',
      '    /* and ) here */',
      '  />',
      ')',
      '',
    ].join('\n')
    const wrapped = wrapRoot(source, IMPORT)!
    expect(wrapped).toContain('  <Providers>\n    <App\n')
    expect(wrapped).toContain('    />\n  </Providers>\n)\n')
  })

  it('returns null for a root that is not the standard shape', () => {
    // Two render calls: which one is the app's is a guess.
    expect(wrapRoot('a.render(<A />)\nb.render(<B />)', IMPORT)).toBeNull()
    // No render call at all.
    expect(wrapRoot('ReactDOM.hydrate(<App />, el)', IMPORT)).toBeNull()
    // The tree comes from a variable, not JSX.
    expect(wrapRoot('root.render(app)', IMPORT)).toBeNull()
    expect(wrapRoot('root.render(createElement(App))', IMPORT)).toBeNull()
    // The call never closes, or its brackets do not match.
    expect(wrapRoot('root.render(<App />', IMPORT)).toBeNull()
    expect(wrapRoot('root.render(<App x={1)} />)', IMPORT)).toBeNull()
    // A comment or string left open runs to the end of the file.
    expect(wrapRoot('root.render(<App /> /* open', IMPORT)).toBeNull()
    expect(wrapRoot('root.render(<App /> // open', IMPORT)).toBeNull()
  })
})

describe('insertImport', () => {
  it('puts the import first in a file that has none', () => {
    expect(insertImport('root.render(<App />)\n', IMPORT)).toBe(`${IMPORT}\nroot.render(<App />)\n`)
  })

  it('reads an import that spans lines as one', () => {
    const source = "import {\n  a,\n  b,\n} from 'x'\n\nrun()\n"
    expect(insertImport(source, IMPORT)).toBe(
      `import {\n  a,\n  b,\n} from 'x'\n${IMPORT}\n\nrun()\n`
    )
  })

  it('does not take a dynamic import for a declaration', () => {
    expect(insertImport("import('x')\n", IMPORT)).toBe(`${IMPORT}\nimport('x')\n`)
  })
})
