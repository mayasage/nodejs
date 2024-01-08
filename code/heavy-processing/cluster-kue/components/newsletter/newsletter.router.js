const express = require("express");
const { newsletterHandler } = require("./newsletter.handler.js");

const router = express.Router();

router.get("/", newsletterHandler);

module.exports = router;
