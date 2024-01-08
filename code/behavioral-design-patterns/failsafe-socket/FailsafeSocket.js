import OnlineState from './OnlineState.js'
import OfflineState from './OfflineState.js'

class FailSafeSocket {
  constructor(options) {
    this.options = options
    this.queue = []
    this.currentState = null
    this.socket = null

    this.states = {
      online: new OnlineState(this),
      offline: new OfflineState(this),
    }

    this.changeState('offline')
  }

  changeState(state) {
    console.log(`Activating state: ${state}`)
    this.currentState = this.states[state]
    this.currentState.activate()
  }

  send(data) {
    this.currentState.send(data)
  }
}

export default FailSafeSocket
