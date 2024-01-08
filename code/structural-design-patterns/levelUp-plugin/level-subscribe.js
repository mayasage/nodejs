export const levelSubscribe = db => {
  db.subscribe = (pattern, listener) => {
    db.on('put', (key, val) => {
      const match = Object.entries(pattern).every(([k, v]) => v === val[k])
      if (match) {
        listener(key, val)
      }
    })
  }

  return db // for chaining
}
