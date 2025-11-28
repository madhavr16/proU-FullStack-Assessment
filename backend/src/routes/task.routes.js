import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { taskSchema } from "../validation/task.schema.js";

import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

const router = Router();

router.post("/", auth, validate(taskSchema), createTask);
router.get("/", auth, getTasks);
router.get("/:id", auth, getTaskById);
router.put("/:id", auth, validate(taskSchema.partial()), updateTask);
router.delete("/:id", auth, deleteTask);

export default router;
