import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { requireRole } from "../middleware/role.js";
import { validate } from "../middleware/validate.js";
import { employeeSchema } from "../validation/employee.schema.js";

import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee.controller.js";

const router = Router();

// CREATE employee — Manager + Admin
router.post(
  "/",
  auth,
  requireRole(["admin", "manager"]),
  validate(employeeSchema),
  createEmployee
);

// GET all employees — Manager + Admin
router.get("/", auth, requireRole(["admin", "manager"]), getEmployees);

// GET one employee — Manager + Admin
router.get("/:id", auth, requireRole(["admin", "manager"]), getEmployeeById);

// UPDATE employee — Manager + Admin
router.put(
  "/:id",
  auth,
  requireRole(["admin", "manager"]),
  validate(employeeSchema.partial()),
  updateEmployee
);

// DELETE employee — ONLY ADMIN
router.delete("/:id", auth, requireRole(["admin"]), deleteEmployee);

export default router;
