import type { Behavior } from '../behavior/dataModel'
import { DESIGN_SYSTEM_ID } from './catalogs'

// The contact form of soroush.tech (`ContactInquire`, `useContactSubmit`, `useTurnstile`): inputs
// bound two ways, a button whose event runs a mutation, and the mutation's status shown in place
// of the button. It exists so that the mutation, trigger and request vocabulary of the behavior
// document is exercised by something real.

export const contactSurface = [
  {
    version: 'v1.0',
    createSurface: {
      surfaceId: 'contact_page',
      catalogId: DESIGN_SYSTEM_ID,
      dataModel: { form: { name: '', email: '', message: '', result: null } },
      components: [
        {
          id: 'root',
          component: 'Flex',
          flexDirection: 'column',
          gap: 2,
          children: ['name_input', 'email_input', 'message_input', 'submit_state'],
        },
        {
          id: 'name_input',
          component: 'TextInput',
          label: 'Name',
          value: { '@path': '/form/name' },
        },
        {
          id: 'email_input',
          component: 'TextInput',
          label: 'Email',
          value: { '@path': '/form/email' },
        },
        {
          id: 'message_input',
          component: 'TextInput',
          label: 'Message',
          multiline: true,
          value: { '@path': '/form/message' },
        },
        {
          id: 'submit_state',
          component: 'When',
          value: { '@path': '/resources/submit/status' },
          cases: [
            { when: 'pending', child: 'sending' },
            { when: 'ready', child: 'sent' },
            { when: 'error', child: 'failed' },
          ],
          otherwise: 'submit_button',
        },
        { id: 'sending', component: 'Skeleton', height: 40 },
        { id: 'sent', component: 'Typography', text: 'Thanks. Your message is on its way.' },
        { id: 'failed', component: 'Typography', text: { '@path': '/form/error/message' } },
        {
          id: 'submit_button',
          component: 'Button',
          variant: 'contained',
          color: 'primary',
          child: 'submit_label',
          onClick: {
            event: { name: 'submit_contact', context: { email: { '@path': '/form/email' } } },
          },
        },
        { id: 'submit_label', component: 'Typography', text: 'Send' },
      ],
    },
  },
]

export const contactBehavior = {
  behaviorVersion: '0.1',
  surfaceId: 'contact_page',
  catalogId: DESIGN_SYSTEM_ID,
  requires: { functions: ['lookup'] },
  params: {
    source: { from: 'query', type: 'string', default: 'site' },
    verify: { from: 'query', type: 'boolean' },
  },
  resources: {
    turnstile: {
      kind: 'query',
      request: { method: 'get', url: '/api/turnstile' },
      cache: { key: ['turnstile', { '@path': '/page/params/source' }] },
      enabled: { '@path': '/page/params/verify' },
      select: { '@path': '/_response/sitekey' },
      into: '/form/sitekey',
      onError: '/form/sitekeyError',
    },
    submit: {
      kind: 'mutation',
      request: {
        method: 'post',
        url: '/api/contact',
        query: {
          channel: {
            '@call': 'lookup',
            args: {
              key: { '@path': '/page/params/source' },
              map: { site: 'web' },
              fallback: 'other',
            },
          },
        },
        body: { '@path': '/form' },
      },
      into: '/form/result',
      onError: '/form/error',
    },
  },
  derived: [{ id: 'hasMessage', into: '/form/hasMessage', value: { '@path': '/form/message' } }],
  triggers: [
    { on: { event: 'submit_contact' }, run: ['submit'] },
    { on: { change: '/form/email' }, run: ['turnstile'] },
  ],
  head: { title: 'Contact' },
} as Behavior
