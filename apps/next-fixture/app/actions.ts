'use server'

import { cookies } from 'next/headers'
import { cookieName } from './theme'

/** Switches the page between its themes: the layout reads the cookie on the next render. */
export async function switchScheme() {
  const jar = await cookies()
  jar.set(cookieName, jar.get(cookieName)?.value === 'dark' ? 'light' : 'dark')
}
