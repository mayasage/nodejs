import EventEmitter from 'events'
import superagent from 'superagent'
import file from './file.js'

export default class Downloader extends EventEmitter {
  constructor(queue) {
    super()
    this._queue = queue
  }

  async _download(download) {
    try {
      await file.mkdir(download.dirPath)
      const html = (await superagent.get(download.url)).text
      await file.write(download.filePath, html)
      this.emit('download-complete', download)
    } catch (error) {
      download.error = error
      this.emit('download-error', download)
    }
  }

  trigger() {
    if (!this._queue.isEmpty()) {
      const download = this._queue.dequeue()
      this.emit('download-start', download)
      this._download(download)
    }
  }

  getEventNames() {
    return ['download-start', 'download-complete', 'download-error']
  }
}
