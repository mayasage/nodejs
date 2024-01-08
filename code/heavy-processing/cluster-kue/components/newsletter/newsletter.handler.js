const kue = require("../../setup/setup-kue")();

const newsletterHandler = (req, res, next) => {
  // process.send(`I am Worker No. ${process.pid} performing newsletter.`);

  kue
    .getKue()
    .create("newsletter", {
      title: "newsletter",
    })
    .save();

  res.end(`newsletter scheduled.`);
};

module.exports = {
  newsletterHandler,
};
