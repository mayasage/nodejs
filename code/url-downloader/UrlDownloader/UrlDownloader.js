import DownloadManager from '../DownloadManager/DownloadManager.js'
import Spider from '../Spider/Spider.js'
import Converter from '../Converter/Converter.js'

/**
 *  User Interface (UI) for UrlDownloader
 *
 *  It is the responsibility of the instance to inform DownloadManager when
 *  its operation is complete.
 *  Only then will the DownloadManager be able to destroy its listeners.
 */
export class UrlDownloader {
  #url
  #baseUrl
  #nesting
  #rootDir
  #finalCallback
  #downloadManager
  #results

  static eventNamesToEventHandlerNames = eventNames =>
    eventNames.map(eventName =>
      eventName.replace(/-[a-z]/g, match => match[1].toUpperCase()),
    )

  static eventHandlerNamesToEventNames = eventHandlerNames =>
    eventHandlerNames.map(eventHandlerName =>
      eventHandlerName.replace(/[A-Z]/g, v => `-${v.toLowerCase()}`),
    )

  constructor(
    url,
    nesting,
    maximumConcurrentDownloads,
    rootDir,
    finalCallback,
  ) {
    this.#url = url
    this.#baseUrl = url
    this.#nesting = nesting
    this.#rootDir = rootDir
    this.#finalCallback = finalCallback

    this.#downloadManager = new DownloadManager(maximumConcurrentDownloads)

    this.#results = {
      errors: [],

      downloads: {
        attemptCount: 0,
        successCount: 0,
        errorCount: 0,

        successes: [],
        errors: [],
      },
    }

    return this
  }

  /**
   *  const eventHandlerNames = [
        'downloadAttemptStart',
        'preDownloadError',
        'downloadStart',
        'downloadError',
        'downloadSuccess',
        'postDownloadError',
        'downloadFinish',
        'enqueue',
        'addToDownloads',
      ]

      const eventNames = [
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
   *
   *  @param {Object} eventHandlers
   */
  addEventHandlers(eventHandlers) {
    const allowedEventHandlerNames =
      UrlDownloader.eventNamesToEventHandlerNames(
        this.#downloadManager.getEventNames(),
      )

    const acceptedEventHandlerNames = Object.keys(eventHandlers).filter(
      eventHandlerName => allowedEventHandlerNames.includes(eventHandlerName),
    )

    acceptedEventHandlerNames.forEach(eventHandlerName =>
      this.#downloadManager.on(
        UrlDownloader.eventHandlerNamesToEventNames([eventHandlerName]),
        eventHandlers[eventHandlerName],
      ),
    )

    return this
  }

  /**
   * Starts the process.
   * Purely Synchronous.
   *
   * @param {String} url Starting URL
   * @param {Number} nesting How deep you wanna go ?
   */
  crawl(url = this.#url, nesting = this.#nesting, callback) {
    if (nesting < 0) {
      return
    }

    // Converter
    const filePath = Converter.urlToPath(url, this.#baseUrl, this.#rootDir)

    // DownloadManager
    const download = {
      url,
      filePath,
      overwrite: false,
      callback: (err, data) => {
        this.#results.downloads.attemptCount += 1

        if (err) {
          this.#results.errors.push({ err, data })
          this.#results.downloads.errorCount += 1
          this.#results.downloads.errors.push({ err, data })
        } else {
          this.#results.downloads.successCount += 1
          this.#results.downloads.successes.push({ data })

          const links = Spider.findLinksInSameDomain(
            data.content,
            this.#baseUrl,
          )
          links.forEach(link => this.crawl(link, nesting - 1, callback))
        }

        this.onDownload()
      },
    }

    this.#downloadManager.add(download)

    return this
  }

  onDownload() {
    if (this.#downloadManager.isIdle()) {
      this.#finalCallback(this.#results)
    }
  }
}
