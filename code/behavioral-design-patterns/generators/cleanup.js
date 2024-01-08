function* X() {
  yield 1
  yield 2
}

for (const v of X()) {
  console.log(v)
  break
}
