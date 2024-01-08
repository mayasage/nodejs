import { Readable } from 'stream'

class CreateReadStream extends Readable {
  constructor(options, file) {
    super(options)
    this.offset = 0
    this.file = file
    this.openFileInstance = undefined
  }

  async _read(size) {
    if (!this.openFileInstance) {
      // this.openFileInstance =
    }
  }
}

export default CreateReadStream
