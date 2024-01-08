/**
 * "spawn" works using Streams, and thus don't have any limitation on the size
 * of the data, unlike "exec".
 */

const { spawn } = require("child_process");

/**
 * { shell: true }
 *  - is needed in Windows (not in Linux).
 *  - This runs the command in a shell.
 */
let listFiles = spawn("ls", ["-l"], { shell: true });

// When incorrect command is provided.
listFiles.stderr.on("data", (error) => console.log(error.toString()));

listFiles.stdout.on("data", (data) => console.log(data.toString()));

// When spawn can't be executed.
listFiles.on("error", (error) => console.log(`Error: ${error.message}`));
