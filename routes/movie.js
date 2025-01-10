const express = require("express");
const router = express.Router();
const controller = require("./../controllers/postController");

//index
router.get("/", controller.index);

//show
router.get("/:id", controller.show);

module.exports = router;
