import * as z from "zod";

export const signUpValidationSchema = z.object({
  firstName: z.string().min(8, { message: "First Name is too short" }),
  username: z.string().min(2, { message: "User name is too short" }),
  email: z.string().email(),
  password: z.string().min(8, { message: "Password is too short" }),
});
