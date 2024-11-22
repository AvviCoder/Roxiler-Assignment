const express = require("express");
const seedDataBase = require("../Controllers/dataSeederController");
const router = express.Router();
router.get("/", seedDataBase);

module.exports = router;
