import { createServer } from 'http'

const { pid } = process
const port = Number.parseInt(process.env.PORT || process.argv[2]) || 8080

const server = createServer((req, res) => {
  for (let i = 1e7; i > 0; i--) {}
  console.log(`Handling request from ${pid}`)
  res.end(`Hello from ${pid}\n`)
})

server.listen(port, () => console.log(`Started at ${pid}`))
