import type { Behavior } from '../behavior/dataModel'
import { APP_ID, BASIC_ID, DESIGN_SYSTEM_ID } from './catalogs'

// The articles page of soroush.tech: a list a query fills, shown as a skeleton, an error or the
// content; a template per article; values derived per item; and document metadata.

export const articlesSurface = [
  {
    version: 'v1.0',
    createSurface: {
      surfaceId: 'articles_page',
      catalogId: DESIGN_SYSTEM_ID,
      metadata: { extensions: { tech_soroush_behavior: { behaviorVersion: '0.1' } } },
      dataModel: { ui: { isDark: false, menuOpen: false }, gists: [] },
      components: [
        {
          id: 'root',
          component: 'View',
          as: 'main',
          p: [2, 4],
          children: ['page_header', 'toolbar', 'articles'],
        },
        // A component of the app's own, from a second catalog on the same surface.
        { id: 'page_header', component: 'PageHeader', catalogId: APP_ID, title: 'Articles' },
        { id: 'toolbar', component: 'Flex', gap: 1, children: ['theme_switch', 'menu_button'] },
        {
          id: 'theme_switch',
          component: 'Switch',
          checked: { '@path': '/ui/isDark' },
          accessibility: { label: 'Toggle theme' },
        },
        {
          id: 'menu_button',
          component: 'Button',
          variant: 'text',
          child: 'menu_icon',
          onClick: {
            functionCall: { '@call': 'setValue', args: { path: '/ui/menuOpen', value: true } },
          },
          accessibility: { label: 'Open menu' },
        },
        {
          id: 'menu_icon',
          component: 'Icon',
          name: {
            '@call': 'select',
            args: { condition: { '@path': '/ui/isDark' }, ifTrue: 'moon', ifFalse: 'sun' },
          },
        },
        {
          id: 'articles',
          component: 'When',
          value: { '@path': '/resources/gists/status' },
          cases: [
            { when: 'pending', child: 'list_skeleton' },
            { when: 'error', child: 'list_error' },
          ],
          otherwise: 'article_list',
        },
        { id: 'list_skeleton', component: 'Skeleton', height: 240 },
        {
          id: 'list_error',
          component: 'Typography',
          color: 'secondary',
          text: 'The articles could not be loaded.',
        },
        {
          id: 'article_list',
          component: 'View',
          children: { componentId: 'article_card', path: '/gists' },
        },
        {
          id: 'article_card',
          component: 'Card',
          variant: 'outlined',
          children: ['article_link', 'article_meta'],
        },
        {
          id: 'article_link',
          component: 'Link',
          href: { '@path': 'href' },
          child: 'article_title',
        },
        {
          id: 'article_title',
          component: 'Typography',
          variant: 'h3',
          text: { '@path': 'description' },
        },
        {
          id: 'article_meta',
          component: 'Flex',
          gap: 1,
          children: ['article_avatar', 'article_author', 'article_date', 'article_read'],
        },
        {
          id: 'article_avatar',
          component: 'Avatar',
          size: 'md',
          src: { '@path': 'owner/avatar_url' },
          alt: { '@path': 'authorLabel' },
        },
        { id: 'article_author', component: 'Typography', text: { '@path': 'authorLabel' } },
        { id: 'article_date', component: 'Typography', text: { '@path': 'dateLabel' } },
        {
          id: 'article_read',
          component: 'Typography',
          variant: 'caption',
          // Borrowed from the A2UI basic catalog, by naming it on the call.
          text: {
            '@call': 'formatString',
            catalogId: BASIC_ID,
            args: { value: '${readMinutes} min read' },
          },
        },
      ],
    },
  },
]

export const articlesBehavior: Behavior = {
  behaviorVersion: '0.1',
  surfaceId: 'articles_page',
  catalogId: DESIGN_SYSTEM_ID,
  requires: { functions: ['lookup', 'sumField', 'round', 'divide', 'max', 'ceil'] },
  params: { urlPathname: { from: 'pageContext', type: 'string', required: true } },
  resources: {
    gists: {
      kind: 'query',
      request: { method: 'get', url: '/users/soroushm/gists' },
      cache: { key: ['gists'], staleTimeMs: 0, suspense: true },
      into: '/gists',
      prefetch: true,
    },
  },
  derived: [
    {
      id: 'gistAuthor',
      forEach: '/gists',
      into: 'authorLabel',
      value: {
        '@call': 'lookup',
        args: {
          key: { '@path': 'owner/login' },
          map: { soroushm: 'Masoud Soroush' },
          fallback: { '@path': 'owner/login' },
        },
      },
    },
    {
      id: 'gistBytes',
      forEach: '/gists',
      into: 'totalBytes',
      value: { '@call': 'sumField', args: { object: { '@path': 'files' }, field: 'size' } },
    },
    {
      id: 'gistWords',
      forEach: '/gists',
      into: 'wordCount',
      value: {
        '@call': 'round',
        args: { value: { '@call': 'divide', args: { a: { '@path': 'totalBytes' }, b: 5 } } },
      },
    },
    {
      id: 'gistReadMinutes',
      forEach: '/gists',
      into: 'readMinutes',
      value: {
        '@call': 'max',
        args: {
          a: 1,
          b: {
            '@call': 'ceil',
            args: {
              value: { '@call': 'divide', args: { a: { '@path': 'wordCount' }, b: 265 } },
            },
          },
        },
      },
    },
    {
      id: 'gistDate',
      forEach: '/gists',
      into: 'dateLabel',
      value: {
        '@call': 'formatDate',
        catalogId: BASIC_ID,
        args: { value: { '@path': 'created_at' }, format: 'MMM d, yyyy' },
      },
    },
    {
      id: 'gistHref',
      forEach: '/gists',
      into: 'href',
      value: {
        '@call': 'formatString',
        catalogId: BASIC_ID,
        args: { value: '/article/${id}/' },
      },
    },
  ],
  head: {
    title: 'Articles',
    description: 'Articles and notes on software engineering.',
    meta: [
      { property: 'og:title', content: 'Articles' },
      { name: 'twitter:card', content: 'summary' },
    ],
  },
} as Behavior
