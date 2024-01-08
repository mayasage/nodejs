/**
 *  Replaces all occurrences of a given string.
 */

import { Transform } from 'stream'

export default class ReplaceStream extends Transform {
  constructor(search, replace, options) {
    super({ ...options, encoding: 'utf-8' })
    this.search = search
    this.replace = replace
    this.tail = ''
  }

  _transform(chunk, encoding, cb) {
    const chunk2 = (this.tail + chunk).replaceAll(this.search, this.replace)

    const chunkToPushEndIndex = chunk2.length - this.search.length
    const chunkToNotPushStartIndex = chunkToPushEndIndex + 1

    this.push(chunk2.substring(0, chunkToPushEndIndex + 1))
    this.tail = chunk2.substring(chunkToNotPushStartIndex)

    cb()
  }

  _flush(cb) {
    this.push(this.tail)
    cb()
  }
}
