import { Router } from "express";
import { auth } from "../middleware/auth.js";
import Task from "../models/Task.js";
import Employee from "../models/Employee.js";

const router = Router();

router.get("/summary", auth, async (req, res) => {
  const totalTasks = await Task.countDocuments();
  const tasksDone = await Task.countDocuments({ status: "done" });
  const tasksInProgress = await Task.countDocuments({ status: "in-progress" });
  const tasksTodo = await Task.countDocuments({ status: "todo" });
  const employees = await Employee.countDocuments();

  res.json({
    success: true,
    data: {
      totalTasks,
      tasksDone,
      tasksInProgress,
      tasksTodo,
      employees,
    },
  });
});

export default router;
