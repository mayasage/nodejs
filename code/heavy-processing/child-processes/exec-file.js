/**
 * Run executable files in a separate process, unlike exec, which is used to
 * run commands.
 */

const { execFile } = require("child_process");

execFile("node", ["--version"], { shell: true }, (error, stdout, stderr) => {
  if (error) console.log(error);
  if (stderr) console.log(stderr);
  console.log(stdout);
});
