import { createReadStream, createWriteStream } from 'fs'
import { pipeline } from 'stream'
import split from 'split'
import superagent from 'superagent'
import parallelTransform from 'parallel-transform'

pipeline(
  createReadStream(process.argv[2]),
  split(),
  parallelTransform(4, async (url, done) => {
    if (!url) {
      return done()
    }

    try {
      await superagent.head(url, { timeout: 5 * 1000 })
      done(null, `${url} is up\n`)
    } catch (err) {
      done(null, `${url} is down\n`)
    }
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
