'use client'

import { configureEngine } from '../../style/engine'

// An app may reach the hook without a styled component.
configureEngine()

/**
 * Whether a media query (`(min-width: 600px)`) matches, for what a style cannot do: render one
 * structure or another. The answer is `defaultMatches` (false unless given) on the server and in the
 * first render of a hydration, and the browser's follows at once.
 */
export { useMediaQuery } from '@umber-style/react'
