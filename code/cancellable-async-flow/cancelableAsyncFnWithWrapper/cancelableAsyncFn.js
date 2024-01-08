/*
Instead of manually checking, create a higher-order-function that will call
your async op if the user has not yet cancelled the asyncFn.
*/

import asyncFn from '../asyncFn.js'

const cancelableAsyncFn = async cancelWrapper => {
  await cancelWrapper(asyncFn, 'A')
  await cancelWrapper(asyncFn, 'B')
  await cancelWrapper(asyncFn, 'C')
}

export default cancelableAsyncFn
