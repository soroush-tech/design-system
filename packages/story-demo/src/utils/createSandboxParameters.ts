// lz-string ships CJS only - the namespace default is the interop-safe import in Node ESM.
import lzString from 'lz-string'
import type { SandboxFiles } from './buildSandboxProject'

/**
 * The `parameters` payload of the sandbox define API: the file map, LZ-compressed to
 * URL-safe base64 (the encoding the endpoint documents).
 */
export const createSandboxParameters = (files: SandboxFiles): string =>
  lzString
    .compressToBase64(JSON.stringify({ files }))
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    // Bounded rather than `=+$`: base64 padding is never longer than two characters,
    // and an unbounded trailing repeat backtracks on a long run of '='.
    .replace(/={0,2}$/, '')
