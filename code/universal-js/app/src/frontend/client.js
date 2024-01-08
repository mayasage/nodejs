import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { html } from 'htm/react'

import routes from './routes.js'
import { StrictMode } from 'react'

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')).render(
  html`
    <${StrictMode}>
      <${RouterProvider} router=${router} />
    </${StrictMode}>
  `,
)
