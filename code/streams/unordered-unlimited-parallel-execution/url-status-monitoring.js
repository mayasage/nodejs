import { createReadStream, createWriteStream } from 'fs'
import { pipeline } from 'stream'
import split from 'split'
import UnlimitedParallelStream from './UnlimitedParallelStream.js'
import superagent from 'superagent'

pipeline(
  createReadStream(process.argv[2]),
  split(),
  new UnlimitedParallelStream(async (url, enc, push, done) => {
    if (!url) {
      return done()
    }

    try {
      await superagent.head(url, { timeout: 5 * 1000 })
      push(`${url} is up\n`)
    } catch (err) {
      push(`${url} is down\n`)
    }

    done()
  }),
  createWriteStream('results.txt'),
  err => {
    if (err) {
      console.error(err)
      process.exit(1)
    }

    console.log('Done')
  },
)
