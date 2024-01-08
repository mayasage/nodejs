const A_CHAR_CODE = 65
const Z_CHAR_CODE = 90

function createAlphabetIterator() {
  let currCode = A_CHAR_CODE

  return {
    [Symbol.iterator]() {
      return {
        next() {
          const currChar = String.fromCodePoint(currCode)

          if (currCode > Z_CHAR_CODE) {
            return { done: true }
          }

          currCode++

          return { value: currChar, done: false }
        },
      }
    },
  }
}

for (const letter of createAlphabetIterator()) {
  console.log(letter)
}
