/** @jsxImportSource @emotion/react */
import { css as emotionCss, jsx, Global as EmotionGlobal } from '@emotion/react'
import createEmotionServer from '@emotion/server/create-instance'
import { createCache, CacheProvider } from '@gild-ui/react/engine'
import createEmotionCache from '@emotion/cache'
import { useServerInsertedHTML } from 'next/navigation'
import { renderToString } from 'react-dom/server'

const cache = createCache({ key: 'dc', nonce: window.nonce })
const other = createCache({ key: 'x' })
const server = createEmotionServer(cache)

export function Registry({ children }: { children: React.ReactNode }) {
  useServerInsertedHTML(() => <style data-emotion="dc" />)
  const { css, ids } = server.extractCritical(renderToString(<>{children}</>))
  return <CacheProvider value={cache}>{children}</CacheProvider>
}

export { emotionCss, jsx, EmotionGlobal, other, createEmotionCache }
