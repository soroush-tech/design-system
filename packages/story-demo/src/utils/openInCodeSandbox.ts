import { buildSandboxProject, type SandboxOptions } from './buildSandboxProject'
import { createSandboxParameters } from './createSandboxParameters'

export const SANDBOX_DEFINE_URL = 'https://codesandbox.io/api/v1/sandboxes/define'

/**
 * Opens the demo as an editable sandbox: synthesizes the project, compresses it, and
 * POSTs it to the define endpoint through a throwaway hidden form targeting a new tab.
 */
export const openInCodeSandbox = (title: string, source: string, options: SandboxOptions): void => {
  const parameters = createSandboxParameters(buildSandboxProject(title, source, options))
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = SANDBOX_DEFINE_URL
  form.target = '_blank'
  const input = document.createElement('input')
  input.type = 'hidden'
  input.name = 'parameters'
  input.value = parameters
  form.appendChild(input)
  document.body.appendChild(form)
  form.submit()
  form.remove()
}
