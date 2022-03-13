const express = require("express");
const router = express.Router();
const todoController = require("../controller/todoController");

router.get("/", todoController.all);
router.get("/:id", todoController.find);
router.post("/", todoController.insert);
router.put("/:id", todoController.update);
router.put("/delete/:id", todoController.delete);
router.put("/recover/:id", todoController.recover);

module.exports = router;
