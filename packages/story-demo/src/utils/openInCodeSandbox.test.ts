import { describe, it, expect, vi, afterEach } from 'vitest'
import { openInCodeSandbox, SANDBOX_DEFINE_URL } from './openInCodeSandbox'

describe('openInCodeSandbox', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('submits the compressed project to the define endpoint in a new tab', () => {
    let action = ''
    let target = ''
    let parameters = ''
    const submitSpy = vi
      .spyOn(HTMLFormElement.prototype, 'submit')
      .mockImplementation(function (this: HTMLFormElement) {
        action = this.action
        target = this.target
        parameters = (this.querySelector('input[name="parameters"]') as HTMLInputElement).value
      })
    openInCodeSandbox(
      'Basic button group',
      "import { Button } from '@soroush.tech/design-system/Button'",
      { language: 'ts', versions: {}, reactVersion: '^19.2.8' }
    )
    expect(submitSpy).toHaveBeenCalledOnce()
    expect(action).toBe(SANDBOX_DEFINE_URL)
    expect(target).toBe('_blank')
    expect(parameters.length).toBeGreaterThan(0)
    // The throwaway form is cleaned up after submitting.
    expect(document.querySelector('form')).toBeNull()
  })
})
