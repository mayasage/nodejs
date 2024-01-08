import { createServer } from 'http'
import Consul from 'consul'
import httpProxy from 'http-proxy'

const PORT = 8080

const consul = new Consul()
const proxy = httpProxy.createProxyServer()

const routing = [
  {
    prefix: '/api',
    service: 'api-service',
    index: 0,
  },
  {
    prefix: '/',
    service: 'webapp-service',
    index: 0,
  },
]

const server = createServer(async (req, res) => {
  try {
    console.log('hit')
    const route = routing.find(r => req.url.startsWith(r.prefix))

    console.log(`route:`, route)

    const services = await consul.agent.service.list()

    console.log(`services:`, services)

    const servers = Object.values(services).filter(s =>
      s.Tags.includes(route.service),
    )

    console.log(`servers:`, servers)

    route.index = (route.index + 1) % servers.length
    const server = servers[route.index]

    console.log(`server:`, server)

    const target = `http://${server.Address}:${server.Port}`

    console.log(`target:`, target)
    proxy.web(req, res, { target })
  } catch (e) {
    res.writeHead(502)
    return res.end('Bad gateway')
  }
})

server.listen(PORT, () => console.log(`Load balancer started on port ${PORT}`))
