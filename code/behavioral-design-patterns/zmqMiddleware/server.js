import zeromq from 'zeromq'
import ZmqMiddlewareManager from './ZmqMiddlewareManager.js'
import jsonMiddleware from './jsonMiddleware.js'
import zlibMiddleware from './zlibMiddleware.js'

const main = async () => {
  const sock = new zeromq.Reply()
  await sock.bind('tcp://127.0.0.1:5000')

  const zmqm = new ZmqMiddlewareManager(sock)
  zmqm.use(zlibMiddleware())
  zmqm.use(jsonMiddleware())
  zmqm.use({
    async inbound(msg) {
      console.log(`Received: ${msg}`)

      if (msg.action === 'ping') {
        await this.send({ action: 'pong', echo: msg.echo })
      }

      return msg
    },
  })

  console.log('Server Up')
}

main()
