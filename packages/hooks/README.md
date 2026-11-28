# @gild-ui/hooks

[![npm version](https://img.shields.io/npm/v/@gild-ui/hooks.svg?cacheSeconds=86400)](https://www.npmjs.com/package/@gild-ui/hooks)
[![coverage](https://codecov.io/gh/soroush-tech/design-system/branch/main/graph/badge.svg?flag=hooks)](https://app.codecov.io/gh/soroush-tech/design-system?flags%5B0%5D=hooks)
[![license](https://img.shields.io/npm/l/@gild-ui/hooks.svg?cacheSeconds=86400)](./LICENSE)

React hooks that belong to no component and no theme: a stable event callback, merged refs, a
value that is controlled or not, a debounced value or callback, and copy to the clipboard. They
are useful in an app with none of our components, and the components are built on them.

```sh
npm i @gild-ui/hooks
```

Each hook has an entry point of its own, `@gild-ui/hooks/useDebounce`, so an app loads only
what it imports, and the root exports them all. The package depends on nothing of ours and has one peer, `react`.

Every hook below says whether it needs a browser. A hook that does not touches no DOM API, so it
renders on the server and can be shared with a React Native app; one that does reads a browser
API only when it is called, never when it is imported.

## useControlled

A value a control owns until its owner takes it over: the controlled value when there is one,
otherwise its own state. The setter keeps that state moving either way, so a control that stays
uncontrolled needs no branch. `undefined` leaves the control uncontrolled; `null` is a value.

Needs a browser: no.

```ts
import { useControlled } from '@gild-ui/hooks/useControlled'

function useControlled<T>(params: {
  /** The controlled value; `undefined` leaves the control uncontrolled. */
  controlled: T | undefined
  /** The value at first, when uncontrolled. */
  default: T
}): [value: T, setValue: (value: T) => void]
```

```tsx
function Counter({ value, defaultValue = 0, onChange }: CounterProps) {
  const [count, setCount] = useControlled({ controlled: value, default: defaultValue })
  return (
    <button
      onClick={() => {
        setCount(count + 1)
        onChange?.(count + 1)
      }}
    >
      {count}
    </button>
  )
}
```

## useCopyToClipboard

Copy text and show a confirmation: `copied` is `true` for `resetMs` after a successful copy, then
`false` again. Copying again restarts the window, and a reset still pending when the component
unmounts is cancelled.

Needs a browser: yes, the Clipboard API. It reads `navigator` only when `copy` is called, so
importing it and rendering on the server are safe, and `copy` does nothing where the API is
missing (an insecure page) or the write is rejected.

```ts
import { useCopyToClipboard } from '@gild-ui/hooks/useCopyToClipboard'

function useCopyToClipboard(resetMs?: number): {
  copied: boolean
  copy: (text: string) => void
}
```

`resetMs` defaults to 2000, exported as `COPIED_RESET_MS`.

```tsx
const { copied, copy } = useCopyToClipboard()
return <button onClick={() => copy(code)}>{copied ? 'Copied' : 'Copy'}</button>
```

## useDebounce

A value that follows the one you give it once that has stayed unchanged for `delayMs`. The first
render returns the value as it is, and a change during the delay restarts it. Use it to query on
the pause of a search box.

Needs a browser: no. It uses timers only, and renders on the server as the value it is given.

```ts
import { useDebounce } from '@gild-ui/hooks/useDebounce'

function useDebounce<T>(value: T, delayMs?: number): T
```

`delayMs` defaults to 500, exported as `DEBOUNCE_DELAY_MS`. The timer is cleared when the value
changes and when the component unmounts.

```tsx
const [query, setQuery] = useState('')
const settled = useDebounce(query, 300)
useEffect(() => {
  search(settled)
}, [settled])
```

## useDebouncedCallback

A function that calls your callback with the arguments of its last call, once `delayMs` has passed
with no other call. It always reaches the latest callback, its identity changes only with
`delayMs`, and a call still waiting when the component unmounts never runs. Use it where the
change is an event rather than a value: saving on the pause of typing.

Needs a browser: no. It uses timers only.

```ts
import { useDebouncedCallback } from '@gild-ui/hooks/useDebouncedCallback'

function useDebouncedCallback<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delayMs?: number
): (...args: Args) => void
```

```tsx
const save = useDebouncedCallback((text: string) => api.save(text), 800)
return <textarea onChange={(event) => save(event.target.value)} />
```

## useEventCallback

A stable function identity that always calls the latest `fn`. An effect or a memoized child can
depend on it without running again when the handler changes. The latest `fn` is read from an
effect, so it is safe to render on the server; it suits handlers that a user triggers, which run
after the effect.

Needs a browser: no.

```ts
import { useEventCallback } from '@gild-ui/hooks/useEventCallback'

function useEventCallback<Args extends unknown[], Return>(
  fn: (...args: Args) => Return
): (...args: Args) => Return
```

```tsx
const onTick = useEventCallback(() => setCount(count + 1))
useEffect(() => {
  const id = setInterval(onTick, 1000)
  return () => clearInterval(id)
}, [onTick])
```

## useMergedRefs

Merges two refs into one stable ref callback, so one element can be tracked by an internal ref and
by a `ref` the caller passes. It returns `null` when both are absent, so React attaches nothing,
and keeps its identity while the refs are the same.

Needs a browser: no. It only combines refs; attaching them is React's.

```ts
import { useMergedRefs } from '@gild-ui/hooks/useMergedRefs'

function useMergedRefs<T>(refA: Ref<T> | undefined, refB: Ref<T> | undefined): RefCallback<T> | null
```

```tsx
const inner = useRef<HTMLInputElement>(null)
const ref = useMergedRefs(inner, forwardedRef)
return <input ref={ref} />
```
