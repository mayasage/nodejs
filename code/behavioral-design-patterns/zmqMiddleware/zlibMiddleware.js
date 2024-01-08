import { inflateRaw, deflateRaw } from 'zlib'
import { promisify } from 'util'

const inflateRawP = promisify(inflateRaw)
const deflateRawP = promisify(deflateRaw)

const zlibMiddleware = () => ({
  inbound: msg => inflateRawP(Buffer.from(msg)),
  outbound: msg => deflateRawP(msg),
})

export default zlibMiddleware
