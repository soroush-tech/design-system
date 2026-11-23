'use client'

import { useServerInsertedHTML } from 'next/navigation'
import { useState } from 'react'
import { CacheProvider, createCache, Global } from '@soroush.design/react/engine'
import { ThemeProvider } from '@soroush.design/react/theme'
import { light } from '@/theme'

/** Collects the styles rendered on the server and re-injects them into the
 *  HTML stream, so server-rendered markup arrives already styled. */
function useStyleRegistry(nonce?: string) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: 'soroush', nonce })
    cache.compat = true
    const prevInsert = cache.insert
    let inserted: string[] = []
    cache.insert = (...args) => {
      const serialized = args[1]
      if (cache.inserted[serialized.name] === undefined) inserted.push(serialized.name)
      return prevInsert(...args)
    }
    const flush = () => {
      const prev = inserted
      inserted = []
      return prev
    }
    return { cache, flush }
  })

  useServerInsertedHTML(() => {
    const names = flush()
    if (names.length === 0) return null
    let styles = ''
    for (const name of names) styles += cache.inserted[name]
    return (
      <style
        key={cache.key}
        nonce={cache.nonce}
        data-umber={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    )
  })

  return cache
}

export default function Providers({
  children,
  nonce,
}: Readonly<{ children: React.ReactNode; nonce?: string }>) {
  const cache = useStyleRegistry(nonce)
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={light}>
        <Global
          styles={(theme) => ({
            '*, *::before, *::after': { boxSizing: 'border-box' },
            body: {
              margin: 0,
              backgroundColor: theme.background.primary,
              color: theme.text.initial,
              fontFamily: theme.fonts.body,
            },
          })}
        />
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
}
