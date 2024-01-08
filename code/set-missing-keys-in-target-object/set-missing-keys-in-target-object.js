import Queue from '../Queue/Queue.js'
import isObject from '../is-object/is-object.js'

/**
 * @param {Object} sourceObj Set keys inside this
 * @param {Object} targetObj Set keys into this
 * @param {String} key Set this key only
 * @returns {true|undefined} Returns true if targetObj[key] is an Object
 */
const attemptToSetKey = (sourceObj = {}, targetObj = {}, key) => {
  const sourceVal = sourceObj[key]
  const targetVal = targetObj[key]

  const isKeyInTarget = targetObj.hasOwnProperty(key)

  if (!isKeyInTarget) {
    if (Array.isArray(sourceVal) || isObject(sourceVal)) {
      // deep copy
      targetObj[key] = structuredClone(sourceVal)
    } else {
      targetObj[key] = sourceVal // SET
    }

    return
  }

  return isObject(sourceVal) && isObject(targetVal)
}

/**
 * @param {Queue} queue Instance
 * @param {Object} sourceObj Set keys inside this
 * @param {Object} targetObj Set keys into this
 */
const enqueueAllKeys = (queue, sourceObj, targetObj) =>
  Object.keys(sourceObj).forEach(key =>
    queue.enqueue({ sourceObj, targetObj, key }),
  )

/**
 * @param {Object} sourceObj
 * @param {Object} targetObj
 */
const setMissingKeysInTargetObject = (sourceObj, targetObj) => {
  const queue = new Queue()

  enqueueAllKeys(queue, sourceObj, targetObj)

  while (!queue.isEmpty()) {
    const { sourceObj, targetObj, key } = queue.dequeue()

    if (attemptToSetKey(sourceObj, targetObj, key)) {
      enqueueAllKeys(queue, sourceObj[key], targetObj[key])
    }
  }
}

export default setMissingKeysInTargetObject
