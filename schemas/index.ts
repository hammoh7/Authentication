import { UserRole } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z.object({
  name:z.optional(z.string()),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(8)),
  newPassword: z.optional(z.string().min(8)),
})
  .refine((data) => {
    if (data.password && !data.newPassword) {
      return false;
    }
    return true;
  }, {
    message: "New password is required!",
    path: ["newPassword"]
  })

  .refine((data) => {
    if (data.newPassword && !data.password) {
      return false;
    }
    return true;
  }, {
    message: "Password is required!",
    path: ["password"]
  })

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email required",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(8, {
    message: "Minimum 8 characters required!",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password do not match!",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email required",
  }),
  password: z.string().min(8, {
    message: "Password required",
  }),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Enter your Name",
  }),
  email: z.string().email({
    message: "Enter your email",
  }),
  password: z.string().min(8, {
    message: "Minimum 8 characters required!",
  }),
});
