const sendNewsletter = require("./send-newsletter.js");

const processNewsletter = (job, done) => {
  sendNewsletter(job);
  console.log("Ok. I'm done.");
  done();
};

module.exports = {
  processNewsletter,
};
