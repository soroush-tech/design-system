import { useEffect } from 'react'

// How long the section is held in view while the page settles, unless the reader moves first.
const SETTLE_MS = 3000
const READER_EVENTS = ['wheel', 'touchstart', 'keydown', 'mousedown'] as const

/**
 * Brings the element a URL's `#section` names into view once its page has rendered - on load,
 * and after each client-side navigation (a new `url`). The live demos above it render shorter
 * than their prerendered markup, and later than the page, so it is held in view while the page
 * resizes - until the reader scrolls or types, or the page has had time to settle. The page's
 * scroll padding is the sticky top bar's height, so the section lands below the bar - the
 * browser's own `#` jumps on the page after it too.
 */
export function useScrollToHash(url: string): void {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    const target = id ? document.getElementById(id) : null
    if (!target) return undefined
    const bar = document.querySelector('header')
    document.documentElement.style.scrollPaddingTop = `${bar?.getBoundingClientRect().height ?? 0}px`
    const bringIntoView = () => target.scrollIntoView()
    bringIntoView()
    const observer = new ResizeObserver(bringIntoView)
    observer.observe(document.body)
    const release = () => {
      observer.disconnect()
      clearTimeout(timer)
      for (const type of READER_EVENTS) window.removeEventListener(type, release)
    }
    const timer = setTimeout(release, SETTLE_MS)
    for (const type of READER_EVENTS) window.addEventListener(type, release, { passive: true })
    return release
  }, [url])
}
