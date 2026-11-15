// The examples the libraries add to a new app, written the same for every starter: the API the
// app calls, the mock API that answers it, the counter and the greeting of the home page, and the
// form. Each one follows the developer's choices: the data library reads and sends through its own
// hooks, the state library holds the count, msw answers every call the app makes.
import type { Library } from './libraries'
import type { StarterFacts } from './starters'

/** The facts a recipe reads. */
export type RecipeFacts = Pick<StarterFacts, 'isTypeScript' | 'libraries' | 'hasSampleData'>

type DataLibrary = 'tanstack-query' | 'swr'
type StateLibrary = 'zustand' | 'jotai' | 'redux-toolkit'

/** The library that fetches data, if one was picked. */
export const getDataLibrary = (libraries: readonly Library[]) =>
  (['tanstack-query', 'swr'] as const).find((library) => libraries.includes(library)) as
    | DataLibrary
    | undefined

/** The library that holds global state, if one was picked. */
export const getStateLibrary = (libraries: readonly Library[]) =>
  (['zustand', 'jotai', 'redux-toolkit'] as const).find((library) =>
    libraries.includes(library)
  ) as StateLibrary | undefined

/** Whether the app has `src/data/api`: a data library reads it, or msw answers it. */
export const hasApi = (libraries: readonly Library[]) =>
  getDataLibrary(libraries) !== undefined || libraries.includes('msw')

const typeOnly = (isTypeScript: boolean) => (typeScriptOnly: string) =>
  isTypeScript ? typeScriptOnly : ''

/**
 * `src/data/api`: what the app asks its API. With msw, each call is a request the mock API
 * answers; without it, the function answers as an API would, until it fetches from yours.
 */
export function createApiSource({ isTypeScript, libraries, hasSampleData }: RecipeFacts): string {
  const t = typeOnly(isTypeScript)
  const hasMocks = libraries.includes('msw')
  const hasForm = libraries.includes('react-hook-form')
  const hasItems = hasSampleData && getDataLibrary(libraries) !== undefined
  const types =
    t(`${hasItems && hasMocks ? "import type { Item } from './items'\n\n" : ''}/** What the API says to the app. */
export interface Greeting {
  message: string
}
${
  hasForm
    ? `
/** What the form sends. */
export interface Message {
  name: string
  email: string
}
`
    : ''
}
`)
  const greeting = hasMocks
    ? `/** A greeting, from the API: while VITE_MSW is true, the mock API of src/mocks answers. */
export async function fetchGreeting()${t(': Promise<Greeting>')} {
  const response = await fetch('/api/greeting')
  if (!response.ok) throw new Error(\`GET /api/greeting answered \${response.status}\`)
  return response.json()
}
`
    : `/** A greeting, as an API would answer: make it fetch from yours. */
export async function fetchGreeting()${t(': Promise<Greeting>')} {
  return { message: 'Hello from src/data/api: make it fetch from your API.' }
}
`
  const message = !hasForm
    ? ''
    : hasMocks
      ? `
/** Sends the form's values to the API, which answers what it made of them. */
export async function sendMessage(message${t(': Message')})${t(': Promise<Greeting>')} {
  const response = await fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message),
  })
  if (!response.ok) throw new Error(\`POST /api/messages answered \${response.status}\`)
  return response.json()
}
`
      : `
/** Sends the form's values, as an API would take them: make it post to yours. */
export async function sendMessage(message${t(': Message')})${t(': Promise<Greeting>')} {
  return { message: \`Thanks, \${message.name}: your message was sent.\` }
}
`
  const items = !hasItems
    ? ''
    : hasMocks
      ? `
/** The items, from the API: while VITE_MSW is true, the mock API of src/mocks answers. */
export async function fetchItems()${t(": Promise<Pick<Item, 'id' | 'title' | 'status'>[]>")} {
  const response = await fetch('/api/items')
  if (!response.ok) throw new Error(\`GET /api/items answered \${response.status}\`)
  return response.json()
}

/** One item, from the API. */
export async function fetchItem(id${t(': string')})${t(': Promise<Item>')} {
  const response = await fetch(\`/api/items/\${id}\`)
  if (!response.ok) throw new Error(\`GET /api/items/\${id} answered \${response.status}\`)
  return response.json()
}
`
      : `
/** The items, as an API would answer: make it fetch from yours. */
export async function fetchItems() {
  return items.map(({ id, title, status }) => ({ id, title, status }))
}

/** One item, as an API would answer: make it fetch from yours. */
export async function fetchItem(id${t(': string')}) {
  const item = items.find((candidate) => candidate.id === id)
  if (!item) throw new Error(\`There is no item \${id}.\`)
  return item
}
`
  const itemsImport = hasItems && !hasMocks ? "import { items } from './items'\n\n" : ''
  return `${itemsImport}${types}${greeting}${message}${items}`
}

