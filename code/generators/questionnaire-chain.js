// Generators

import { log } from 'console'
import { createInterface } from 'node:readline/promises'
import { stdin as input, stdout as output } from 'process'

const rl = createInterface({ input, output })

function* fortune() {
  log(`I'm going to compute your fortune now...`)
  const fortune = yield 'So, are you ready to hear your fortune ? '
  log(`...`)
  log(fortune)
  log(`See you soon 😄 `)
}

function* questionnaire() {
  const name = yield "What's your name ? "
  const age = yield `What's your age ${name} ?: `
  log(`It's really nice to meet you ${age} years old ${name} :)`)
  yield* fortune()
}

const genObj = questionnaire()

const name = await rl.question(genObj.next().value)
const age = await rl.question(genObj.next(name).value)
await rl.question(genObj.next(age).value)
genObj.next(`Keep at it ${name}, you'll reach the sea of stars 🌃`)
