// Generators

import { error, log } from 'console'
import { createInterface } from 'node:readline/promises'
import { stdin as input, stdout as output } from 'process'

const rl = createInterface({ input, output })
const 
ask = q => rl.question(q)

const validationFail = (e = 'Nah') => {
  throw new Error(e)
}

function* questionnaire() {
  try {
    const name = yield "What's your name ? "
    const age = yield `What's your age ${name} ?: `
    log(`It's really nice to meet you ${age} years old ${name} :)`)
  } catch (e) {
    console.log(`Cleaning it up !`, e)
    validationFail('blyat')
  }
}

const runQuestionnaire = async questionnaire => {
  const quesGen = questionnaire()

  let o
  let p
  let qa = {}

  try {
    // validationFail()
    while (!(o = await quesGen.next(p)).done) {
      validationFail()
      const q = o.value
      const a = await ask(q)
      validationFail()
      p = a
      validationFail()
      qa[q] = a
      validationFail()
    }
  } catch (e) {
    await quesGen.throw(e)
    throw e
  }

  return qa
}

const qa = await runQuestionnaire(questionnaire).catch(e => `caught e ` + e)

console.log(qa)
