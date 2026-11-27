// @if !tanstack-query && !swr
import { useState } from 'react'
// @endif
import { zodResolver } from '@hookform/resolvers/zod'
// @if tanstack-query
import { useMutation } from '@tanstack/react-query'
// @endif
import { Controller, useForm } from 'react-hook-form'
// @if swr
import useSWRMutation from 'swr/mutation'
// @endif
import { z } from 'zod'
import { Button } from '@gild-ui/react/Button'
import { Flex } from '@gild-ui/react/Flex'
import { TextInput } from '@gild-ui/react/TextInput'
import { Typography } from '@gild-ui/react/Typography'
// @if tanstack-query || swr || msw
import { sendMessage } from '../../data/api'
// @endif

/** What the form takes, and what it says when a value will not do. */
const schema = z.object({
  name: z.string().trim().min(1, 'Your name, please.'),
  email: z.email('An email address, please.'),
})

type Values = z.infer<typeof schema>

// @if tanstack-query
/** A form whose values a Zod schema checks; once they pass, it sends them with a mutation of TanStack Query. */
export default function Page() {
  const mutation = useMutation({ mutationFn: sendMessage })
  const { control, handleSubmit } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '' },
  })
  return (
    <Flex gap={2} alignItems="flex-start">
      <Typography variant="h2">Form</Typography>
      <Typography color="secondary">
        React Hook Form holds the values, and a Zod schema checks them when the form is sent.
      </Typography>
      <form noValidate onSubmit={handleSubmit((values) => mutation.mutate(values))}>
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
      {mutation.data ? <Typography>{mutation.data.message}</Typography> : null}
    </Flex>
  )
}
// @elif swr
/** A form whose values a Zod schema checks; once they pass, it sends them with SWR's mutation. */
export default function Page() {
  const { trigger, data } = useSWRMutation('messages', (_key: string, { arg }: { arg: Values }) =>
    sendMessage(arg)
  )
  const { control, handleSubmit } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '' },
  })
  return (
    <Flex gap={2} alignItems="flex-start">
      <Typography variant="h2">Form</Typography>
      <Typography color="secondary">
        React Hook Form holds the values, and a Zod schema checks them when the form is sent.
      </Typography>
      <form noValidate onSubmit={handleSubmit((values) => trigger(values))}>
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
      {data ? <Typography>{data.message}</Typography> : null}
    </Flex>
  )
}
// @elif msw
/** A form whose values a Zod schema checks; once they pass, it sends them to the API. */
export default function Page() {
  const [answer, setAnswer] = useState<string | null>(null)
  const { control, handleSubmit } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '' },
  })
  return (
    <Flex gap={2} alignItems="flex-start">
      <Typography variant="h2">Form</Typography>
      <Typography color="secondary">
        React Hook Form holds the values, and a Zod schema checks them when the form is sent.
      </Typography>
      <form
        noValidate
        onSubmit={handleSubmit(async (values) => setAnswer((await sendMessage(values)).message))}
      >
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
      {answer ? <Typography>{answer}</Typography> : null}
    </Flex>
  )
}
// @else
/** A form whose values a Zod schema checks; once they pass, it shows them. */
export default function Page() {
  const [sent, setSent] = useState<Values | null>(null)
  const { control, handleSubmit } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '' },
  })
  return (
    <Flex gap={2} alignItems="flex-start">
      <Typography variant="h2">Form</Typography>
      <Typography color="secondary">
        React Hook Form holds the values, and a Zod schema checks them when the form is sent.
      </Typography>
      <form noValidate onSubmit={handleSubmit(setSent)}>
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
      {sent ? <Typography>Thanks, {sent.name}: the form was valid.</Typography> : null}
    </Flex>
  )
}
// @endif
