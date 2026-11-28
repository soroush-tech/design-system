import { NextResponse, type NextRequest } from 'next/server'

// A strict policy with a new nonce for each request, as the framework's guide sets one: the nonce is
// in the policy of the response and in the request headers that the render reads (`x-nonce` is read by
// app/nonce.ts). Styles have no 'unsafe-inline'.
export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const policy = `style-src 'nonce-${nonce}'; script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('content-security-policy', policy)
  const response = NextResponse.next({ request: { headers: requestHeaders } })
  response.headers.set('content-security-policy', policy)
  return response
}

export const config = {
  matcher: [{ source: '/((?!_next/static|_next/image|favicon.ico).*)' }],
}
