import * as cheerio from 'cheerio'
import EventEmitter from 'events'
import { URL } from 'url'
import file from './file.js'

const replaceTrailingBackslash = url => url.replace(/\/$/, '')

const findLinksInSameDomain = (html, baseUrl) => {
  const baseUrlHostname = new URL(baseUrl).hostname

  return Array.from(
    new Set(
      Array.from(cheerio.load(html)('a'))
        .map(obj => {
          const { protocol, hostname, pathname } = new URL(
            obj.attribs.href,
            baseUrl,
          )

          const extractedLink = replaceTrailingBackslash(
            protocol + '//' + hostname + pathname,
          )

          // Make unacceptable values undefined to be later filtered out.
          if (
            hostname !== baseUrlHostname ||
            !pathname ||
            pathname === '/' ||
            extractedLink === baseUrl ||
            extractedLink + '/' === baseUrl ||
            extractedLink === baseUrl + '/'
          ) {
            return
          }

          return extractedLink
        })
        .filter(Boolean),
    ),
  )
}

export default class Spider extends EventEmitter {
  async trigger(download) {
    try {
      const { filePath, baseUrl } = download
      const html = await file.read(filePath)
      const links = findLinksInSameDomain(html, baseUrl)
      this.emit('spider-done', links, download.nesting)
    } catch (error) {
      download.error = error
      this.emit('spider-error', download)
    }
  }

  getEventNames() {
    return ['spider-done', 'spider-error']
  }
}