/** `src/mocks/handlers`: what the mock API answers, for each call `src/data/api` makes. */
export function createHandlersSource({ libraries, hasSampleData }: RecipeFacts): string {
  const message = libraries.includes('react-hook-form')
    ? `  http.post('/api/messages', async ({ request }) => {
    const { name } = await request.json()
    return HttpResponse.json({ message: \`Thanks, \${name}: the mock API took your message.\` })
  }),
`
    : ''
  const items = hasSampleData
    ? `  http.get('/api/items', () =>
    HttpResponse.json(items.map(({ id, title, status }) => ({ id, title, status })))
  ),
  http.get('/api/items/:id', ({ params }) => {
    const item = items.find(({ id }) => id === params.id)
    return item ? HttpResponse.json(item) : new HttpResponse(null, { status: 404 })
  }),
`
    : ''
  return `import { http, HttpResponse } from 'msw'
${hasSampleData ? "import { items } from '../data/items'\n" : ''}
/** The mock API: what it answers, by method and path. Add a handler for each call the app makes. */
export const handlers = [
  http.get('/api/greeting', () => HttpResponse.json({ message: 'Hello from the mock API' })),
${message}${items}]
`
}

/** Where the counter keeps its count, and how it reads and adds to it. */
function getCounterHolder(
  holder: StateLibrary | undefined,
  t: (typeScriptOnly: string) => string,
  stateFolder: string
): { imports: string; lines: string; where: string } {
  if (holder === 'zustand') {
    return {
      imports: `import { useCounter } from '${stateFolder}/counter'\n`,
      lines: '  const { count, increment } = useCounter()\n',
      where: 'a zustand store, src/state/counter',
    }
  }
  if (holder === 'jotai') {
    return {
      imports: `import { useAtom } from 'jotai'\nimport { countAtom } from '${stateFolder}/counter'\n`,
      lines:
        '  const [count, setCount] = useAtom(countAtom)\n  const increment = () => setCount(count + 1)\n',
      where: 'a Jotai atom, src/state/counter',
    }
  }
  if (holder === 'redux-toolkit') {
    return {
      imports: `import { useDispatch, useSelector } from 'react-redux'\nimport { incremented${t(', type RootState')} } from '${stateFolder}/store'\n`,
      lines: `  const count = useSelector((state${t(': RootState')}) => state.count)
  const dispatch = useDispatch()
  const increment = () => dispatch(incremented())
`,
      where: 'the Redux store, src/state/store',
    }
  }
  return {
    imports: "import { useState } from 'react'\n",
    lines:
      '  const [count, setCount] = useState(0)\n  const increment = () => setCount(count + 1)\n',
    where: "the component's own state",
  }
}

/**
 * The counter of the home page: a button and the count it adds to, held in the state library
 * picked, or in the component's own state. `stateFolder` is `src/state`, from the component.
 */
