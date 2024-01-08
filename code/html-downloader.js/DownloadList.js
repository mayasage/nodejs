import urlToPath from './url-to-path.js'
import EventEmitter from 'events'
import file from './file.js'

const urlToDownload = (url, options = {}) => {
  const { absoluteFilePath, absoluteDirPath } = urlToPath(url)

  return {
    url,
    filePath: absoluteFilePath,
    dirPath: absoluteDirPath,
    nesting: options.hasOwnProperty('nesting') ? options.nesting : 1,
    baseUrl: options.baseUrl || url,
  }
}

const parseInput = (input, nesting, baseUrl) => {
  const result = {
    url: undefined,
    download: undefined,
  }

  const isUrl = typeof input === 'string'

  if (isUrl) {
    result.url = input
    result.download = urlToDownload(input, { nesting, baseUrl })
  } else {
    result.url = input.url
    result.download = input
  }

  return result
}

export default class DownloadList extends EventEmitter {
  constructor({ url, baseUrl, nesting }) {
    super()
    this._nesting = nesting
    this._baseUrl = baseUrl
    this._list = {}
    this.add(url, nesting)
  }

  _get(input) {
    const { url } = parseInput(input)
    return this._list[url]
  }

  _set(input, status) {
    const { download } = parseInput(input)
    download.status = status
    this._list[download.url] = download
    this.emit('set', download)
  }

  async add(input, nesting) {
    const { download } = parseInput(input, nesting, this._baseUrl)

    if (!this._get(download)) {
      this._set(download)
      this._set(
        download,
        (await file.exist(download.filePath)) ? 'completed' : 'scheduled',
      )
    }
  }

  addLinks(links, nesting) {
    links.forEach(link => this.add(link, nesting))
  }

  getEventNames() {
    return ['set']
  }
}
