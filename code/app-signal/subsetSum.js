import { EventEmitter } from 'events'

let sum = 0
let set = []

const processSubset = function (subset) {
  const res = subset.reduce((prev, item) => prev + item, 0)
  if (res === sum) {
    // send matches piecemeal
    this.emit('debug', 'match found ' + subset)
    this.emit('match', subset)
  }
}

const combine = function (set, subset) {
  for (let i = 0; i < set.length; i++) {
    const newSubset = subset.concat(set[i])
    combine.call(this, set.slice(i + 1), newSubset)
    processSubset.call(this, newSubset)
  }
}

export class SubsetSum extends EventEmitter {
  constructor(_sum, _set) {
    super()
    sum = _sum
    set = _set
  }

  start() {
    combine.call(this, set, [])
    this.emit('end')
  }
}

/*
const ss = new SubsetSum(10, [2, 3, 5])
ss.on('match', subset => console.log(subset))
ss.on('end', () => console.log('done'))
ss.start()
*/

/*
console.log(ss.combine)
console.log(ss.sum)
console.log(ss.set)
console.log(ss.processSubset)
*/
