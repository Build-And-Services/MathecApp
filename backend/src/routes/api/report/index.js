const express = require("express");
const router = express.Router();
const ReportController = require("@controllers/ReportController");

router.post("/", ReportController.addReport);

module.exports = router;
