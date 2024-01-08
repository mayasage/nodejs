/*
Before performing the next async operation, you check if the user has cancelled
the asyncFn.
*/

import asyncFn from '../asyncFn.js'
import CancelError from '../cancelError.js'

const checkCancelObj = cancelObj => {
  if (cancelObj.cancelRequested) throw new CancelError()
}

const cancelableAsyncFn = async cancelObj => {
  await asyncFn('A')

  checkCancelObj(cancelObj)
  await asyncFn('B')

  checkCancelObj(cancelObj)
  await asyncFn('C')
}

export default cancelableAsyncFn
