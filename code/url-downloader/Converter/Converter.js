import url from 'url'
import path from 'path'
import slug from 'slug'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Provides any conversion needed.
export default class Converter {
  // Returns Absolute FilePath
  static urlToPath(url, baseUrl, baseDir = __dirname) {
    const parsedUrl = new URL(url, baseUrl)

    const relativeFilePath = parsedUrl.hostname + parsedUrl.pathname

    const sluggedRelativeFilePath = relativeFilePath
      .replaceAll('.', '-')
      .split('/')
      .map(urlComponent =>
        slug(urlComponent, { remove: null, replacement: '-' }),
      )
      .join('/')

    const absoluteFilePath = path.join(baseDir, sluggedRelativeFilePath)

    return absoluteFilePath
  }
}
