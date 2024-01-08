import { Writable } from 'stream'
import { mkdir, writeFile } from 'fs/promises'
import { dirname } from 'path'

export default class ToFileStream extends Writable {
  /**
   *  Other options:
   *  - highWaterMark (default 16KB)
   *
   *  - decodeStrings (default true, ignored in binary mode): convert string to
   *    binary buffer before passing it to "_write" method.
   */
  constructor(options) {
    super({ ...options, objectMode: true })
  }

  /**
   *  "encoding" only makes sense when we're in binary mode.
   *  Here we're not.
   */
  _write(chunk, encoding, cb) {
    const { path, content } = chunk

    mkdir(dirname(path), { recursive: true })
      .then(() => writeFile(path, content))
      .then(cb)
      .catch(cb)
  }
}
