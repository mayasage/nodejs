import objectPath from 'object-path'
import { readFile, writeFile } from 'fs/promises'

class Config {
  constructor(formatStrategy) {
    this.data = {}
    this.formatStrategy = formatStrategy
  }

  get(p) {
    return objectPath.get(this.data, p)
  }

  set(p, v) {
    return objectPath.set(this.data, p, v)
  }

  async load(p) {
    console.log(`Deserializing from ${p}`)
    this.data = this.formatStrategy.deserialize(await readFile(p, 'utf-8'))
  }

  async save(p) {
    console.log(`Serializing to ${p}`)
    await writeFile(p, this.formatStrategy.serialize(this.data))
  }
}

export default Config
