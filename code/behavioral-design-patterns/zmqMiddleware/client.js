import zeromq from 'zeromq'
import ZmqMiddlewareManager from './ZmqMiddlewareManager.js'
import jsonMiddleware from './jsonMiddleware.js'
import zlibMiddleware from './zlibMiddleware.js'

const main = async () => {
  const sock = new zeromq.Request()
  await sock.connect('tcp://127.0.0.1:5000')

  const zmqm = new ZmqMiddlewareManager(sock)
  zmqm.use(zlibMiddleware())
  zmqm.use(jsonMiddleware())
  zmqm.use({
    async inbound(msg) {
      console.log(`Echoed back: ${msg}`)
      return msg
    },
  })

  setInterval(() => zmqm.send({ action: 'ping', echo: Date.now() }), 1000)

  console.log('Client Up')
}

main()
