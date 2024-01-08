// Generators

import { log } from "console";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "process";

const rl = createInterface({ input, output });

function* questionnaire() {
  const name = yield "What's your name ?: ";
  const age = yield `What's your age ${name} ?: `;
  log(`It's really nice to meet you ${age} years old ${name} :)`);
}

const genObj = questionnaire();
let o;
let p;
while (!(o = genObj.next(p)).done) {
  const q = o.value;
  p = await rl.question(q);
}
