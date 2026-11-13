import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Providers } from './theme/Providers.ts'

createRoot(document.getElementById('root')!).render(
  <Providers>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Providers>
)
