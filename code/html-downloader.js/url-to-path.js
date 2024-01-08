import url from 'url'
import path from 'path'
import slug from 'slug'

const endWithHtm = url => (url.match(/\.html?$/) ? url : url + '.htm')

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const urlToPath = (url, baseUrl = url, baseDir = __dirname) => {
  const parsedUrl = new URL(url, baseUrl)

  const relativeFilePath = parsedUrl.hostname + parsedUrl.pathname

  const sluggedRelativeFilePath = endWithHtm(
    relativeFilePath
      .replaceAll('.', '-')
      .split('/')
      .map(urlComponent =>
        slug(urlComponent, { remove: null, replacement: '-' }),
      )
      .join('/'),
  )

  const absoluteFilePath = path.join(baseDir, sluggedRelativeFilePath)
  const absoluteDirPath = absoluteFilePath.substring(
    0,
    absoluteFilePath.lastIndexOf('/'),
  )

  return { absoluteFilePath, absoluteDirPath }
}

export default urlToPath
