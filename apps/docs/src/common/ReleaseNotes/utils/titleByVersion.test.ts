import { describe, expect, it } from 'vitest'
import { titleByVersion } from './titleByVersion'

describe('titleByVersion', () => {
  it.each([
    ['## @soroush.design/react@0.1.0\n\nbody', '## v0.1.0\n\nbody'],
    ['## @soroush.tech/ui-spec@0.1.2', '## v0.1.2'],
    ['## soroush.design@0.1.0\n\nbody', '## v0.1.0\n\nbody'],
  ])('turns the heading of %j into the version', (body, expected) => {
    expect(titleByVersion(body)).toBe(expected)
  })

  it('leaves a body with no such heading as it is', () => {
    expect(titleByVersion('## Notes\n\ntext')).toBe('## Notes\n\ntext')
  })
})
