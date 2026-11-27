'use client'

// The engine's client-only exports: the server components build has neither, so nothing a server
// component can reach imports this module.
import { configureEngine } from '../style/engine'

// An app may reach the cache or the theme context without a styled component.
configureEngine()

export { CacheProvider, ThemeContext as EngineThemeContext } from '@umber-style/react'
