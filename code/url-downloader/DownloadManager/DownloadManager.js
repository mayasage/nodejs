import superagent from 'superagent'
import FileManager from '../FileManager/FileManager.js'
import Queue from '../Queue/Queue.js'
import { EventEmitter } from 'events'

const DEFAULT_MAXIMUM_CONCURRENT_DOWNLOADS = 2

class DownloadList {
  #list

  constructor() {
    this.#list = {}
  }

  has(download) {
    return !!this.#list[download.url]
  }

  addReplace(download) {
    this.#list[download.url] = download
  }

  isComplete(download) {
    return this.#list[download.url].status === 'complete'
  }
}

// Manages how html is downloaded from a url.
export default class DownloadManager extends EventEmitter {
  #maximumConcurrentDownloads
  #status
  #queue
  #downloads

  constructor(
    maximumConcurrentDownloads = DEFAULT_MAXIMUM_CONCURRENT_DOWNLOADS,
  ) {
    super()

    this.#maximumConcurrentDownloads = maximumConcurrentDownloads

    this.#queue = new Queue()

    this.#status = {
      queued: 0,
      downloading: 0,
      completed: 0,
      errored: 0,
      total: 0,
      waiting: 0,
    }

    // To check for Duplicity at Enqueue.
    this.#downloads = new DownloadList()

    return this
  }

  /**
   *  Adds URL to download list.
   *
   *  @param {Object} download
   *  @param {String} download.url Download this URL
   *  @param {String} download.filePath Absolute Filepath
   *  @param {Boolean} download.overwrite
   *    Whether to overwrite existing downloads
   *  @param {(content: String)} download.callback
   */
  add(download) {
    this.#status.waiting += 1

    const isExist = this.#downloads.has(download)
    const isExistAndComplete = isExist && this.#downloads.isComplete(download)
    const isOverwriting = download.overwrite

    if (isExistAndComplete && isOverwriting) {
      return process.nextTick(this.#enqueue.bind(this, download))
    }

    if (!isExist) {
      this.#addToDownloads(download, 'fs')

      FileManager.readFile(download.filePath, (err, data) => {
        if (err) {
          // File doesn't exist
          return this.#enqueue(download)
        }

        // File exist

        this.#addToDownloads(download, 'complete')

        if (isOverwriting) {
          return this.#enqueue(download)
        }

        this.#status.waiting -= 1

        download.callback(null, { content: data.toString('utf-8') })
      })
    }
  }

  /**
   *  Downloads Url to File.
   */
  #download() {
    this.#onDownloadStart()

    const download = this.#queue.dequeue()

    this.#emit({ event: 'download-attempt-start', download })

    // Create nested folders
    FileManager.makeDirForFile(download.filePath, error => {
      if (error) {
        return this.#onDownloadEnd({
          event: 'pre-download-error',
          download,
          error,
        })
      }

      this.#emit({ event: 'download-start', download })

      // Download Url
      superagent.get(download.url).end((error, response) => {
        if (error) {
          return this.#onDownloadEnd({
            event: 'download-error',
            download,
            error,
          })
        }

        const content = response.text.toString()

        this.#emit({ event: 'download-success', download, data: { content } })

        // Save data to File
        FileManager.writeFile(download.filePath, content, error => {
          if (error) {
            return this.#onDownloadEnd({
              event: 'post-download-error',
              download,
              error,
            })
          }

          return this.#onDownloadEnd({
            event: 'download-finish',
            download,
            error,
            data: content,
          })
        })
      })
    })
  }

  /**
   *  Manages Concurrent Downloads.
   *  This is a SAFE operation, meaning it can be called any number of times by
   *  anyone.
   *  Called by other functions in this class to manage concurrent downloads.
   */
  trigger() {
    if (this.#canDownload()) {
      this.#download()
    }
  }

  #canDownload() {
    const hasConcurrency =
      this.#status.downloading < this.#maximumConcurrentDownloads

    const hasQueuedDownloads = this.#status.queued > 0

    return hasQueuedDownloads && hasConcurrency
  }

  #enqueue(download) {
    this.#status.waiting -= 1

    this.#addToDownloads(download, 'queued')

    this.#queue.enqueue(download)

    this.#status.queued += 1
    this.#status.total += 1

    this.#emit({ event: 'enqueue', download })

    this.trigger()
  }

  #addToDownloads(download, status) {
    download.status = status
    this.#downloads.addReplace(download)

    this.#emit({ event: 'add-to-downloads', download })
  }

  isIdle() {
    return (
      this.#status.queued === 0 &&
      this.#status.downloading === 0 &&
      this.#status.waiting === 0
    )
  }

  #emit(obj) {
    const { event, download, data, error } = obj

    this.emit(event, {
      download,
      data,
      error,
      status: this.#status,
    })
  }

  getEventNames() {
    return [
      'download-attempt-start',
      'pre-download-error',
      'download-start',
      'download-error',
      'download-success',
      'post-download-error',
      'download-finish',
      'enqueue',
      'add-to-downloads',
    ]
  }

  #sendResponse(obj) {
    const { error, download, data } = obj
    const callback = download.callback
    callback(error, { download, content: data })
  }

  #onDownloadStart() {
    this.#status.downloading += 1
    this.#status.queued -= 1
  }

  #onDownloadEnd(obj) {
    this.#status.downloading -= 1

    if (obj.error) {
      this.#status.errored += 1
    } else {
      this.#status.completed += 1
    }

    this.#sendResponse(obj)
    this.#emit(obj)
    this.trigger()
  }
}
