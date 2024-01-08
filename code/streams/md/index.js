import concatFiles from './concatFiles.js'

try {
  await concatFiles(process.argv[2], process.argv.slice(3))
  console.log('done')
} catch (err) {
  console.error(err)
}
