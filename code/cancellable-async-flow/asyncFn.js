import sleep from './sleep.js'

const asyncFn = async label => {
  console.log(`start asyncFn ${label}`)
  await sleep(1)
  console.log(`end asyncFn ${label}`)
  console.log(`result asyncFn ${label}`)
}

export default asyncFn
