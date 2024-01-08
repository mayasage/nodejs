import { Transform } from 'stream'

class UnlimitedParallelStream extends Transform {
  constructor(transformFn, options) {
    super({ ...options, objectMode: true })
    this.transformFn = transformFn
    this.running = 0
    this.terminateCb = null
  }

  _transform(chunk, enc, done) {
    this.running += 1

    this.transformFn(
      chunk,
      enc,
      this.push.bind(this),
      this._onComplete.bind(this),
    )

    done()
  }

  _flush(done) {
    if (this.running > 0) {
      this.terminateCb = done
    } else {
      done()
    }
  }

  _onComplete(err) {
    this.running -= 1

    if (err) {
      return this.emit('error', err)
    }

    if (this.running === 0) {
      this.terminateCb && this.terminateCb()
    }
  }
}

export default UnlimitedParallelStream
