const MODIFIERS = ['swap', 'write', 'fill']

class ImmutableBuffer {
  constructor(s, executor) {
    const buf = Buffer.alloc(s)
    const mfs = {}

    for (const p in buf) {
      if (typeof buf[p] !== 'function') continue
      if (MODIFIERS.some(i => p.startsWith(i))) mfs[p] = buf[p].bind(buf)
      else this[p] = buf[p].bind(buf)
    }

    executor(mfs)
  }
}

export default ImmutableBuffer
