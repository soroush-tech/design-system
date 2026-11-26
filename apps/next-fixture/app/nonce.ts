import { setNonceSource } from '@umber-style/react'
import { headers } from 'next/headers'

// Where the nonce of a request comes from: the `x-nonce` header that proxy.ts sets.
setNonceSource(async () => (await headers()).get('x-nonce') ?? undefined)
