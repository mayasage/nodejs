const { spawn, exec } = require("child_process");
const TestFile = require("../utils/TestFile");

// Data

const file_LogOnInterval = `
let interval;

/**
 * "_idleStart" is the number of ms since the Node session was started.
 */

interval = setInterval(() => {
  console.log("New chunk");
  if (interval._idleStart > 5000) clearInterval(interval);
}, 1000);
`;

// Main

const testReturnValues = async () => {
  const testFile = new TestFile(file_LogOnInterval);
  testFile.create();

  await Promise.all([
    // spawn - returns data in chunks

    new Promise((resolve) => {
      const spawnEx = spawn("node", [testFile.path], { shell: true });

      spawnEx.on("error", (error) => console.log("spawnEx error:", error));
      spawnEx.on("close", () => resolve());

      spawnEx.stderr.on("data", (error) =>
        console.log("spawnEx stderr:", error.toString())
      );
      spawnEx.stdout.on("data", (data) =>
        console.log("spawnEx stdout:", data.toString())
      );
    }),

    // exec - returns the entire data in a buffer

    new Promise((resolve) => {
      exec(`node ${testFile.path}`, (error, stdout, stderr) => {
        if (error) console.log("exec error:", error);
        if (stderr) console.log("exec stderr:", stderr);

        console.log("exec stdout:", stdout);
        resolve();
      });
    }),
  ]);

  testFile.delete();
};

/**
 * Exec was not working for long command output in tutorial.
 * There you had to increase the buffer size using the option...
 * { maxBuffer: Infinity } inside the "exec".
 *
 * In any case, do not use exec for big output.
 *
 * PS: Node ignores anything that exceeds buffer size.
 * Add { maxBuffer: Infinity } to make buffer size Infinite.
 */

const testLongCommandOutputExec = () => {
  exec(
    "node ../data/long-string.js",
    { maxBuffer: Infinity },
    (error, stdout, stderr) => {
      if (error) console.log("exec error:", error);
      if (stderr) console.log("exec stderr:", stderr);

      console.log("exec stdout:", stdout);
    }
  );
};

const testLongCommandOutputSpawn = () => {
  const spawnEx = spawn("node", ["../data/long-string.js"], { shell: true });

  spawnEx.on("error", (error) => console.log("spawnEx error:", error));

  spawnEx.stderr.on("data", (error) =>
    console.log("spawnEx stderr:", error.toString())
  );
  spawnEx.stdout.on("data", (data) =>
    console.log("spawnEx stdout:", data.toString())
  );
};

testReturnValues();
// testLongCommandOutputExec();
// testLongCommandOutputSpawn();
