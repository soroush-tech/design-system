import { dirname } from 'node:path'
import type { Plan } from '../plan/planInit'
import {
  findMissingDirectories,
  nodeFileSystem,
  resolveInside,
  type FileSystem,
} from './fileSystem'

/** A write failed. `isUndone` says whether every change made before it was taken back. */
export class ApplyError extends Error {
  readonly isUndone: boolean

  constructor(message: string, isUndone: boolean) {
    super(message)
    this.name = 'ApplyError'
    this.isUndone = isUndone
  }
}

/**
 * Writes the plan's files and edits. Each change keeps a step that takes it back, in memory: when
 * one write fails, the steps run in reverse, so the app is left as it was. Each edit is checked
 * against the file before it is written and read back after.
 */
export function applyPlan(plan: Plan, root: string, fileSystem: FileSystem = nodeFileSystem): void {
  const undoSteps: (() => void)[] = []
  try {
    for (const file of plan.creates) {
      const absolute = resolveInside(root, file.path, fileSystem)
      for (const directory of findMissingDirectories(root, dirname(absolute), fileSystem)) {
        fileSystem.createDirectory(directory)
        undoSteps.push(() => fileSystem.removeDirectory(directory))
      }
      fileSystem.createFile(absolute, file.content)
      undoSteps.push(() => fileSystem.removeFile(absolute))
    }
    for (const edit of plan.edits) {
      const absolute = resolveInside(root, edit.path, fileSystem)
      if (fileSystem.readFile(absolute) !== edit.before) {
        throw new Error(`${edit.path} changed while init was running`)
      }
      // Kept before the write, so a file left half written is restored too.
      undoSteps.push(() => fileSystem.writeFile(absolute, edit.before))
      fileSystem.writeFile(absolute, edit.after)
      if (fileSystem.readFile(absolute) !== edit.after) {
        throw new Error(`${edit.path} did not read back as init wrote it`)
      }
    }
  } catch (error) {
    let isUndone = true
    for (const undo of undoSteps.reverse()) {
      try {
        undo()
      } catch {
        isUndone = false
      }
    }
    throw new ApplyError((error as Error).message, isUndone)
  }
}
