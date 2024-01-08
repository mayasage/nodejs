import { html } from 'htm/react'

import Author from './components/pages/Author.js'
import AuthorsIndex from './components/pages/AuthorsIndex.js'
import Error from './components/pages/ErrorPage.js'
import ErrorBoundaryFallback from './components/pages/ErrorBoundaryFallback.js'

const routes = [
  {
    path: '/',
    ErrorBoundary: html`${ErrorBoundaryFallback}`,
    children: [
      {
        path: '',
        Component: html`${AuthorsIndex}`,
      },
      {
        path: 'author/:id',
        Component: html`${Author}`,
      },
      {
        path: '*',
        Component: html`${Error}`,
      },
    ],
  },
]

export default routes
