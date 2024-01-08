const express = require("express");
const { emailHandler } = require("./email.handler.js");

const router = express.Router();

router.get("/", emailHandler);

module.exports = router;
