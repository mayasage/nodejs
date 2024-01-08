import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import { html } from 'htm/react'
import { renderToString } from 'react-dom/server'
import { StrictMode } from 'react'

import {
  StaticRouterProvider,
  createStaticRouter,
  createStaticHandler
} from 'react-router-dom/server.js'

import routes from './frontend/routes.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const port = +process.env.PORT || 3000
const host = process.env.HOST || '127.0.0.1'

const server = Fastify({ logger: true })

server.register(fastifyStatic, {
  root: resolve(__dirname, '..', 'public'),
  prefix: '/public/',
})

const template = ({ content }) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>My library</title>
    </head>
    <body>
      <div id="root">${content}</div>
      <script type="text/javascript" src="/public/main.js"></script>
    </body>
  </html>
`

// Usage in your server code
const staticRouter = createStaticRouter(routes);

server.get('*', (req, reply) => {
  const location = req.raw.originalUrl

  reply
    .code(200)
    .type('text/html')
    .send(
      template({
        content: renderToString(html`
          <${StrictMode}>
            <${StaticRouterProvider} router=${staticRouter} context=${{}} />
          </ ${StrictMode}>
        `),
      }),
    )
})

server.listen({ port, host }, err => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(`Server up on Port`, port)
})
