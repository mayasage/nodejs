const sleep = require("sleep");

const sendNewsletter = (job) => {
  const maxSleepTimeInSeconds = 100;

  for (let i = 0; i < maxSleepTimeInSeconds; i += 10) {
    sleep.sleep(i);
    console.log(`process.pid: ${process.pid}`);
    job.progress(Math.floor(maxSleepTimeInSeconds / i), 100);
  }
};

module.exports = sendNewsletter;
