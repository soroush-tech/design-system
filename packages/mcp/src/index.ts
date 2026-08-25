// The package's programmatic API: build the server and connect it to any transport.
export { createMcpServer, SERVER_NAME } from './server'
export { content, findComponent, findDoc } from './content'
export { search, type SearchHit } from './search'
export type { ComponentRecord, ContentBundle, DocRecord, TokenScale } from './types'
