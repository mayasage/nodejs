import { Transform } from 'stream'

class LimitedParallelStream extends Transform {
  constructor(concurrency, transformFn, options) {
    super({ ...options, objectMode: true })
    this.concurrency = concurrency
    this.transformFn = transformFn
    this.terminateCb = null
    this.continueCb = null
    this.running = 0
  }

  _transform(chunk, enc, done) {
    this.running += 1

    this.transformFn(
      chunk,
      enc,
      this.push.bind(this),
      this._onComplete.bind(this),
    )

    if (this.running < this.concurrency) {
      done()
    } else {
      this.continueCb = done
    }
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

    const tmpCb = this.continueCb
    this.continueCb = null
    tmpCb && tmpCb()

    if (this.running === 0) {
      this.terminateCb && this.terminateCb()
    }
  }
}

export default LimitedParallelStream
