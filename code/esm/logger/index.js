import * as logger from "./logger.js";
import logger2, { info } from "./logger.js"; // also works

console.log("* = ", logger);
// * =  [Module: null prototype] {
//   default: [Function: default],
//   info: [Function: info]
// }

console.log(`info = ${info}`); // info = (msg) => log(`info: ${message}`)
console.log(`default = ${logger2}`); // default = (msg) => console.log(message)

console.log(info === logger.info); // true
console.log(logger.default === logger2); // true
