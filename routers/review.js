const express = require("express");
const router = express.Router();
const controller = require("../controllers/reviewController");

//store
router.post("/", controller.store);

module.exports = router;
