import Consul from 'consul'
import { createServer } from 'http'
import { nanoid } from 'nanoid'
import portfinder from 'portfinder'

/*
  The var outside main(), are the responsibility of the App.
  The var inside main(), are not the responsibility of the App (or optional).
  This is basis for what needs to be written inside, and what, outside.
*/
const serviceType = process.argv[2]
const { pid } = process

const main = async () => {
  const consul = new Consul()
  const serviceId = nanoid()
  const serviceAddress = process.env.ADDRESS || 'localhost'
  const port = await portfinder.getPortPromise()

  const registerService = async () => {
    await consul.agent.service.register({
      name: serviceType,
      id: serviceId,
      tags: [serviceType],
      address: serviceAddress,
      port,
    })

    console.log(`${serviceType} registered successfully`)
  }

  const unregisterService = async err => {
    err && console.error(err)
    console.log(`deregistering ${serviceId}`)
    await consul.agent.service.deregister(serviceId)
    process.exit(err ? 1 : 0)
  }

  const server = createServer((req, res) => {
    for (let i = 1e7; i > 0; i--) {}
    console.log(`Handling request from ${pid}`)
    res.end(`Hello from ${pid}\n`)
  })

  server.listen(port, () => {
    registerService()
    console.log(`Started ${serviceType} at ${pid} on port ${port}`)
  })

  process.on('exit', unregisterService)
  process.on('uncaughtException', unregisterService)
  process.on('SIGINT', unregisterService)
}

main().catch(e => {
  console.error(e)
  process.exit()
})
