// The platforms this umbrella points at, each mounted under its name: `soroush.design/react/Button`
// is `@soroush.design/react/Button`. A platform is added by one line here and an entry in
// `dependencies` of package.json; `pnpm gen:umbrellas` then writes its entry points. The options of
// a line are described on `Library`.
import type { Library } from '@soroush.design/umbrella-gen'

export const libraries: Library[] = [{ package: '@soroush.design/react', under: 'react' }]
