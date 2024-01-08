class ZmqMiddlewareManager {
  constructor(sock) {
    this.sock = sock
    this.inbound = []
    this.outbound = []

    this.handleIncomingMessages()
  }

  async handleIncomingMessages() {
    for await (const [msg] of this.sock) await this.exec(this.inbound, msg)
  }

  async send(msg) {
    return this.sock.send(await this.exec(this.outbound, msg))
  }

  use(middleware) {
    if (middleware.inbound) this.inbound.push(middleware.inbound)
    if (middleware.outbound) this.outbound.unshift(middleware.outbound)
  }

  async exec(middlewares, msg) {
    let finalMsg = msg
    for await (const fn of middlewares) finalMsg = await fn(finalMsg)
    return finalMsg
  }
}

export default ZmqMiddlewareManager
