const sendEmail = require("./send-email.js");

const processEmail = (job, done) => {
  sendEmail(job);
  console.log("Ok. I'm done.");
  done();
};

module.exports = {
  processEmail,
};
