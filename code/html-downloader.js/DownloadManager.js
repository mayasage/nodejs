import Queue from './Queue.js'
import Spider from './Spider.js'
import Downloader from './Downloader.js'
import DownloadList from './DownloadList.js'
import DownloadNotifier from './DownloadNotifier.js'

const DEFAULT_NESTING = 2
const DEFAULT_CONCURRENCY = 2

export default class DownloadManager {
  constructor(url, options = {}) {
    const baseUrl = url
    const nesting = options.nesting || DEFAULT_NESTING
    const concurrency = options.concurrency || DEFAULT_CONCURRENCY
    const listeners = options.listeners || {}

    this.status = {
      queued: 0,
      downloading: 0,
      completed: 0,
      errored: 0,
      total: 0,
      concurrency,
    }

    const queue = new Queue()
    const downloader = new Downloader(queue)
    const spider = new Spider()
    const downloadList = new DownloadList({ url, baseUrl, nesting })
    new DownloadNotifier({
      status: this.status,
      queue,
      downloader,
      spider,
      downloadList,
      listeners,
      concurrency,
    })
  }
}
