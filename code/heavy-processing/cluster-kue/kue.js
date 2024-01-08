const kue = require("./setup/setup-kue")();
const { processHeavy } = require("./components/heavy/heavy.kue");
const { processEmail } = require("./components/email/email.kue");
const { processNewsletter } = require("./components/newsletter/newsletter.kue");
const { Worker, isMainThread, parentPort } = require("worker_threads");

kue.getKue().process("heavy-process", 1, (job, done) => {
  // console.log(`processId: ${process.pid}; workerThreadId: ${Worker.threadId}`);
  processHeavy(job, done);
  // parentPort.postMessage("")
});

kue.getKue().process("email", 1, (job, done) => {
  // console.log(`processId: ${process.pid}; workerThreadId: ${Worker.threadId}`);
  processEmail(job, done);
  // parentPort.postMessage("")
});

kue.getKue().process("newsletter", 1, (job, done) => {
  // console.log(`processId: ${process.pid}; workerThreadId: ${Worker.threadId}`);
  processNewsletter(job, done);
  // parentPort.postMessage("")
});
