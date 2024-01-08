import { describe, test, expect } from '@jest/globals'
import setMissingKeysInTargetObject from './set-missing-keys-in-target-object.js'
import isEqual from 'lodash/isEqual.js'

const exampleObj = {
  x: {
    1: {
      2: ['hello', 'world'],
      3: undefined,
    },
    4: {
      y: undefined,
      z: undefined,
    },
    w: undefined,
  },
}

const partialExampleObj = {
  x: {
    1: {
      3: undefined,
    },
    4: {
      y: undefined,
    },
    w: undefined,
  },
}

// Empty

const firstIsEmptySecondIsNot = () => {
  const obj1 = {}
  const obj2 = structuredClone(exampleObj)

  setMissingKeysInTargetObject(obj1, obj2)

  expect(Object.keys(obj1).length === 0)
  expect(isEqual(obj2, exampleObj)).toBeTruthy()
}

const firstIsNotEmptySecondIs = () => {
  const obj1 = structuredClone(exampleObj)
  const obj2 = {}

  setMissingKeysInTargetObject(obj1, obj2)

  expect(isEqual(obj1, exampleObj)).toBeTruthy()
  expect(Object.keys(obj2).length === 0)
}

const bothAreEmpty = () => {
  let obj1 = {}
  let obj2 = {}

  setMissingKeysInTargetObject(obj1, obj2)

  expect(obj1 !== obj2)
  expect(Object.keys(obj1).length === 0)
  expect(Object.keys(obj2).length === 0)
}

const undefinedValues = () => {
  const obj1 = {
    where: {
      member: undefined,
      groupMember: undefined,
      group: undefined,
      company: undefined,
      metaData: undefined,
    },

    required: {
      member: false,
      groupMember: false,
      group: false,
      company: false,
      metaData: false,
    },

    attributes: {
      member: undefined,
      groupMember: undefined,
      group: undefined,
      company: undefined,
      metaData: undefined,
    },

    fetch: {
      member: undefined,
      groupMember: undefined,
      group: undefined,
      company: undefined,
      metaData: undefined,
    },

    group: {
      member: undefined,
      groupMember: undefined,
      group: undefined,
      company: undefined,
      metaData: undefined,
    },
  }

  const obj2 = {
    where: {
      member: {
        email: 'roshit.massey@kratikal.com',
      },
    },
    required: {
      groupMember: true,
      group: true,
      company: true,
    },
    attributes: {
      member: ['id'],
      groupMember: ['id'],
      group: ['id', 'companyId'],
      company: ['id', 'name'],
    },
    fetch: {
      metaData: false,
    },
    group: {
      member: ['GroupMembers->Group.companyId'],
    },
  }

  setMissingKeysInTargetObject(obj1, obj2)

  console.log(obj2)
  // expect(isEqual(obj1, exampleObj)).toBeTruthy()
  // expect(Object.keys(obj2).length === 0)
}

// Partially Filled
const partiallyFilled = () => {
  let obj1 = structuredClone(exampleObj)
  let obj2 = structuredClone(partialExampleObj)

  setMissingKeysInTargetObject(obj1, obj2)

  expect(obj1 !== obj2)
  expect(isEqual(obj1, exampleObj)).toBeTruthy()
  expect(exampleObj.x[1][2]).not.toBe(obj2.x[1][2]) // Check if Array is Copied
}

describe('empty objects', () => {
  test('First is Empty, Second is Not', firstIsEmptySecondIsNot)
  test('First is Not Empty, Second Is', firstIsNotEmptySecondIs)
  test('Both are Empty', bothAreEmpty)
  test('Undefined Values', undefinedValues)
})

describe('partially filled', () => {
  test('Partially Filled', partiallyFilled)
})
