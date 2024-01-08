const express = require("express");
const { lightProcessingHandler } = require("./light.handler");

const router = express.Router();

router.get("/", lightProcessingHandler);

module.exports = router;
