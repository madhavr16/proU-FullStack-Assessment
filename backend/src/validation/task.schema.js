import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  status: z.enum(["todo", "in-progress", "done"]).optional(),
  assignee: z.string().optional(),
  dueDate: z.string().optional(),
});
