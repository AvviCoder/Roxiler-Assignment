const express = require("express");
const router = express.Router();

const {
  getTransactions,
  getStatistics,
  getBarChart,
  getCombinedData,
} = require("../Controllers/transactionController");

router.get("/", getTransactions);
router.get("/statistics", getStatistics);
router.get("/bar-chart", getBarChart);
router.get("/getCombineData", getCombinedData);

module.exports = router;
