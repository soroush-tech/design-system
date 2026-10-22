import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import type { RefObject } from 'react'
import { renderToString } from 'react-dom/server'
import { useTransition, type UseTransitionParams } from './useTransition'

const node = document.createElement('div')
const nodeRef: RefObject<HTMLElement | null> = { current: node }

const base: UseTransitionParams = {
  isShown: false,
  shouldAppear: true,
  shouldMountOnEnter: false,
  shouldUnmountOnExit: false,
  timeout: 100,
  nodeRef,
}

const tick = (ms: number) => act(() => vi.advanceTimersByTime(ms))

// A move starts a tick after the render that asks for it: each render here lets it begin.
const render = (props: Partial<UseTransitionParams> = {}) => {
  const view = renderHook(
    (params: Partial<UseTransitionParams>) => useTransition({ ...base, ...params }),
    { initialProps: props }
  )
  tick(0)
  return {
    ...view,
    rerender: (next: Partial<UseTransitionParams>) => {
      view.rerender(next)
      tick(0)
    },
  }
}

beforeEach(() => vi.useFakeTimers())
afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

describe('useTransition', () => {
  describe('where it starts', () => {
    it('is out when it is not shown', () => {
      expect(render().result.current.status).toBe('exited')
    })

    it('is in at once when shown, if it need not appear', () => {
      expect(render({ isShown: true, shouldAppear: false }).result.current.status).toBe('entered')
    })

    it('starts out and moves in on the first render when shown and it appears', () => {
      const { result } = render({ isShown: true })
      expect(result.current.status).toBe('entering')
      tick(100)
      expect(result.current.status).toBe('entered')
    })

    it('is out of the tree until shown when it mounts on enter or unmounts on exit', () => {
      expect(render({ shouldMountOnEnter: true }).result.current.status).toBe('unmounted')
      expect(render({ shouldUnmountOnExit: true }).result.current.status).toBe('unmounted')
    })
  })

  describe('moving', () => {
    it('goes in and out as isShown changes, calling each callback with the node in order', () => {
      const calls: string[] = []
      const callbacks = Object.fromEntries(
        ['onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'].map((name) => [
          name,
          (given: HTMLElement) => {
            expect(given).toBe(node)
            calls.push(name)
          },
        ])
      )
      const { result, rerender } = render(callbacks)
      rerender({ ...callbacks, isShown: true })
      expect(result.current.status).toBe('entering')
      tick(100)
      expect(result.current.status).toBe('entered')
      rerender({ ...callbacks, isShown: false })
      expect(result.current.status).toBe('exiting')
      tick(100)
      expect(result.current.status).toBe('exited')
      expect(calls).toEqual([
        'onEnter',
        'onEntering',
        'onEntered',
        'onExit',
        'onExiting',
        'onExited',
      ])
    })

    it('mounts a node that was out of the tree, out first, then moves it in', () => {
      const { result, rerender } = render({ shouldMountOnEnter: true })
      rerender({ shouldMountOnEnter: true, isShown: true })
      expect(result.current.status).toBe('entering')
    })

    it('leaves the tree once out when it unmounts on exit', () => {
      const { result, rerender } = render({
        shouldUnmountOnExit: true,
        isShown: true,
        shouldAppear: false,
      })
      rerender({ shouldUnmountOnExit: true, isShown: false, shouldAppear: false })
      tick(100)
      expect(result.current.status).toBe('unmounted')
    })

    it('turns round when asked the other way mid-move', () => {
      const { result, rerender } = render({ isShown: true })
      expect(result.current.status).toBe('entering')
      rerender({ isShown: false })
      expect(result.current.status).toBe('exiting')
      rerender({ isShown: true })
      expect(result.current.status).toBe('entering')
      tick(100)
      expect(result.current.status).toBe('entered')
    })

    it('takes a time for each way', () => {
      const { result, rerender } = render({ timeout: { enter: 50, exit: 200 }, isShown: true })
      expect(result.current.duration).toBe(50)
      tick(50)
      expect(result.current.status).toBe('entered')
      rerender({ timeout: { enter: 50, exit: 200 }, isShown: false })
      expect(result.current.duration).toBe(200)
      tick(199)
      expect(result.current.status).toBe('exiting')
      tick(1)
      expect(result.current.status).toBe('exited')
    })

    it('uses the latest callbacks, without starting over on a re-render', () => {
      const first = vi.fn()
      const second = vi.fn()
      const { rerender } = render({ isShown: true, onEntered: first })
      rerender({ isShown: true, onEntered: second })
      tick(100)
      expect(first).not.toHaveBeenCalled()
      expect(second).toHaveBeenCalledTimes(1)
    })

    it('stops its clock when it goes', () => {
      const onEntered = vi.fn()
      const { unmount } = render({ isShown: true, onEntered })
      unmount()
      tick(1000)
      expect(onEntered).not.toHaveBeenCalled()
    })

    it('moves with no node to tell, and calls no callback', () => {
      const onEnter = vi.fn()
      const onEntered = vi.fn()
      const onExit = vi.fn()
      const onExited = vi.fn()
      const empty: RefObject<HTMLElement | null> = { current: null }
      const props = { nodeRef: empty, onEnter, onEntered, onExit, onExited }
      const { result, rerender } = render({ ...props, isShown: true })
      tick(100)
      expect(result.current.status).toBe('entered')
      rerender({ ...props, isShown: false })
      tick(100)
      expect(result.current.status).toBe('exited')
      expect(onEnter).not.toHaveBeenCalled()
      expect(onEntered).not.toHaveBeenCalled()
      expect(onExit).not.toHaveBeenCalled()
      expect(onExited).not.toHaveBeenCalled()
    })
  })

  describe('less motion', () => {
    // A media query that can be told it changed.
    const stubQuery = (matches: boolean) => {
      const listeners = new Set<(event: { matches: boolean }) => void>()
      let current = matches
      vi.stubGlobal('matchMedia', () => ({
        get matches() {
          return current
        },
        addEventListener: (_type: string, listener: (event: { matches: boolean }) => void) =>
          listeners.add(listener),
        removeEventListener: (_type: string, listener: (event: { matches: boolean }) => void) =>
          listeners.delete(listener),
      }))
      return (next: boolean) => {
        current = next
        listeners.forEach((listener) => listener({ matches: next }))
      }
    }

    it('takes no time for a user who asked for less, and still calls the callbacks', () => {
      stubQuery(true)
      const onEntered = vi.fn()
      const { result } = render({ isShown: true, onEntered })
      expect(result.current.duration).toBe(0)
      tick(1)
      expect(result.current.status).toBe('entered')
      expect(onEntered).toHaveBeenCalledWith(node)
    })

    it('follows the preference as it changes, and stops listening when it goes', () => {
      const change = stubQuery(false)
      const { result, unmount } = render({ isShown: true })
      expect(result.current.duration).toBe(100)
      act(() => change(true))
      expect(result.current.duration).toBe(0)
      act(() => change(false))
      expect(result.current.duration).toBe(100)
      unmount()
      expect(() => change(true)).not.toThrow()
    })

    it('goes out at once too', () => {
      stubQuery(true)
      const onExited = vi.fn()
      const { result, rerender } = render({ isShown: true, shouldAppear: false, onExited })
      rerender({ isShown: false, onExited })
      expect(result.current.status).toBe('exiting')
      tick(1)
      expect(result.current.status).toBe('exited')
      expect(onExited).toHaveBeenCalledWith(node)
    })

    it('takes its time when the browser cannot say', () => {
      vi.stubGlobal('matchMedia', undefined)
      const { result, unmount } = render({ isShown: true })
      expect(result.current.duration).toBe(100)
      expect(unmount).not.toThrow()
    })

    it('is motion on a server, where there is no preference to ask', () => {
      stubQuery(true)
      const Probe = () => {
        const { duration } = useTransition({ ...base, isShown: true })
        return <span>{duration}</span>
      }
      expect(renderToString(<Probe />)).toContain('100')
    })
  })
})
