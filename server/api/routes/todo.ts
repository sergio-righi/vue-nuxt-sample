import express from "express";
import { TodoController } from "../controller";

const router = express.Router();

router.get("/", TodoController.all);
router.get("/:id", TodoController.find);
router.post("/", TodoController.insert);
router.put("/:id", TodoController.update);
router.put("/delete/:id", TodoController.remove);
router.put("/recover/:id", TodoController.recover);

export default router;
