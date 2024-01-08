export const loggingWritable = writable =>
  new Proxy(writable, {
    get(tar, prop, rec) {
      if (prop === 'write') {
        return (...args) => {
          const [chunk] = args
          console.log(`Writing: ${chunk}`)
          return writable[prop](...args)
        }
      }

      return tar[prop]
    },
  })
