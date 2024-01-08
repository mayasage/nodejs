import DownloadManager from './DownloadManager.js'

// import getFilenameDirname from './utils/get-dirname.js'

// const url = process.env[2]
// const nesting = process.env[3]
// const concurrency = process.env[4]

const url = 'https://loige.co'
const nesting = 1
const concurrency = 2

new DownloadManager(url, {
  nesting,
  concurrency,
  listeners: {
    set: ({ url }) => console.log(`${url} added to download list`),
    enqueue: ({ url }) => console.log(`${url} enqueued`),
    dequeue: ({ url }) => console.log(`${url} dequeued`),
    'download-start': ({ url }) => console.log(`${url} download started`),
    'download-complete': ({ url }) => console.log(`${url} download complete`),
    'download-error': ({ url, error }) =>
      console.log(`${url} download errored... Error: ${error}`),
  },
})
