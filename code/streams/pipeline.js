import { Transform, pipeline } from 'stream'
import { promisify } from 'util'
import { createGunzip, createGzip } from 'zlib'

const pipelineP = promisify(pipeline)

const upperCasify = new Transform({
  transform(chunk, encoding, cb) {
    this.push(chunk.toString().toUpperCase())
    cb()
  },
})

pipelineP(
  process.stdin,
  createGunzip(),
  upperCasify,
  createGzip(),
  process.stdout,
).catch(err => console.error('err', err))

/**
 *  Run this on terminal:
 *    echo 'Hello World!' | gzip | node pipeline.js | gunzip
 */
