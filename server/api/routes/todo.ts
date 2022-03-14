const server = require("express");
const router = server.Router();
const todoController = require("../controller/todo.ts");

router.get("/", todoController.all);
router.get("/:id", todoController.find);
router.post("/", todoController.insert);
router.put("/:id", todoController.update);
router.put("/delete/:id", todoController.remove);
router.put("/recover/:id", todoController.recover);

module.exports = router;
