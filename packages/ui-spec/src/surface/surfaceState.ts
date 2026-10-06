import type { Finding } from '../findings'
import { isObject, type JsonObject, setOwn } from '../types'
import { getHolder, parsePointer } from './pointer'

/** A component of a surface. The envelope has already established that it has both names. */
export interface Component extends JsonObject {
  id: string
  component: string
  catalogId?: string
}

/** A component and where it sits in the messages, so a finding can point at it. */
export interface Placed {
  component: Component
  path: string
}

/** What a run of messages leaves a surface holding. */
export interface Surface {
  surfaceId: string
  /** The catalog a component or call resolves to when it names none. */
  catalogId?: string
  components: Map<string, Placed>
  dataModel: JsonObject
  /** What `createSurface.metadata.extensions` carried, which is where a behavior link rides. */
  extensions: JsonObject
}

interface ComponentsMessage {
  surfaceId: string
  catalogId?: string
  components?: Component[]
}
interface DataModelMessage {
  surfaceId: string
  path?: string
  value: unknown
}
interface Message {
  createSurface?: ComponentsMessage & {
    dataModel?: JsonObject
    metadata?: { extensions?: JsonObject }
  }
  updateComponents?: ComponentsMessage
  updateDataModel?: DataModelMessage
  deleteSurface?: { surfaceId: string }
}

/**
 * The surfaces a run of envelope-valid messages describes, each as it stands after the last one.
 *
 * A stream is validated as its end state: a child that arrives two messages after its parent is
 * not missing. A component sent again replaces the earlier one, which is how an update is
 * written, so only an id repeated inside one message is a duplicate.
 *
 * A message for a surface no `createSurface` introduced still makes one. Dropping it would hide
 * its components from every check; kept, they are reported for the catalog they cannot resolve.
 */
export const readSurfaces = (messages: Message[]): { surfaces: Surface[]; findings: Finding[] } => {
  const surfaces = new Map<string, Surface>()
  const findings: Finding[] = []
  const getSurface = (surfaceId: string): Surface => {
    let surface = surfaces.get(surfaceId)
    if (surface === undefined) {
      surface = { surfaceId, components: new Map(), dataModel: {}, extensions: {} }
      surfaces.set(surfaceId, surface)
    }
    return surface
  }
  const place = ({ surfaceId, components = [] }: ComponentsMessage, at: string) => {
    const surface = getSurface(surfaceId)
    const seen = new Set<string>()
    components.forEach((component, index) => {
      const path = `${at}/components/${index}`
      if (seen.has(component.id)) {
        findings.push({
          code: 'duplicate-id',
          path,
          componentId: component.id,
          message: `The id "${component.id}" is used twice in one message.`,
        })
      }
      seen.add(component.id)
      surface.components.set(component.id, { component, path })
    })
  }
  messages.forEach(({ createSurface, updateComponents, updateDataModel, deleteSurface }, index) => {
    if (createSurface !== undefined) {
      const surface = getSurface(createSurface.surfaceId)
      surface.catalogId = createSurface.catalogId
      surface.dataModel = structuredClone(createSurface.dataModel ?? {})
      surface.extensions = createSurface.metadata?.extensions ?? {}
      place(createSurface, `/${index}/createSurface`)
    }
    if (updateComponents !== undefined) place(updateComponents, `/${index}/updateComponents`)
    if (updateDataModel !== undefined) {
      const surface = getSurface(updateDataModel.surfaceId)
      const segments = parsePointer(updateDataModel.path ?? '/')
      const value = structuredClone(updateDataModel.value)
      if (segments.length === 0) {
        // The root holds keys, so a root replaced by anything but an object is an empty one.
        surface.dataModel = isObject(value) ? value : {}
      } else {
        // The value replaces what is there, and `null` removes the key. From a list that is the
        // item itself, as a JSON Patch `remove` does: deleting the index would leave a hole.
        const [holder, key] = getHolder(surface.dataModel, segments)
        if (value !== null) setOwn(holder, key, value)
        else if (Array.isArray(holder) && /^\d+$/.test(key)) holder.splice(Number(key), 1)
        else delete holder[key]
      }
    }
    if (deleteSurface !== undefined) surfaces.delete(deleteSurface.surfaceId)
  })
  return { surfaces: [...surfaces.values()], findings }
}
