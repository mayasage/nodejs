import ReadableStream from './ReplaceStream.js'

const search = 'World'
const replace = 'Node.js'

const replaceStream = new ReadableStream(search, replace)
replaceStream.on('data', chunk => console.log(chunk))

replaceStream.write('Hello W')
replaceStream.write('orld X')
replaceStream.end()