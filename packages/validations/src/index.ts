import z from "zod";

export const passwordRegex = new RegExp(
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
);

export const VALID_PASSWORD_ERROR = [
  "Password, must contain 1 lowercase and 1 uppercase letter, 1 number, 1 special character,",
  "and be at least 8 characters.",
  "Also, must not reveal the location of the Soul Stone.",
].join(" ");

export const loginValidationSchema = z.object({
  username: z.string({ required_error: "Username is required" }),
  password: z.string().regex(passwordRegex, VALID_PASSWORD_ERROR),
});

export const registerValidationSchema = z.object({
  username: z.string({
    required_error: "Username is required",
    invalid_type_error: "Username must be a string",
  }),
  email: z.string().email("Invalid email"),
  password: z.string().regex(passwordRegex, VALID_PASSWORD_ERROR),
});
