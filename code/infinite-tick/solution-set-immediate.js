/**
 * Recursive setImmediate will never lead to I/O Starvation.
 */

const cb = () => setImmediate(cb)
setImmediate(cb)

setTimeout(() => console.log('setTimeout executed'), 100)

console.log('Start')
