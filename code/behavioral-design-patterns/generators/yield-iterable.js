class X {
  constructor() {
    this.arr1 = [1, 2, 3]
  }

  *[Symbol.iterator]() {
    // console.log(this.arr1[Symbol.iterator]())
    yield this.arr1
    yield* this.arr1
  }
}

for (const x of new X()) {
  console.log(x)
}
