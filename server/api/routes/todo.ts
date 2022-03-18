import express from "express";
import { validation } from '../../middleware';
import { TodoController } from "../controllers";

const router = express.Router();

const handleErrorAsync = (callback: Function) => async (req: any, res: any, next: any) => {
  try {
    await callback(req, res, next);
  } catch (error) {
    // next(error);
    res.status(500).json(error)
  }
};

router.get("/", handleErrorAsync(TodoController.all));
router.get("/:id", validation, handleErrorAsync(TodoController.find));
router.post("/", handleErrorAsync(TodoController.insert));
router.put("/:id", validation, handleErrorAsync(TodoController.update));
router.put("/delete/:id", validation, handleErrorAsync(TodoController.remove));
router.put("/recover/:id", validation, handleErrorAsync(TodoController.recover));

export default router;
