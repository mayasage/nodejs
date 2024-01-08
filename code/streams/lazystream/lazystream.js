import { PassThrough } from 'stream'

const beforeFirstCall = (instance, method, cb) => {
  instance[method] = function () {
    delete this[method] // delete itself
    cb()
    return this[method].apply(this, arguments)
    /**
     *  call the method inside prototype and forward its return value
     *  for backpressure handling
     */
  }
}

export class LazyReadable extends PassThrough {
  constructor(fn, options) {
    super(options)

    beforeFirstCall(this, '_read', () => {
      const readStream = fn(options)
      readStream.on('error', this.emit.bind(this, 'error'))
      readStream.pipe(this)
    })

    this.emit('readable')
  }
}

export class LazyWritable extends PassThrough {
  constructor(fn, options) {
    super(options)

    beforeFirstCall(this, '_write', () => {
      const writeStream = fn(options)
      writeStream.on('error', this.emit.bind(this, 'error'))
      this.pipe(writeStream)
    })

    this.emit('writable')
  }
}
