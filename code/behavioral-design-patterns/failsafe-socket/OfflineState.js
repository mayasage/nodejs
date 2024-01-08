import jsonOverTcp2 from 'json-over-tcp-2'

class OfflineState {
  constructor(failsafeSocket) {
    this.failsafeSocket = failsafeSocket
  }

  send(data) {
    this.failsafeSocket.queue.push(data)
  }

  activate() {
    const retry = () => setTimeout(() => this.activate(), 1000)

    this.failsafeSocket.socket = jsonOverTcp2.connect(
      this.failsafeSocket.options,
      () => {
        console.log('Connection established')
        this.failsafeSocket.socket.removeListener('error', retry)
        this.failsafeSocket.changeState('online')
      },
    )

    this.failsafeSocket.socket.once('error', retry)
  }
}

export default OfflineState
