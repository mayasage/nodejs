/**
 * "exec" doesn't work on streams like "spawn", it works on a buffer.
 * And thus, it is limited by the size of the buffer.
 */

const { exec } = require("child_process");

exec("ls", (error, stdout, stderr) => {
  // Also runs in case of incorrect command.
  if (error) {
    console.log("error", error);
  }

  // Output from the error stream.
  if (stderr) {
    console.log("stderr", stderr);
  }

  console.log(stdout);
});
