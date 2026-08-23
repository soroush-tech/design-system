import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { LiveContext } from 'react-live'
import { TrackedEditor } from './TrackedEditor'

vi.mock('react-live', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-live')>()
  return {
    ...actual,
    LiveEditor: ({ onChange }: { onChange: (code: string) => void }) => (
      <button type="button" onClick={() => onChange('edited buffer')}>
        type
      </button>
    ),
  }
})

describe('TrackedEditor', () => {
  it("feeds edits to both the provider's evaluator and the tracker", () => {
    const contextOnChange = vi.fn()
    const onCodeChange = vi.fn()
    render(
      <LiveContext.Provider
        value={{
          code: '',
          language: 'jsx',
          disabled: false,
          onChange: contextOnChange,
          onError: vi.fn(),
        }}
      >
        <TrackedEditor onCodeChange={onCodeChange} />
      </LiveContext.Provider>
    )
    fireEvent.click(screen.getByRole('button', { name: 'type' }))
    expect(contextOnChange).toHaveBeenCalledWith('edited buffer')
    expect(onCodeChange).toHaveBeenCalledWith('edited buffer')
  })
})
