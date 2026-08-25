// Docs-bundle replacement for `storybook/test`, wired up as a vite alias. The real
// module drags the whole vitest expect/spy stack into the client bundle, but the docs
// app only renders stories - play functions and assertions never run. The exports
// cover everything the storybook runtime and the demoed stories import; all inert.
type AnyFunction = (...args: unknown[]) => unknown

const noop: AnyFunction = () => undefined

/** Story arg mocks (`onClick: fn()`) become plain no-op handlers. */
export const fn = (implementation?: AnyFunction): AnyFunction => implementation ?? noop

export const isMockFunction = (): boolean => false
export const onMockCall = (): AnyFunction => noop
export const clearAllMocks: AnyFunction = noop
export const resetAllMocks: AnyFunction = noop
export const restoreAllMocks: AnyFunction = noop
export const configure: AnyFunction = noop
export const expect: AnyFunction = noop
export const within: AnyFunction = noop
export const userEvent: Record<string, never> = {}
export const uninstrumentedUserEvent: Record<string, never> = {}
