/*
In real-life applications, it is generally preferable to include the
initialization vector as part of the encrypted data, rather than
requiring the user to pass it around. One way to implement this
is by having the first 16 bytes emitted by the archive stream to be
representing the initialization vector. The unarchive utility would
need to be updated accordingly to consume the first 16 bytes before
starting to process the data in a streaming fashion. This approach
would add some additional complexity, which is outside the scope
of this example, therefore we opted for a simpler solution. Once
you feel comfortable with streams, we encourage you to try to
implement as an exercise a solution where the initialization vector
doesn't have to be passed around by the user.
*/

import Pumpify from 'pumpify'
import { createCipheriv, createDecipheriv, scryptSync } from 'crypto'
import { createGunzip, createGzip } from 'zlib'
import config from './config.js'

const salt = config.SALT
const key = pwd => scryptSync(pwd, salt, 24)

export const createCompressAndEncrypt = (pwd, iv) =>
  Pumpify(createGzip(), createCipheriv('aes192', key(pwd), iv))

export const createDecompressAndDecrypt = (pwd, iv) =>
  Pumpify(createDecipheriv('aes192', key(pwd), iv), createGunzip())
