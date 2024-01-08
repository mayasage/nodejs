import axios from 'axios'

const url = 'http://localhost:3000/'

/**
 * @param {*} filename
 * @param {*} stream
 * @param {*} contentLength Header 'Content-Length' is required for progress
 */
const upload = (filename, stream, contentLength) => {
  axios.post(url, stream, {
    onUploadProgress: ({ progress }) => {
      // console.log((progress * 100).toFixed(2))
    },

    headers: {
      'Content-Length': contentLength,
      'x-filename': filename,
      'Accept-Encoding': 'gzip, deflate, br',
    },

    maxRedirects: 0, // avoid buffering the entire stream
    maxRate: [100 * 1024], // 100KB/s limit
  })
}

export default upload
