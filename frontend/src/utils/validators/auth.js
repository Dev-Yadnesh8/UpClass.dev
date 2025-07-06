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
  .min(3, { message: "Username must be at least 3 characters long" })
  .refine((val) => /^[a-zA-Z0-9_]+$/.test(val), {
    message: "Username can only contain letters, numbers, and underscores",
  })
  .refine((val) => /[a-zA-Z]/.test(val), {
    message: "Username must contain at least one letter",
  })
  .refine((val) => /[0-9]/.test(val), {
    message: "Username must contain at least one number",
  });


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