export function createCounterSource(
  { isTypeScript, libraries }: RecipeFacts,
  stateFolder: string
): string {
  const t = typeOnly(isTypeScript)
  const { imports, lines, where } = getCounterHolder(getStateLibrary(libraries), t, stateFolder)
  const [reactImports, ownImports] = imports.startsWith('import { useState }')
    ? [imports, '']
    : ['', imports]
  return `${reactImports}import { Button } from '@soroush.tech/design-system/Button'
import { Flex } from '@soroush.tech/design-system/Flex'
import { Typography } from '@soroush.tech/design-system/Typography'
${ownImports}
/** A count, held in ${where}, and the button that adds to it. */
export function Counter() {
${lines}  return (
    <Flex flexDirection="row" alignItems="center" gap={2}>
      <Button size="sm" variant="outlined" onClick={increment}>
        Count
      </Button>
      <Typography>Count: {count}</Typography>
    </Flex>
  )
}
`
}

/** The counter's state, in a library of its own: zustand's store or Jotai's atom. */
export function createCounterStateSource({ isTypeScript, libraries }: RecipeFacts) {
  const t = typeOnly(isTypeScript)
  if (getStateLibrary(libraries) === 'zustand') {
    return `import { create } from 'zustand'
${t(`
interface CounterState {
  count: number
  increment: () => void
}
`)}
/** The home page's count: a zustand store, which any component can read. */
export const useCounter = create${t('<CounterState>()')}((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}))
`
  }
  return `import { atom } from 'jotai'

/** The home page's count: a Jotai atom, which any component can read. */
export const countAtom = atom(0)
`
}

/**
 * The greeting of the home page: what the API answers, read with the data library picked, or with
 * `fetch` when only msw is there. `apiImport` is `src/data/api`, from the component.
 */
export function createGreetingSource({ isTypeScript, libraries }: RecipeFacts, apiImport: string) {
  const t = typeOnly(isTypeScript)
  const dataLibrary = getDataLibrary(libraries)
  const typeImport = t(`import type { Greeting } from '${apiImport}'\n`)
  const [imports, lines] =
    dataLibrary === 'tanstack-query'
      ? [
          `import { useQuery } from '@tanstack/react-query'\n`,
          "  const { data } = useQuery({ queryKey: ['greeting'], queryFn: fetchGreeting })\n",
        ]
      : dataLibrary === 'swr'
        ? [`import useSWR from 'swr'\n`, "  const { data } = useSWR('greeting', fetchGreeting)\n"]
        : [
            `import { useEffect, useState } from 'react'\n`,
            `  const [data, setData] = useState${t('<Greeting>')}()
  useEffect(() => {
    fetchGreeting().then(setData, () => setData({ message: 'The API did not answer.' }))
  }, [])
`,
          ]
  const reader =
    dataLibrary === 'tanstack-query'
      ? 'a query of TanStack Query'
      : dataLibrary === 'swr'
        ? 'SWR'
        : 'fetch, as the page loads'
  return `${imports}import { Typography } from '@soroush.tech/design-system/Typography'
${dataLibrary === undefined ? typeImport : ''}import { fetchGreeting } from '${apiImport}'

/** What the API says, read with ${reader}. */
export function Greeting() {
${lines}  return (
    <Typography color="secondary">
      {data ? data.message : 'Asking the API for a greeting...'}
    </Typography>
  )
}
`
}

/**
 * The form of React Hook Form: two fields of the design system's TextInput, which a Zod schema
 * checks before the form is sent - through the data library picked, or `src/data/api` when only
 * msw is there, else nowhere. `apiImport` is `src/data/api`, from the component; `name` is the
 * component's.
 */
