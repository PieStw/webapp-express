const express = require("express");
const router = express.Router();
const controller = require("../controllers/reviewController");

//show
router.get("/:id", controller.show);

//store
router.post("/", controller.store);

module.exports = router;
