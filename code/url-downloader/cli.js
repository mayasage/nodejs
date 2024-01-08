import { UrlDownloader } from './UrlDownloader/UrlDownloader.js'
import getFilenameDirname from './utils/get-dirname.js'

// const url = process.env[2]
// const nesting = process.env[3]

const url = 'https://www.npmjs.com/package/cheerio'
const nesting = 1
const maximumConcurrentDownloads = 2

/**
 *  Data should consist of the following:
 *  - Number of links downloaded
 *  - Data about every download.
 *  - Data about which folders were created.
 *  - Data about which existing folders were found.
 */
new UrlDownloader(
  url,
  nesting,
  maximumConcurrentDownloads,
  getFilenameDirname(import.meta.url).__dirname,
  results => {
    // console.log(results.errors)
  },
)
  .addEventHandlers({
    downloadAttemptStart: ({ download }) =>
      console.log(`downloadAttemptStart: '${download.url}'`),

    preDownloadError: ({ download, error }) =>
      console.log(
        `preDownloadError: url = '${download.url}' errored out: '${error}'`,
      ),

    downloadStart: ({ download }) =>
      console.log(`downloadStart: '${download.url}'`),

    downloadError: ({ download, error }) =>
      console.log(
        `downloadError: url = '${download.url}' errored out: '${error}'`,
      ),

    downloadSuccess: ({ download }) =>
      console.log(`downloadSuccess: '${download.url}' at ${download.filePath}`),

    postDownloadError: ({ download, error }) =>
      console.log(
        `postDownloadError: url = '${download.url}' errored out: '${error}'`,
      ),

    downloadFinish: ({ download }) =>
      console.log(`downloadFinish: '${download.url}' at ${download.filePath}`),

    enqueue: ({ download }) => console.log(`enqueue: '${download.url}'`),

    // addToDownloads: ({ download }) =>
    //   console.log(`addToDownloads: '${download.url}'`),
  })
  .crawl()