export function createFormSource(
  { isTypeScript, libraries }: RecipeFacts,
  apiImport: string,
  name: string
): string {
  const t = typeOnly(isTypeScript)
  const dataLibrary = getDataLibrary(libraries)
  const sends = hasApi(libraries)
  const imports = [
    dataLibrary === undefined ? "import { useState } from 'react'\n" : '',
    "import { zodResolver } from '@hookform/resolvers/zod'\n",
    dataLibrary === 'tanstack-query' ? "import { useMutation } from '@tanstack/react-query'\n" : '',
    "import { Controller, useForm } from 'react-hook-form'\n",
    dataLibrary === 'swr' ? "import useSWRMutation from 'swr/mutation'\n" : '',
    "import { z } from 'zod'\n",
    "import { Button } from '@soroush.tech/design-system/Button'\n",
    "import { Flex } from '@soroush.tech/design-system/Flex'\n",
    "import { TextInput } from '@soroush.tech/design-system/TextInput'\n",
    "import { Typography } from '@soroush.tech/design-system/Typography'\n",
    sends ? `import { sendMessage } from '${apiImport}'\n` : '',
  ]
    .filter(Boolean)
    .join('')
  const [state, onSubmit, answer] =
    dataLibrary === 'tanstack-query'
      ? [
          '  const mutation = useMutation({ mutationFn: sendMessage })\n',
          '(values) => mutation.mutate(values)',
          'mutation.data ? <Typography>{mutation.data.message}</Typography> : null',
        ]
      : dataLibrary === 'swr'
        ? [
            isTypeScript
              ? `  const { trigger, data } = useSWRMutation('messages', (_key: string, { arg }: { arg: Values }) =>
    sendMessage(arg)
  )
`
              : "  const { trigger, data } = useSWRMutation('messages', (_key, { arg }) => sendMessage(arg))\n",
            '(values) => trigger(values)',
            'data ? <Typography>{data.message}</Typography> : null',
          ]
        : sends
          ? [
              `  const [answer, setAnswer] = useState${t('<string | null>')}(null)\n`,
              'async (values) => setAnswer((await sendMessage(values)).message)',
              'answer ? <Typography>{answer}</Typography> : null',
            ]
          : [
              `  const [sent, setSent] = useState${t('<Values | null>')}(null)\n`,
              'setSent',
              'sent ? <Typography>Thanks, {sent.name}: the form was valid.</Typography> : null',
            ]
  const how =
    dataLibrary === 'tanstack-query'
      ? 'sends them with a mutation of TanStack Query'
      : dataLibrary === 'swr'
        ? "sends them with SWR's mutation"
        : sends
          ? 'sends them to the API'
          : 'shows them'
  return `${imports}
/** What the form takes, and what it says when a value will not do. */
const schema = z.object({
  name: z.string().trim().min(1, 'Your name, please.'),
  email: z.email('An email address, please.'),
})
${t(`
type Values = z.infer<typeof schema>
`)}
/** A form whose values a Zod schema checks; once they pass, it ${how}. */
export default function ${name}() {
${state}  const { control, handleSubmit } = useForm${t('<Values>')}({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '' },
  })
  return (
    <Flex gap={2} alignItems="flex-start">
      <Typography variant="h2">Form</Typography>
      <Typography color="secondary">
        React Hook Form holds the values, and a Zod schema checks them when the form is sent.
      </Typography>
      <form noValidate onSubmit={handleSubmit(${onSubmit})}>
        <Flex gap={2} alignItems="flex-start">
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Flex gap={1}>
                <TextInput
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Name"
                  error={fieldState.invalid}
                  inputProps={{ 'aria-label': 'Name', autoComplete: 'name', onBlur: field.onBlur }}
                />
                <Typography variant="caption" color="error">
                  {fieldState.error?.message}
                </Typography>
              </Flex>
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Flex gap={1}>
                <TextInput
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  type="email"
                  placeholder="Email"
                  error={fieldState.invalid}
                  inputProps={{
                    'aria-label': 'Email',
                    autoComplete: 'email',
                    onBlur: field.onBlur,
                  }}
                />
                <Typography variant="caption" color="error">
                  {fieldState.error?.message}
                </Typography>
              </Flex>
            )}
          />
          <Button type="submit">Send</Button>
        </Flex>
      </form>
      {${answer}}
    </Flex>
  )
}
`
}
