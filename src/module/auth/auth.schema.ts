import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(4),
  email: z.email().min(3),
  password: z.string().min(8),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.email().min(3),
  password: z.string().min(8),
});

export type LoginSchema = z.infer<typeof loginSchema>;
