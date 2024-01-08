import * as cheerio from 'cheerio'
import { URL } from 'url'

const replaceTrailingBackslash = url => url.replace(/\/$/, '')

// Crawls & creates an array of links on the page.
export default class Spider {
  static findLinksInSameDomain(html, baseUrl) {
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
            if (hostname !== baseUrlHostname) {
              return
            }

            if (!pathname || pathname === '/') {
              return
            }

            if (
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
}
