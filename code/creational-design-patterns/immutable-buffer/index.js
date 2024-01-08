import ImmutableBuffer from './ImmutableBuffer.js'

const hello = 'Hello!'
const immutable = new ImmutableBuffer(hello.length, ({ write }) => write(hello))

console.log(immutable.toString())
