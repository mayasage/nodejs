function* twoWayGenerator() {
  const name = yield `What's you name ?`
  yield `Hi, ${name}!`
}

const iterator = twoWayGenerator()

console.log(iterator.next().value)
console.log(iterator.next('Batista').value)
