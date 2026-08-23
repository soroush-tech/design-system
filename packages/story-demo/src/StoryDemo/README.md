# StoryDemo

Renders a CSF3 Storybook story as an interactive docs demo: the rendered story on top,
a Storybook-style controls panel driven by the story's `argTypes`, and an always-editable
code panel (react-live) with collapsed/expanded views, a TS/JS toggle, copy, reset, and
CodeSandbox export. The shown code is synthesized from the real story source - used
imports, transitive helper closure, and args serialization included.

The page prerenders a read-only view (composed via portable stories) and upgrades to the
live editor after hydration once the scope resolves. Controls, the language toggle, and
expand/collapse each regenerate the buffer from the story model, discarding manual edits;
reset restores everything.

---

## StoryDemo-specific props

### `stories`

The stories module, imported as a namespace: `import * as stories from './X.stories'`.

### `source`

The same module's raw text (`?raw` import) - parsed into the displayed code.

### `storyName`

The named story export to demo.

### `title`

Section heading above the demo.

### `description`

Optional prose under the heading.

### `scope`

Identifiers available to live-edited code (components, tokens, css helpers). Either a
plain record or a `() => Promise<record>` loader - the loader defers the scope chunk to
after hydration, and a failed load leaves the read-only view in place.

### `versions`

Version pins for own packages in the CodeSandbox export; unlisted imports ride `latest`.

### `reactVersion`

The `react` / `react-dom` pin for the sandbox `package.json`. Default: `` `latest` ``.

### `packageName`

The npm package that the stories' relative imports are rewritten to. Default:
`` `@soroush.tech/design-system` ``.

## Controls

The panel appears when the merged `parameters.controls.include` list is non-empty and the
story consumes args (args-driven, or a `render` with an args parameter). Supported
control types: `boolean`, `text`, `number`, `select`, `inline-radio`, `range` - unset
selects and inputs show the argType's `table.defaultValue.summary`.

## Examples

```tsx
import { StoryDemo } from '@soroush.tech/story-demo/StoryDemo'
import * as buttonStories from 'packages/design-system/src/Button/Button.stories'
import buttonSource from 'packages/design-system/src/Button/Button.stories.tsx?raw'

;<StoryDemo
  stories={buttonStories}
  source={buttonSource}
  storyName="Variants"
  title="Variants"
  scope={() => import('./scope').then((module) => module.demoScope)}
  versions={{ '@soroush.tech/design-system': '^1.3.3' }}
  reactVersion="^19.2.8"
/>
```
