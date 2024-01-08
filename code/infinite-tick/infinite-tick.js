/**
 * A recursive process.nextTick will lead to I/O Starvation...
 * because nextTick runs before going back to the Event Loop.
 */

setImmediate(() => console.log('setImmediate is called')) // never prints
setTimeout(() => console.log('setTimeout executed'), 100) // never  prints

const cb = () => process.nextTick(cb)
process.nextTick(cb)

console.log('Start')
