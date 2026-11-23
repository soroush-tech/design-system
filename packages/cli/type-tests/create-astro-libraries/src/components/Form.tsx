import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@soroush.design/react/Button'
import { Flex } from '@soroush.design/react/Flex'
import { TextInput } from '@soroush.design/react/TextInput'
import { Typography } from '@soroush.design/react/Typography'
import { withIsland } from '../theme/Island'
import { sendMessage } from '../data/api'

/** What the form takes, and what it says when a value will not do. */
const schema = z.object({
  name: z.string().trim().min(1, 'Your name, please.'),
  email: z.email('An email address, please.'),
})

type Values = z.infer<typeof schema>

/** A form whose values a Zod schema checks; once they pass, it sends them with a mutation of TanStack Query. */
function Form() {
  const mutation = useMutation({ mutationFn: sendMessage })
  const { control, handleSubmit } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '' },
  })
  return (
    <Flex gap={2} alignItems="flex-start" px={3} py={4}>
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
                  inputProps={{
                    'aria-label': 'Name',
                    autoComplete: 'name',
                    onBlur: field.onBlur,
                  }}
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

export default withIsland(Form)
