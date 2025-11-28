import { z } from "zod";

export const employeeSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  position: z.string().optional(),
});
