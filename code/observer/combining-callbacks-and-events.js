/**
 * The traditional callback will give the final results.
 * The EventEmitter will give finer details.
 */

import glob from 'glob'

glob('*.txt', (err, files) => {
  if (err) {
    return console.error(err)
  }

  console.log(`All files found: ${JSON.stringify(files)}`)
}).on('match', match => console.log(`Match found: ${match}`))
