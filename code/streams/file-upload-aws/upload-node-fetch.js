import fetch from 'node-fetch'

const url = 'http://localhost:3000/'

/**
 *
 * @param {*} filename
 * @param {*} stream
 * @param {*} contentLength Header 'Content-Length' is required for progress
 */
const upload = (filename, stream, contentLength) => {
  fetch(url, {
    method: 'POST',
    body: stream,

    headers: {
      // 'Content-Length': contentLength,
      'x-filename': filename,
      'Accept-Encoding': 'gzip, deflate, br',
    },
  })
}

export default upload
