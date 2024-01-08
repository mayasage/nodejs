/**
 * fork works like execFile, but also establishes IPC.
 *
 * Basics
 *  Child uses "process" to communicate with parent.
 *
 * Common Methods
 *  .send() -> Send message
 *  .on("message") -> Receive message
 *  .on("close") -> Know that Child died
 */

const { fork } = require("child_process");
const TestFile = require("../utils/TestFile");

// Data

const file = `
console.log("I am a child process!");
process.on("message", (msg) => {
  console.log(msg);
  process.exit(0);
})
process.send("Hello mama");
`;

const testFile = new TestFile(file);
testFile.create();

/**
 * The ["maya"] will be passed as argument to the child process.
 * It can be accessed using "process.argv".
 */
const child = fork(testFile.path, ["maya"]);
child.send("Hello child. - parent");
child.on("close", (code) => {
  console.log("child died with code", code);
});
child.on("message", (msg) => console.log(msg));

// testFile.delete();
