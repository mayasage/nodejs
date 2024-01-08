const kue = require("../../setup/setup-kue")();

const emailHandler = (req, res, next) => {
  // process.send(`I am Worker No. ${process.pid} performing email.`);

  kue
    .getKue()
    .create("email", {
      title: "email",
    })
    .save();

  res.end(`Email scheduled.`);
};

module.exports = {
  emailHandler,
};
