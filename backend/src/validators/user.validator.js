import { z } from "zod";

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[@$!%*?&]/, "Password must contain at least one special character");

const emailSchema = z.string().email("Please enter a valid email");
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

const signUpSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

const signInSchema = z.object({
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

const changePasswordSchema = z.object({
  newPassword: passwordSchema,
});

class UserValidator {
  static validateSignUp(data) {
    const result = signUpSchema.safeParse(data);
    if (!result.success) {
      const errors = result.error.errors.reduce((acc, err) => {
        const field = err.path[0];
        acc[field] = err.message;
        return acc;
      }, {});
      return { success: false, errors };
    }
    return { success: true, data: result.data };
  }

  static validateSignIn(data) {
    const result = signInSchema.safeParse(data);
    if (!result.success) {
      const errors = result.error.errors.reduce((acc, err) => {
        const field = err.path[0];
        acc[field] = err.message;
        return acc;
      }, {});
      return { success: false, errors };
    }
    return { success: true, data: result.data };
  }

  static validateChangePassword(data) {
    const result = changePasswordSchema.safeParse(data);
    if (!result.success) {
      const errors = result.error.errors.reduce((acc, err) => {
        const field = err.path[0];
        acc[field] = err.message;
        return acc;
      }, {});
      return { success: false, errors };
    }
    return { success: true, data: result.data };
  }
}

export default UserValidator;
