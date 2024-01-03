import * as z from "zod";

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
