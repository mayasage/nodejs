import { sleep } from './sleep.js'

function* generator(i) {
  yield sleep(i).then(() => Promise.resolve(i))
  yield sleep(i).then(() => Promise.resolve(i * 2))
}

const gen = generator(1)

let obj

while (!(obj = gen.next()).done) {
  await sleep(1)
  console.log(await obj.value)
}
