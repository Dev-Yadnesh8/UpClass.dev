import { z } from "zod";

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .regex(/[A-Z]/, "At least one uppercase letter")
  .regex(/[a-z]/, "At least one lowercase letter")
  .regex(/[0-9]/, "At least one number")
  .regex(/[@$!%*?&]/, "At least one special character");

const emailSchema = z.string().email("Enter a valid email");
const usernameSchema = z
  .string()
  .min(3, "Minimum 3 characters")
  .max(20, "Maximum 20 characters");

export const signInSchema = z.object({
  identifier: z
    .string()
    .refine(
      (val) =>
        emailSchema.safeParse(val).success ||
        usernameSchema.safeParse(val).success,
      { message: "Enter a valid email or username" }
    ),
  password: passwordSchema,
});

export const signUpSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});
