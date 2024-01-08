export default class DownloadNotifier {
  constructor({ status, queue, downloader, spider, downloadList, listeners }) {
    this.status = status
    this._instances = {
      queue,
      downloader,
      spider,
      downloadList,
    }

    // Queue
    queue.on(
      'enqueue',
      (d => {
        this.status.queued += 1
        d.status = 'enqueued'
        if (this.status.downloading < this.status.concurrency) {
          this._instances.downloader.trigger()
        }
      }).bind(this),
    )

    queue.on(
      'dequeue',
      (d => {
        this.status.queued -= 1
        d.status = 'dequeued'
      }).bind(this),
    )

    // Spider
    spider.on('spider-done', downloadList.addLinks.bind(downloadList))

    // Downloader
    downloader.on(
      'download-start',
      (d => {
        this.status.downloading += 1
        d.status = 'downloading'
      }).bind(this),
    )

    downloader.on(
      'download-complete',
      (d => {
        this.status.downloading -= 1
        this.status.completed += 1
        d.status = 'completed'
        this._instances.downloader.trigger()
        if (d.nesting > 0) {
          d.nesting -= 1
          this._instances.spider.trigger(d)
        }
      }).bind(this),
    )

    downloader.on(
      'download-error',
      (d => {
        this.status.downloading -= 1
        this.status.errored += 1
        d.status = 'errored'
        if (this.status.downloading < this.status.concurrency) {
          this._instances.downloader.trigger()
        }
      }).bind(this),
    )

    // DownloadList
    downloadList.on(
      'set',
      (d => {
        this.status.total += 1
        d.status === 'scheduled' && this._instances.queue.enqueue(d)
      }).bind(this),
    )

    // Register listeners (Last)
    ;[queue, downloader, spider, downloadList].reduce((prev, instance) => {
      instance.getEventNames().forEach(event => {
        listeners[event] && instance.on(event, listeners[event])
      })
    }, undefined)
  }
}
