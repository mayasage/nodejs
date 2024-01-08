/**
 *  Maintains a Single DownloadManager Instance.
 *  Will be shared by all the Workers in the process.
 */

import superagent from 'superagent'
import FileManager from '../FileManager/FileManager.js'
import Queue from '../Queue/Queue.js'

const DEFAULT_MAXIMUM_CONCURRENT_DOWNLOADS = 2

// Manages how html is downloaded from a url.
class DownloadManager {
  #maximumConcurrentDownloads
  #queue
  #queued
  #downloading
  #completed
  #total
  #downloads

  constructor(
    maximumConcurrentDownloads = DEFAULT_MAXIMUM_CONCURRENT_DOWNLOADS,
  ) {
    this.#maximumConcurrentDownloads = maximumConcurrentDownloads

    this.#queue = new Queue()

    this.#queued = 0
    this.#downloading = 0
    this.#completed = 0
    this.#total = 0

    // To check for Duplicity at Enqueue.
    this.#downloads = {}

    return this
  }

  /**
   *  Adds URL to download list.
   *
   *  job = {url, filePath, overwrite, callback}
   *
   *  @param {String} url Download this URL
   *  @param {String} filePath Absolute Filepath
   *  @param {Boolean} overwrite Whether to overwrite existing downloads
   *  @param {(content: String)} callback
   */
  add(job) {
    this.#canEnqueueJob(job, err => {
      if (err) {
        return
      }

      this.#downloads[job.url] = job
      this.#queue.enqueue(job)

      this.#total += 1
      this.#queued += 1

      this.trigger()
    })

    return this
  }

  download(finish) {
    const job = this.#queue.dequeue()

    FileManager.makeDirForFile(job.filePath, err => {
      if (err) {
        callback(err, job)
        return finish()
      }

      superagent.get(job.url).end((err, res) => {
        if (err) {
          callback(err, job)
          return finish()
        }

        const content = res.text.toString()

        FileManager.writeFile(job.filePath, content, err => {
          if (err) {
            callback(err, job)
            return finish()
          }

          callback(null, { job, content })
          return finish()
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
    if (!this.#canDownload()) {
      return
    }

    // Start downloading
    this.#downloading += 1
    this.#queued -= 1

    this.download(() => {
      this.#downloading -= 1
      this.#completed += 1

      this.trigger()
    })
  }

  #canDownload() {
    const hasConcurrency = this.#downloading < this.#maximumConcurrentDownloads
    const hasQueuedDownloads = this.#queued > 0

    return hasQueuedDownloads && hasConcurrency
  }

  #canEnqueueJob(job, cb) {
    const hasOverwrite = job.overwrite
    const jobExists = this.#downloads[job.url]

    if (hasOverwrite || !jobExists) {
      return process.nextTick(cb.bind(null, true))
    }

    FileManager.isFileExist(job.filePath, cb)
  }
}

let instance

export default setup = maximumConcurrentDownloads => {
  if (!instance) {
    instance = new DownloadManager(maximumConcurrentDownloads)
  }

  return instance
}
