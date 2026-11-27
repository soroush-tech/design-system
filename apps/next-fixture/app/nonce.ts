import { setNonceSource } from '@gild-ui/react/engine'
import { headers } from 'next/headers'

// Where the nonce of a request comes from: the `x-nonce` header that proxy.ts sets.
setNonceSource(async () => (await headers()).get('x-nonce') ?? undefined)
